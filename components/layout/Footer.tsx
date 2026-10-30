import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';

const links = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'Google Play', href: site.links.mobilemint },
  { label: 'Resume', href: site.resumePath },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="scroll-mt-[70px] border-t border-line">
      <Container className="grid gap-5 py-11 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-display text-[22px] font-semibold tracking-tight">
            Open to senior mobile and full-stack roles.
          </h2>
          <p className="mt-1.5 text-[15px] text-muted">
            <a
              href={`mailto:${site.email}`}
              className="border-b border-accent text-text"
            >
              {site.email}
            </a>{' '}
            · {site.location}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-[18px] gap-y-3 text-sm text-muted">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="pb-6 text-xs text-dim">
        © {year} {site.author}
      </Container>
    </footer>
  );
}
