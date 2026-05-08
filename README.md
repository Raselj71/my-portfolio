# Rasel Ahmed — Personal Portfolio

Personal portfolio site. Production URL is set via `NEXT_PUBLIC_SITE_URL` (Vercel-assigned subdomain by default; custom domain TBD).

## Stack

- Next.js 14 (App Router) on Vercel
- TypeScript, Tailwind CSS, Geist fonts
- Velite for MDX-based case studies and blog posts
- Resend for the contact form
- Vercel Analytics
- framer-motion for subtle motion (respects prefers-reduced-motion)

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

## Environment variables

See `.env.local.example`. Required:

- `NEXT_PUBLIC_SITE_URL` — public site URL
- `RESEND_API_KEY` — for the contact form
- `CONTACT_TO_EMAIL` — your inbox for incoming messages
- `CONTACT_FROM_EMAIL` — verified Resend sender (or `onboarding@resend.dev` while domain verification is pending)

Optional:

- `GITHUB_TOKEN` — required if you want the contribution graph on the About page (the GitHub GraphQL API does not support unauthenticated requests). The recent-repos list works without one.
