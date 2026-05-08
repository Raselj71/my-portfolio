'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { cn } from '@/lib/cn';

type NavItem = { href: string; label: string };

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-6 text-sm text-text-muted">
      {items.map(({ href, label }) => {
        const active =
          href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <li key={href}>
            <NextLink
              href={href}
              className={cn(
                'transition-colors duration-150 hover:text-text',
                active && 'text-text',
              )}
            >
              {label}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
