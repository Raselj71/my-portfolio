import type { RecentRepo } from '@/lib/github';

function relativeDate(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

export function RecentRepos({ repos }: { repos: RecentRepo[] }) {
  if (repos.length === 0) return null;
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-3">
      {repos.map((repo) => (
        <li key={repo.name}>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="block h-full rounded-md border border-border bg-surface/40 p-4 transition-colors hover:border-border-strong"
          >
            <div className="font-mono text-sm text-text">{repo.name}</div>
            {repo.description && (
              <p className="mt-2 text-sm text-text-muted">
                {repo.description}
              </p>
            )}
            <div className="mt-3 flex gap-4 text-xs text-text-dim">
              {repo.language && <span>{repo.language}</span>}
              <span>Pushed {relativeDate(repo.pushedAt)}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
