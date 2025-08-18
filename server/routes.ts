import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { randomBytes } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint with double opt-in
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if subscriber already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        if (existingSubscriber.isConfirmed) {
          return res.status(400).json({ 
            message: "Este email ya está suscrito y confirmado en nuestra newsletter" 
          });
        } else {
          return res.status(400).json({ 
            message: "Este email ya está registrado. Revisa tu correo para confirmar la suscripción." 
          });
        }
      }

      // Generate confirmation token
      const confirmationToken = randomBytes(32).toString('hex');

      // Create subscriber in local storage (unconfirmed)
      const subscriberData = {
        ...validatedData,
        isConfirmed: false,
        confirmationToken: confirmationToken
      };
      const subscriber = await storage.createSubscriber(subscriberData);

      // Integrate with MailerLite API for double opt-in
      try {
        const mailerLiteApiKey = process.env.MAILERLITE_API_KEY || process.env.VITE_MAILERLITE_API_KEY;
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

        // Create subscriber in MailerLite with double opt-in
        const mailerLiteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mailerLiteApiKey}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: validatedData.email,
            fields: {
              name: validatedData.firstName
            },
            status: 'unconfirmed', // This triggers double opt-in
            optin_ip: req.ip,
            signup_ip: req.ip
          })
        });

        if (mailerLiteResponse.ok) {
          const mailerLiteData = await mailerLiteResponse.json();
          await storage.updateSubscriberMailerLiteId(validatedData.email, mailerLiteData.data.id);
          console.log('Subscriber added to MailerLite with double opt-in');

          // Send custom confirmation email
          const confirmationEmailResponse = await fetch('https://connect.mailerlite.com/api/campaigns/sends', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${mailerLiteApiKey}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              emails: [validatedData.email],
              subject: "AQUÍ CONFIRMAS TU CORREO",
              content: `
                <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #ae667d; text-align: center;">¡Hola, hermosa alma!</h1>
                  
                  <p style="font-size: 16px; line-height: 1.6;">Debes confirmar tu correo.</p>
                  
                  <p style="font-size: 16px; line-height: 1.6;">Si <strong>NO</strong> te interesa, simplemente puedes ignorar este email.</p>
                  
                  <p style="font-size: 16px; line-height: 1.6;">Pero si <strong>SÍ</strong> te interesa, haz clic en el enlace que tienes debajo para confirmar tu registro:</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${baseUrl}/email-confirmacion?subscriber_id=${subscriber.id}&token=${confirmationToken}" 
                       style="background-color: #ae667d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                      👉 CONFIRMAR MI SUSCRIPCIÓN
                    </a>
                  </div>
                  
                  <p style="font-size: 14px; line-height: 1.6; margin-top: 30px;">
                    <strong>P.D.:</strong> Haz clic en el enlace de arriba para acceder a tu regalo.
                  </p>
                  
                  <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">
                    ¡Te deseo un feliz y bendecido día!<br>
                    <strong style="color: #ae667d;">Marcela Resva</strong>
                  </p>
                </body>
                </html>
              `,
              type: "regular"
            })
          });

          if (confirmationEmailResponse.ok) {
            console.log('Confirmation email sent successfully');
          } else {
            console.error('Failed to send confirmation email:', await confirmationEmailResponse.text());
          }
        } else {
          console.error('MailerLite API error:', await mailerLiteResponse.text());
        }
      } catch (mailerLiteError) {
        console.error('MailerLite integration error:', mailerLiteError);
      }

      res.status(201).json({
        message: "¡Registro exitoso! Revisa tu email para confirmar tu suscripción.",
        subscriber: {
          id: subscriber.id,
          firstName: subscriber.firstName,
          email: subscriber.email,
          requiresConfirmation: true
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Datos inválidos", 
          errors: error.errors 
        });
      }
      
      console.error('Subscription error:', error);
      res.status(500).json({ 
        message: "Error interno del servidor. Por favor intenta de nuevo." 
      });
    }
  });

  // Email confirmation endpoint
  app.post("/api/confirm-subscription", async (req, res) => {
    try {
      const { subscriberId, token } = req.body;

      if (!subscriberId || !token) {
        return res.status(400).json({
          message: "Datos de confirmación inválidos"
        });
      }

      // Verify subscriber and token
      const subscriber = await storage.getSubscriberById(subscriberId);
      if (!subscriber) {
        return res.status(404).json({
          message: "Suscriptor no encontrado"
        });
      }

      if (subscriber.confirmationToken !== token) {
        return res.status(400).json({
          message: "Token de confirmación inválido"
        });
      }

      if (subscriber.isConfirmed) {
        return res.status(400).json({
          message: "Este email ya está confirmado"
        });
      }

      // Update subscriber as confirmed
      await storage.confirmSubscriber(subscriberId);

      // Update status in MailerLite
      try {
        const mailerLiteApiKey = process.env.MAILERLITE_API_KEY || process.env.VITE_MAILERLITE_API_KEY;
        const mailerLiteGroupId = process.env.MAILERLITE_GROUP_ID || process.env.VITE_MAILERLITE_GROUP_ID || "160033952049923407";

        if (subscriber.mailerLiteId) {
          // Confirm subscriber in MailerLite
          const confirmResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriber.mailerLiteId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${mailerLiteApiKey}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              status: 'active'
            })
          });

          if (confirmResponse.ok) {
            console.log('Subscriber confirmed in MailerLite');

            // Add to group
            const assignToGroupResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriber.mailerLiteId}/groups/${mailerLiteGroupId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mailerLiteApiKey}`,
                'Accept': 'application/json'
              }
            });

            if (assignToGroupResponse.ok) {
              console.log('Confirmed subscriber added to group');

              // Send welcome email with gifts
              const welcomeEmailResponse = await fetch('https://connect.mailerlite.com/api/campaigns/sends', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${mailerLiteApiKey}`,
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  emails: [subscriber.email],
                  subject: "Bienvenida… disfruta tus regalos",
                  content: `
                    <html>
                    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                      <h1 style="color: #ae667d; text-align: center;">¡Bienvenida, ${subscriber.firstName}!</h1>
                      
                      <p style="font-size: 16px; line-height: 1.6;">Tu suscripción ha sido confirmada exitosamente.</p>
                      
                      <p style="font-size: 16px; line-height: 1.6;">Ahora puedes acceder a tus 4 regalos espirituales:</p>
                      
                      <div style="margin: 30px 0;">
                        <h3 style="color: #ae667d;">🎁 Tus Regalos:</h3>
                        <ul style="font-size: 16px; line-height: 1.8;">
                          <li><strong>El Audio Canalizado</strong> (2 min 16 seg)</li>
                          <li><strong>El video La Energía del Pétalo</strong></li>
                          <li><strong>Cápsulas de Acción</strong></li>
                          <li><strong>Comunidad Shifting Souls</strong></li>
                        </ul>
                      </div>
                      
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.BASE_URL || 'http://localhost:5000'}/audio-regalo" 
                           style="background-color: #ae667d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 10px;">
                          🎵 Acceder al Audio
                        </a>
                        <a href="${process.env.BASE_URL || 'http://localhost:5000'}/video-regalo" 
                           style="background-color: #976e73; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 10px;">
                          🎥 Acceder al Video
                        </a>
                      </div>
                      
                      <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
                        Con amor y luz,<br>
                        <strong style="color: #ae667d;">Marcela Resva</strong>
                      </p>
                    </body>
                    </html>
                  `,
                  type: "regular"
                })
              });

              if (welcomeEmailResponse.ok) {
                console.log('Welcome email with gifts sent successfully');
              }
            }
          }
        }
      } catch (mailerLiteError) {
        console.error('MailerLite confirmation error:', mailerLiteError);
      }

      res.status(200).json({
        message: "Suscripción confirmada exitosamente. ¡Bienvenida!",
        confirmed: true
      });
    } catch (error) {
      console.error('Confirmation error:', error);
      res.status(500).json({
        message: "Error interno del servidor. Por favor intenta de nuevo."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
