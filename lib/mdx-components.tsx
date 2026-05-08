import * as runtime from 'react/jsx-runtime';
import { Aside } from '@/components/mdx/Aside';
import { Outcome } from '@/components/mdx/Outcome';
import { Screenshot } from '@/components/mdx/Screenshot';
import { Stack } from '@/components/mdx/Stack';

const sharedComponents = {
  Aside,
  Outcome,
  Screenshot,
  Stack,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 text-2xl font-semibold tracking-tight text-text"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 text-xl font-semibold tracking-tight text-text"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-text-muted" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent underline-offset-4 hover:underline"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-text-muted"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-text"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-md border border-border bg-surface p-4 text-sm"
      {...props}
    />
  ),
};

export function useMDXComponent(code: string) {
  // Velite stores compiled MDX as a function-body string.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDX({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={sharedComponents} />;
}
