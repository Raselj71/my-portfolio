# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing personal portfolio at `D:\my-portfolio` into a recruiter-focused Next.js 14 site deployed on Vercel, with case studies, a blog, a live GitHub activity strip, and a working contact form.

**Architecture:** Next.js 14 App Router on Vercel SSR (drop the static-export config). Server components fetch data; one client component (`ContactForm`) submits a server action. Content lives as MDX in `content/` and is compiled to typed JSON by Velite. Single dark theme, sky-blue accent (`#38bdf8`), Geist fonts. Email via Resend. GitHub data fetched server-side and cached for 6 hours.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3, Velite (MDX), Resend, framer-motion, Vercel Analytics, Geist (fonts), Zod (validation).

**Verification model (no test framework):** Each task verifies via some combination of: `npx tsc --noEmit` (type-check), `npm run lint`, `npm run build`, and `npm run dev` smoke checks at specific URLs. The spec deliberately excludes Jest/Playwright. Where logic is genuinely worth probing (Zod schema, Resend wrapper, rate-limiter), the task includes a small inline `node` script you run once and discard — not a permanent test file.

**Source spec:** `docs/superpowers/specs/2026-05-08-portfolio-redesign-design.md`. Cross-reference when in doubt.

---

## Repo conventions used throughout this plan

- Path alias `@/*` resolves to repo root (`tsconfig.json`).
- Components live under `components/` (new top-level directory). Existing `app/components/` is deleted.
- Server-only modules live under `lib/`. They MUST NOT be imported from a client component.
- Content files live under `content/` (top-level). Velite reads from here.
- Each task ends with a commit. Commit messages use conventional-commit prefixes (`feat:`, `chore:`, `refactor:`, `docs:`).
- All work happens on the `redesign` branch. Do not merge to `master` until Phase 8.

## Working directory

All shell commands assume the working directory is `D:\my-portfolio`. Commands use bash syntax (the Bash tool); equivalents for PowerShell are noted only when bash syntax fails on Windows.

---

# Phase 1 — Foundation

**Deliverable:** Empty-but-styled Next.js shell deployed to Vercel preview, with new fonts, theme tokens, navigation chrome, and stub pages for every route. Build passes; type-check passes; lint passes.

## Task 1.1: Cut the redesign branch

**Files:** none

- [ ] **Step 1: Create branch**

```bash
git checkout -b redesign
```

- [ ] **Step 2: Verify**

```bash
git branch --show-current
```

Expected: `redesign`

## Task 1.2: Remove deprecated config and the custom server

**Files:**
- Modify: `next.config.mjs`
- Delete: `my-loader.ts`, `server.js`
- Modify: `package.json` (the `start` script and one dep)

- [ ] **Step 1: Replace `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Delete files**

```bash
rm my-loader.ts server.js
```

- [ ] **Step 3: Update `package.json` scripts**

Replace the `scripts` block:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 4: Verify build still works with no source changes yet**

```bash
npm run build
```

Expected: succeeds (the existing pages still build; the static-export directory `out/` is no longer produced — this is correct).

- [ ] **Step 5: Commit**

```bash
git add next.config.mjs package.json
git rm my-loader.ts server.js
git commit -m "chore: remove static-export config, custom loader, and custom server"
```

## Task 1.3: Install new dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install runtime deps**

```bash
npm install resend zod framer-motion @vercel/analytics velite
```

- [ ] **Step 2: Install Velite peer deps**

```bash
npm install --save-dev rehype-slug rehype-autolink-headings
```

- [ ] **Step 3: Verify versions are recent**

```bash
npm list resend zod framer-motion @vercel/analytics velite
```

Expected: all listed without `UNMET` warnings.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend, zod, framer-motion, velite, vercel analytics"
```

## Task 1.4: Replace Tailwind config with design tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace the file**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#0f0f12',
        'surface-hover': '#16161a',
        accent: '#38bdf8',
        'accent-soft': '#7dd3fc',
        text: {
          DEFAULT: '#fafafa',
          muted: '#a1a1aa',
          dim: '#71717a',
          faint: '#52525b',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(56,189,248,0.18) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(design): replace tailwind config with new design tokens"
```

## Task 1.5: Replace `globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the file**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-bg text-text font-sans;
  }

  ::selection {
    background: rgba(56, 189, 248, 0.25);
    color: #fafafa;
  }

  *:focus-visible {
    outline: 2px solid theme('colors.accent');
    outline-offset: 2px;
    border-radius: 2px;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .text-pretty {
    text-wrap: pretty;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat(design): rewrite globals.css for dark-only theme"
```

## Task 1.6: Set up fonts via `next/font`

**Files:**
- Create: `lib/fonts.ts`

- [ ] **Step 1: Create file**

```ts
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const fontSans = GeistSans;
export const fontMono = GeistMono;
```

- [ ] **Step 2: Install the `geist` package**

```bash
npm install geist
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/fonts.ts package.json package-lock.json
git commit -m "feat(design): add Geist Sans + Mono via next/font"
```

## Task 1.7: Create site config

**Files:**
- Create: `lib/site.ts`

- [ ] **Step 1: Create file**

```ts
const fallbackUrl = 'http://localhost:3000';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? fallbackUrl;

export const site = {
  url: siteUrl,
  name: 'Rasel Ahmed',
  title: 'Rasel Ahmed — Software Engineer',
  description:
    'Software engineer building modern web and mobile products. Currently at Dhrubok Infotech Services.',
  author: 'Rasel Ahmed',
  email: 'rasel.cse.green@gmail.com',
  links: {
    github: 'https://github.com/Raselj71',
    linkedin: 'https://www.linkedin.com/in/rasel221/',
    youtube: 'https://youtube.com/techtutorpro',
  },
  github: {
    username: 'Raselj71',
  },
  resumePath: '/resume.pdf',
  nav: [
    { href: '/work', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};

export type Site = typeof site;
```

- [ ] **Step 2: Commit**

```bash
git add lib/site.ts
git commit -m "feat: add site config with NEXT_PUBLIC_SITE_URL support"
```

## Task 1.8: Create environment example file

**Files:**
- Create: `.env.local.example`

- [ ] **Step 1: Create file**

```
# Public site URL — set in Vercel project settings to the production URL.
# Locally this can stay unset; the site falls back to http://localhost:3000.
NEXT_PUBLIC_SITE_URL=

# Resend API key — required for the contact form to send email.
# Get one at https://resend.com.
RESEND_API_KEY=

# Email address that receives contact form submissions.
CONTACT_TO_EMAIL=

# Verified sender on Resend. Use onboarding@resend.dev until your domain
# is verified.
CONTACT_FROM_EMAIL=onboarding@resend.dev

# Optional. Only set if the unauthenticated GitHub API rate limit
# (60 req/h) becomes a problem.
GITHUB_TOKEN=
```

- [ ] **Step 2: Commit**

```bash
git add .env.local.example
git commit -m "docs: add .env.local.example"
```

## Task 1.9: Build the `Container` UI primitive

**Files:**
- Create: `components/ui/Container.tsx`

- [ ] **Step 1: Create file**

```tsx
import { cn } from '@/lib/cn';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1200px] px-6 md:px-8', className)}
      {...rest}
    />
  );
}
```

- [ ] **Step 2: Create the `cn` helper**

Create `lib/cn.ts`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Install dependencies**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 4: Verify**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Container.tsx lib/cn.ts package.json package-lock.json
git commit -m "feat(ui): add Container primitive and cn() helper"
```

## Task 1.10: Build `Section` and `Eyebrow` primitives

**Files:**
- Create: `components/ui/Section.tsx`, `components/ui/Eyebrow.tsx`

- [ ] **Step 1: Create `Section.tsx`**

```tsx
import { cn } from '@/lib/cn';
import { Container } from './Container';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bare?: boolean;
};

export function Section({ className, bare, children, ...rest }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)} {...rest}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
```

- [ ] **Step 2: Create `Eyebrow.tsx`**

```tsx
import { cn } from '@/lib/cn';

type EyebrowProps = React.HTMLAttributes<HTMLDivElement>;

export function Eyebrow({ className, ...rest }: EyebrowProps) {
  return (
    <div
      className={cn(
        'text-xs uppercase tracking-[0.18em] text-accent font-mono',
        className,
      )}
      {...rest}
    />
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/Section.tsx components/ui/Eyebrow.tsx
git commit -m "feat(ui): add Section and Eyebrow primitives"
```

## Task 1.11: Build `Button` and `Link` primitives

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Link.tsx`

- [ ] **Step 1: Create `Button.tsx`**

```tsx
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' &&
          'bg-accent text-bg hover:bg-accent-soft',
        variant === 'ghost' &&
          'border border-border-strong bg-surface/40 text-text hover:bg-surface-hover',
        className,
      )}
      {...rest}
    />
  ),
);
Button.displayName = 'Button';
```

- [ ] **Step 2: Create `Link.tsx`**

```tsx
import NextLink from 'next/link';
import { cn } from '@/lib/cn';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: 'primary' | 'ghost' | 'inline';
};

export function Link({ className, variant = 'inline', ...rest }: LinkProps) {
  return (
    <NextLink
      className={cn(
        variant === 'inline' &&
          'text-accent underline-offset-4 hover:underline',
        variant === 'primary' &&
          'inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors duration-150 hover:bg-accent-soft',
        variant === 'ghost' &&
          'inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface/40 px-4 py-2 text-sm font-medium text-text transition-colors duration-150 hover:bg-surface-hover',
        className,
      )}
      {...rest}
    />
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/Button.tsx components/ui/Link.tsx
git commit -m "feat(ui): add Button and Link primitives"
```

## Task 1.12: Build new `Nav`

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/NavLinks.tsx`
- Delete: `app/components/Navbar.tsx` (in Task 8.1, keep for now to avoid breaking existing pages mid-build)

- [ ] **Step 1: Create `NavLinks.tsx` (client, for active state)**

```tsx
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
```

- [ ] **Step 2: Create `Nav.tsx` (server)**

```tsx
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
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/Nav.tsx components/layout/NavLinks.tsx
git commit -m "feat(layout): add new Nav with sticky blur and active-link state"
```

## Task 1.13: Build new `Footer`

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create file**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat(layout): add new Footer"
```

## Task 1.14: Replace root layout

**Files:**
- Modify: `app/layout.tsx`
- Create: `lib/metadata.ts`

- [ ] **Step 1: Create `lib/metadata.ts`**

```ts
import type { Metadata } from 'next';
import { site } from './site';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.author, url: site.links.linkedin }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: site.title,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { fontSans, fontMono } from '@/lib/fonts';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { defaultMetadata } from '@/lib/metadata';
import './globals.css';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text antialiased">
        <Nav />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify type-check**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx lib/metadata.ts
git commit -m "feat(layout): replace root layout with Geist fonts, new nav/footer, analytics"
```

## Task 1.15: Stub all routes

The existing `/`, `/about`, `/work`, `/services`, `/contact` pages reference now-deleted styles and the legacy nav. Replace each with a simple stub so `npm run build` passes. Real implementations come in later phases.

**Files:**
- Modify: `app/page.tsx`, `app/about/page.tsx`, `app/work/page.tsx`, `app/contact/page.tsx`
- Create: `app/blog/page.tsx`
- Delete: `app/services/page.tsx` (and the `app/services` directory)

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function HomePage() {
  return (
    <Section>
      <Eyebrow>Software Engineer</Eyebrow>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text md:text-6xl">
        Redesign in progress.
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">
        Real homepage lands in Phase 3.
      </p>
    </Section>
  );
}
```

- [ ] **Step 2: Replace `app/about/page.tsx`**

```tsx
import { Section } from '@/components/ui/Section';

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-text-muted">Coming soon.</p>
    </Section>
  );
}
```

- [ ] **Step 3: Replace `app/work/page.tsx`**

```tsx
import { Section } from '@/components/ui/Section';

export default function WorkPage() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold tracking-tight">Work</h1>
      <p className="mt-4 text-text-muted">Coming soon.</p>
    </Section>
  );
}
```

- [ ] **Step 4: Replace `app/contact/page.tsx`**

```tsx
import { Section } from '@/components/ui/Section';

export default function ContactPage() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-text-muted">Coming soon.</p>
    </Section>
  );
}
```

- [ ] **Step 5: Create `app/blog/page.tsx`**

```tsx
import { Section } from '@/components/ui/Section';

export default function BlogPage() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-4 text-text-muted">Coming soon.</p>
    </Section>
  );
}
```

- [ ] **Step 6: Delete `app/services/`**

```bash
rm -rf app/services
```

- [ ] **Step 7: Run build**

```bash
npm run build
```

Expected: succeeds. The output mentions the new routes (`/`, `/about`, `/blog`, `/contact`, `/work`).

- [ ] **Step 8: Smoke check the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and click each nav link. Every page should render with the new fonts, the nav at top, the footer at bottom. Stop the server with Ctrl+C.

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx app/about/page.tsx app/work/page.tsx app/contact/page.tsx app/blog/page.tsx
git rm -r app/services
git commit -m "feat(routes): stub all routes against new shell, drop /services"
```

## Task 1.16: Phase 1 deployment checkpoint

**Files:** none

- [ ] **Step 1: Push the branch**

```bash
git push -u origin redesign
```

- [ ] **Step 2: Connect repo to Vercel (one-time, manual via web UI)**

Go to vercel.com → Add New Project → Import Git Repository. Select this repo. Use defaults. Set environment variables (all optional at this stage):
- `NEXT_PUBLIC_SITE_URL` — leave blank for now; Vercel auto-injects the deployment URL on previews.

- [ ] **Step 3: Verify preview deployment**

The Vercel dashboard shows a preview URL for the `redesign` branch. Open it. Same smoke check as Task 1.15 Step 8. All five routes render correctly.

If the dev or preview build fails:
- Type errors: run `npm run typecheck` locally and fix.
- Missing env: not expected at this phase since everything has fallbacks.
- Other: post the error to the next session before continuing.

---

# Phase 2 — Velite + content scaffolding

**Deliverable:** MDX content pipeline working. `content/` is read by Velite at build time and produces typed JSON in `.velite/`. Adding a new MDX file triggers a rebuild and the new entry is queryable from server components.

## Task 2.1: Configure Velite

**Files:**
- Create: `velite.config.ts`
- Modify: `tsconfig.json`, `.gitignore`

- [ ] **Step 1: Create `velite.config.ts`**

```ts
import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const caseStudy = defineCollection({
  name: 'CaseStudy',
  pattern: 'work/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('work'),
      title: s.string().max(120),
      summary: s.string().max(280),
      role: s.string(),
      period: s.string(),
      stack: s.array(s.string()).min(1),
      cover: s.string().optional(),
      links: s
        .object({
          live: s.string().url().nullable().optional(),
          github: s.string().url().nullable().optional(),
        })
        .optional(),
      featured: s.boolean().default(false),
      order: s.number().default(0),
      status: s.enum(['shipped', 'in-progress', 'archived']).default('shipped'),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      url: `/work/${data.slug}`,
    })),
});

const post = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('blog'),
      title: s.string().max(120),
      summary: s.string().max(280),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      readingTime: s.metadata().transform((m) => m.readingTime),
    })
    .transform((data) => ({
      ...data,
      url: `/blog/${data.slug}`,
    })),
});

export default defineConfig({
  root: 'content',
  output: { data: '.velite', clean: true, assets: 'public/static', base: '/static/' },
  collections: { caseStudies: caseStudy, posts: post },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
```

- [ ] **Step 2: Update `tsconfig.json` to include `.velite` types**

Add `.velite` to the `include` array:

```json
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".velite"],
```

- [ ] **Step 3: Update `.gitignore`**

Add at end:

```
# velite
.velite/
public/static/
```

- [ ] **Step 4: Commit**

```bash
git add velite.config.ts tsconfig.json .gitignore
git commit -m "feat(content): add velite config for case studies and blog posts"
```

## Task 2.2: Wire Velite into the build pipeline

**Files:**
- Modify: `package.json`, `next.config.mjs`

- [ ] **Step 1: Add velite scripts to `package.json`**

Update the `scripts` block:

```json
"scripts": {
  "dev": "velite --watch & next dev",
  "build": "velite && next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "velite && tsc --noEmit"
}
```

If on Windows where `&` is not native to `cmd`, use:

```json
"dev": "velite --watch & next dev",
```

This works in PowerShell when using the `Bash` tool; if using Windows `cmd`, install `concurrently` and write `concurrently \"velite --watch\" \"next dev\"` instead.

- [ ] **Step 2: No `next.config.mjs` change needed**

(Velite produces files outside `app/`; Next picks them up via normal imports.)

- [ ] **Step 3: Run velite once to confirm it produces output**

```bash
npx velite
```

Expected: output `Generated 0 case studies, 0 posts` (or similar). The `.velite/` directory exists.

- [ ] **Step 4: Verify `npm run build` still passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add package.json
git commit -m "feat(content): run velite as part of dev/build/typecheck"
```

## Task 2.3: Create content directory placeholders

**Files:**
- Create: `content/work/.gitkeep`, `content/blog/.gitkeep`, `content/other-work.ts`

- [ ] **Step 1: Create directories with `.gitkeep`**

```bash
mkdir -p content/work content/blog
touch content/work/.gitkeep content/blog/.gitkeep
```

- [ ] **Step 2: Create `content/other-work.ts`**

```ts
export type OtherWorkEntry = {
  title: string;
  stack: string[];
  year?: number;
  github?: string | null;
  live?: string | null;
  note?: string;
};

export const otherWork: OtherWorkEntry[] = [
  {
    title: 'All Document Reader',
    stack: ['Android'],
    note: 'Evolution of PDF Reader. Stack details to be added.',
    github: null,
    live: null,
  },
  {
    title: 'Foodi — Restaurant Landing Page',
    stack: ['React', 'Tailwind', 'Next.js', 'TypeScript'],
    github: 'https://github.com/Raselj71/Foodi-React-website.git',
    live: 'https://foodi-react-website-my759jqs3-raselj71s-projects.vercel.app',
  },
  {
    title: 'REST API — Express + MySQL',
    stack: ['Node.js', 'Express', 'MySQL'],
    github:
      'https://github.com/Raselj71/Rest-API-using-Express-and-MySql-Database',
    live: null,
  },
  {
    title: 'EMI & Loan Calculator',
    stack: ['Java', 'Android', 'SQLite'],
    github: 'https://github.com/Raselj71/EMI_Calculator.git',
    live: null,
  },
  {
    title: 'Job Board',
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/Raselj71/Job-board',
    live: null,
  },
  {
    title: 'This Portfolio',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/Raselj71/my-portfolio',
    live: null,
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add content/
git commit -m "feat(content): scaffold content directories and other-work list"
```

## Task 2.4: Build MDX component map

**Files:**
- Create: `lib/mdx-components.tsx`, `components/mdx/Aside.tsx`, `components/mdx/Outcome.tsx`, `components/mdx/Screenshot.tsx`, `components/mdx/Stack.tsx`

- [ ] **Step 1: Create `components/mdx/Aside.tsx`**

```tsx
import { cn } from '@/lib/cn';

export function Aside({
  children,
  variant = 'note',
}: {
  children: React.ReactNode;
  variant?: 'note' | 'warn';
}) {
  return (
    <aside
      className={cn(
        'my-6 rounded-md border-l-2 px-4 py-3 text-sm',
        variant === 'note' && 'border-accent bg-accent/5 text-text-muted',
        variant === 'warn' && 'border-amber-500 bg-amber-500/5 text-text-muted',
      )}
    >
      {children}
    </aside>
  );
}
```

- [ ] **Step 2: Create `components/mdx/Outcome.tsx`**

```tsx
export function Outcome({
  metric,
  detail,
}: {
  metric: string;
  detail: string;
}) {
  return (
    <div className="my-2 flex flex-col gap-1 rounded-md border border-border bg-surface p-4">
      <div className="font-mono text-2xl text-accent">{metric}</div>
      <div className="text-sm text-text-muted">{detail}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/mdx/Screenshot.tsx`**

```tsx
import Image from 'next/image';

export function Screenshot({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-border">
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 4: Create `components/mdx/Stack.tsx`**

```tsx
export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="my-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border-strong bg-surface/40 px-3 py-1 font-mono text-xs text-text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 5: Create `lib/mdx-components.tsx`**

```tsx
import * as runtime from 'react/jsx-runtime';
import { Aside } from '@/components/mdx/Aside';
import { Outcome } from '@/components/mdx/Outcome';
import { Screenshot } from '@/components/mdx/Screenshot';
import { Stack } from '@/components/mdx/Stack';

const sharedComponents = {
  Aside,
  Outcome,
  Screenshot,
  Stack,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 text-2xl font-semibold tracking-tight text-text"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 text-xl font-semibold tracking-tight text-text"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-text-muted" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent underline-offset-4 hover:underline"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-text-muted"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-text"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-md border border-border bg-surface p-4 text-sm"
      {...props}
    />
  ),
};

export function useMDXComponent(code: string) {
  // Velite stores compiled MDX as a function-body string. Evaluate against the
  // shared React JSX runtime.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDX({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={sharedComponents} />;
}
```

- [ ] **Step 6: Verify**

```bash
npm run typecheck
```

Expected: no errors. The `MDX` component is unused at this stage; that is fine.

- [ ] **Step 7: Commit**

```bash
git add components/mdx lib/mdx-components.tsx
git commit -m "feat(content): add shared MDX component map and custom MDX components"
```

---

# Phase 3 — Home, About, Contact

**Deliverable:** Homepage, about page, and contact page render with real content. Submitting the contact form sends an email via Resend.

## Task 3.1: Build the Hero

**Files:**
- Create: `components/hero/GlowBackdrop.tsx`, `components/hero/Hero.tsx`

- [ ] **Step 1: Create `GlowBackdrop.tsx`**

```tsx
export function GlowBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
    />
  );
}
```

- [ ] **Step 2: Create `Hero.tsx`**

```tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { site } from '@/lib/site';
import { GlowBackdrop } from './GlowBackdrop';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <GlowBackdrop />
      <Container className="relative flex flex-col gap-12 py-20 md:flex-row md:items-center md:gap-20 md:py-32">
        <div className="order-2 md:order-1 md:flex-1">
          <Eyebrow>Software Engineer · Dhaka</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter text-text md:text-6xl lg:text-7xl">
            Building modern web and mobile products.
          </h1>
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
```

- [ ] **Step 3: Commit**

```bash
git add components/hero
git commit -m "feat(home): add Hero with glow backdrop and profile image"
```

## Task 3.2: Wire Hero into homepage; add featured-work and footer-CTA stubs

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from '@/components/hero/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section>
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Recent case studies
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          Three projects with depth. Full list at{' '}
          <Link href="/work">/work</Link>.
        </p>
        <p className="mt-8 text-sm text-text-dim">
          Featured cards land in Phase 4.
        </p>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Have a role or project in mind?
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          I&apos;m open to senior frontend, full-stack, and mobile roles.
        </p>
        <div className="mt-8">
          <Link href="/contact" variant="primary">
            Contact me →
          </Link>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000`. Hero renders with profile image, glow effect, name, role, and CTAs. The two follow-up sections render with placeholders. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): wire hero and section scaffolding into homepage"
```

## Task 3.3: Build the About page

**Files:**
- Modify: `app/about/page.tsx`
- Create: `lib/skills.ts`

- [ ] **Step 1: Create `lib/skills.ts`**

```ts
export const skillGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Java', 'PHP', 'C', 'C++'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'WebSockets'],
  },
  {
    label: 'Mobile',
    items: ['Android (Java)', 'React Native'],
  },
  {
    label: 'Data',
    items: ['MongoDB', 'MySQL', 'SQLite'],
  },
  {
    label: 'Infrastructure',
    items: ['Git', 'Docker', 'NGINX', 'AWS'],
  },
];
```

- [ ] **Step 2: Replace `app/about/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { skillGroups } from '@/lib/skills';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Software engineer at Dhrubok Infotech Services. Backgrounds in Node.js, Next.js, React Native, and Android.',
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
          Software engineer building things that ship.
        </h1>
        <div className="mt-8 max-w-prose space-y-4 text-text-muted">
          <p>
            I&apos;m Rasel — a software engineer based in Dhaka, Bangladesh.
            I currently work at Dhrubok Infotech Services, where I shipped{' '}
            <Link href="/work/sammante">Sammanté</Link>, a multi-tenant SaaS
            for health-insurance providers, between April and July 2025.
          </p>
          <p>
            My day-to-day is mostly Next.js, React, and TypeScript on the web,
            React Native on mobile, and Node on the backend. I also write
            Android apps in Java when the project calls for it.
          </p>
          <p>
            Outside paid work I run a YouTube channel teaching practical
            programming, and I publish notes on this site about things I
            learn while shipping.
          </p>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Skills</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Tools I work with
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <div className="font-mono text-sm uppercase tracking-wider text-text-dim">
                {group.label}
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface/40 px-3 py-1 text-sm text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Education</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Bachelor of Computer Science and Engineering
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          Green University of Bangladesh. Expected graduation 2026.
        </p>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>GitHub</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Recent activity
        </h2>
        <p className="mt-4 text-sm text-text-dim">
          Live GitHub activity strip lands in Phase 6.
        </p>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/about`. Bio reads cleanly, skills render in two-column groups, education and GitHub-stub sections appear. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx lib/skills.ts
git commit -m "feat(about): build About page with bio, skills groups, education"
```

## Task 3.4: Build contact schema and Resend wrapper

**Files:**
- Create: `lib/contact-schema.ts`, `lib/resend.ts`

- [ ] **Step 1: Create `lib/contact-schema.ts`**

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Invalid email').max(200),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  // Honeypot — bots tend to fill this. Real users see no field, so this
  // must be empty.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 2: Create `lib/resend.ts`**

```ts
import { Resend } from 'resend';

let cached: Resend | null = null;

function getClient(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not set');
  }
  cached = new Resend(key);
  return cached;
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  if (!to) {
    throw new Error('CONTACT_TO_EMAIL is not set');
  }

  const client = getClient();
  const subject = `Portfolio contact — ${input.name}`;
  const text = [
    `From: ${input.name} <${input.email}>`,
    '',
    input.message,
  ].join('\n');

  const { error } = await client.emails.send({
    from,
    to,
    replyTo: input.email,
    subject,
    text,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
```

- [ ] **Step 3: Verify type-check**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/contact-schema.ts lib/resend.ts
git commit -m "feat(contact): add Zod schema and Resend wrapper"
```

## Task 3.5: Build a tiny in-memory rate limiter

**Files:**
- Create: `lib/rate-limit.ts`

- [ ] **Step 1: Create file**

```ts
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 5;

export function checkRateLimit(key: string): {
  ok: boolean;
  retryAfterMs: number;
} {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterMs: 0 };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { ok: true, retryAfterMs: 0 };
}
```

- [ ] **Step 2: Sanity-check the limiter (one-shot, throwaway)**

Create `tmp-test.mjs` at repo root and paste:

```js
import { checkRateLimit } from './lib/rate-limit.ts';

const results = [];
for (let i = 0; i < 7; i++) {
  results.push(checkRateLimit('1.2.3.4').ok);
}
console.log(results);
```

Run:

```bash
npx tsx tmp-test.mjs
```

If `tsx` isn't installed: `npm install -D tsx`.

Expected output: `[ true, true, true, true, true, false, false ]`.

- [ ] **Step 3: Delete the throwaway file**

```bash
rm tmp-test.mjs
```

- [ ] **Step 4: Commit**

```bash
git add lib/rate-limit.ts
git commit -m "feat(contact): add in-memory rate limiter (5/min/IP)"
```

## Task 3.6: Build the contact API route

**Files:**
- Create: `app/api/contact/route.ts`
- Delete: `app/api/email/route.ts`

- [ ] **Step 1: Create `app/api/contact/route.ts`**

```ts
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { sendContactEmail } from '@/lib/resend';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  // Honeypot triggered: pretend success, do not send.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });
  } catch (err) {
    console.error('contact send failed', err);
    return NextResponse.json(
      { error: 'Could not send message. Please email me directly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Delete the legacy email route**

```bash
rm app/api/email/route.ts
```

(If the directory `app/api/email/` is now empty, also remove it.)

```bash
rmdir app/api/email 2>/dev/null || true
```

- [ ] **Step 3: Verify type-check and build**

```bash
npm run typecheck && npm run build
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/route.ts
git rm -r app/api/email
git commit -m "feat(contact): add /api/contact route with validation, rate limit, honeypot"
```

## Task 3.7: Build the ContactForm client component

**Files:**
- Create: `components/contact/ContactForm.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';

type FormState =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: 'idle' });
  const [pending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (!res.ok) {
          setState({
            kind: 'error',
            message: body.error ?? 'Something went wrong.',
          });
          return;
        }
        setState({ kind: 'success' });
        form.reset();
      } catch {
        setState({
          kind: 'error',
          message: 'Network error. Please try again.',
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="resize-y rounded-md border border-border bg-surface px-3 py-2 text-text outline-none transition-colors focus:border-accent"
        />
      </div>

      {/* Honeypot — hidden from real users. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? 'Sending…' : 'Send message'}
      </Button>

      {state.kind === 'success' && (
        <p className="text-sm text-accent">Message sent. I&apos;ll reply soon.</p>
      )}
      {state.kind === 'error' && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/contact/ContactForm.tsx
git commit -m "feat(contact): add ContactForm client component"
```

## Task 3.8: Build ContactInfo and assemble Contact page

**Files:**
- Create: `components/contact/ContactInfo.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Create `components/contact/ContactInfo.tsx`**

```tsx
import { site } from '@/lib/site';

const items = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Location', value: 'Dhaka, Bangladesh' },
  { label: 'Phone', value: '+8801836849353', href: 'tel:+8801836849353' },
  {
    label: 'WhatsApp',
    value: 'Send a message',
    href: 'https://wa.me/+8801836849353',
  },
  { label: 'GitHub', value: 'Raselj71', href: site.links.github },
  { label: 'LinkedIn', value: 'rasel221', href: site.links.linkedin },
];

export function ContactInfo() {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
            {item.label}
          </span>
          {item.href ? (
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="text-text hover:text-accent"
            >
              {item.value}
            </a>
          ) : (
            <span className="text-text">{item.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Replace `app/contact/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch about a role, a project, or anything else worth building.',
};

export default function ContactPage() {
  return (
    <Section>
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        Let&apos;s work together.
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">
        Roles, freelance, or just a quick hello — pick a channel below or use
        the form. I usually reply within a day.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_320px]">
        <ContactForm />
        <ContactInfo />
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Fill in the form. Without `RESEND_API_KEY` set, the request will fail with "Could not send message" — that's the expected, correct error path. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env.local` and try again to confirm a real email arrives. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/contact/ContactInfo.tsx app/contact/page.tsx
git commit -m "feat(contact): build Contact page with form and info"
```

## Task 3.9: Delete legacy contact components

**Files:**
- Delete: `app/components/EmailButton.tsx`

- [ ] **Step 1: Confirm nothing imports it**

```bash
grep -r "EmailButton" app components || echo "no references"
```

Expected: `no references`.

- [ ] **Step 2: Delete**

```bash
git rm app/components/EmailButton.tsx
```

- [ ] **Step 3: Build to confirm nothing broke**

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove legacy EmailButton"
```

## Task 3.10: Phase 3 deployment checkpoint

- [ ] **Step 1: Push the branch**

```bash
git push origin redesign
```

- [ ] **Step 2: Set Vercel env vars on the redesign branch preview**

In the Vercel dashboard for this project: Settings → Environment Variables → set for "Preview":
- `RESEND_API_KEY` — from your Resend dashboard
- `CONTACT_TO_EMAIL` — your inbox
- `CONTACT_FROM_EMAIL` — `onboarding@resend.dev` (default; change once you have a verified domain)

Trigger a redeploy.

- [ ] **Step 3: Submit a test message from the preview URL**

Verify the email lands in your inbox.

---

# Phase 4 — Work (case studies + other work)

**Deliverable:** `/work` index lists case studies and other work. Each case study has a dedicated page rendered from MDX. Featured case studies appear on the homepage.

## Task 4.1: Build case-study UI primitives

**Files:**
- Create: `components/case-study/StackPill.tsx`, `components/case-study/CaseStudyCard.tsx`, `components/case-study/OtherWorkRow.tsx`

- [ ] **Step 1: Create `StackPill.tsx`**

```tsx
export function StackPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border-strong bg-surface/40 px-3 py-1 font-mono text-xs text-text-muted">
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Create `CaseStudyCard.tsx`**

```tsx
import Image from 'next/image';
import NextLink from 'next/link';
import { StackPill } from './StackPill';

export type CaseStudySummary = {
  url: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  cover?: string;
};

export function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  return (
    <NextLink
      href={item.url}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
    >
      {item.cover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-hover">
          <Image
            src={item.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-6">
        <div className="font-mono text-xs uppercase tracking-wider text-text-dim">
          {item.period}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-text group-hover:text-accent">
          {item.title}
        </h3>
        <p className="text-text-muted">{item.summary}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {item.stack.slice(0, 6).map((s) => (
            <li key={s}>
              <StackPill>{s}</StackPill>
            </li>
          ))}
        </ul>
      </div>
    </NextLink>
  );
}
```

- [ ] **Step 3: Create `OtherWorkRow.tsx`**

```tsx
import type { OtherWorkEntry } from '@/content/other-work';

export function OtherWorkRow({ item }: { item: OtherWorkEntry }) {
  return (
    <li className="flex flex-col gap-2 border-t border-border py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h4 className="text-base font-medium text-text">{item.title}</h4>
        {item.note && (
          <p className="mt-1 text-sm text-text-dim">{item.note}</p>
        )}
        <p className="mt-1 font-mono text-xs text-text-dim">
          {item.stack.join(' · ')}
        </p>
      </div>
      <div className="flex gap-4 text-sm">
        {item.live && (
          <a
            href={item.live}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Live ↗
          </a>
        )}
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-text"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </li>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/case-study
git commit -m "feat(work): add CaseStudyCard, OtherWorkRow, StackPill primitives"
```

## Task 4.2: Author the four case-study MDX files

**Files:**
- Create: `content/work/sammante.mdx`, `content/work/globemart.mdx`, `content/work/realtime-chat.mdx`, `content/work/task-a-task.mdx`

These are *drafts*. The author will fill in screenshots, polish prose, and confirm any TBD details before launch.

- [ ] **Step 1: Create `content/work/sammante.mdx`**

```mdx
---
slug: sammante
title: Sammanté — Health Insurance SaaS Platform
summary: Multi-tenant SaaS automating onboarding, claims processing, and billing for insurance companies, HR firms, and healthcare partners.
role: Software Engineer @ Dhrubok Infotech Services Ltd
period: Apr 2025 – Jul 2025
stack: [Next.js, TypeScript, AI/OCR, Multi-tenant, WhatsApp API, Email Automation]
cover: /work/sammante/cover.png
links:
  live: https://portal.sammante.sn/auth/sign-in
  github: null
featured: true
order: 1
status: shipped
---

## Problem

Insurance companies, HR firms, and healthcare partners ran their entire customer lifecycle — onboarding, beneficiary management, policy assignment, claims processing, billing reminders — across spreadsheets, email threads, and disconnected tools. Claims took days to validate; payment reminders were manual; white-label customization for new tenants required code changes.

## Role

I shipped end-to-end functionality across the platform: tenant onboarding and white-label customization, the beneficiary-and-policy data model, AI-assisted claims validation, automated billing, and the WhatsApp/email communication layer.

## Technical decisions

<Stack items={["Next.js", "TypeScript", "Multi-tenant data model", "AI/OCR for ID document extraction", "WhatsApp Business API", "Email automation"]} />

- **Multi-tenant architecture.** Each insurance company is a tenant with its own branding (logo, color, font), role configuration, and dashboards. New tenants self-onboard through a wizard with automated welcome and tutorial flows.
- **AI-powered document extraction.** Beneficiary onboarding accepts uploads of ID cards, certificates, and passports; OCR + a structured extraction pass auto-fills the profile, removing the manual transcription step.
- **Claims automation.** Image-based claim documents pass through validation that detects duplicates and flags anomalies. Eligible cases route to an auto-payment workflow; the rest land in a manual review queue with summaries.
- **Billing and reminders.** A real-time dashboard tracks premiums, overdue payments, and renewal alerts. Invoices generate automatically; WhatsApp and email reminders are personalized per tenant.
- **Communication layer.** WhatsApp + email automation handles claim updates, service notifications, and escalation alerts for complex disputes.

## Outcome

<Outcome metric="End-to-end" detail="Customer lifecycle covered from onboarding through claims and billing without spreadsheets in the loop." />
<Outcome metric="Self-serve" detail="New tenants onboard and customize branding without engineering involvement." />
<Outcome metric="Automated" detail="Claims validation and payment reminders run without manual triage on the eligible-case path." />

<Aside>
  Sammanté is a production SaaS — code is private and screenshots will land
  here as the team approves what is publishable.
</Aside>
```

- [ ] **Step 2: Create `content/work/globemart.mdx`**

```mdx
---
slug: globemart
title: GlobeMart — Next.js Ecommerce
summary: Full-stack ecommerce storefront with Stripe checkout, JWT auth, and a Redux-backed cart on top of MongoDB.
role: Solo developer
period: 2024
stack: [Next.js, TypeScript, Redux, MongoDB, Stripe, JWT]
cover: /work/globemart/cover.png
links:
  live: https://globemart.vercel.app/
  github: https://github.com/Raselj71/GlobeMart-Nextjs-ecommerce-project.git
featured: true
order: 2
status: shipped
---

## Problem

Build a complete ecommerce experience end-to-end — product browsing, cart, checkout with real payments, account management — to demonstrate the full Next.js + MongoDB + Stripe stack working together.

## Role

Solo build. Designed the data model, authentication, payment integration, and the storefront UI.

## Technical decisions

<Stack items={["Next.js (App Router)", "TypeScript", "Redux Toolkit", "MongoDB", "Stripe", "JWT auth", "Tailwind CSS"]} />

- **Cart on the client, orders on the server.** Redux Toolkit holds the cart so it survives page navigation; checkout posts to a server route that creates a Stripe session and persists the order to MongoDB.
- **JWT auth.** Tokens are signed server-side and stored as HTTP-only cookies — no localStorage usage, no client-side secrets.
- **Stripe webhooks.** Order status reconciles via webhook from Stripe rather than trusting client-side success redirects.

## Outcome

A working storefront with realistic product browsing, cart persistence, and live test-mode payments running on Vercel.
```

- [ ] **Step 3: Create `content/work/realtime-chat.mdx`**

```mdx
---
slug: realtime-chat
title: Realtime Chat
summary: Multi-room chat with WebSocket-backed delivery, JWT auth, and persistent message history in MongoDB.
role: Solo developer
period: 2024
stack: [Next.js, Socket, JWT, MongoDB, TypeScript]
cover: /work/realtime-chat/cover.png
links:
  live: null
  github: https://github.com/Raselj71/Chat-app-Client.git
featured: true
order: 3
status: shipped
---

## Problem

Learn the full WebSocket lifecycle by building a chat application that handles authentication, multi-room state, and durable message history rather than ephemeral demo messaging.

## Role

Solo build, both client and server. Wrote the WebSocket protocol, authentication handshake, and persistence layer.

## Technical decisions

<Stack items={["Next.js", "Socket.IO", "JWT", "MongoDB", "TypeScript"]} />

- **Auth before subscription.** Sockets must complete a JWT handshake before joining any room — the server validates the token at connection time and rejects unauthenticated upgrades.
- **Room state on the server.** Rooms are first-class entities in MongoDB; clients query history on join rather than replaying socket events from scratch.
- **Optimistic UI.** Messages render locally on send and reconcile with the server-issued ID, so the chat feels instant on slow connections.

## Outcome

End-to-end chat with login, multi-room, persistent history, and reconnection handling.
```

- [ ] **Step 4: Create `content/work/task-a-task.mdx`**

```mdx
---
slug: task-a-task
title: Task a Task — Mobile Task Manager
summary: React Native task manager focused on quick capture and clean daily review.
role: Solo developer
period: 2025
stack: [React Native, TypeScript]
cover: /work/task-a-task/cover.png
links:
  live: null
  github: null
featured: true
order: 4
status: shipped
---

## Problem

A task app that gets out of the way: quick capture, light visual hierarchy, no setup screens. Optimized for the daily-review-and-plan loop rather than power-user features.

## Role

Solo build on React Native.

## Technical decisions

<Stack items={["React Native", "TypeScript"]} />

- **Single-purpose screens.** Capture, today, and review are separate flows rather than nested tabs in one giant screen.
- **Local-first.** Tasks live on-device by default; sync is optional and additive rather than the core loop.

## Outcome

Daily-driver task app for personal use; informed the prioritization patterns I now apply to other product work.

<Aside>
  Live store link and screenshots to be added by the author.
</Aside>
```

- [ ] **Step 5: Run velite to confirm content compiles**

```bash
npx velite
```

Expected output mentions `Generated 4 case studies, 0 posts` (or similar). If a schema error fires, reread the case-study section of `velite.config.ts` and fix the offending frontmatter.

- [ ] **Step 6: Commit**

```bash
git add content/work
git commit -m "content(work): add Sammanté, GlobeMart, Realtime Chat, Task a Task case studies"
```

## Task 4.3: Build the `/work` index page

**Files:**
- Modify: `app/work/page.tsx`

- [ ] **Step 1: Replace the file**

```tsx
import type { Metadata } from 'next';
import { caseStudies } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import { OtherWorkRow } from '@/components/case-study/OtherWorkRow';
import { otherWork } from '@/content/other-work';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected case studies and other shipped work — web, mobile, and backend.',
};

export default function WorkPage() {
  const sorted = [...caseStudies]
    .filter((c) => c.status !== 'archived')
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Section>
        <Eyebrow>Work</Eyebrow>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
          Things I&apos;ve shipped.
        </h1>
        <p className="mt-4 max-w-prose text-text-muted">
          Four projects with full case studies, plus a list of smaller work.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sorted.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Other work</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Smaller projects
        </h2>
        <ul className="mt-8">
          {otherWork.map((item) => (
            <OtherWorkRow key={item.title} item={item} />
          ))}
        </ul>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Confirm Velite output exists and the import resolves**

```bash
npx velite && npm run typecheck
```

Expected: `.velite/index.js` and `.velite/index.d.ts` are generated; type-check passes. The path alias `@/*` from `tsconfig.json` resolves `@/.velite` to `<repo>/.velite/index`.

- [ ] **Step 3: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/work`. Four case-study cards render in a 2-column grid; the "Other work" list shows the 6 entries from `other-work.ts`. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/work/page.tsx
git commit -m "feat(work): build /work index with case studies and other work"
```

## Task 4.4: Build the `/work/[slug]` template

**Files:**
- Create: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { StackPill } from '@/components/case-study/StackPill';
import { MDX } from '@/lib/mdx-components';

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const item = caseStudies.find((c) => c.slug === params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: item.cover ? [{ url: item.cover }] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const item = caseStudies.find((c) => c.slug === params.slug);
  if (!item) notFound();

  return (
    <Section>
      <Eyebrow>{item.period}</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        {item.title}
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">{item.summary}</p>

      <div className="mt-6 flex flex-col gap-3 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-text-muted">
          <span className="font-mono uppercase tracking-wider text-text-dim">
            Role
          </span>
          <span className="ml-3">{item.role}</span>
        </div>
        <div className="flex gap-3 text-sm">
          {item.links?.live && (
            <Link href={item.links.live} target="_blank" variant="ghost">
              Live ↗
            </Link>
          )}
          {item.links?.github && (
            <Link href={item.links.github} target="_blank" variant="ghost">
              GitHub ↗
            </Link>
          )}
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((s) => (
          <li key={s}>
            <StackPill>{s}</StackPill>
          </li>
        ))}
      </ul>

      <article className="prose-portfolio mt-12 max-w-3xl">
        <MDX code={item.body} />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/work">← All work</Link>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/work/sammante`. Title, period, role, stack pills, MDX body all render. Repeat for `/work/globemart`, `/work/realtime-chat`, `/work/task-a-task`. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/work/[slug]
git commit -m "feat(work): add /work/[slug] case study template"
```

## Task 4.5: Wire featured case studies into the homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { caseStudies } from '@/.velite';
import { Hero } from '@/components/hero/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';

export default function HomePage() {
  const featured = caseStudies
    .filter((c) => c.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <>
      <Hero />

      <Section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Recent case studies
            </h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex">
            See all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/work">See all work →</Link>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Have a role or project in mind?
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          I&apos;m open to senior frontend, full-stack, and mobile roles.
        </p>
        <div className="mt-8">
          <Link href="/contact" variant="primary">
            Contact me →
          </Link>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000`. Three featured case-study cards render below the hero. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): list featured case studies on the homepage"
```

## Task 4.6: Delete legacy work components

**Files:**
- Delete: `app/components/Card.tsx`, `app/components/Iconelement.tsx`, `app/components/ServiceCard.tsx`

- [ ] **Step 1: Confirm no references**

```bash
grep -r "from \"@/app/components/Card\"\|from \"@/app/components/Iconelement\"\|from \"@/app/components/ServiceCard\"" app components || echo "no references"
grep -r "from \"./components/Card\"\|from \"./components/Iconelement\"\|from \"./components/ServiceCard\"" app || echo "no references"
```

Expected: `no references`.

- [ ] **Step 2: Delete files**

```bash
git rm app/components/Card.tsx app/components/Iconelement.tsx app/components/ServiceCard.tsx
```

- [ ] **Step 3: Build to confirm**

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove legacy Card, Iconelement, ServiceCard"
```

---

# Phase 5 — Blog

**Deliverable:** `/blog` index lists posts; `/blog/[slug]` renders MDX posts; an RSS feed is available at `/rss.xml`. The blog handles the empty state gracefully.

## Task 5.1: Build blog UI primitives

**Files:**
- Create: `components/blog/PostMeta.tsx`, `components/blog/PostCard.tsx`

- [ ] **Step 1: Create `PostMeta.tsx`**

```tsx
export function PostMeta({
  date,
  readingTime,
}: {
  date: string;
  readingTime?: string;
}) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="font-mono text-xs uppercase tracking-wider text-text-dim">
      <time dateTime={date}>{formatted}</time>
      {readingTime && <span className="ml-3">· {readingTime}</span>}
    </div>
  );
}
```

- [ ] **Step 2: Create `PostCard.tsx`**

```tsx
import NextLink from 'next/link';
import { PostMeta } from './PostMeta';

export type PostSummary = {
  url: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: string;
};

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <NextLink
      href={post.url}
      className="group block border-b border-border py-8 transition-colors first:border-t hover:bg-surface/30"
    >
      <PostMeta date={post.date} readingTime={post.readingTime} />
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 max-w-prose text-text-muted">{post.summary}</p>
    </NextLink>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/blog
git commit -m "feat(blog): add PostCard and PostMeta primitives"
```

## Task 5.2: Build the `/blog` index

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Replace `app/blog/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { posts } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PostCard } from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on the things I learn while shipping.',
};

export default function BlogPage() {
  const visible = posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Section>
      <Eyebrow>Writing</Eyebrow>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        Notes on building things.
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">
        Short pieces on what I learn from shipping at work and on the side.
      </p>

      <div className="mt-12">
        {visible.length === 0 ? (
          <div className="rounded-md border border-border bg-surface/40 p-8 text-text-muted">
            <p>Writing soon. The first post will land here.</p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {visible.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/blog`. Empty-state placeholder renders. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat(blog): build /blog index with empty-state handling"
```

## Task 5.3: Build the `/blog/[slug]` template

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Link } from '@/components/ui/Link';
import { PostMeta } from '@/components/blog/PostMeta';
import { MDX } from '@/lib/mdx-components';

type Params = { slug: string };

export function generateStaticParams() {
  return posts.filter((p) => !p.draft).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post || post.draft) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function PostPage({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post || post.draft) notFound();

  return (
    <Section>
      <PostMeta date={post.date} readingTime={post.readingTime} />
      <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">{post.summary}</p>

      <article className="mt-12 max-w-3xl">
        <MDX code={post.body} />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/blog">← All posts</Link>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify build (with no posts present yet)**

```bash
npm run build
```

Expected: build passes; `generateStaticParams` returns an empty array, so the route exists but no static pages are pre-rendered.

- [ ] **Step 3: Commit**

```bash
git add app/blog/[slug]
git commit -m "feat(blog): add /blog/[slug] template"
```

## Task 5.4: Add an RSS feed

**Files:**
- Create: `app/rss.xml/route.ts`

- [ ] **Step 1: Create file**

```ts
import { posts } from '@/.velite';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const visible = posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = visible
    .map((post) => {
      const url = `${site.url}${post.url}`;
      const pubDate = new Date(post.date).toUTCString();
      return [
        '    <item>',
        `      <title><![CDATA[${post.title}]]></title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description><![CDATA[${post.summary}]]></description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
```

- [ ] **Step 2: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/rss.xml`. Empty `<channel>` (no posts yet) but valid XML structure. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/rss.xml/route.ts
git commit -m "feat(blog): add /rss.xml feed"
```

---

# Phase 6 — GitHub activity strip

**Deliverable:** The About page shows a 52-week contribution graph and 3 most-recently-pushed repos, fetched server-side and cached for 6 hours. Failure modes degrade gracefully.

## Task 6.1: Build the GitHub fetcher

**Files:**
- Create: `lib/github.ts`

- [ ] **Step 1: Create file**

```ts
import { site } from './site';

const SIX_HOURS = 6 * 60 * 60;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              color: string;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export type ContributionDay = {
  date: string;
  count: number;
};

export type ContributionWeek = ContributionDay[];

export type RecentRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  stars: number;
};

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions(): Promise<{
  weeks: ContributionWeek[];
  total: number;
} | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    // The GraphQL endpoint requires a token. Without one, we can't render
    // the contribution graph; degrade to null and let the page hide it.
    return null;
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'rasel-portfolio',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { login: site.github.username },
      }),
      next: { revalidate: SIX_HOURS },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLResponse;
    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
        })),
      ),
    };
  } catch {
    return null;
  }
}

export async function fetchRecentRepos(): Promise<RecentRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'rasel-portfolio',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github.username}/repos?sort=pushed&per_page=6&type=owner`,
      {
        headers,
        next: { revalidate: SIX_HOURS },
      },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      pushed_at: string;
      stargazers_count: number;
      fork: boolean;
      archived: boolean;
    }>;
    return data
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        pushedAt: r.pushed_at,
        stars: r.stargazers_count,
      }));
  } catch {
    return [];
  }
}
```

- [ ] **Step 2: Verify type-check**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add lib/github.ts
git commit -m "feat(about): add GitHub fetcher with 6h cache and graceful degradation"
```

## Task 6.2: Build the ContributionGraph component

**Files:**
- Create: `components/github/ContributionGraph.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { ContributionWeek } from '@/lib/github';

const CELL = 11;
const GAP = 3;

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

const FILL = [
  'rgba(255,255,255,0.04)',
  'rgba(56,189,248,0.25)',
  'rgba(56,189,248,0.5)',
  'rgba(56,189,248,0.75)',
  'rgba(56,189,248,1)',
];

export function ContributionGraph({
  weeks,
  total,
}: {
  weeks: ContributionWeek[];
  total: number;
}) {
  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  return (
    <div className="overflow-x-auto">
      <div className="text-sm text-text-muted">
        <span className="font-mono text-text">{total.toLocaleString()}</span>{' '}
        contributions in the last year
      </div>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`GitHub contribution graph: ${total} contributions in the last year`}
        className="mt-3"
      >
        {weeks.map((week, x) =>
          week.map((day, y) => (
            <rect
              key={`${x}-${y}`}
              x={x * (CELL + GAP)}
              y={y * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx={2}
              fill={FILL[levelFor(day.count)]}
            >
              <title>
                {day.date}: {day.count} contributions
              </title>
            </rect>
          )),
        )}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/github/ContributionGraph.tsx
git commit -m "feat(about): add ContributionGraph SVG component"
```

## Task 6.3: Build the RecentRepos component

**Files:**
- Create: `components/github/RecentRepos.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { RecentRepo } from '@/lib/github';

function relativeDate(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

export function RecentRepos({ repos }: { repos: RecentRepo[] }) {
  if (repos.length === 0) return null;
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-3">
      {repos.map((repo) => (
        <li key={repo.name}>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="block h-full rounded-md border border-border bg-surface/40 p-4 transition-colors hover:border-border-strong"
          >
            <div className="font-mono text-sm text-text">{repo.name}</div>
            {repo.description && (
              <p className="mt-2 text-sm text-text-muted">
                {repo.description}
              </p>
            )}
            <div className="mt-3 flex gap-4 text-xs text-text-dim">
              {repo.language && <span>{repo.language}</span>}
              <span>Pushed {relativeDate(repo.pushedAt)}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/github/RecentRepos.tsx
git commit -m "feat(about): add RecentRepos card list"
```

## Task 6.4: Wire GitHub strip into the About page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace the GitHub `Section` block in `app/about/page.tsx`**

Find this block:

```tsx
      <Section className="border-t border-border">
        <Eyebrow>GitHub</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Recent activity
        </h2>
        <p className="mt-4 text-sm text-text-dim">
          Live GitHub activity strip lands in Phase 6.
        </p>
      </Section>
```

Replace it with:

```tsx
      <GitHubSection />
```

Then add this component definition at the bottom of the file:

```tsx
async function GitHubSection() {
  const [contributions, repos] = await Promise.all([
    fetchContributions(),
    fetchRecentRepos(),
  ]);
  if (!contributions && repos.length === 0) return null;
  return (
    <Section className="border-t border-border">
      <Eyebrow>GitHub</Eyebrow>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight">
        Recent activity
      </h2>
      {contributions && (
        <div className="mt-8">
          <ContributionGraph
            weeks={contributions.weeks}
            total={contributions.total}
          />
        </div>
      )}
      {repos.length > 0 && <RecentRepos repos={repos} />}
    </Section>
  );
}
```

Add these imports at the top of the file:

```tsx
import { fetchContributions, fetchRecentRepos } from '@/lib/github';
import { ContributionGraph } from '@/components/github/ContributionGraph';
import { RecentRepos } from '@/components/github/RecentRepos';
```

- [ ] **Step 2: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000/about`. With `GITHUB_TOKEN` set in `.env.local` (PAT with `read:user` scope), the contribution graph renders. Without the token, the contribution graph is hidden but the recent-repos list still renders (the public REST endpoint doesn't require auth). Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat(about): wire ContributionGraph and RecentRepos into About page"
```

---

# Phase 7 — SEO, sitemap, OG, analytics polish

**Deliverable:** Every route has accurate metadata, the sitemap includes case studies and posts, robots.txt allows indexing, an OG image renders, and Vercel Analytics is verified live.

## Task 7.1: Update the sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Replace the file**

```ts
import type { MetadataRoute } from 'next';
import { caseStudies, posts } from '@/.velite';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((c) => c.status !== 'archived')
    .map((c) => ({
      url: `${site.url}${c.url}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${site.url}${p.url}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly',
      priority: 0.75,
    }));

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): rebuild sitemap from velite content + static routes"
```

## Task 7.2: Add `robots.ts`

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create file**

```ts
import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add app/robots.ts
git commit -m "feat(seo): add robots.ts"
```

## Task 7.3: Add a default OG image

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create file**

```tsx
import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'edge';
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(56,189,248,0.18) 0%, transparent 70%), #0a0a0a',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#38bdf8', letterSpacing: 4 }}>
          SOFTWARE ENGINEER
        </div>
        <div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 16, fontSize: 32, color: '#a1a1aa' }}>
            {site.description}
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#71717a', fontFamily: 'monospace' }}>
          {site.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Smoke check**

```bash
npm run build && npm run start
```

In a separate terminal: `curl -I http://localhost:3000/opengraph-image` — content-type should be `image/png`. Open the URL in a browser to verify the rendered image. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat(seo): add default OG image"
```

## Task 7.4: Per-route metadata audit

**Files:**
- Verify (no changes if already correct): `app/page.tsx`, `app/about/page.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/contact/page.tsx`

- [ ] **Step 1: Confirm each route exports `metadata` or `generateMetadata`**

```bash
grep -L "metadata\|generateMetadata" app/page.tsx app/about/page.tsx app/work/page.tsx app/work/[slug]/page.tsx app/blog/page.tsx app/blog/[slug]/page.tsx app/contact/page.tsx
```

Expected: empty output. If any path is listed, it lacks metadata — add a `metadata` export modeled on Task 3.3 step 2.

- [ ] **Step 2: Add `metadata` to homepage if missing**

`app/page.tsx` does not currently export metadata; defaults from `defaultMetadata` apply. That's fine for the homepage. Skip this step unless the homepage explicitly needs a different title.

- [ ] **Step 3: No commit needed if no files changed**

Otherwise:

```bash
git add app/...
git commit -m "feat(seo): audit per-route metadata"
```

## Task 7.5: Motion — page fade and card scroll-reveal

The spec calls for subtle motion: 200ms page fades, one-shot scroll-reveal on cards, and one showpiece on the hero. We use framer-motion (already installed in Task 1.3).

**Files:**
- Create: `components/motion/PageTransition.tsx`, `components/motion/Reveal.tsx`
- Modify: `app/layout.tsx`, `components/case-study/CaseStudyCard.tsx`, `components/blog/PostCard.tsx`, `components/hero/Hero.tsx`

- [ ] **Step 1: Create `components/motion/PageTransition.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/motion/Reveal.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Wrap `<main>` content with `PageTransition`**

In `app/layout.tsx`, replace:

```tsx
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
```

with:

```tsx
        <main className="min-h-[calc(100vh-4rem)]">
          <PageTransition>{children}</PageTransition>
        </main>
```

Add the import at the top:

```tsx
import { PageTransition } from '@/components/motion/PageTransition';
```

- [ ] **Step 4: Wrap CaseStudyCard with `Reveal`**

In `components/case-study/CaseStudyCard.tsx`, wrap the entire returned `<NextLink>` in a `<Reveal>`:

```tsx
import { Reveal } from '@/components/motion/Reveal';
// ...
return (
  <Reveal>
    <NextLink href={item.url} ...>
      {/* unchanged content */}
    </NextLink>
  </Reveal>
);
```

- [ ] **Step 5: Wrap PostCard with `Reveal`**

Same treatment in `components/blog/PostCard.tsx`.

- [ ] **Step 6: Add a hero text reveal**

In `components/hero/Hero.tsx`, replace the `<h1>` block with a framer-motion variant:

```tsx
import { motion } from 'framer-motion';
// at the import block
```

Then change the headline to:

```tsx
<motion.h1
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
  className="mt-4 text-balance text-4xl font-semibold tracking-tighter text-text md:text-6xl lg:text-7xl"
>
  Building modern web and mobile products.
</motion.h1>
```

The component is a server component today; using `motion.h1` requires a client boundary. Two options:

1. Add `'use client'` at the top of `Hero.tsx`.
2. Extract just the headline into a small client component.

Option 2 is cleaner. Create `components/hero/HeroHeadline.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

export function HeroHeadline({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="mt-4 text-balance text-4xl font-semibold tracking-tighter text-text md:text-6xl lg:text-7xl"
    >
      {children}
    </motion.h1>
  );
}
```

In `Hero.tsx`, import `HeroHeadline` and use it in place of the `<h1>`:

```tsx
import { HeroHeadline } from './HeroHeadline';
// ...
<HeroHeadline>Building modern web and mobile products.</HeroHeadline>
```

- [ ] **Step 7: Smoke check**

```bash
npm run dev
```

Open `http://localhost:3000`. The hero headline fades in. Navigate between pages — fades feel snappy, not laggy. Scroll on `/work` — case-study cards fade in once as they enter the viewport. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add components/motion components/hero/HeroHeadline.tsx app/layout.tsx components/hero/Hero.tsx components/case-study/CaseStudyCard.tsx components/blog/PostCard.tsx
git commit -m "feat(motion): add page fade, scroll-reveal on cards, hero headline reveal"
```

## Task 7.6: Vercel Analytics verification

**Files:** none

- [ ] **Step 1: Confirm `<Analytics />` is in `app/layout.tsx`**

(Already wired in Task 1.14.)

- [ ] **Step 2: Push and verify on preview**

```bash
git push origin redesign
```

Wait for the Vercel deployment to finish. In the Vercel dashboard, open Analytics → confirm events are landing on the preview URL after you visit a few pages.

If no events appear after 5 minutes, check that the project has Analytics enabled (Settings → Analytics → Enable).

---

# Phase 8 — Cleanup and cutover

**Deliverable:** All legacy files are gone; the redesign branch builds, type-checks, lints clean; preview deployment is verified end-to-end; merge to `master` promotes the redesign to production.

## Task 8.1: Delete legacy `app/components/` directory

**Files:**
- Delete: `app/components/Navbar.tsx`, `app/components/Footer.tsx`, and any remaining files in `app/components/`

- [ ] **Step 1: List remaining legacy files**

```bash
ls app/components 2>/dev/null
```

If files exist:

- [ ] **Step 2: Confirm no references**

```bash
grep -r "@/app/components\|./components/Navbar\|./components/Footer" app components || echo "no references"
```

Expected: `no references`.

- [ ] **Step 3: Delete the directory**

```bash
git rm -r app/components
```

- [ ] **Step 4: Build to confirm**

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: remove legacy app/components/ directory"
```

## Task 8.2: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the file**

```markdown
# Rasel Ahmed — Personal Portfolio

Personal portfolio site at `<vercel-deployment-url>` (custom domain TBD).

## Stack

- Next.js 14 (App Router) on Vercel
- TypeScript, Tailwind CSS, Geist fonts
- Velite for MDX-based case studies and blog posts
- Resend for the contact form
- Vercel Analytics

## Local development

```bash
npm install
npm run dev
```

Local development falls back to `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is unset. Set the env vars listed in `.env.local.example` to test the contact form and GitHub strip locally.

## Authoring content

- Case studies: `content/work/<slug>.mdx`
- Blog posts: `content/blog/<slug>.mdx`
- "Other work" list: `content/other-work.ts`

Velite watches the directory in dev. After editing frontmatter, the page hot-reloads.

## Scripts

- `npm run dev` — Velite watcher + Next dev server
- `npm run build` — Velite build + Next build
- `npm run start` — Next production server
- `npm run lint` — ESLint
- `npm run typecheck` — Velite + `tsc --noEmit`
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for the redesigned site"
```

## Task 8.3: Final whole-site verification

**Files:** none

- [ ] **Step 1: Type-check, lint, build**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: all three pass with no errors. Warnings are tolerable; errors block.

- [ ] **Step 2: Run dev server, click every route**

```bash
npm run dev
```

Visit each in a browser:
- `http://localhost:3000/`
- `http://localhost:3000/work`
- `http://localhost:3000/work/sammante`
- `http://localhost:3000/work/globemart`
- `http://localhost:3000/work/realtime-chat`
- `http://localhost:3000/work/task-a-task`
- `http://localhost:3000/blog`
- `http://localhost:3000/about`
- `http://localhost:3000/contact`
- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/rss.xml`
- `http://localhost:3000/robots.txt`
- `http://localhost:3000/opengraph-image`

Each route renders without errors in the browser console or the dev-server log. Stop the server.

- [ ] **Step 3: Submit a test contact form**

With `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` set in `.env.local`, fill the form on `/contact`. Verify the email arrives. Submit a second form within a minute to verify the success path is repeatable; submit four more in quick succession to verify the rate-limiter triggers a 429 on the sixth.

## Task 8.4: Set production env vars in Vercel

**Files:** none

- [ ] **Step 1: In the Vercel dashboard, set Production env vars**

Settings → Environment Variables → Production:
- `NEXT_PUBLIC_SITE_URL` — the Vercel-assigned production URL (e.g. `https://rasel-portfolio.vercel.app`)
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `GITHUB_TOKEN` — optional; only set if rate limits become a problem

## Task 8.5: Merge to master

**Files:** none

- [ ] **Step 1: Final preview verification**

Push the latest commits and open the preview URL in the Vercel dashboard. Click through every route — same checklist as Task 8.3 step 2. Submit a contact form and confirm the email lands.

```bash
git push origin redesign
```

- [ ] **Step 2: Merge `redesign` into `master`**

```bash
git checkout master
git merge --squash redesign
git commit -m "feat: portfolio redesign — full rebuild

Replaces the static-export site with an SSR Next.js app on Vercel.
Adds case-study pages, blog scaffold, GitHub activity strip, and a
working contact form via Resend.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin master
```

- [ ] **Step 3: Verify production deployment**

Vercel auto-builds `master`. Once green, click through every route on the production URL. Submit a contact form. Done.

- [ ] **Step 4: (Optional) Delete the redesign branch**

```bash
git branch -d redesign
git push origin --delete redesign
```

---

# Self-review notes (for the implementer)

The plan covers every section of the spec. Quick spec-coverage map:

- **Goal / audience priorities** → Hero (Task 3.1), homepage funnel (Task 4.5), case studies (Phase 4), GitHub strip (Phase 6), contact (Phase 3).
- **Hosting / deployment** → Phase 1 (drop static export), Phase 1 deployment checkpoint (Task 1.16), Phase 8 cutover.
- **Visual system** → Tailwind tokens (Task 1.4), globals.css (1.5), fonts (1.6), UI primitives (1.9–1.11), nav/footer (1.12–1.13). Motion: page fade + card reveal + hero showpiece (Task 7.5).
- **Information architecture** → Task 1.15 stubs every route; later phases fill them in.
- **Project curation** → MDX content in Task 4.2, other-work list in Task 2.3.
- **Content model (Velite, MDX components, GitHub fetch, resume)** → Phase 2, plus `lib/github.ts` (Task 6.1).
- **Component architecture / boundaries / deletions** → Tasks 1.12, 1.13, 3.9, 4.6, 8.1.
- **Contact form (Resend, Zod, honeypot, rate limit)** → Tasks 3.4, 3.5, 3.6, 3.7, 3.8.
- **Env vars** → Task 1.8.
- **SEO / sitemap / robots / RSS / OG / analytics** → Phase 5 (RSS), Phase 7 (rest).
- **Phasing & deployment checkpoints** → Tasks 1.16, 3.10, 8.5.
- **Out-of-scope items** → never implemented anywhere; intentional.

No placeholders or TBDs remain in the plan itself. The only TBDs are documented author follow-ups in the case-study MDX (screenshots, Doc Reader stack, Task a Task store link) — these are *content* unknowns, not plan unknowns, and the spec calls them out explicitly.
