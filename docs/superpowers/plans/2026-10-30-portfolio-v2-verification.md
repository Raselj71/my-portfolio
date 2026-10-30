# Portfolio v2 — Verification results

Date: 2026-10-30. Branch `redesign-v2`. Production build served with `next start` on port 3000 and driven with Playwright.

## Gates

| Check | Result |
|---|---|
| `npm run typecheck` | pass (every commit) |
| `npm run lint` | pass (every commit) |
| `npm run build` | pass, 17 static pages |
| Lighthouse accessibility | 100 |
| Lighthouse best practices | 96 (only flag: a 404 for `/_vercel/insights/script.js`, which exists only on Vercel) |
| Forbidden strings (`100k`, `4.9 ★`, `installs`, `rating`) in source | none |
| Forbidden strings in rendered homepage text | none |

## Theme

- Dark emulation: `data-theme="dark"` before paint, body `rgb(14, 20, 18)`.
- Light emulation: `data-theme="light"`, body `rgb(246, 247, 246)`.
- Toggle stores `localStorage.theme`; script falls back to light if storage throws.

## Layout (no horizontal overflow at any width)

| Width | Hero phones (left..right, px) | Notes |
|---|---|---|
| 1280 | 652..1228; text column ends at 640 | three phones clear of text and frame |
| 820 | 139..666 | fan capped at 520 px, centred |
| 390 | 23..353 | headline 4 lines, "Cross-platform" unbroken; menu button shown |

## Behaviour

- Nav anchors from `/work/sammante` resolve to `/#experience` etc.
- Mobile menu opens with six links (five sections + resume) and closes on click.
- `/about` → 307 to `/#about`.
- Work: 10 Google Play links (9 MobileMint + TaskATask), 12 app cards, 3 marked "In development".
- Tech stack: 19 CDN icons load; forcing every icon URL to 404 leaves all 20 rows readable with the inline fallback glyph.
- Reduced motion: `h1` animation `none`, phones `none`, all 30 `.reveal` elements opacity 1 on load.

## Images

- Found and fixed: the Next image optimizer hung indefinitely on `deen-screen.png` at width 256 (RGBA PNG), stalling other image requests behind it. All screenshots were re-encoded as plain RGB PNG, app icons capped at 512 px RGBA, `profile.png` re-saved. After that, every width from 32 to 1080 for every hero and card image returns 200 in under 0.2 s.

## Post-review fixes (whole-branch review, 2026-10-30)

| Finding | Before | After |
|---|---|---|
| Phone fan under `prefers-reduced-motion` | right phone 222..334 hidden behind centre 188..338 at 390 px | centre 113..263, right 222..353, all three visible |
| Nav breakpoint | inline links at 768 px, brand wrapped to 48 px tall | menu below 900 px; at 768 brand 28 px, at 900 inline links fit |
| Active nav underline | stayed on "Stack" after navigating to `/work/sammante` and at page top | cleared at top and on route change |
| Sitemap | listed `/about` (a 307) | removed |
| Docs | README and `.env.local.example` described deleted GitHub strip and other-work list | removed |

## Screenshots

Captured by the Playwright MCP into `.playwright-mcp/` (not committed): homepage 1280 light and dark, 390 dark, 820 light; `/work`, `/work/chain-vpn`, `/contact`.

## Before merge

- Replace `public/resume.pdf` with the current Overleaf export (Rasel).
- Supply the Google Play developer page URL for the footer "Google Play" link; it points to mobilemint.vercel.app until then.
