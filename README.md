# Nemu-x Devlog

English dev blog by [Nemu-x](https://github.com/Nemu-x) — release notes and dev updates. SlothClash and ClashFest today; more from the Nemux ecosystem as it grows.

**Live site:** [nemu-x.github.io/nemux-pages](https://nemu-x.github.io/nemux-pages/)

Built with [Litos](https://github.com/Dnzzk2/Litos) (Astro 5 + React + TailwindCSS).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/installation)

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4321/nemux-pages/](http://localhost:4321/nemux-pages/).

## Add a post (60 seconds)

1. Create a folder under `src/content/posts/your-slug/`
2. Add `index.mdx`:

```mdx
---
title: 'Your post title'
description: 'One-line summary for listings and SEO.'
pubDate: 2026-06-06
author: 'Nemu-x'
tags: ['release']
---

Your content here. Keep it short — link to the full GitHub release for details.
```

3. Preview locally, then push to `main` — GitHub Actions deploys automatically.

### Tags

Use: `nemux`, `slothclash`, `clashfest`, `swissknife`, `release`

## Automatic release posts

`.github/workflows/sync-releases.yml` runs every 6 hours (and on manual dispatch): it checks GitHub releases of SlothClash, ClashFest, and SwissKnife-for-MS-Graph via `scripts/sync-releases.ts`, creates a post for each new release, refreshes star/fork counts on project cards, commits, and triggers the Pages deploy. Manually written posts are never touched — a release is skipped if a post folder with its slug already exists.

## Production build

```bash
pnpm build
pnpm preview
```

## Deploy

Push to `main` on `Nemu-x/nemux-pages`. GitHub Pages must use **GitHub Actions** as the source (Settings → Pages → Build and deployment → Source: GitHub Actions).

## Configuration

- Site identity, nav, skills: `src/config.ts`
- Purple accent theme: `src/styles/nemux-theme.css`
- GitHub Pages base path: `SITE.base` in config + `astro.config.ts`

## Projects

Edit `src/content/projects/<name>/index.mdx` to update project cards on the Projects page.
