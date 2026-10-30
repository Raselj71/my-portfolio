# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage of the Next.js portfolio into the approved light/dark single-page design with real project and app data, keeping `/work`, `/work/[slug]`, `/contact`, and `/blog` working.

**Architecture:** Theme tokens live as CSS variables on `<html data-theme>` and are exposed to Tailwind; a tiny inline script sets the theme before hydration and a client toggle flips it. The homepage is composed from one server component per section fed by typed data files in `lib/`; the only client components are the nav (menu, active link, toggle), the reveal observer, and the toast-free links. Motion is CSS keyframes plus one IntersectionObserver.

**Tech Stack:** Next.js 14 app router, TypeScript, Tailwind 3, Velite MDX, `next/font/google` (Sora, Inter), `next/image`. framer-motion and geist are removed.

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-v2-design.md`

## Global Constraints

- No install count, rating, or user number for any app anywhere in the repo. Forbidden strings: `100K`, `100k`, `4.9`, `installs`, `rating` (outside `package-lock.json`).
- App counts in copy, verbatim: hero stat `9` / `apps on Google Play`; lede "a studio with nine Android apps on Google Play"; MobileMint header "Nine apps on Google Play, three more in development"; stack and About say "12 shipped apps".
- Hero stats row: `9 apps on Google Play` · `2.5 yrs shipping products` · `3 companies`.
- Name everywhere: "Rasel Ahammed". Email `rasel.cse.green@gmail.com`.
- Fonts: Sora for display (`h1`–`h3`, brand, stat numbers), Inter for body. No Geist, no monospace eyebrows, no uppercase tracked labels, no "→" in button text.
- Tokens exactly as the spec's table, light on `:root`, dark on `[data-theme="dark"]`.
- Motion only as specified; all of it disabled under `prefers-reduced-motion: reduce`.
- Work on branch `redesign-v2` off `master`. `npm run typecheck`, `npm run lint`, `npm run build` must pass at every commit.
- `public/resume.pdf` is not touched; Rasel replaces it before launch.

## Review Focus

1. First paint in dark mode must not flash light: the theme script runs in `<head>` before CSS paints, and `localStorage` access is wrapped in try/catch (private mode). Test in Task 1 step 6.
2. A visitor on `/work/sammante` clicking "Experience" in the nav must land on `/#experience`, not `#experience` on the current page. Test in Task 3 step 4.
3. The hero phone group must not overlap the headline or clip the page edge at 820 px and 390 px, and the left phone must be visible at both. Test in Task 4 step 5 and Task 8.
4. An icon CDN failure (offline, blocked) must leave the tech-stack rows readable: broken `<img>` hides itself, text stays. Test in Task 6 step 5.
5. Velite must reject a case study missing `role`, so `chain-vpn.mdx` and `task-a-task.mdx` carry complete frontmatter and the build fails loudly if not. Test in Task 2 step 6.

---

### Task 1: Theme foundation, fonts, tokens, layout shell

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `lib/fonts.ts`, `app/layout.tsx`, `package.json`
- Create: `components/theme/ThemeScript.tsx`, `components/theme/ThemeToggle.tsx`, `lib/theme.ts`
- Delete: `components/motion/PageTransition.tsx`

**Interfaces:**
- Produces: Tailwind colors `bg, surface, surface2, text, muted, dim, line, accent, accent-ink, chip, chip-fg` (each `rgb(var(--c-…) / <alpha-value>)`), font utilities `font-sans` (Inter) and `font-display` (Sora); `ThemeToggle()` client component rendering a 38 px button; `lib/theme.ts` exports `THEME_KEY = 'theme'` and `type Theme = 'light' | 'dark'`.

- [ ] **Step 1: Branch**

```bash
git checkout -b redesign-v2
```

- [ ] **Step 2: Fonts.** Replace `lib/fonts.ts` with `next/font/google` imports: `Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })` and `Sora({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-sora', display: 'swap' })`, exported as `fontSans` and `fontDisplay`. Remove `geist` and `framer-motion` from `package.json` dependencies and run `npm install`.

- [ ] **Step 3: Tokens.** In `app/globals.css` define the eleven tokens from the spec table as space-separated RGB triplets on `:root` (light) and `[data-theme="dark"]`, plus `color-scheme`. Add keyframes `rise` (opacity 0→1, translateY 14px→0) and `phone` (opacity 0→1, translateY 28px→0), utility classes `.reveal` / `.reveal.in` (12 px rise, 500 ms), and a `@media (prefers-reduced-motion: reduce)` block that sets `animation: none`, `opacity: 1`, `transform: none` on `.anim-*`, `.reveal`, and `transition-duration: 0s` globally. Replace the `::selection` and focus colours with the accent token. In `tailwind.config.ts` map the colors listed in Interfaces, set `fontFamily.sans = ['var(--font-inter)', …]` and `fontFamily.display = ['var(--font-sora)', …]`, drop `hero-glow`, keep container settings.

- [ ] **Step 4: Theme script and toggle.** `components/theme/ThemeScript.tsx` renders `<script dangerouslySetInnerHTML>` with an IIFE: read `localStorage.getItem('theme')` in try/catch, else `matchMedia('(prefers-color-scheme: dark)')`, then `document.documentElement.dataset.theme = …`. `components/theme/ThemeToggle.tsx` (`'use client'`) reads `document.documentElement.dataset.theme` on mount, toggles it, writes `localStorage` in try/catch, renders the sun icon (18 px stroke SVG) inside a 38 px bordered button with `aria-label="Switch theme"`; add class `rotate-180` to the icon when dark and `transition-transform duration-300`.

- [ ] **Step 5: Layout.** In `app/layout.tsx`: add `<head><ThemeScript /></head>`, apply `${fontSans.variable} ${fontDisplay.variable}` to `<html>`, keep `suppressHydrationWarning`, body `bg-bg text-text font-sans antialiased`, remove `PageTransition` (delete the file), keep `Nav`, `Footer`, `Analytics`.

- [ ] **Step 6: Verify.** `npm run typecheck && npm run lint && npm run build` pass. Start `npm run dev`, open `http://localhost:3000` in Playwright with `colorScheme: 'dark'` emulation, evaluate `document.documentElement.dataset.theme === 'dark'` immediately after `domcontentloaded`, and confirm `getComputedStyle(document.body).backgroundColor` is `rgb(14, 20, 18)`.

- [ ] **Step 7: Commit** `feat(theme): light/dark tokens, Sora+Inter, theme script and toggle`.

---

### Task 2: Data, content, and assets

**Files:**
- Create: `lib/apps.ts`, `lib/experience.ts`, `lib/stack.ts`, `lib/projects.ts`, `content/work/chain-vpn.mdx`
- Modify: `lib/site.ts`, `content/work/task-a-task.mdx`, `content/work/sammante.mdx`
- Delete: `content/work/globemart.mdx`, `content/work/realtime-chat.mdx`, `content/other-work.ts`, `public/work/globemart/`, `public/work/realtime-chat/`, the logo-wall images in `public/` (`aws.png, c programming.png, c++.png, docker.png, dsa.png, git.png, icons8-*.png, java.png, mongodb.png, nginx.png, php.png, pngwing.com.png, background.jpg, ALL PDFS.jpg, Ecommerce Project.png, Loan & EMI Calculators.png, chatting app project.png, foodi.png, globemart.png, jobbord.png, portfolio.png, restapi.png, next.svg, vercel.svg`)
- Add assets per the spec's Assets table from `.superpowers/brainstorm/3595-1793354140/content/`.

**Interfaces:**
- Produces:
  - `lib/apps.ts`: `export type App = { slug: string; name: string; category: string; status: 'live' | 'coming-soon'; tagline: string; icon: string | null; url: string; urlLabel: 'Google Play' | 'View app' }` and `export const apps: App[]` with the 12 apps in prototype order (Deen, Pocket Scanner, FeedLock, AI Voice Recorder, All Document Reader, Metro Buddy, Japan Train Card Balance, Korea Card Balance for T-money, Singapore MRT Bus Card Balance, Malaysia MRT LRT & Bus Map, Cards 29, GoLive Studio). Store URLs from `D:\mobilemint\lib\apps.ts`; Japan uses `https://play.google.com/store/apps/details?id=com.mobilemint.japantraincardbalancecheck`; coming-soon apps use `https://mobilemint.vercel.app/apps/<slug>`; GoLive `icon: null`.
  - `lib/experience.ts`: `export type Role = { title: string; company: string; period: string; heading: string; body: string; companyUrl?: string }` and `export const roles: Role[]` (four roles, prototype text; Dhrubok url `https://dhrubokinfotech.com`).
  - `lib/stack.ts`: `export type StackItem = { name: string; note: string; icon: string | null; color?: string }`, `export type StackGroup = { title: string; tag?: 'primary'; items: StackItem[]; also: string }`, `export const stack: StackGroup[]` with the four columns; `icon` is the simpleicons slug (`react`, `expo`, `kotlin`, `null` for Twilio, `android`, `typescript`, `nextdotjs`, `redux`, `tailwindcss`, `nodedotjs`, `nestjs`, `springboot`, `mongodb`, `postgresql`, `git`, `docker`, `firebase`, `jest`, `vercel`) and `color` the hex used in the prototype.
  - `lib/projects.ts`: `export type Project = { slug: 'task-a-task' | 'sammante' | 'chain-vpn'; kind: string; period: string; title: string; description: string; tags: string[]; links: { label: string; href: string; external: boolean }[]; media: 'phone' | 'browser' | 'browser-phone' }` and `export const projects: Project[]` with the prototype copy (Chain VPN links: npm, GitHub, Case study `/work/chain-vpn`; no Play link).
  - `lib/site.ts`: `name: 'Rasel Ahammed'`, `title: 'Rasel Ahammed — Software Engineer'`, `nav` = `[#work Work, #experience Experience, #stack Stack, #about About, #contact Contact]`, `links` gains `mobilemint: 'https://mobilemint.vercel.app'`, `taskatask: 'https://play.google.com/store/apps/details?id=com.taska.task'`.

- [ ] **Step 1: Copy assets** with the destinations in the spec table (`public/profile.png` replaced; `public/screens/`; `public/work/sammante/cover.png`; `public/work/chain-vpn/admin.png`, `app.png`; `public/apps/<slug>.png` named by the `apps.ts` slug). Delete the listed old files.

- [ ] **Step 2: Write `lib/apps.ts`, `lib/experience.ts`, `lib/stack.ts`, `lib/projects.ts`, update `lib/site.ts`** per Interfaces.

- [ ] **Step 3: Content.** Rewrite `content/work/task-a-task.mdx` frontmatter: title `TaskATask — Work Together`, summary "Team task management with templates, hand-offs, group chat, and voice and video calls for Android, iOS, and web.", role `Lead developer @ Dhrubok Info Tech Services`, period `2025 – Present`, stack `[Expo, React Native, TypeScript, Twilio Video, CallKit, ConnectionService, Firebase]`, cover `/screens/tat-screen.png`, `links.live` = Play URL, `featured: true`, `order: 1`; body: three short sections (Problem, Role, Technical decisions) using the prototype paragraph, no "solo developer" or "personal use" wording. Create `content/work/chain-vpn.mdx` with role `Full-stack developer (client project)`, period `Mar 2026 – May 2026`, stack `[React Native, Expo, TypeScript, Next.js 15, Prisma, MongoDB, OpenVPN]`, cover `/work/chain-vpn/admin.png`, `links.github` = `https://github.com/Raselj71/react-native-ovpn`, `links.live` = `https://www.npmjs.com/package/react-native-ovpn`, `order: 3`, body from the spec's quoted text split into Problem / Mobile app / Admin panel / Open-source library. In `sammante.mdx` set `cover: /work/sammante/cover.png`, `order: 2`. Delete the two old MDX files and `content/other-work.ts`.

- [ ] **Step 4: Verify Velite** `npx velite` succeeds, then `node -e "import('./.velite/index.js').then(m => console.log(m.caseStudies.map(c => c.slug)))"` prints exactly `[ 'task-a-task', 'sammante', 'chain-vpn' ]` in any order.

- [ ] **Step 5: Verify forbidden strings** `grep -rniE "100k|4\.9|installs|rating" --include=*.ts --include=*.tsx --include=*.mdx --include=*.css app components content lib` returns nothing.

- [ ] **Step 6: Verify schema guard** temporarily remove `role:` from `chain-vpn.mdx`, run `npx velite`, confirm it fails with a schema error, restore the line.

- [ ] **Step 7: Commit** `feat(content): apps, experience, stack, projects data; Chain VPN case study; new assets`. (`app/work/page.tsx` still imports `other-work`; typecheck will fail until Task 7, so run only `npx velite` here and note it in the commit body.)

---

### Task 3: Navigation, footer/contact, reveal observer

**Files:**
- Modify: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`
- Create: `components/layout/NavClient.tsx`, `components/motion/RevealObserver.tsx`
- Delete: `components/layout/NavLinks.tsx`, `components/motion/Reveal.tsx`

**Interfaces:**
- Consumes: `site.nav`, `site.links`, `ThemeToggle`.
- Produces: `Nav()` server component rendering brand (24 px round `profile.png` + "Rasel Ahammed" in `font-display`) and `<NavClient items={site.nav} />`; `NavClient` (`'use client'`) renders desktop links, `ThemeToggle`, resume button `/resume.pdf`, a menu button below `md`, and the mobile panel; `RevealObserver()` client component with no props, mounted once in `app/page.tsx`, that adds `.in` to every `.reveal` element when 8 % visible and marks the active nav link via `data-section` attributes.

- [ ] **Step 1: NavClient.** Links use `href={pathname === '/' ? item.href : '/' + item.href}` so anchors work from `/work/*`. Active link gets class `is-active` (underline via `::after` in globals.css). Mobile panel: full-width list under the header with the five links and "Download resume", closes on link click. Sticky header: `sticky top-0 z-50 border-b border-line bg-bg`.

- [ ] **Step 2: Footer.** Replace content with the contact block: `<footer id="contact">` grid, `h4` "Open to senior mobile and full-stack roles." in `font-display`, mailto link, "Dhaka, Bangladesh", links GitHub, LinkedIn, Google Play (`site.links.mobilemint`), Resume (`/resume.pdf`), then a small `© {year} Rasel Ahammed` line.

- [ ] **Step 3: RevealObserver.** `useEffect`: if `matchMedia('(prefers-reduced-motion: reduce)').matches` or no `IntersectionObserver`, add `.in` to all and return; else observe `.reveal` with `rootMargin: '0px 0px -8% 0px', threshold: 0.08`, unobserve after adding. Second observer on `section[id]` with `rootMargin: '-40% 0px -55% 0px'` toggling `is-active` on `a[href$="#"+id]` inside the nav.

- [ ] **Step 4: Verify.** `npm run typecheck && npm run lint` pass (Task 7 not yet done: if `app/work/page.tsx` still fails on `other-work`, stub by deleting the "Other work" block now and mark Task 7 step 1 done). In Playwright at 1280 px: on `/work/sammante`, the nav "Experience" anchor's `href` ends with `/#experience`. At 390 px the menu button is visible and clicking it shows six links.

- [ ] **Step 5: Commit** `feat(nav): single-page nav with mobile menu, theme toggle, contact footer, reveal observer`.

---

### Task 4: Hero with phone fan

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/PhoneFan.tsx`, `components/home/phone-fan.css`
- Modify: `app/page.tsx` (render `<Hero />` only for now)
- Delete: `components/hero/*`

**Interfaces:**
- Consumes: `site.links.taskatask`, `site.links.mobilemint`.
- Produces: `Hero()` server component; `PhoneFan({ phones })` where `phones: { src: string; alt: string; href: string; icon: string; label: string; position: 'left' | 'center' | 'right' }[]`.

- [ ] **Step 1: Hero.** Two-column grid (`lg:grid-cols-[1.05fr_.95fr]`), left: status pill with inline briefcase SVG and text "Software Engineer at Dhrubok Info Tech, Dhaka"; `h1` in `font-display` 50 px desktop / 38 px tablet / 32 px phone with `<span className="whitespace-nowrap">Cross-platform</span>`; lede with the two links; buttons "View work" (`#work`, accent) and "Contact me" (`#contact`, surface); stats row with the three values from Global Constraints, numbers in `font-display`. Entrance classes `anim-rise` with `style={{ animationDelay }}` 0/80/160/240/320 ms.

- [ ] **Step 2: PhoneFan.** Three `next/image` phones (`width={1080} height={1920}`, `sizes="(max-width: 900px) 160px, 200px"`), frame `rounded-[26px] bg-[#0E1412] p-[7px]`, image `rounded-[20px] aspect-[9/16] h-auto w-full`. Positions and sizes from the prototype: centre 200 px, sides 160 px, sides rotated ∓6° with `transform-origin` bottom inner corner, bottom offset 30 px; ≤900 px: centre 160, sides 124, inset 18 px, fan `max-width: 520px; margin: 0 auto`; ≤560 px: centre 150, sides 112. Labels: pill under each phone with 20 px icon, counter-rotated ±6° on the sides. Entrance `anim-phone` delays 200/320/400 ms. Keep these rules in `phone-fan.css` (imported by the component) since they are positional, not utility.

- [ ] **Step 3: Phones.** Deen (`/screens/deen-screen.png`, Play link, `/apps/deen.png`), TaskATask centre (`/screens/tat-screen.png`, `site.links.taskatask`, `/apps/taskatask.png`), FeedLock (`/screens/feedlock-screen.png`, Play link, `/apps/feedlock.png`).

- [ ] **Step 4: Verify** typecheck and lint.

- [ ] **Step 5: Verify layout in Playwright.** At 1280, 820, and 390 px: `document.documentElement.scrollWidth <= innerWidth`; the left phone's `getBoundingClientRect().left >= 0` and the right phone's `right <= innerWidth`; at 1280 px the left phone's `left` is greater than the text column's `right`.

- [ ] **Step 6: Commit** `feat(home): hero with three-phone fan`.

---

### Task 5: Work section and MobileMint app grid

**Files:**
- Create: `components/home/WorkSection.tsx`, `components/home/ProjectCard.tsx`, `components/home/BrowserFrame.tsx`, `components/home/AppsGrid.tsx`, `components/home/SectionHeading.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `projects` from `lib/projects.ts`, `apps` from `lib/apps.ts`.
- Produces: `SectionHeading({ title, subtitle, action? })` (title in `font-display` 26 px, subtitle in `text-dim`, optional right-aligned link); `ProjectCard({ project })`; `BrowserFrame({ src, alt, overlay? })` renders the three-dot bar and a top-left-anchored `next/image`, optional `overlay` image absolutely positioned bottom-right as a phone; `AppsGrid({ apps })`.

- [ ] **Step 1: ProjectCard.** TaskATask is `md:col-span-2` with the phone screenshot in a `surface2` media panel (image 190 px wide, `rounded-t-[20px]`, bottom-aligned); Sammanté uses `BrowserFrame`; Chain VPN uses `BrowserFrame` with `overlay` `/work/chain-vpn/app.png` (96 px wide, dark 3 px border). Body: kind/period row in `text-dim` 12 px (stacked below 560 px), title in `font-display` 19 px, description, chips (`bg-chip text-chip-fg rounded-full px-2.5 py-1 text-xs`), links row in accent 13 px with external links `target="_blank" rel="noreferrer"` and the external ones suffixed with the arrow glyph from the prototype (`↗`), internal "Case study" plain.

- [ ] **Step 2: AppsGrid.** Header row: Deen icon 40 px, `h3` "MobileMint — my independent app studio", line "Nine apps on Google Play, three more in development. React Native and Expo, with Kotlin where the platform needs it." plus a link `mobilemint.vercel.app ↗`. Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5`; each card an `<a>` with 56 px icon (or a two-letter `GL` gradient placeholder when `icon` is null), name, category (12 px, right), tagline (13 px), and status line: `urlLabel + ' ↗'` in accent for live, "In development" in `text-dim` for coming-soon (still a link to the MobileMint page). Cards carry `reveal`.

- [ ] **Step 3: WorkSection.** `<section id="work" className="scroll-mt-[70px] border-t border-line py-[60px]">` with `SectionHeading` "Work" / "Three client products and the studio I run on the side.", the project grid, then `AppsGrid`.

- [ ] **Step 4: Verify** typecheck, lint; in Playwright count `#work a[href*="play.google.com"]` equals 9 (eight MobileMint live apps with Play URLs + Japan = 9, plus TaskATask card link = 10; assert `>= 9`), count `.app-card` equals 12, and `document.body.innerText` contains neither "100K" nor "4.9".

- [ ] **Step 5: Commit** `feat(home): work cards and MobileMint app grid`.

---

### Task 6: Experience, Tech stack, About, and page composition

**Files:**
- Create: `components/home/ExperienceSection.tsx`, `components/home/StackSection.tsx`, `components/home/AboutSection.tsx`
- Modify: `app/page.tsx`, `app/about/page.tsx`
- Delete: `components/github/*`, `lib/github.ts`

**Interfaces:**
- Consumes: `roles`, `stack`, `site`, `RevealObserver`.
- Produces: the three sections with ids `experience`, `stack`, `about`; `app/page.tsx` renders `Hero, WorkSection, ExperienceSection, StackSection, AboutSection, RevealObserver` in that order; `/about` is `redirect('/#about')`.

- [ ] **Step 1: ExperienceSection.** `SectionHeading` "Experience" / "Two and a half years across mobile, web, and real-time products." with action "Resume (PDF) ↗" → `/resume.pdf`. Grid `md:grid-cols-[220px_1fr]`; each role: `when` column (title bold 15 px, company as link when `companyUrl`, period in `text-dim` 13 px) and `what` column (`heading` 16 px semibold, `body` 15 px `text-muted`), rows separated by `border-t border-line py-[22px]`; below `md` the two cells stack with the divider only above `when`.

- [ ] **Step 2: StackSection.** Four `surface` cards in `lg:grid-cols-4 sm:grid-cols-2`; header `h3` with optional `primary` tag; five rows each with a 30 px `surface2` square holding `<img src={\`https://cdn.simpleicons.org/${icon}/${color}\`} onError={hide}>` or, when `icon` is null, the inline phone SVG; name 14 px semibold, note 12 px `text-dim`; "Also:" footer line. Because the `img` needs an `onError` handler, make the row icon a small client component `StackIcon`.

- [ ] **Step 3: AboutSection.** `SectionHeading` "About" / "Who I am and how I work." Grid `lg:grid-cols-[300px_1fr]`; profile card (image `/profile.png` square `rounded-xl` on a `surface2→surface` gradient, name, title, "Dhaka, Bangladesh · Open to remote", three buttons Resume/LinkedIn/GitHub, card `max-w-[360px] mx-auto w-full` below `lg`); two bio paragraphs from the spec; facts `<dl>` 3 columns (2 below 900 px, 1 below 560 px) with the six cells.

- [ ] **Step 4: Compose and redirect.** `app/page.tsx` as in Interfaces; `app/about/page.tsx` becomes `import { redirect } from 'next/navigation'; export default function AboutPage() { redirect('/#about'); }`. Delete the GitHub components and `lib/github.ts`.

- [ ] **Step 5: Verify.** typecheck, lint; in Playwright block requests to `cdn.simpleicons.org` (`page.route`) and confirm every `.stack-row` still shows its name text and no broken-image icon is visible (each failed `img` has `display: none`). `GET /about` responds with a redirect to `/#about`.

- [ ] **Step 6: Commit** `feat(home): experience, tech stack, about; compose homepage; redirect /about`.

---

### Task 7: Re-skin remaining routes and clean up

**Files:**
- Modify: `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/contact/page.tsx`, `components/case-study/CaseStudyCard.tsx`, `components/case-study/StackPill.tsx`, `components/ui/Eyebrow.tsx`, `components/ui/Link.tsx`, `components/ui/Button.tsx`, `components/contact/*`, `lib/mdx-components.tsx`, `components/mdx/*`, `app/blog/**`, `app/opengraph-image.tsx`
- Delete: `components/case-study/OtherWorkRow.tsx`

**Interfaces:**
- Consumes: Task 1 tokens.
- Produces: no new exports; all pages compile against the new color names only.

- [ ] **Step 1:** Remove the "Other work" section and import from `app/work/page.tsx`; heading copy "Work" / "Case studies for the products I've built."; grid of the three case studies.
- [ ] **Step 2:** Replace old color utilities across the listed files: `bg-bg`→`bg-bg`, `bg-surface-hover`→`bg-surface2`, `text-text-muted`→`text-muted`, `text-text-dim`→`text-dim`, `text-text-faint`→`text-dim`, `border-border`/`border-border-strong`→`border-line`, `hover:bg-accent-soft`→`hover:opacity-90`, `text-bg` on accent buttons→`text-accent-ink`. `Eyebrow` becomes a plain 13 px `text-dim` sentence-case label (no uppercase, no mono). Buttons and links: radius `rounded-[10px]`. Remove "←"/"→"/"↗" from button text where it is decoration (keep `↗` only after external links).
- [ ] **Step 3:** `app/opengraph-image.tsx`: background `#0E1412`, text `#E8EEEA`, accent `#5FD3A6`, name "Rasel Ahammed", subtitle "Cross-platform mobile and full-stack engineer".
- [ ] **Step 4: Verify** `npm run typecheck && npm run lint && npm run build` pass; `grep -rn "text-text-\|border-border\|surface-hover\|accent-soft\|font-mono" app components lib` returns nothing.
- [ ] **Step 5: Commit** `refactor: re-skin work, case study, contact, blog, OG image to v2 tokens`.

---

### Task 8: Visual verification and release notes

**Files:**
- Create: `docs/superpowers/plans/2026-10-30-portfolio-v2-verification.md` (screenshots list and results)
- Modify: `README.md` (one paragraph: theme, data files, where to add an app)

- [ ] **Step 1:** `npm run build && npm run start`. With Playwright capture `/` at 1280×900, 820×900, 390×780 in light and dark (set `data-theme` via `localStorage.theme` before load) and `/work/chain-vpn`, `/contact` at 1280. Save under `.superpowers/verification/` (gitignored) and list filenames in the verification doc.
- [ ] **Step 2:** Compare each against prototype v24 by eye; fix any drift in the owning component; re-run typecheck/lint/build.
- [ ] **Step 3:** With `page.emulateMedia({ reducedMotion: 'reduce' })` confirm `getComputedStyle(h1).animationName === 'none'` and all `.reveal` elements have opacity 1 on load.
- [ ] **Step 4:** Lighthouse (Chrome DevTools or `npx lighthouse http://localhost:3000 --only-categories=accessibility --quiet --chrome-flags=--headless`) accessibility ≥ 95; fix contrast or label issues if any.
- [ ] **Step 5:** `grep -rniE "100k|4\.9|installs|rating" app components content lib public/*.txt 2>/dev/null` returns nothing.
- [ ] **Step 6:** README paragraph; note in the verification doc: "`public/resume.pdf` to be replaced by Rasel before merge."
- [ ] **Step 7: Commit** `docs: v2 verification results and README`. Leave the branch unmerged for Rasel's review.
