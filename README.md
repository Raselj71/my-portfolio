# Rasel Ahammed — Personal Portfolio

Personal portfolio site. Production URL is set via `NEXT_PUBLIC_SITE_URL` (Vercel-assigned subdomain by default; custom domain TBD).

## Stack

- Next.js 14 (App Router) on Vercel
- TypeScript, Tailwind CSS, Sora + Inter via `next/font/google`
- Velite for MDX-based case studies and blog posts
- Resend for the contact form
- Vercel Analytics
- CSS-only motion (one hero entrance, one-time section reveals), disabled under `prefers-reduced-motion`

## Theme and data (v2)

- Light and dark themes are CSS variables in `app/globals.css` (`:root` and `[data-theme="dark"]`), exposed to Tailwind in `tailwind.config.ts`. `components/theme/ThemeScript.tsx` applies the saved or system theme before paint; `ThemeToggle` flips it and stores the choice under `localStorage.theme`.
- Homepage content is data-driven: MobileMint apps in `lib/apps.ts`, roles in `lib/experience.ts`, the tech stack in `lib/stack.ts`, the three project cards in `lib/projects.ts`, and links/nav in `lib/site.ts`.
- To add an app: drop its icon at `public/apps/<slug>.png` and append an entry to `lib/apps.ts`. Do not add install counts or ratings.
- Design spec and plan: `docs/superpowers/specs/2026-10-30-portfolio-v2-design.md`, `docs/superpowers/plans/2026-10-30-portfolio-v2.md`.

## Local development

```bash
npm install
npm run dev
```

Local development falls back to `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is unset. Set the env vars listed in `.env.local.example` to test the contact form locally.

## Authoring content

- Case studies: `content/work/<slug>.mdx`
- Blog posts: `content/blog/<slug>.mdx`
- Homepage data: `lib/apps.ts`, `lib/experience.ts`, `lib/stack.ts`, `lib/projects.ts`

Velite watches the directory in dev. After editing frontmatter, the page hot-reloads.

## Scripts

- `npm run dev` — Velite watcher + Next dev server
- `npm run build` — Velite build + Next build
- `npm run start` — Next production server
- `npm run lint` — ESLint
- `npm run typecheck` — Velite + `tsc --noEmit`

## Environment variables

See `.env.local.example`. Required:

- `NEXT_PUBLIC_SITE_URL` — public site URL
- `RESEND_API_KEY` — for the contact form
- `CONTACT_TO_EMAIL` — your inbox for incoming messages
- `CONTACT_FROM_EMAIL` — verified Resend sender (or `onboarding@resend.dev` while domain verification is pending)
