import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { liveAppCount } from '@/lib/apps';
import { PhoneFan, type Phone } from './PhoneFan';

const phones: Phone[] = [
  {
    src: '/screens/deen-screen.png',
    alt: 'Deen app home screen',
    href: 'https://play.google.com/store/apps/details?id=com.mobilemint.deen',
    icon: '/apps/deen.png',
    label: 'Deen',
    position: 'left',
  },
  {
    src: '/screens/tat-screen.png',
    alt: 'TaskATask dashboard',
    href: site.links.taskatask,
    icon: '/apps/taskatask.png',
    label: 'TaskATask',
    position: 'center',
  },
  {
    src: '/screens/feedlock-screen.png',
    alt: 'FeedLock blocked apps screen',
    href: 'https://play.google.com/store/apps/details?id=com.mobilemint.feedlock',
    icon: '/apps/feedlock.png',
    label: 'FeedLock',
    position: 'right',
  },
];

const stats = [
  { value: String(liveAppCount), label: 'apps on Google Play' },
  { value: '2.5 yrs', label: 'shipping products' },
  { value: '3', label: 'companies' },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <Container className="grid items-center gap-8 py-11 md:py-[72px] lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
        <div>
          <span
            className="anim-rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-muted"
            style={delay(0)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-accent"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
            </svg>
            Software Engineer at Dhrubok Info Tech, Dhaka
          </span>

          <h1
            className="anim-rise mt-[22px] max-w-[14ch] font-display text-[32px] font-semibold leading-[1.1] tracking-tighter sm:text-[38px] lg:text-[50px] lg:leading-[1.06]"
            style={delay(80)}
          >
            <span className="whitespace-nowrap">Cross-platform</span> mobile and
            full-stack products, shipped to real users.
          </h1>

          <p
            className="anim-rise mt-5 max-w-[52ch] text-base leading-[1.6] text-muted lg:text-[17px]"
            style={delay(160)}
          >
            I lead the{' '}
            <a
              href={site.links.taskatask}
              target="_blank"
              rel="noreferrer"
              className="border-b border-accent font-semibold text-text"
            >
              TaskATask
            </a>{' '}
            mobile app, where I built audio, video, and group calling, and I run{' '}
            <a
              href={site.links.mobilemint}
              target="_blank"
              rel="noreferrer"
              className="border-b border-accent font-semibold text-text"
            >
              MobileMint
            </a>
            , a studio with nine Android apps on Google Play. React Native,
            Expo, Next.js, and Node.js.
          </p>

          <div className="anim-rise mt-7 flex flex-wrap gap-3" style={delay(240)}>
            <a
              href="#work"
              className="inline-block rounded-btn bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-transform duration-200 hover:-translate-y-px"
            >
              View work
            </a>
            <a
              href="#contact"
              className="inline-block rounded-btn border border-line bg-surface px-5 py-3 text-sm font-semibold text-text transition-transform duration-200 hover:-translate-y-px"
            >
              Contact me
            </a>
          </div>

          <ul
            className="anim-rise mt-9 flex flex-wrap gap-x-8 gap-y-3.5 border-t border-line pt-[18px]"
            style={delay(320)}
          >
            {stats.map((s) => (
              <li key={s.label} className="min-w-[120px]">
                <div className="font-display text-xl font-semibold tracking-tight text-text">
                  {s.value}
                </div>
                <div className="text-[13px] text-dim">{s.label}</div>
              </li>
            ))}
          </ul>
        </div>

        <PhoneFan phones={phones} />
      </Container>
    </section>
  );
}
