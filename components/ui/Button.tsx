import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' &&
          'bg-accent text-bg hover:bg-accent-soft',
        variant === 'ghost' &&
          'border border-border-strong bg-surface/40 text-text hover:bg-surface-hover',
        className,
      )}
      {...rest}
    />
  ),
);
Button.displayName = 'Button';
