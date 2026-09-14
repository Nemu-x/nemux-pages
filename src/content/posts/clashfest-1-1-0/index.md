---
title: "🦥 ClashFest v1.1.0"
description: "Tap the latency value next to any node in the picker and only that node is tested — no more re-testing a 200-node group to check one server. The capsule show..."
pubDate: 2026-09-14
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.1.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.1.0) is out.

### Test a single node

Tap the latency value next to any node in the picker and only that node is tested — no more re-testing a 200-node group to check one server. The capsule shows `…` while the test runs and the result lands in place. Works in the Profiles tab list too, and falls back to a plain TCP probe when the VPN is off.

### Notifications that say what happened

When a subscription update fails in the background, the notification now explains it in your language and offers the fix: **Subscription expired** (with the date) gets a **Renew** button, **Device limit reached** gets **Support**, and every failure gets **Retry**. Operators with branding see their name, colour and logo on it.

The persistent VPN notification shows the current node, the live speed, how many days are left on the subscription, and has **Disconnect** and **Change node** buttons.

### Fixes

- **Rule mode routed everything through the proxy** on some subscriptions (#205). Picking a node in one group used to rewrite every parent selector — including the "direct" group — so GeoIP rules looked broken. Only the group you tap changes now. If you were affected, open the direct group once and select DIRECT again.
- **HTTPS subscriptions failing with "certificate signed by unknown authority"** on some devices: the core now ships its own Root CA bundle in addition to the system roots, like other Clash clients.
- Light theme with an operator accent no longer renders the Settings tab with dark cards.
- The "Days left" and traffic line on the Home card no longer gets cut off.
- Quick-edit of a profile (⋮ → Edit) now actually applies the name, URL and interval you saved.
- Operator policy headers (`X-Network-Stack`, `X-Bypass-Preset`) are honoured on every refresh, not only on a live fetch.
- `announce` headers can use `\n` for line breaks; `profile-web-page-url` opens from the Operator tab and About when no cabinet link is set.

### Under the hood

- CI builds the core with the same patched Go 1.26 toolchain upstream Clash Meta uses.

### Core updated to mihomo v1.19.31

Highlights from upstream: the new **EasyTier** outbound (recognised in the node list), `stack: mips` for TUN, `identity-secret` for ZeroTier, lower gVisor memory usage, and a long list of connection-cleanup fixes (hysteria/hysteria2 UDP, VLESS decryption panic, WireGuard nil-pointer, xhttp IPv6 URLs, OpenVPN tls-auth, AmneziaWG v3, DomainSet wildcard matching). Full list: https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.31

---

Downloads and full notes on GitHub: [v1.1.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.1.0)
