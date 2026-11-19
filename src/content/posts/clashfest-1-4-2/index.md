---
title: "🦥 ClashFest v1.4.2"
description: "Xray finalmask on VLESS and Trojan, Firefox 156 / 160 fingerprints, REJECT-DROP in rules."
pubDate: 2026-11-19
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.4.2](https://github.com/Nemu-x/ClashFest/releases/tag/v1.4.2) is out.

Xray finalmask on VLESS and Trojan, Firefox 156 / 160 fingerprints, REJECT-DROP in rules.

## 🎭 New — Xray finalmask

finalmask is Xray's way to disguise a connection under its transport: split or pad the first packets, wrap them in a fake header, add noise. ClashFest now speaks it on **VLESS and Trojan** nodes.

- **Masks:** TCP — `fragment`, `header-custom`, `sudoku`, `xmc`; UDP (XHTTP over HTTP/3) — `noise`, `header-custom`, `sudoku`, `udphop`, `xdns`. A block copied from Xray JSON works as is, camelCase keys included.
- **FINALMASK badge.** Nodes that carry masks are marked in the node list, next to VLESS · TCP · REALITY.
- **Never without the mask.** If a node's mask can't be used, the subscription still loads, but that node doesn't connect — it never goes out unmasked. The reason is in the log.
- **For panels:** Remnawave serves `finalmask` to ClashFest through a host's Host Mapper: `{"mihomo":[{"op":"copy","from":"$host.streamOverrides.finalMask","to":"finalmask"}]}`. With REALITY, use `fragment` with `packets: "1-1"`.

## 🦊 New fingerprints

- **`firefox156` and `firefox160`** as `client-fingerprint` (also Xray's `hellofirefox_156` / `hellofirefox_160`), matching the real browsers byte for byte. `firefox` stays Firefox 148.

## 🧭 Rules

- **REJECT-DROP** next to DIRECT and REJECT when you add a rule: the connection is silently dropped, so trackers hang instead of failing fast.
- **PASS, PASS-RULE, COMPATIBLE, GLOBAL** at the top of the target list.
- **Editing a REJECT-DROP rule keeps it REJECT-DROP** (it used to turn into REJECT), and rules to GLOBAL or PASS-RULE save without an "Unknown rule policy" error.

## 🛠️ Fixes

- **One ClashFest window in Recents — also after the system closed the app.** When Android killed ClashFest in the background, opening it again from the icon and from the notification could leave two cards in Recents.

---

🧪 Tested on-device: Moto razr 40 (Android 15) — a Remnawave node with a finalmask `fragment` connects (Cloudflare trace from the server's country), the FINALMASK badge, REJECT-DROP rules through the engine check, Recents after killing the app with the VPN on.

## What's Changed
* feat(core): Xray finalmask on vless/trojan, Firefox 156/160 fingerprints by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/302
* fix(app): one ClashFest window in Recents after the process was killed by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/303
* feat(rules): REJECT-DROP and other built-in rule targets by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/304
* feat(ui): FINALMASK chip on nodes by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/305
* chore(release): 1.4.2 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/306


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v1.4.1...v1.4.2

---

Downloads and full notes on GitHub: [v1.4.2](https://github.com/Nemu-x/ClashFest/releases/tag/v1.4.2)
