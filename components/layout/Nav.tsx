import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { NavLinks } from './NavLinks';

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <NextLink
          href="/"
          className="text-base font-semibold tracking-tight text-text"
        >
          {site.name.split(' ')[0].toLowerCase()}
          <span className="text-accent">.</span>
        </NextLink>
        <NavLinks items={site.nav} />
      </Container>
    </header>
  );
}
