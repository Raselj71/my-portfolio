import { Resend } from 'resend';

let cached: Resend | null = null;

function getClient(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not set');
  }
  cached = new Resend(key);
  return cached;
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  if (!to) {
    throw new Error('CONTACT_TO_EMAIL is not set');
  }

  const client = getClient();
  const subject = `Portfolio contact — ${input.name}`;
  const text = [
    `From: ${input.name} <${input.email}>`,
    '',
    input.message,
  ].join('\n');

  const { error } = await client.emails.send({
    from,
    to,
    replyTo: input.email,
    subject,
    text,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
