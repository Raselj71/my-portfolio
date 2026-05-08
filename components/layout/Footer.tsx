import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border py-10 text-sm text-text-dim">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© {year} {site.author}</p>
        <ul className="flex gap-6">
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-text"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-text"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <NextLink href="/contact" className="hover:text-text">
              Contact
            </NextLink>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
