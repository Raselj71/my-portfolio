import NextLink from 'next/link';
import { cn } from '@/lib/cn';
import { forwardRef, type ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: 'primary' | 'ghost' | 'inline';
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'inline', ...rest }, ref) => (
    <NextLink
      ref={ref}
      className={cn(
        variant === 'inline' &&
          'text-accent underline-offset-4 hover:underline',
        variant === 'primary' &&
          'inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors duration-150 hover:bg-accent-soft',
        variant === 'ghost' &&
          'inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface/40 px-4 py-2 text-sm font-medium text-text transition-colors duration-150 hover:bg-surface-hover',
        className,
      )}
      {...rest}
    />
  ),
);
Link.displayName = 'Link';
