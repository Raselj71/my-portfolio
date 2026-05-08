import { cn } from '@/lib/cn';

type EyebrowProps = React.HTMLAttributes<HTMLDivElement>;

export function Eyebrow({ className, ...rest }: EyebrowProps) {
  return (
    <div
      className={cn(
        'text-xs uppercase tracking-[0.18em] text-accent font-mono',
        className,
      )}
      {...rest}
    />
  );
}
