export function Outcome({
  metric,
  detail,
}: {
  metric: string;
  detail: string;
}) {
  return (
    <div className="my-2 flex flex-col gap-1 rounded-md border border-border bg-surface p-4">
      <div className="font-mono text-2xl text-accent">{metric}</div>
      <div className="text-sm text-text-muted">{detail}</div>
    </div>
  );
}
