import Image from 'next/image';
import type { App } from '@/lib/apps';
import { site } from '@/lib/site';

function AppIcon({ app }: { app: App }) {
  if (!app.icon) {
    const initials = app.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('');
    return (
      <span
        aria-hidden="true"
        className="grid size-14 place-items-center rounded-[14px] bg-gradient-to-br from-[#E0335A] to-[#7A1B36] font-display text-lg font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,.14)]"
      >
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={app.icon}
      alt=""
      width={56}
      height={56}
      className="size-14 rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,.14)]"
    />
  );
}

export function AppsGrid({ apps }: { apps: App[] }) {
  return (
    <div className="mt-9 border-t border-dashed border-line pt-7">
      <div className="reveal flex flex-col items-start gap-3 md:flex-row md:items-center">
        <Image
          src="/apps/deen.png"
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-[10px]"
        />
        <div>
          <h3 className="font-display text-xl font-semibold">
            MobileMint — my independent app studio
          </h3>
          <p className="text-sm text-dim">
            Nine apps on Google Play, three more in development. React Native and
            Expo, with Kotlin where the platform needs it.{' '}
            <a
              href={site.links.mobilemint}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              mobilemint.vercel.app ↗
            </a>
          </p>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <li key={app.slug} className="reveal">
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="app-card grid h-full grid-cols-[56px_1fr] items-start gap-3.5 rounded-[14px] border border-line bg-surface p-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent"
            >
              <AppIcon app={app} />
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-[15px] font-semibold">{app.name}</h4>
                  <span className="whitespace-nowrap text-[11px] text-dim">
                    {app.category}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-[1.45] text-muted">
                  {app.tagline}
                </p>
                <div
                  className={
                    app.status === 'live'
                      ? 'mt-2 text-xs font-semibold text-accent'
                      : 'mt-2 text-xs font-semibold text-dim'
                  }
                >
                  {app.status === 'live' ? `${app.urlLabel} ↗` : 'In development'}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
