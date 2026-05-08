export function StackPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border-strong bg-surface/40 px-3 py-1 font-mono text-xs text-text-muted">
      {children}
    </span>
  );
}
