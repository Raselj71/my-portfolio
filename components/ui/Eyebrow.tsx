import { cn } from '@/lib/cn';

type EyebrowProps = React.HTMLAttributes<HTMLDivElement>;

/** Small sentence-case label above a heading. */
export function Eyebrow({ className, ...rest }: EyebrowProps) {
  return <div className={cn('text-[13px] text-dim', className)} {...rest} />;
}
