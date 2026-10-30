import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { SectionHeading } from './SectionHeading';

const facts = [
  { label: 'Current role', value: 'Software Engineer, Dhrubok Info Tech Services' },
  { label: 'Experience', value: '2.5 years, 3 companies, 12 shipped apps' },
  { label: 'Location', value: 'Dhaka, Bangladesh (GMT+6)' },
  { label: 'Education', value: 'B.Sc. in CSE, Green University of Bangladesh, CGPA 3.77' },
  { label: 'Recognition', value: "Vice Chancellor's Award" },
  { label: 'Languages', value: 'English, Bangla' },
];

const buttons = [
  { label: 'Resume', href: site.resumePath, primary: true },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'GitHub', href: site.links.github },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[70px] border-t border-line py-[60px]">
      <Container>
        <SectionHeading title="About" subtitle="Who I am and how I work." />
        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[300px_1fr]">
          <div className="reveal mx-auto w-full max-w-[360px] rounded-card border border-line bg-surface p-[18px] lg:mx-0 lg:max-w-none">
            <Image
              src="/profile.png"
              alt="Rasel Ahammed"
              width={900}
              height={900}
              sizes="(max-width: 1024px) 324px, 264px"
              priority={false}
              className="aspect-square w-full rounded-xl bg-gradient-to-b from-surface2 to-surface object-cover object-top"
            />
            <h3 className="mt-4 font-display text-lg font-semibold">{site.name}</h3>
            <p className="mt-0.5 text-sm text-muted">
              Software Engineer, Dhrubok Info Tech Services
            </p>
            <p className="mt-0.5 text-[13px] text-dim">{site.location} · Open to remote</p>
            <div className="mt-4 flex gap-2">
              {buttons.map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    b.primary
                      ? 'flex-1 rounded-[9px] bg-accent px-3 py-2.5 text-center text-[13px] font-semibold text-accent-ink'
                      : 'flex-1 rounded-[9px] border border-line bg-surface2 px-3 py-2.5 text-center text-[13px] font-semibold text-text'
                  }
                >
                  {b.label}
                </a>
              ))}
            </div>
          </div>

          <div className="reveal">
            <p className="max-w-[64ch] text-base leading-[1.65] text-text lg:text-[17px]">
              Software engineer with two and a half years of production experience across
              mobile, web, and real-time systems. At Dhrubok Info Tech Services I lead the
              TaskATask mobile app, built its audio, video, and group calling, and work on the
              DBL Go admin panel for Dhaka Bank. Before that I built Sammanté, a multi-tenant
              health insurance SaaS, and full-stack products for clients in Australia and the
              UAE.
            </p>
            <p className="mt-3 max-w-[64ch] text-base leading-[1.65] text-muted">
              Outside work I run MobileMint, an independent studio with nine Android apps on
              Google Play. It is where I practise the whole job: product decisions, native
              code, store listings, and user support.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-surface p-4">
                  <dt className="text-xs font-medium text-dim">{f.label}</dt>
                  <dd className="mt-0.5 text-sm font-semibold leading-[1.4]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
