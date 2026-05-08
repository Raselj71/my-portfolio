import type { OtherWorkEntry } from '@/content/other-work';

export function OtherWorkRow({ item }: { item: OtherWorkEntry }) {
  return (
    <li className="flex flex-col gap-2 border-t border-border py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h4 className="text-base font-medium text-text">{item.title}</h4>
        {item.note && (
          <p className="mt-1 text-sm text-text-dim">{item.note}</p>
        )}
        <p className="mt-1 font-mono text-xs text-text-dim">
          {item.stack.join(' · ')}
        </p>
      </div>
      <div className="flex gap-4 text-sm">
        {item.live && (
          <a
            href={item.live}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Live ↗
          </a>
        )}
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-text"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </li>
  );
}
