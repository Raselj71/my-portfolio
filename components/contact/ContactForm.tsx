'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';

type FormState =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: 'idle' });
  const [pending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (!res.ok) {
          setState({
            kind: 'error',
            message: body.error ?? 'Something went wrong.',
          });
          return;
        }
        setState({ kind: 'success' });
        form.reset();
      } catch {
        setState({
          kind: 'error',
          message: 'Network error. Please try again.',
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="resize-y rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-accent"
        />
      </div>

      {/* Honeypot — hidden from real users. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? 'Sending…' : 'Send message'}
      </Button>

      {state.kind === 'success' && (
        <p className="text-sm text-accent">Message sent. I&apos;ll reply soon.</p>
      )}
      {state.kind === 'error' && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}
    </form>
  );
}
