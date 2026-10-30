export function Outcome({
  metric,
  detail,
}: {
  metric: string;
  detail: string;
}) {
  return (
    <div className="my-2 flex flex-col gap-1 rounded-btn border border-line bg-surface p-4">
      <div className="text-2xl text-accent">{metric}</div>
      <div className="text-sm text-muted">{detail}</div>
    </div>
  );
}
