'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/cn';

export type NavItem = { href: string; label: string };

type Props = { items: NavItem[]; resumePath: string };

export function NavClient({ items, resumePath }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Anchors resolve on the homepage; from any other route, go home first.
  const hrefFor = (href: string) =>
    href.startsWith('#') && pathname !== '/' ? `/${href}` : href;

  return (
    <>
      <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
        {items.map((item) => (
          <li key={item.href}>
            <NextLink
              href={hrefFor(item.href)}
              data-section={item.href.replace('#', '')}
              className="nav-link transition-colors duration-200 hover:text-text"
            >
              {item.label}
            </NextLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="grid size-[38px] place-items-center rounded-[9px] border border-line bg-surface text-muted md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-[18px]"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <ThemeToggle />
        <a
          href={resumePath}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-[9px] bg-text px-3.5 py-2 text-[13px] font-semibold text-bg transition-transform duration-200 hover:-translate-y-px md:inline-block"
        >
          Download resume
        </a>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          'absolute inset-x-0 top-full flex-col border-b border-line bg-bg px-5 pb-3.5 pt-2.5 md:hidden',
          open ? 'flex' : 'hidden',
        )}
        onClick={() => setOpen(false)}
      >
        {items.map((item) => (
          <NextLink
            key={item.href}
            href={hrefFor(item.href)}
            className="border-b border-line px-1.5 py-3 text-base font-semibold"
          >
            {item.label}
          </NextLink>
        ))}
        <a
          href={resumePath}
          target="_blank"
          rel="noreferrer"
          className="px-1.5 py-3 text-base font-semibold"
        >
          Download resume
        </a>
      </nav>
    </>
  );
}
