# Portfolio v2 — Design

**Date:** 2026-10-30
**Status:** Approved by Rasel Ahammed (prototype v24), ready for implementation plan
**Prototype:** `.superpowers/brainstorm/3595-1793354140/content/direction-v24.html` (open via the brainstorm server, or the file directly; images live beside it under `/files/`)

## Intent

Replace the current portfolio with a redesign that presents Rasel as a cross-platform mobile and full-stack engineer. The current site is dark-only, built around four old case studies (GlobeMart, Realtime Chat, etc.), and reads as a template. The new site is light and dark, single-page first, led by real app screenshots, and lists only current work: TaskATask, Sammanté, Chain VPN, and the MobileMint apps.

Primary audience: recruiters and hiring managers. Secondary: clients looking at MobileMint.

## Goals

- Homepage is a single scroll with anchored sections: Hero, Work, Experience, Tech stack, About, Contact.
- Light and dark themes, following system preference by default, with a visible toggle that remembers the choice.
- Every project and app links to a real destination (Google Play, live portal, npm, GitHub, MobileMint page).
- All 12 MobileMint apps listed as individual cards (9 live, 3 in development).
- Resume, LinkedIn, GitHub, and email reachable from the hero, About card, and footer.
- Responsive: no horizontal overflow at 390 px, 820 px, or desktop; a mobile menu replaces the inline nav below 900 px.
- Motion limited to: one hero entrance, one-time section reveals, hover states, theme icon rotation. Everything off under `prefers-reduced-motion`.
- Type-check, lint, and `next build` pass. Deployable to Vercel as-is.

## Non-goals

- No new case-study pages for TaskATask or Chain VPN in this round. Their "Case study" links point to `/work/<slug>` which renders the existing MDX template with whatever content exists; writing those pages is a follow-up.
- No blog redesign. Blog routes stay but leave the navigation.
- No CMS, no i18n, no tests beyond type-check/lint/build.
- No custom domain work.

## Anti-goals (would make this a failure even if it works)

- Any install count, rating, or user number for MobileMint apps. The "100k+ / 4.9" in the MobileMint repo is placeholder data and must not appear. See `lib/apps.ts` in `D:\mobilemint` lines 169–170.
- Claims not backed by the resume or repos (team sizes, pull-request review claims, etc.).
- Template tells: tracked-out uppercase eyebrows, "→" appended to buttons, numbered markers on non-sequences.

## Constraints

- Existing stack stays: Next.js 14 (app router), TypeScript, Tailwind 3, Velite MDX for case studies, framer-motion available, Vercel Analytics, Resend contact form. Do not change the deployment model.
- Fonts: Sora (display: h1–h3, brand, stats) and Inter (body) via `next/font/google`. Geist is removed.
- Icons for the tech stack come from `https://cdn.simpleicons.org/<slug>/<hex>`; Twilio has no icon there and uses an inline phone glyph. Each icon `onerror` hides itself.
- Images are already prepared and must be copied into `public/` from the prototype folder (see Assets).

## Visual system (decided)

Tokens as CSS variables on `:root` / `[data-theme="dark"]`, exposed to Tailwind as colors:

| token | light | dark |
|---|---|---|
| bg | #F6F7F6 | #0E1412 |
| surface | #FFFFFF | #141C19 |
| surface2 | #EEF2F0 | #1B2622 |
| text | #101614 | #E8EEEA |
| muted | #4C5853 | #A9B7B0 |
| dim | #6F7B76 | #7E8C86 |
| line | #DDE3E0 | #223029 |
| accent | #0B7A5B | #5FD3A6 |
| accent-ink | #FFFFFF | #0B1512 |
| chip | #E3EFEA | #1B2F28 |
| chip-fg | #0B5C46 | #9FE6C9 |

Radii: cards 16 px, buttons 10 px, pills 999 px, phone frames 26–30 px. One accent only. Shadows soft and only on floating elements (phones, labels, profile photo card).

Theme: `data-theme` on `<html>`, set before hydration by an inline script (system preference, overridden by `localStorage` key `theme`), toggled by a button in the nav. Use `next-themes` or an equivalent 30-line implementation; builder's choice.

## Information architecture

```
/                 Single page: Hero · Work · MobileMint apps · Experience · Tech stack · About · Contact (footer)
/work             Index of case studies (unchanged template, re-skinned)
/work/[slug]      Case study (unchanged template, re-skinned)
/contact          Contact form (unchanged logic, re-skinned)
/about            Redirect to /#about
/blog, /blog/[slug]  Keep working, remove from nav
```

Nav (desktop): brand with small round avatar · Work · Experience · Stack · About · Contact · theme toggle · "Download resume" (`/resume.pdf`). Sticky, 1 px bottom line. Active section underlined via IntersectionObserver.
Nav (≤900 px): brand · menu button · theme toggle. Menu opens a full-width list of the same links plus resume.

## Sections (content is final; copy from the prototype)

**Hero.** Left: status pill with briefcase icon "Software Engineer at Dhrubok Info Tech, Dhaka"; h1 "Cross-platform mobile and full-stack products, shipped to real users." (keep "Cross-platform" unbreakable); lede with links to TaskATask (Play) and MobileMint; buttons "View work" (#work) and "Contact me" (#contact); stats row 11 apps on Google Play · 2.5 yrs shipping products · 4 companies. Right: three phones, TaskATask centre (200 px), Deen left and FeedLock right (160 px, ±6°), each a link to its Play page with an icon label beneath; phone frames use the real 9:16 ratio.

**Work.** Three cards: TaskATask (wide, screenshot), Sammanté (browser-frame screenshot), Chain VPN (browser-frame admin screenshot with app phone overlapping). Then "MobileMint — my independent app studio" with a 3-column grid of 12 app cards (icon, name, category, one line, link or "In development"). Text for each is in the prototype.

**Experience.** Two-column list (when / what) with four roles exactly as in the resume: Software Engineer at Dhrubok (Jul 2026–Present), Junior Software Engineer at Dhrubok (Apr 2025–Jun 2026), Life Story (Jul–Dec 2024), KitMuser (Feb–Jul 2024). Link to resume PDF.

**Tech stack.** Four columns: Mobile (primary), Web, Backend, Tooling & delivery; five rows each with logo, name, one-line context, plus an "Also:" line. Backend includes NestJS and Spring Boot. Content in prototype.

**About.** Profile card (headshot, name, title, "Dhaka, Bangladesh · Open to remote", Resume/LinkedIn/GitHub buttons) beside two bio paragraphs and a six-cell facts grid. No "What I bring" list.

**Footer / Contact.** "Open to senior mobile and full-stack roles." mailto, location, links GitHub · LinkedIn · Google Play · Resume. Google Play developer page URL is unknown; link to `https://mobilemint.vercel.app` until Rasel supplies it.

## Data

- `content/work/sammante.mdx` keep; update `cover` to the new screenshot.
- `content/work/task-a-task.mdx` rewrite frontmatter: title "TaskATask — Work Together", summary, role "Lead developer @ Dhrubok Info Tech Services", period "2025 – Present", stack, `links.live` = Play URL, cover = screenshot. Body may stay short.
- `content/work/chain-vpn.mdx` new, from the LinkedIn text (Mar–May 2026; app + admin + react-native-ovpn; links npm and GitHub).
- Delete `content/work/globemart.mdx`, `content/work/realtime-chat.mdx`, `content/other-work.ts` and their covers.
- `lib/apps.ts` new: the 12 MobileMint apps (slug, name, category, status live|coming-soon, tagline, icon path, storeUrl or mobilemint page URL). Source of truth for names/taglines: `D:\mobilemint\lib\apps.ts`, minus `installs`/`rating`.
- `lib/experience.ts`, `lib/stack.ts`: typed arrays for the two sections.
- `lib/site.ts`: name "Rasel Ahammed" (not "Rasel Ahmed"), nav as above, add `mobilemint` and `playStore` links.

## Assets (copy from `.superpowers/brainstorm/3595-1793354140/content/`)

| prototype file | destination |
|---|---|
| headshot-square.png | public/profile.png (replace) |
| tat-screen.png, deen-screen.png, feedlock-screen.png | public/screens/ |
| sammante-shot.png | public/work/sammante/cover.png |
| chainvpn-admin.png, chainvpn-app.png | public/work/chain-vpn/ |
| deen.png, pocket-scanner.png, feedlock.png, voice-recorder.png, all-doc.png, metro-buddy.png, sg-card.png, tmoney.png, japan.png, malaysia.png, cards29.png, taskatask.png | public/apps/<slug>.png |

GoLive Studio has no icon; render a two-letter placeholder.
Remove the old `public/*.png` logo wall images and old work covers that are no longer referenced.

## Motion (decided)

- Hero: pill, h1, lede, actions, stats rise 14 px and fade in, staggered 80 ms; phones rise 28 px, staggered after. ~1 s total. CSS keyframes, no JS.
- Sections/cards: single IntersectionObserver adds `.in` once; 12 px rise, 500 ms.
- Hover: cards −2 px and accent border; buttons −1 px; nav underline slides in; theme icon rotates 180° in dark.
- `prefers-reduced-motion: reduce` disables all of the above.
- Remove the existing `PageTransition` and `Reveal` framer-motion components if they conflict; framer-motion may be dropped from dependencies if unused.

## Decisions made after the builder check (author's calls)

- **App card text:** display names and one-liners come from the prototype; slugs, status, icon paths, and store URLs come from `D:\mobilemint\lib\apps.ts`.
- **Japan Train Card Balance Check** links to its Google Play listing (`com.mobilemint.japantraincardbalancecheck`), which is live. The prototype's MobileMint-page link was a stopgap.
- **Chain VPN case study:** role string "Full-stack developer (client project)"; period "Mar 2026 – May 2026"; links: npm `react-native-ovpn`, GitHub `Raselj71/react-native-ovpn`. Body is the LinkedIn project description, reproduced here so the builder has it:
  > End-to-end VPN product built for a client: a React Native mobile app, a Next.js admin panel, and an open-source OpenVPN client library extracted from the project and published to npm.
  > Mobile app (React Native + Expo SDK 54, TypeScript): OpenVPN connect/disconnect with live bandwidth stats and session duration; free and premium server tiers with country flags; Google Play Billing subscriptions (weekly/monthly/yearly) with server-side receipt verification; AdMob interstitial, banner, and rewarded ads (rewarded ad grants trial premium); Firebase Cloud Messaging push; battery-optimisation exemption flow; foreground service notification, kill switch, custom DNS, auto-reconnect; MMKV-backed offline state with native-side reconciliation on re-open.
  > Admin panel (Next.js 15 + Prisma + MongoDB Atlas): server CRUD with country flag picker and .ovpn upload; user and subscription management with block/unblock; push notification composer; AdMob configuration; announcements, promo codes, audit logs; JWT auth with HTTP-only cookies, Zod-validated APIs.
  > Open-source library react-native-ovpn: OpenVPN core extracted and published to npm as a TurboModule (New Architecture) with an Expo config plugin; wraps ics-openvpn on Android and OpenVPNAdapter on iOS.
- **"1,900+ commits on one repo"** (tech stack, Git row) is backed by the TaskATask mobile repo history and stays.
- **Companies stat:** the resume lists three employers. The hero stat reads "3 companies", not 4. MobileMint is not counted as an employer.

## Answered by Rasel (2026-10-30)

- **App count:** 9 apps live on Google Play, 12 built. Copy becomes: hero stat "9 apps on Google Play"; lede "a studio with nine Android apps on Google Play"; MobileMint header "Nine apps on Google Play, three more in development"; stack row "React Native: 2+ years, 12 shipped apps"; About facts "12 shipped apps". Nothing else counts apps.
- **Chain VPN** is client-owned and not publicly listed. Its card and case study link only to the react-native-ovpn npm package and GitHub.
- **Resume PDF:** Rasel will replace `public/resume.pdf` himself from Overleaf. The builder keeps the existing file in place and does not block on it; the plan notes it as a pre-launch item.

## Left to the builder

- Whether to use `next-themes` or a hand-rolled theme script.
- Component boundaries and file names; Tailwind utilities vs. a small CSS module for the phone fan.
- How `/work` and `/contact` adopt the new tokens (minimal re-skin is fine).
- Whether to keep framer-motion.
- Placeholder behaviour for "Case study" links until those pages are written (linking to `/work/<slug>` is acceptable).

## Acceptance

- `npm run typecheck`, `npm run lint`, `npm run build` pass.
- Visual match to prototype v24 at 1280, 820, 390 px in both themes (screenshots compared by eye).
- No "100K", "4.9", or install/rating text anywhere in the repo.
- Lighthouse accessibility ≥ 95 on the homepage (contrast of the chosen tokens already passes AA).
