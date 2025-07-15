import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if subscriber already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ 
          message: "Este email ya está suscrito a nuestra newsletter" 
        });
      }

      // Create subscriber in local storage
      const subscriber = await storage.createSubscriber(validatedData);

      // Integrate with MailerLite API
      try {
        const mailerLiteApiKey = process.env.MAILERLITE_API_KEY || process.env.VITE_MAILERLITE_API_KEY || "default_key";
        const mailerLiteGroupId = process.env.MAILERLITE_GROUP_ID || process.env.VITE_MAILERLITE_GROUP_ID || "default_group";

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
              name: validatedData.firstName,
              last_name: validatedData.lastName || '',
              current_moment: validatedData.currentMoment || ''
            },
            groups: [mailerLiteGroupId]
          })
        });

        if (mailerLiteResponse.ok) {
          const mailerLiteData = await mailerLiteResponse.json();
          // Update subscriber with MailerLite ID
          await storage.updateSubscriberMailerLiteId(validatedData.email, mailerLiteData.data.id);
          console.log('Subscriber added to MailerLite successfully');
        } else {
          console.error('MailerLite API error:', await mailerLiteResponse.text());
        }
      } catch (mailerLiteError) {
        console.error('MailerLite integration error:', mailerLiteError);
        // Continue with success response even if MailerLite fails
      }

      res.status(201).json({
        message: "¡Te has suscrito exitosamente! Revisa tu email para confirmar.",
        subscriber: {
          id: subscriber.id,
          firstName: subscriber.firstName,
          email: subscriber.email
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

  const httpServer = createServer(app);
  return httpServer;
}
