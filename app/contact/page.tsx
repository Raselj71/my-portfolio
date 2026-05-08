import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch about a role, a project, or anything else worth building.',
};

export default function ContactPage() {
  return (
    <Section>
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        Let&apos;s work together.
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">
        Roles, freelance, or just a quick hello — pick a channel below or use
        the form. I usually reply within a day.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_320px]">
        <ContactForm />
        <ContactInfo />
      </div>
    </Section>
  );
}
