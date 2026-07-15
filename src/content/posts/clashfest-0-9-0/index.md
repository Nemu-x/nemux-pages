---
title: "🦥 ClashFest 0.9.0"
description: "- Home-screen speed widget — live up/down speed at a glance, resizable (#101)."
pubDate: 2026-07-03
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest 0.9.0](https://github.com/Nemu-x/ClashFest/releases/tag/v0.9.0) is out.

## ✨ New
- Home-screen speed widget — live up/down speed at a glance, resizable (#101).
- Companion remote — pair with and control ClashFest running on another device
  (Android TV or a second phone) over your LAN, via QR + PIN.
- Android TV support — full D-pad navigation, focus rings, and a TV banner.
- "Block IPv6 (AAAA)" toggle in DNS & Hosts — kills stalls and slow loads on
  broken or high-latency IPv6 (#116).
- New app icon: a sleeping sloth (Lumen), part of the same family as SlothClash.

## 🎨 Redesign (Lumen)
- Obsidian / True-Black surfaces app-wide with a deeper OLED black.
- New connect orb, refreshed home screen, and a redesigned proxy/node picker.
- New typography: Manrope body font (Cyrillic-safe) + Space Grotesk titles.

## ⚡ Performance — large subscriptions (200+ nodes)
- The node picker now uses a virtualized list: opening a 200-node group no longer
  freezes the UI (~2.7s hang → instant).
- A live URL-test no longer re-renders the whole node list on every update — fixes
  the device grinding to a halt while pinging a big group.
- URL-test warmup now tests only the group you're actually looking at instead of
  every group on connect — no more endless "pinging" spinner or sluggish switching.

## 🛡️ Reliability & correctness
- Reworked how edits are stored (config overlay): your subscription is now kept
  exactly as fetched and never rewritten. Your edits (DNS, hosts, tunnels, rules,
  providers, proxy-chain) live as a separate layer composed on top at apply time.
- A hard engine gate validates every config before it's applied — ClashFest never
  hands the core a config it would reject. If a specific edit can't be applied,
  your subscription still updates cleanly.
- Fixes a whole class of update failures: "not found rule-set", providers that are
  referenced only from DNS being dropped, and rule-providers whose names contain
  spaces.
- Subscription rules are now classified correctly (some were wrongly landing under
  Manual rules).

## 🔒 Security
- External control (e.g. Tasker or launcher shortcuts driving the VPN) is now OFF
  by default for new installs. Existing setups keep it enabled.

## 🔧 Fixes
- Subscription display name now updates correctly on refresh.
- The main subscription fetch gets a full 60s (provider tasks stay fast) — fewer
  false "timeout" failures.
- No more stuck launcher badge ("1") from the persistent VPN notification.
- A normal VPN stop is no longer logged as a crash.
- Filled in missing Russian / Simplified-Chinese translations.

## 🧹 Under the hood
- Removed the dead subscription reconcile-merge path (superseded by the overlay).
- Added engine-oracle tests for merge fidelity and config composition.




## What's Changed
* fix(rules): classify sub rules by origin, exempt opaque types from validation, purge deleted manual rules by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/107
* fix(rules): keep rule-providers whose name contains spaces (GC ref regex stopped at whitespace) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/108
* Feat/sub update fidelity net by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/109
* feat(companion): PIN pairing + form-factor entry + gateway auto-start by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/110
* feat(tv): D-pad focus pass — initial focus, nav trap, no ghost focus by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/111
* fix(proxy): debounce active-card rebind during URL-test (200-node jank) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/112
* fix(merge): keep rule-providers referenced only by DNS config by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/114
* feat(config): hard engine gate — never apply a config the engine rejects by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/115
* feat(config): overlay architecture — never rewrite the subscription by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/117
* fix(core): give the main subscription fetch 60s (provider tasks stay 20s) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/118
* fix(notification): no launcher badge on the persistent VPN notification by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/119
* Lumen redesign 1.0 — obsidian UI + sleeping-sloth icon by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/120
* feat(widget): home-screen speed widget (#101) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/121
* feat(dns): 'Block IPv6 (AAAA)' toggle in DNS & Hosts settings (#116) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/122
* docs(readme): centered logo header + links up top, refreshed content by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/123
* test(dns): oracle-net dns.ipv6 round-trip (missed in #116) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/124
* feat(dev): full brand tester in About (debug-only, tap icon x10) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/125
* fix(theme): bottom sheets fully pure-black under True Black (F-BRAND-1) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/126
* polish(ui): obsidian canvas on 5 screens that showed flat window bg (F-02) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/127
* fix(subscription): correct display name on update; unify header resolver (E-16/E-19) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/128
* fix(subscription): one shared opaque-token heuristic for import + update (E-17) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/129
* fix(service): don't log normal VPN stop as a crash (O-01/O-02) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/130
* perf(widget): cache widget presence instead of querying every tick (O-05) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/131
* security: external control off by default; preserve for existing installs (H-01) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/132
* refactor(overlay): editors write explicit intent to the user layer (E-01/E-05 part 1) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/133
* refactor(overlay): finish editors->user-layer; drop layer-from-config extraction (E-01/E-05) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/134
* refactor(overlay): Stage C — user layer is the source of truth on update; AGENTS engine-oracle policy by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/135
* i18n: fill RU/ZH drift — DNS block-ipv6 (#116) + ZH about-telegram by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/136
* perf(proxy): fix 200-node subscription jank — virtualize picker, guard accordion, lazy warmup (O-07) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/137
* chore(cleanup): drop dead reconcile path + inert materializeProfile (deadcode sweep) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/138


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v0.8.0...v0.9.0

---

Downloads and full notes on GitHub: [v0.9.0](https://github.com/Nemu-x/ClashFest/releases/tag/v0.9.0)
