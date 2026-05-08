import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.email('Invalid email').trim().max(200),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  // Honeypot — bots tend to fill this. The route handler treats any
  // non-empty value as a bot, returns a fake success, and skips sending.
  // Schema accepts any string so the route's honeypot branch actually fires
  // (a stricter `max(0)` would reject filled honeypots at parse time and
  // make the silent-200 path unreachable).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
