---
title: "🦥 SlothClash v0.11.0"
description: "ℹ️ You may be asked once to reinstall the helper service after this update: the core changed. On Windows the installer handles it; on macOS and Linux click t..."
pubDate: 2026-11-19
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.11.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.11.0) is out.

> ℹ️ **You may be asked once to reinstall the helper service** after this update: the core changed. On Windows the installer handles it; on macOS and Linux click the banner and accept the prompt.

**🎭 Xray finalmask on VLESS and Trojan**
- New `finalmask` block on `vless` and `trojan` proxies: Xray's chain of masks between the socket and TLS / REALITY, written as in Xray (first entry outermost, `settings` nesting optional). TCP masks: `header-custom`, `fragment`, `sudoku`, `xmc`. UDP masks (`noise`, `header-custom`, `sudoku`, `udphop`, `xdns`) apply to VLESS over XHTTP with `alpn: [h3]` only. Xray's camelCase keys (`maxSplit`, `randRange`) are understood, so a block copied from Xray JSON or a panel works as is; `xdns` also accepts the older compact `<domain>+udp://<server>` spelling.
- Every mask dials through the proxy's own dialer, so `interface-name`, `routing-mark`, `auto-detect-interface` and `dialer-proxy` apply to it.
- A block the core cannot use does not fail the subscription: the node loads, the core log says `unusable finalmask, the proxy will not connect`, and the node refuses every connection instead of going out without its masks. That covers bad options, unknown masks, UDP masks on another network, any mask on `network: xdrive`, and `xicmp`.
- `xicmp` is not supported: its ICMP sockets do not go through the proxy's dialer, so with TUN they would loop back into the app's own tunnel.
- Remnawave does not put `finalmask` into its mihomo output by itself. Panel operators add it with a Host Mapper operation on the host: `{"mihomo": [{"op": "copy", "from": "$host.streamOverrides.finalMask", "to": "finalmask"}]}`. Sloth Clash's subscription User-Agent matches Remnawave's default "Mihomo Clients" rule, so the block arrives unless the rules were changed.
- Known limit: a pasted `vless://` link keeps only the `fragment` part of Xray's `fm` parameter; other masks from a link are dropped. Subscriptions in mihomo format carry the full block.

**🦊 Firefox 156 / 160 fingerprint**
- New `client-fingerprint` names `firefox156` and `firefox160` (and Xray's `hellofirefox_156`, `hellofirefox_160`): the current Firefox hello, checked against real browser captures. `firefox` itself stays Firefox 148, as in stock mihomo. If the new hello cannot be applied to a connection, the core falls back to Firefox 148 and logs it.


## What's Changed
* feat(core): finalmask on vless and trojan, firefox156/160 fingerprints (0044-0046) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/164
* chore(release): 0.11.0 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/165


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.10.1...v0.11.0

---

Downloads and full notes on GitHub: [v0.11.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.11.0)
