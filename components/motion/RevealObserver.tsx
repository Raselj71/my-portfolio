'use client';

import { useEffect } from 'react';

/**
 * Reveals `.reveal` elements once as they scroll into view and marks the
 * nav link for the section currently on screen. Mount once per page.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('in'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('header a[data-section]'),
    );
    const sections = links
      .map((a) => document.getElementById(a.dataset.section ?? ''))
      .filter((el): el is HTMLElement => el !== null);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) =>
            a.classList.toggle('is-active', a.dataset.section === entry.target.id),
          );
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return null;
}
