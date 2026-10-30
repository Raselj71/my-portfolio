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
        'inline-flex items-center justify-center gap-2 rounded-btn px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' &&
          'bg-accent text-accent-ink hover:opacity-90',
        variant === 'ghost' &&
          'border border-line bg-surface2 text-text hover:bg-surface2',
        className,
      )}
      {...rest}
    />
  ),
);
Button.displayName = 'Button';
