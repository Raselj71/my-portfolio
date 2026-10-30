import { cn } from '@/lib/cn';

type Props = {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string; external?: boolean };
  className?: string;
};

export function SectionHeading({ title, subtitle, action, className }: Props) {
  return (
    <div
      className={cn(
        'reveal flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between md:gap-5',
        className,
      )}
    >
      <div>
        <h2 className="font-display text-[22px] font-semibold tracking-tight md:text-[26px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 max-w-[70ch] text-[15px] text-dim">{subtitle}</p>
        )}
      </div>
      {action && (
        <a
          href={action.href}
          target={action.external ? '_blank' : undefined}
          rel={action.external ? 'noreferrer' : undefined}
          className="whitespace-nowrap text-sm font-semibold text-accent hover:underline"
        >
          {action.label}
          {action.external ? ' ↗' : ''}
        </a>
      )}
    </div>
  );
}
