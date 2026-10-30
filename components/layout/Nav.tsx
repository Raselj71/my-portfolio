import Image from 'next/image';
import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { NavClient } from './NavClient';

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <Container className="relative flex h-16 items-center justify-between">
        <NextLink
          href="/"
          className="flex items-center gap-2.5 font-display text-base font-semibold text-text"
        >
          <Image
            src="/profile.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full bg-surface2 object-cover"
          />
          {site.name}
        </NextLink>
        <NavClient items={site.nav} resumePath={site.resumePath} />
      </Container>
    </header>
  );
}
