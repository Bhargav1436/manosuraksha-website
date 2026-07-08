# Manosuraksha Website — Progress Tracker

> Theme: **Warm Wellness (Theme 3)**
> Stack: Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion

---

## Changelog (Recent Fixes)

| Date | Fix | Files Changed |
|------|-----|---------------|
| 2026-07-01 | Fixed navbar routes (`/who-we-are` → `/about`, etc.) + added Home link | `navbar.tsx`, `mobile-menu.tsx`, `footer.tsx` |
| 2026-07-01 | Fixed footer program links to point to individual program slugs | `footer.tsx` |
| 2026-07-01 | Added `padding-top: 74px` to `<main>` for fixed navbar | `layout.tsx` |
| 2026-07-01 | Added CSS hover for nav links + scroll-to-top on active link click | `navbar.tsx`, `globals.css` |
| 2026-07-01 | Fixed broken JSX (dangling `}}`) in beliefs, team, programs, about pages | `beliefs/page.tsx`, `team/page.tsx`, `programs/page.tsx`, `about/page.tsx` |
| 2026-07-01 | Fixed duplicate `className` attribute in about page | `about/page.tsx` |
| 2026-07-01 | Downloaded 31 images from manosuraksha.com (hero, programs, beliefs, about, gallery, team) | `public/images/**` |
| 2026-07-01 | Replaced gradient placeholders with real images in hero, about-preview, team-preview, about page | `hero.tsx`, `about-preview.tsx`, `team-preview.tsx`, `about/page.tsx` |
| 2026-07-01 | Added favicon (icon.png, apple-icon.png) from logo + web manifest | `src/app/icon.png`, `src/app/apple-icon.png`, `public/manifest.json`, `layout.tsx` |
| 2026-07-01 | Fixed logo — display full horizontal logo instead of cropped 42px circle | `navbar.tsx`, `footer.tsx` |

---

## 1. Project Setup & Configuration

| Task | Status |
|------|--------|
| Next.js 16 project initialized (pnpm) | ✅ Done |
| TypeScript configured | ✅ Done |
| Tailwind CSS 4 configured | ✅ Done |
| Theme 3 CSS variables (globals.css) | ✅ Done |
| Fonts: Libre Baskerville + Nunito Sans | ✅ Done |
| Root layout (`layout.tsx`) | ✅ Done |
| `CLAUDE.md` / `AGENTS.md` | ✅ Done |
| Documentation (README, ARCHITECTURE, etc.) | ✅ Done |

---

## 2. Data & Types

| Task | Status |
|------|--------|
| TypeScript interfaces (`types/index.ts`) | ✅ Done |
| Team data — 14 members (`data/team.ts`) | ✅ Done |
| Programs data — 6 programs (`data/programs.ts`) | ✅ Done |
| Beliefs data — 6 beliefs (`data/beliefs.ts`) | ✅ Done |
| Site config — contact, social, hours (`data/site-config.ts`) | ✅ Done |
| Languages data (`data/languages.ts`) | ✅ Done |
| Mock booking data (`data/mock/booking-data.ts`) | ✅ Done |
| Zod validators (`lib/validators.ts`) | ✅ Done |
| Booking client — single swap file (`lib/api/booking-client.ts`) | ✅ Done |
| Utility: `cn()` (`lib/utils.ts`) | ✅ Done |

---

## 3. Shared Components

| Component | File | Status |
|-----------|------|--------|
| MotionWrapper (scroll animations) | `components/shared/motion-wrapper.tsx` | ✅ Done |
| AnimatedCounter | `components/shared/animated-counter.tsx` | ✅ Done |
| ScrollToTop button | `components/shared/scroll-to-top.tsx` | ✅ Done |
| Button (reusable) | `components/ui/button.tsx` | ✅ Done |
| Card (reusable) | `components/ui/card.tsx` | ✅ Done |
| SectionHeader (reusable) | `components/ui/section-header.tsx` | ✅ Done |

---

## 4. Layout Components

| Component | File | Theme 3 Match | Status |
|-----------|------|---------------|--------|
| Navbar | `components/layout/navbar.tsx` | ✅ Exact | ✅ Done |
| Navbar — correct routes & Home link | `components/layout/navbar.tsx` | — | ✅ Fixed |
| Navbar — scroll-to-top on active link + CSS hover | `components/layout/navbar.tsx` | — | ✅ Fixed |
| Mobile Menu | `components/layout/mobile-menu.tsx` | ✅ Exact | ✅ Done |
| Mobile Menu — correct routes & Home link | `components/layout/mobile-menu.tsx` | — | ✅ Fixed |
| Footer | `components/layout/footer.tsx` | ✅ Exact | ✅ Done |
| Footer — correct quick links & program links | `components/layout/footer.tsx` | — | ✅ Fixed |
| Fixed navbar padding on `<main>` | `app/layout.tsx` | — | ✅ Fixed |
| Nav hover CSS (`globals.css`) | `app/globals.css` | — | ✅ Fixed |

---

## 5. Home Page Sections

| Section | File | Theme 3 Match | Status |
|---------|------|---------------|--------|
| Hero (two-col + visual collage) | `components/sections/hero.tsx` | ✅ Exact | ✅ Done |
| About Preview | `components/sections/about-preview.tsx` | ✅ Exact | ✅ Done |
| Beliefs Preview | `components/sections/beliefs-preview.tsx` | ✅ Exact | ✅ Done |
| Programs Preview | `components/sections/programs-preview.tsx` | ✅ Exact | ✅ Done |
| Team Preview | `components/sections/team-preview.tsx` | ✅ Exact | ✅ Done |
| CTA / Languages Banner | `components/sections/cta-section.tsx` | ✅ Exact | ✅ Done |
| Home page composition | `app/page.tsx` | ✅ Exact | ✅ Done |

---

## 6. Inner Pages

| Page | Route | File | Theme 3 Match | Status |
|------|-------|------|---------------|--------|
| Who We Are | `/about` | `app/about/page.tsx` | ✅ Exact | ✅ Done |
| What We Believe | `/beliefs` | `app/beliefs/page.tsx` | ✅ Exact | ✅ Done |
| Our Programs | `/programs` | `app/programs/page.tsx` | ✅ Exact | ✅ Done |
| Program Detail | `/programs/[slug]` | `app/programs/[slug]/page.tsx` | ✅ Exact | ✅ Done |
| Our Team | `/team` | `app/team/page.tsx` | ✅ Exact | ✅ Done |
| Contact Us | `/contact` | `app/contact/page.tsx` | ✅ Exact | ✅ Done |
| Contact Form | — | `components/sections/contact-form.tsx` | ✅ Exact | ✅ Done |

---

## 7. Booking System

| Task | File | Status |
|------|------|--------|
| Doctor listing page (search, tabs, filters, cards) | `app/book-appointment/page.tsx` | ✅ Done |
| Doctor profile + inline booking flow | `app/book-appointment/[slug]/page.tsx` | ✅ Done |
| Booking modal (multi-step) | `components/sections/booking-modal.tsx` | ✅ Done |
| Mock data (slots, modes) | `data/mock/booking-data.ts` | ✅ Done |
| Booking client (single API swap file) | `lib/api/booking-client.ts` | ✅ Done |
| **Swap to real API** | `lib/api/booking-client.ts` | ⏳ Waiting for API |

---

## 8. API Routes

| Route | File | Status |
|-------|------|--------|
| `POST /api/contact` | `app/api/contact/route.ts` | ✅ Done |
| `GET /api/booking/professionals` | `app/api/booking/professionals/route.ts` | ✅ Done |
| `GET /api/booking/slots` | `app/api/booking/slots/route.ts` | ✅ Done |
| `POST /api/booking/book` | `app/api/booking/book/route.ts` | ✅ Done |

---

## 9. Assets

| Asset | Location | Status |
|-------|----------|--------|
| Logo (`logo.png`) | `public/images/logo.png` | ✅ Done |
| Team photos (14 members) | `public/images/team/` | ✅ Done |
| Hero images (3 slider images) | `public/images/hero/` | ✅ Done |
| Program icons (5 icons, 64x64) | `public/images/programs/` | ✅ Done |
| Belief icons (5 icons) | `public/images/beliefs/` | ✅ Done |
| About images (inclusive, slide1) | `public/images/about/` | ✅ Done |
| Gallery images (2 images) | `public/images/gallery/` | ✅ Done |
| Favicon (`icon.png` + `apple-icon.png`) | `src/app/` | ✅ Done |
| Web manifest | `public/manifest.json` | ✅ Done |
| Open Graph images | `public/` | ⏭️ Skipped — not in old site either |


## Summary

| Category | Done | Pending | Total |
|----------|------|---------|-------|
| Setup & Config | 8 | 0 | 8 |
| Data & Types | 10 | 0 | 10 |
| Shared Components | 6 | 0 | 6 |
| Layout Components | 3 | 0 | 3 |
| Home Page Sections | 7 | 0 | 7 |
| Inner Pages | 7 | 0 | 7 |
| Booking System | 5 | 1 | 6 |
| API Routes | 4 | 0 | 4 |
| Assets | 7 | 2 | 9 |
| SEO & Meta | 1 | 4 | 5 |
| Performance & Quality | 1 | 6 | 7 |
| Testing | 0 | 3 | 3 |
| Deployment | 0 | 5 | 5 |
| **TOTAL** | **59** | **21** | **80** |

> **Progress: ~74% complete** — All core pages, components, images, and functionality are built. Remaining items are favicon, OG images, SEO, testing, and deployment.
