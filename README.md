# Gandla Gajendra Kumar — Cinematic Portfolio

A cinematic, production-ready portfolio built with **Next.js (App Router) + TypeScript + Three.js + GSAP + CSS Modules**. Dark, premium visual system positioning Gandla Gajendra Kumar as a **Lead Data Engineer × GenAI Builder**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Asset placement

| Asset | Location | Notes |
| --- | --- | --- |
| Hero talking-head video | `public/videos/gajendra-portfolio-intro.mp4` | Already copied from `Downloads/final_version.mp4`. Path is configured via `VIDEO_SRC` in `src/data/portfolio.ts`. |
| Video poster | `public/images/video-poster.svg` | Dark fallback shown before the video paints. Swap for a real frame (`video-poster.webp`) and update `VIDEO_POSTER` if desired. |
| Captions | `public/captions/portfolio-intro.vtt` | **Placeholder transcript** — replace cues with the real spoken words. |
| Social preview | `public/images/social-preview.webp` | Placeholder referenced by OG/Twitter metadata; add a 1200×630 image. |

To use a different video, drop it in `public/videos/` and change `VIDEO_SRC` in `src/data/portfolio.ts`.

## Architecture

```
src/
  app/            layout (fonts, SEO, JSON-LD), page (section assembly), globals.css, sitemap, robots, icon.svg
  components/
    navigation/   Navigation — scroll-aware glass nav, active-section observer, mobile menu (esc + scroll-lock)
    hero/         VideoIntro (orchestrates video + intro timeline), VideoControls, CinematicLayer (Three.js), ScrollIndicator
    sections/     About, Stack, Experience, Projects, Architecture, CurrentFocus, Contact (+ shared sections.module.css)
    ui/           Button, TechnologyTag, StatusBadge, SectionHeading (index.tsx) + Reveal (GSAP scroll reveal)
  data/           portfolio.ts — single typed source of truth (profile, nav, experience, skills, projects, contact, education)
  hooks/          useReducedMotion, useIntersectionObserver, useGSAP
  lib/            gsap.ts (plugin registration)
```

**Key decisions**
- **Content is data-driven.** All copy/links live in `src/data/portfolio.ts` with TypeScript interfaces — no datasets hardcoded in JSX. Edit that one file to update the site.
- **Server components by default.** Sections are server components; only the hero, nav, `Reveal`, and the architecture animation are `"use client"`.
- **Three.js is dynamically imported** (`ssr: false`) so it never runs during SSR and stays out of the initial bundle.
- **Design tokens** are CSS custom properties in `globals.css`; components use CSS Modules.
- **Motion is cleaned up**: GSAP runs inside `gsap.context()` (reverted on unmount); Three.js disposes geometry/material/texture/renderer and removes every listener + rAF.

## Testing checklist

- [x] `npm run build` passes with no TypeScript or ESLint errors
- [x] Hero video autoplays muted, loops, plays inline
- [x] Play/pause and mute/unmute controls work and stay in sync with the element
- [x] Ambient blurred background video renders behind the foreground
- [x] Sound hint appears, auto-hides (~5s), hides on unmute, once per session (`sessionStorage`)
- [x] Three.js dust/bokeh renders, suspends when tab hidden / hero off-screen, disposes on unmount
- [x] Hero intro animates in without layout shift
- [x] Smooth-scroll navigation + active-section indicator
- [x] All sections present with real portfolio content and links
- [x] No console errors, no hydration errors
- [ ] Reduced-motion: verify by enabling OS "reduce motion" (parallax off, static particle render, instant reveals)
- [ ] Keyboard nav: Tab through nav/controls/links, Esc closes mobile menu, skip link works
- [ ] Responsive: check 375px / 768px / 1280px / 1920px — no horizontal overflow
- [ ] Replace placeholder caption cues, social-preview image, and (optionally) a real poster frame

## Content notes

- Real links come from the existing portfolio: LinkedIn, GitHub, and the project repos (LLM Council, LLM App Lab, Readmission Predictor). The Tableau→Power BI platform and open-source cards link to the GitHub profile — swap in a dedicated repo URL when public.
- Captions and the social-share image are the only intentional placeholders. Nothing about employers, dates, or outcomes was invented.
