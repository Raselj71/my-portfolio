export function StackPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface2 px-3 py-1 text-xs text-muted">
      {children}
    </span>
  );
}
