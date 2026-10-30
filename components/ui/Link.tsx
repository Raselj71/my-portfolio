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
          'inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-colors duration-150 hover:opacity-90',
        variant === 'ghost' &&
          'inline-flex items-center justify-center gap-2 rounded-btn border border-line bg-surface2 px-4 py-2 text-sm font-medium text-text transition-colors duration-150 hover:bg-surface2',
        className,
      )}
      {...rest}
    />
  ),
);
Link.displayName = 'Link';
