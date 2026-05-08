# Portfolio Redesign — Design Spec

**Date:** 2026-05-08
**Status:** Approved, ready for implementation plan
**Owner:** Rasel Ahmed

## Goal

Rebuild the existing personal portfolio (`D:\my-portfolio`) into a modern, professional site optimized for **recruiters and hiring managers**. The current site has visual issues, a broken contact form (static export + API route conflict), and stale projects. The redesign produces a Next.js 14 site deployed on Vercel with case studies, a blog, a live GitHub activity strip, and a working contact form.

## Audience and priorities

Primary audience is recruiters and hiring managers reviewing the site for a software engineering role. Design priorities, in order:

1. Skim-friendly hero — role, location, employer, one-line value prop, resume CTA visible above the fold.
2. Projects shown with depth and outcomes (case studies) rather than a logo wall of skills.
3. Frictionless contact — a working form plus direct email/LinkedIn.
4. Live signals of activity — GitHub strip, recent blog posts.
5. Visual polish that signals attention to detail without becoming the story.

## Scope

**In scope (v1):**

- Full visual rebuild on the existing repo.
- Information-architecture restructure: drop `/services`, add `/blog`, add `/work/[slug]` case studies.
- Four case-study pages with MDX content: Sammanté, GlobeMart, Realtime Chat, Task a Task.
- Compact "other work" list for remaining projects.
- Working contact form via Resend.
- GitHub activity strip on `/about`.
- Blog scaffolded with empty-state placeholder; one or more posts optional at launch.
- Hosting on Vercel with preview deployments per branch.
- SEO basics: per-route metadata, sitemap, RSS, OG images.
- Vercel Analytics.

**Out of scope (v1):**

- Light mode toggle. Dark only.
- Testimonials section.
- CMS. MDX in the repo is the authoring path.
- Internationalization.
- Newsletter signup, comments, view counters, auth.
- Test suite (Jest, Playwright). Type-check, lint, and successful build are the contract.
- Redirects from old paths. URL structure stays compatible; `/services` is removed and has no SEO equity to preserve.

## Hosting and deployment

- **Target:** Vercel. `master` branch is production; PR branches get preview deployments.
- **Domain:** No custom domain owned at the time of this spec. Production URL defaults to whatever Vercel assigns (e.g. `rasel-portfolio.vercel.app`). The site uses a `NEXT_PUBLIC_SITE_URL` env var so the sitemap, RSS feed, and OG metadata pick up the public URL. When a domain is purchased later, it is a one-line env change in the Vercel project, no code edits.
- **Next.js config:** `output: "export"` is removed. The custom `my-loader.ts` (Cloudinary loader) is removed. The custom `server.js` is removed. Vercel runs Next.js natively.
- **Branch strategy:** Work happens on a `redesign` branch off `master`. The current broken `master` keeps serving until v1 is shippable end-to-end, then squash-merge.

## Visual system

### Color (dark only)

- Background: `#0a0a0a` (page)
- Surface: `#0f0f12` (cards, elevated), `#16161a` (hover)
- Text: `#fafafa` primary, `#a1a1aa` secondary, `#71717a` tertiary, `#52525b` quaternary
- Border: `rgba(255,255,255,0.06)` default, `rgba(255,255,255,0.12)` hover/focus
- Accent: `#38bdf8` (sky-400) — links, primary CTA, focus rings
- One accent only. Subtle radial-gradient glow reserved for the hero backdrop.

### Type

- Display + UI: **Geist Sans** (`next/font/google`), with Inter as fallback.
- Mono: **Geist Mono** for code, tech-stack pills, file paths, timestamps.
- Tight letter-spacing on headlines: `-0.025em` to `-0.04em`.
- No serif. Single type family across the site.

### Spacing and layout

- 8px base unit.
- Container max-width `1200px`. Horizontal padding `px-6` mobile, `px-8` desktop.
- Section vertical rhythm: `py-24` desktop, `py-16` mobile.
- Headline → body: `mt-4`. Section → section: `mt-32`.

### Motion

- Subtle. 200ms fade page transitions; 150ms hover (translate + border lighten); one-shot scroll-reveal on cards via intersection observer (no looping animations).
- One showpiece allowed on the homepage hero (e.g., text reveal).
- `framer-motion` for orchestration.

## Information architecture

```
/                       Home: hero, featured case studies (3), other work strip,
                        recent blog (3), footer CTA
/work                   Index of all case studies + other work
/work/sammante          Case study (flagship)
/work/globemart         Case study
/work/realtime-chat     Case study
/work/task-a-task       Case study
/blog                   Blog index, sorted by date
/blog/[slug]            Blog post (MDX)
/about                  Bio, education, full skills, GitHub activity strip,
                        resume download
/contact                Contact form + direct contact info
/api/contact            POST handler, sends email via Resend
/sitemap.xml            Generated
/robots.txt             Generated
/rss.xml                Blog feed
```

The homepage is a funnel: hero → top three case studies → "see all work" link → blog teaser → contact CTA. `/work` is the canonical project list; case studies render as rich cards, "other work" renders as a compact striped list. Each case-study page follows a consistent template: cover, problem, role, technical decisions, outcomes/learnings, stack pills, links. `/about` carries the long-form bio. The skills section moves from a logo wall to a typed list grouped by category — recruiters skim text faster.

## Project curation

**Case studies (4 full pages):**

| Slug | Title | Stack | Notes |
|---|---|---|---|
| `sammante` | Sammanté — Health Insurance SaaS | Next.js, TS, AI/OCR, Multi-tenant, WhatsApp API | Flagship. Live: `https://portal.sammante.sn/auth/sign-in`. Apr–Jul 2025 at Dhrubok Infotech. No public GitHub (NDA). Screenshots TBD by author after confirming what is publishable. |
| `globemart` | GlobeMart — Next.js Ecommerce | Next.js, Redux, MongoDB, Stripe, JWT | Existing repo and live URL. |
| `realtime-chat` | Realtime Chat | Next.js, Socket, JWT, MongoDB | Existing repo. No live URL. |
| `task-a-task` | Task a Task — Mobile Task Manager | React Native | Mobile app. Live/store link TBD. |

**Other work (compact list, name + stack + link, no per-page narrative):**

- All Document Reader (Android, evolution of PDF Reader) — stack details TBD by author
- Foodi (React + Tailwind landing page)
- REST API (Node.js + Express + MySQL)
- EMI Calc (Android, Java, SQLite)
- Job Board (PHP, MySQL)
- This portfolio (meta entry)

**Dropped:** Java Swing Ecommerce. Old desktop tech, no recruiter signal.

## Content model

### Case studies

MDX files at `content/work/*.mdx` with Zod-validated frontmatter:

```yaml
---
slug: sammante
title: Sammanté — Health Insurance SaaS Platform
summary: Multi-tenant SaaS automating onboarding, claims, and payments for insurance companies.
role: Software Engineer @ Dhrubok Infotech Services
period: Apr 2025 – Jul 2025
stack: [Next.js, TypeScript, AI/OCR, Multi-tenant, WhatsApp API]
cover: /work/sammante/cover.png
links:
  live: https://portal.sammante.sn/auth/sign-in
  github: null
featured: true
order: 1
status: shipped       # shipped | in-progress | archived
---
```

Custom MDX components available in case-study bodies: `<Stack>`, `<Outcome>`, `<Screenshot>`, `<Aside>`. Defined once in `lib/mdx-components.tsx`.

### Blog posts

MDX files at `content/blog/*.mdx`. Frontmatter: `title`, `date`, `summary`, `tags`, `draft`. Reading time computed at build. Drafts excluded from production builds. Blog ships with the routes wired up and an empty-state placeholder ("writing soon") if no real posts are ready at launch.

### Other work

Flat array in `content/other-work.ts`:

```ts
export const otherWork = [
  { title: 'All Document Reader', stack: ['Android', 'TBD'], year: 2024,
    github: null, live: null },
  // ...
]
```

### MDX tooling

**Velite** (chosen). Lightweight, fast, type-safe frontmatter via Zod, generates a typed JSON output consumed by pages. Alternative considered: bare `next-mdx-remote` (more code, zero deps); Contentlayer (unmaintained).

### GitHub activity

Server-side fetch in a Server Component on `/about`:

- `https://api.github.com/users/Raselj71/events/public`
- `https://api.github.com/users/Raselj71/repos?sort=updated`
- Cache via `next: { revalidate: 21600 }` (6 hours).
- Render: contribution-graph-style 52-week SVG strip + 3 most recently pushed repos (primary language, last push date).
- Unauthenticated by default. Add `GITHUB_TOKEN` only if rate limits become a problem.
- Failure mode: hide the strip, don't error the page.

### Resume

Stays as `/public/resume.pdf`. Linked from hero CTA, About page CTA, and `<head>`. No in-browser PDF viewer.

## Component architecture

```
app/
  layout.tsx                  Root: fonts, theme, nav, footer
  page.tsx                    Homepage
  work/
    page.tsx                  Index of case studies + other work
    [slug]/page.tsx           Renders MDX case study
  blog/
    page.tsx                  Index
    [slug]/page.tsx           Renders MDX post
  about/page.tsx
  contact/page.tsx
  api/contact/route.ts        POST, Resend
  sitemap.ts
  robots.ts
  rss.xml/route.ts

components/
  layout/                     Nav, Footer, Container
  hero/                       Hero, GlowBackdrop
  case-study/                 CaseStudyCard, OtherWorkRow, StackPill,
                              Outcome, Screenshot, Aside
  blog/                       PostCard, PostMeta
  github/                     ContributionGraph, RecentRepos
  contact/                    ContactForm (client), ContactInfo
  ui/                         Button, Link, Section, Eyebrow

content/
  work/*.mdx
  blog/*.mdx
  other-work.ts

lib/
  velite.config.ts            MDX schema + build pipeline
  github.ts                   Fetcher with revalidate
  resend.ts                   Email client
  metadata.ts                 generateMetadata helpers per route
  mdx-components.tsx          MDX tag → component mapping
  fonts.ts                    next/font setup
  site.ts                     Site constants (URL via NEXT_PUBLIC_SITE_URL)

public/
  resume.pdf
  work/<slug>/...             Per-case-study assets
```

### Boundaries

- `components/case-study/*` and `components/blog/*` are isolated. Neither imports from the other. They share only `components/ui/*`. Either section can be rebuilt without touching the other.
- All MDX rendering goes through one wrapper that maps tag → component. Defined once in `lib/mdx-components.tsx`.
- Server-only modules (`github.ts`, `resend.ts`) live in `lib/` and are imported only from server components / route handlers. The contact form is a client component that calls `/api/contact` — never imports server code directly.
- `Nav` is a server component with a tiny client wrapper for active-state via `usePathname`.

### Code being deleted from the current repo

- `next.config.mjs` → drop `output: "export"` and the custom image loader
- `my-loader.ts` → delete
- `server.js` → delete
- `app/components/Iconelement.tsx` → delete (skill-logo wall replaced by typed list)
- `app/components/ServiceCard.tsx` → delete
- `app/services/` → delete
- All `<img>` tags currently bypassing `next/image` → migrate to `next/image`
- All raw-hex Tailwind classes (`bg-[#111827]`, `text-[#EAB308]`, etc.) → replace with named tokens from the new Tailwind config
- `Card.tsx` and `Footer.tsx` → rewrite

## Contact form

- Server route at `app/api/contact/route.ts`. Receives `{name, email, message}`, validates with Zod, sends via Resend.
- Resend chosen over nodemailer + Gmail SMTP: free tier (3,000/month, 100/day), purpose-built for transactional, no Google-account or app-password fragility.
- Anti-spam: honeypot field + simple in-memory rate limit per IP. Vercel KV is overkill at v1 traffic.
- Form UX: client component with a server action (native `<form action={...}>`), optimistic disable on submit, inline success/error, no page reload.
- Failure mode for unverified Resend domain: temporarily send from `onboarding@resend.dev` until the user's domain is verified. Documented in implementation plan.

## Environment variables

Set in Vercel project settings; documented in `.env.local.example`:

```
NEXT_PUBLIC_SITE_URL=           # public site URL (e.g. https://rasel-portfolio.vercel.app)
RESEND_API_KEY=                 # required
CONTACT_TO_EMAIL=               # author's inbox
CONTACT_FROM_EMAIL=             # verified sender on Resend
GITHUB_TOKEN=                   # optional; only if rate-limited
```

## SEO and metadata

- `generateMetadata` per route — title, description, og:image.
- Default OG image at `app/opengraph-image.tsx`. Per-case-study override using the case-study cover.
- Sitemap regenerated to include `/work/[slug]` and `/blog/[slug]` from MDX.
- RSS at `/rss.xml` for blog.
- `robots.ts` allows all by default.

## Analytics

- Vercel Analytics. One-line install. Privacy-friendly, no cookie banner needed.
- No Google Analytics.

## Phasing (high level — detailed implementation plan to follow)

1. **Foundation:** drop static-export config, custom server, Cloudinary loader. Install fonts, Velite, Resend, framer-motion, Vercel Analytics. Replace Tailwind config. Wire layout shell. Empty-but-styled shell deployed.
2. **Pages (Home, About, Contact):** hero, about page, working contact form end-to-end.
3. **Work:** `/work` index, `/work/[slug]` template, MDX components, four case-study drafts authored, "other work" list.
4. **Blog and polish:** `/blog` routes with placeholder, RSS, sitemap, real GitHub strip, OG images, metadata pass, Vercel Analytics enabled.
5. **Cutover:** review on `redesign` branch preview, squash-merge to `master`, Vercel auto-promotes.

## Risks

- **Sammanté screenshots may be NDA-restricted.** Default to no screenshots until the author confirms what is publishable. Case study renders correctly without them.
- **Resend domain verification can take hours.** Phase 2 sets it up early. Fallback: send from `onboarding@resend.dev` until verified.
- **GitHub API unauthenticated rate limit** is 60 req/h shared. With 6-hour caching, expected real traffic stays well below the limit. If it ever fails, the strip is hidden and the page still renders.

## Author follow-ups (not blockers, but expected during implementation)

- Confirm Sammanté screenshot publishability and provide assets.
- Provide All Document Reader stack details and link.
- Provide Task a Task live/store link if available.
- Confirm `Raselj71` is the correct GitHub username for the activity strip.
- Provide an updated `resume.pdf` if the existing one is stale.
