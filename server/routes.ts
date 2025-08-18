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
        
        console.log('Starting MailerLite integration...');
        console.log('API Key present:', !!mailerLiteApiKey);
        console.log('API Key length:', mailerLiteApiKey ? mailerLiteApiKey.length : 0);

        if (!mailerLiteApiKey) {
          console.error('MailerLite API key is missing!');
          throw new Error('MailerLite API key not configured');
        }

        console.log('Making request to MailerLite API...');
        
        // Create subscriber in MailerLite with group assignment
        const mailerLiteGroupId = process.env.MAILERLITE_GROUP_ID;
        
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
            groups: mailerLiteGroupId ? [mailerLiteGroupId] : [], // Add to Shifting Souls Community group
            status: 'unconfirmed', // This will trigger double opt-in
            optin_ip: req.ip,
            signup_ip: req.ip
          })
        });

        console.log('MailerLite Response Status:', mailerLiteResponse.status);
        
        if (mailerLiteResponse.ok) {
          const mailerLiteData = await mailerLiteResponse.json();
          console.log('MailerLite Response Data:', JSON.stringify(mailerLiteData, null, 2));
          
          if (mailerLiteData.data && mailerLiteData.data.id) {
            await storage.updateSubscriberMailerLiteId(validatedData.email, mailerLiteData.data.id);
            console.log(`Subscriber added to MailerLite with ID: ${mailerLiteData.data.id}`);
            
            // Add subscriber to group after creation
            if (mailerLiteGroupId) {
              try {
                console.log(`Adding subscriber to group: ${mailerLiteGroupId}`);
                const groupResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${mailerLiteData.data.id}/groups/${mailerLiteGroupId}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${mailerLiteApiKey}`,
                    'Accept': 'application/json'
                  }
                });
                
                if (groupResponse.ok) {
                  console.log('Subscriber successfully added to Shifting Souls Community group');
                  console.log('MailerLite should now send confirmation email automatically');
                } else {
                  const groupErrorText = await groupResponse.text();
                  console.error('Failed to add subscriber to group:', groupErrorText);
                }
              } catch (groupError) {
                console.error('Error adding subscriber to group:', groupError);
              }
            } else {
              console.error('MAILERLITE_GROUP_ID not configured');
            }
          } else {
            console.error('MailerLite response missing data.id:', mailerLiteData);
          }
        } else {
          const errorText = await mailerLiteResponse.text();
          console.error(`MailerLite API Error (${mailerLiteResponse.status}):`, errorText);
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

  // Webhook endpoint for MailerLite confirmations
  app.post("/api/webhook/mailerlite", async (req, res) => {
    try {
      const event = req.body;
      console.log('MailerLite webhook received:', event);
      
      if (event.type === 'subscriber.confirmed') {
        const subscriberEmail = event.data.subscriber.email;
        const mailerLiteSubscriberId = event.data.subscriber.id;
        
        // Find and confirm subscriber in our local storage
        const subscriber = await storage.getSubscriberByEmail(subscriberEmail);
        if (subscriber && !subscriber.isConfirmed) {
          await storage.confirmSubscriber(subscriber.id);
          console.log(`Subscriber ${subscriberEmail} confirmed via webhook`);
          
          // Add confirmed subscriber to the "Shifting Souls Community" group
          try {
            const mailerLiteApiKey = process.env.MAILERLITE_API_KEY;
            const mailerLiteGroupId = process.env.MAILERLITE_GROUP_ID;
            
            if (mailerLiteApiKey && mailerLiteGroupId) {
              const assignToGroupResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${mailerLiteSubscriberId}/groups/${mailerLiteGroupId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${mailerLiteApiKey}`,
                  'Accept': 'application/json'
                }
              });

              if (assignToGroupResponse.ok) {
                console.log(`Confirmed subscriber ${subscriberEmail} added to Shifting Souls Community group`);
              } else {
                console.error('Failed to add confirmed subscriber to group:', await assignToGroupResponse.text());
              }
            } else {
              console.error('MailerLite credentials not found for webhook');
            }
          } catch (groupError) {
            console.error('Error adding subscriber to group:', groupError);
          }
        }
      }
      
      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  });

  // Manual email confirmation endpoint (for custom flow)
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
              console.log('Confirmed subscriber added to group - MailerLite automation will handle welcome email');
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
