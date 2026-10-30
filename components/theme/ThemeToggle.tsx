'use client';

import { useEffect, useState } from 'react';
import { THEME_KEY, isTheme, type Theme } from '@/lib/theme';
import { cn } from '@/lib/cn';

function readTheme(): Theme {
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : 'light';
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage may be unavailable; the theme still applies for this page.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch theme"
      title="Switch theme"
      className={cn(
        'grid size-[38px] place-items-center rounded-[9px] border border-line bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className={cn(
          'size-[18px] transition-transform duration-300',
          theme === 'dark' && 'rotate-180',
        )}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
