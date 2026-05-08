import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { site } from '@/lib/site';
import { GlowBackdrop } from './GlowBackdrop';
import { HeroHeadline } from './HeroHeadline';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <GlowBackdrop />
      <Container className="relative flex flex-col gap-12 py-20 md:flex-row md:items-center md:gap-20 md:py-32">
        <div className="order-2 md:order-1 md:flex-1">
          <Eyebrow>Software Engineer · Dhaka</Eyebrow>
          <HeroHeadline>Building modern web and mobile products.</HeroHeadline>
          <p className="mt-6 max-w-prose text-pretty text-lg text-text-muted">
            I&apos;m {site.author}. Currently a software engineer at Dhrubok
            Infotech Services, working with Next.js, React Native, Node, and
            Android. I shipped Sammanté — a multi-tenant health-insurance SaaS
            — earlier this year.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" variant="primary">
              View work →
            </Link>
            <Link href={site.resumePath} variant="ghost">
              Resume ↗
            </Link>
          </div>
        </div>
        <div className="order-1 mx-auto md:order-2 md:flex-shrink-0">
          <div className="relative size-56 overflow-hidden rounded-full border border-border-strong md:size-72">
            <Image
              src="/profile.png"
              alt={`Photo of ${site.author}`}
              fill
              priority
              sizes="(min-width: 768px) 18rem, 14rem"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
