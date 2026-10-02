---
title: "🦥 ClashFest v1.2.1"
description: "1.2.0 rewrote every REALITY node to offer the X25519MLKEM768 key share (for Xray-core 26.9.8+ servers). Many servers still run an older Xray that silently dr..."
pubDate: 2026-10-02
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.2.1](https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.1) is out.

### Hotfix: REALITY nodes that stopped connecting in 1.2.0

1.2.0 rewrote every REALITY node to offer the X25519MLKEM768 key share (for Xray-core 26.9.8+ servers). Many servers still run an older Xray that silently drops such a ClientHello, so whole subscriptions lost YouTube, Telegram and other routes after the update.

- The rewrite is now **off by default** and lives under **Settings → Network → "REALITY: offer ML-KEM (Xray 26.9+)"**. Turn it on only if your operator says their servers need it.
- It is applied when the config is composed at connect time and is no longer written into the stored subscription.
- Subscriptions imported or updated under 1.2.0 carry the rewrite in their stored copy; the app re-fetches every URL subscription once after this update to restore the operator's config. If a node still fails, tap **Update** on the profile.

Operators on current Xray can ship `reality-opts.support-x25519mlkem768: true` and `client-fingerprint: chrome` in the subscription themselves; mihomo honours them as-is.

Everything else from 1.2.0 is unchanged: https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.0

---

Downloads and full notes on GitHub: [v1.2.1](https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.1)
