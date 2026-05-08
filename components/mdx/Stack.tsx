export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="my-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border-strong bg-surface/40 px-3 py-1 font-mono text-xs text-text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
