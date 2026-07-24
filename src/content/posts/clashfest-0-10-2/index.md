---
title: "🦥 ClashFest v0.10.2"
description: "Regional bypass presets and a battery hotfix."
pubDate: 2026-07-24
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v0.10.2](https://github.com/Nemu-x/ClashFest/releases/tag/v0.10.2) is out.

Regional bypass presets and a battery hotfix.

## ✨ New — Bypass presets (Russia · Iran · China)

Route local apps — banks, government, marketplaces, carriers — **directly through your ISP, outside the VPN tunnel**, so they keep working normally while everything else stays proxied.

- **One-tap regional presets.** Routing → Per-app → ⋮ → **Apply bypass preset…** picks the region with the most matching apps installed and adds them in one go. Re-apply anytime to pull in newly installed apps or list updates.
- **Three regions bundled:** 🇷🇺 Russia (600+ apps), 🇮🇷 Iran, 🇨🇳 China — shipped as data, so lists grow without waiting on new heuristics.
- **Additive & safe.** Your manual per-app choices are always kept; presets only add.
- **Operator recommendation.** Providers can suggest a preset for their subscription via the `X-Bypass-Preset` header. It's a one-time confirm on connect — **never auto-applied**, because per-app bypass exposes your real IP to those apps. Full spec in [Operator API docs](https://github.com/Nemu-x/ClashFest/wiki/Operator-API-Headers).

## 🔋 Fixes — Dashboard battery & CPU

- **Fixed a CPU/battery regression from 0.10.1.** The dashboard re-parsed the full proxy config through the engine every ~2 seconds while the app was open, draining battery on heavy subscriptions (Samsung & Xiaomi especially). Now cached — background work drops to ~1%.
- **Lighter power-button animation.** The breathing connect button redrew the screen at 120fps while connected; it now runs at a steady 30fps (visually identical), cutting continuous redraws ~4× and easing GPU/CPU load with the app open.

---
🤖 Measured on-device before and after each fix.


## What's Changed
* feat(bypass): regional bypass presets (RU/IR/CN) from assets JSON by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/192
* feat(bypass): operator X-Bypass-Preset recommendation header by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/193
* fix: dashboard battery/CPU regression + ambient animation cost by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/194


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v0.10.1...v0.10.2

---

Downloads and full notes on GitHub: [v0.10.2](https://github.com/Nemu-x/ClashFest/releases/tag/v0.10.2)
