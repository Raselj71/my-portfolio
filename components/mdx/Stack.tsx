export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="my-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-surface2 px-3 py-1 text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
