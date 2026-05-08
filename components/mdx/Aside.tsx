import { cn } from '@/lib/cn';

export function Aside({
  children,
  variant = 'note',
}: {
  children: React.ReactNode;
  variant?: 'note' | 'warn';
}) {
  return (
    <aside
      className={cn(
        'my-6 rounded-md border-l-2 px-4 py-3 text-sm',
        variant === 'note' && 'border-accent bg-accent/5 text-text-muted',
        variant === 'warn' && 'border-amber-500 bg-amber-500/5 text-text-muted',
      )}
    >
      {children}
    </aside>
  );
}
