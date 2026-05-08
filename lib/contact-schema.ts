import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.email('Invalid email').trim().max(200),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  // Honeypot — bots tend to fill this. Real users see no field, so this
  // must be empty.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
