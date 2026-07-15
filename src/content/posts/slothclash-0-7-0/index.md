---
title: "🦥 SlothClash v0.7.0"
description: "A big release: first-class Linux support, a major security hardening of the helper service, encrypted subscriptions, and a lot of connectivity & stability work."
pubDate: 2026-07-14
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.7.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.7.0) is out.

A big release: first-class **Linux support**, a major **security hardening** of the helper service, **encrypted subscriptions**, and a lot of connectivity & stability work.

## 🔒 Security
- **Helper-service hardening (privilege-escalation fix).** The embedded core is now pinned by SHA‑256 and verified by the system service before launch, closing a local privilege-escalation vector.
- **Service version handshake.** The app now detects an outdated helper service and shows an in-app banner prompting you to update it, so the GUI and service never drift out of sync.
- **Go toolchain 1.26.5** — picks up the upstream `crypto/tls` ECH fix (GO‑2026‑5856).

## 🐧 Linux (new!)
- Native **AppImage, `.deb`, `.rpm`, and Arch** packages for **amd64 and arm64**.
- **apt / dnf repositories** and an **AUR package** (`yay -S sloth-clash-bin`) for one-command install with auto-updates.
- New **downloads landing page** with an auto-updating release feed.

## ✨ Added
- **Encrypted subscriptions** — per-profile age-encrypted subscription support (key generation + decrypt-at-fetch), a mihomo capability few clients expose.
- **Exit node per connection** — the Connections screen now shows the exit node (with the full proxy chain on hover) and a **country flag**.
- **Auto-connect on startup** (opt-in) and proper handling of the *Start minimized* preference on autostart.
- **Telegram group link** in Settings.
- **Companion LAN controller (preview)** — discover, pair, and control agents on your LAN (early groundwork for a TV remote).

## 🛠 Changed / Reliability
- **DNS defaults aligned with the upstream baseline** — `respect-rules` off, IPv6 in DNS follows the top-level `ipv6` flag, and a plain-UDP resolver is included so DNS keeps working on networks that block DoH/DoT. Fewer "node pings but doesn't load" cases.
- **TUN bring-up is now verified**, with an automatic restart fallback and clearer failure diagnostics; recovery paths re-verify the adapter after resume.
- **Panic-guarded background workers** and a **top-level error boundary** — a UI or worker fault no longer takes the app down; your connection keeps running.
- **mieru:** UDP relay is on by default and transport is decoupled from wire protocol (fixes Discord voice on mieru nodes).
- Core updated to **mihomo v1.19.28** (adds `REMATCH-NAME` rule type).

## 🐞 Fixed
- Fixed a **WebView2 out-of-memory crash** caused by an infinite invalidation loop on the Settings screen.
- Rules no longer emit an empty middle field (`MATCH,,DIRECT` → `MATCH,DIRECT`).
- Debug log now **rotates** instead of growing without bound.
- Service uninstall cleanup, orphaned-core reconciliation, and fake-ip-filter defaults.
- Deep-link consent prompt + SSRF guard on subscription import.

## 🌍 Localization
- Additional English / Russian / Chinese translations (diagnostics, profile actions, settings).

## What's Changed
* fix(mieru): default udp relay on and decouple transport from wire protocol by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/38
* fix(tun): verify wintun bring-up, auto-recover, and surface failures by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/39
* feat(companion): LAN companion controller — control ClashFest agents from the desktop (P1) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/40
* feat(ui): add Telegram group link (Settings + README) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/41
* i18n(settings): translate data/diagnostics and profile action buttons (en/ru/zh) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/42
* feat(startup): respect Start-minimized pref on autostart + opt-in auto-connect on startup by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/43
* chore(core): bump mihomo to v1.19.28 + REMATCH-NAME rule type by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/44
* feat(subscriptions): support age-encrypted subscriptions (per-profile key + key generation) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/45
* feat(packaging): Linux AppImage, deb, rpm and Arch packages (amd64 + arm64) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/46
* feat(pages): styled packages landing with auto-updating release feed by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/47
* feat(ui): point Open release page at the downloads landing + header social icons on the site by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/48
* fix(core): TUN verify in recovery paths + resume adapter check; audit cleanups; i18n runtime toasts; self-canonicalizing bindings; CI race detector by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/49
* fix: uninstall service cleanup, orphan-core reconcile, fake-ip-filter defaults, deep-link consent + SSRF guard, log rotation by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/50
* feat(service): client-side helper hardening — version handshake, core hash-pin, update banners (+ fix WebView2 OOM leak) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/51
* feat(ui): show country flag in the Connections node pill by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/52
* hardening: robustness + input-validation fixes from the internal audit by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/53
* fix(logging): wire debug-log rotation (was dead code); drop unused vars (R1) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/54
* docs(site): use AUR (yay -S sloth-clash-bin) for Arch install; pacman -U as fallback by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/55
* fix(dns): parity defaults — respect-rules off, ipv6 follows top-level, plain-UDP nameserver by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/56


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.6.2...v0.7.0

---

Downloads and full notes on GitHub: [v0.7.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.7.0)
