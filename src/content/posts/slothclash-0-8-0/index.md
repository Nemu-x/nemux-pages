---
title: "🦥 SlothClash 0.8.0"
description: "⚠️ After updating you will be asked once to reinstall the helper service. This release moves the service binary out of a temporary folder into an admin-only ..."
pubDate: 2026-07-19
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash 0.8.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.8.0) is out.

> ⚠️ **After updating you will be asked once to reinstall the helper service.** This release moves the service binary out of a temporary folder into an admin-only location next to the app — a security fix (below). Click the button on the banner, accept the UAC prompt, and it won't come back.

## 🔒 Security

**The helper service no longer runs from a temporary folder.** The privileged service — which runs as SYSTEM on Windows and root on macOS/Linux — was registered from a per-user temp directory. A non-admin user could replace that binary while the service was stopped and get code execution as SYSTEM.

It is now copied into an admin-only location and registered against *that* path:

| Platform | Location |
|---|---|
| Windows | `%ProgramFiles%\Nemu-x\Sloth Clash\service` |
| Linux | `/usr/local/lib/sloth-clash` |
| macOS | `/Library/PrivilegedHelperTools` (already correct) |

Requires helper service **2.4.0+**. The installer also re-pins the service in place during an upgrade, and both "reinstall service" conditions now surface an actionable banner instead of a raw error.

## ✨ New

- **Operator branding.** Providers can brand the app through HTTP response headers on the subscription (`X-Brand-Desktop-*`): name, logo, accent colour, greeting and links. A button in the Home header opens an operator dialog showing subscription **traffic and expiry**, **device slots**, provider links, and a one-click **"copy info for support"** block. Providers can also hide non-critical UI — Global mode, Proxy mode, local configs, Advanced. Full protocol: **[wiki → Branding](https://github.com/Nemu-x/SlothClash/wiki/Branding)**.
- **Custom accent colour.** Pick any colour by hex in **Settings → Appearance**. A contrast guard keeps it readable in both themes, and your choice always wins over a provider's.

## 🐞 Fixed

- **The Connection settings actually work now.** *Allow LAN binding*, *Enable IPv6 DNS* and *Smart DNS fallback* were inert placeholders. They now drive `allow-lan` (rewriting a loopback `bind-address` so LAN access really works), `dns.ipv6` and `dns.respect-rules`.
- **IPv6 resolution under TUN.** Fake-IP mode ran with IPv6 enabled but no IPv6 fake-IP pool, so AAAA lookups never resolved. Added `fake-ip-range6` to both config paths.
- **Suspend/resume detection.** The resume check compared monotonic time, which doesn't advance while the machine sleeps — so the post-wake TUN repair never ran ("closed the lid, opened it, no internet"). It now measures the wall clock.
- **Interface scale.** Below 100% the UI no longer leaves an empty band at the bottom; above 100% it no longer overflows the window.
- **UI polish.** The status banner is dismissable and auto-retires instead of hanging forever and raising a false warning badge on Home. *Update available* is now a labelled accent pill. The helper service version is always visible in **Settings → Info**.

## 🔧 Core

Mihomo **v1.19.29** · Helper service **2.4.1**

**Full changelog:** https://github.com/Nemu-x/SlothClash/compare/v0.7.0...v0.8.0


## What's Changed
* Feat/site icons release automation by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/57
* feat(site): link the Wiki from the header and footer by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/58
* fix(tun): scope bring-up verify/classify to current core boot (kill stale false blocked banner) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/60
* fix(macos): clear leaked loopback system proxy even when lease state was lost by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/61
* fix: Hysteria2 connectivity & false-504 fixes by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/62
* feat(theme): custom accent color — hex picker, contrast guard, full CSS variable sweep by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/63
* chore(core): bump pinned mihomo to v1.19.29 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/64
* fix(service): re-pin core on upgrade (NSIS) + detect stale-pin mismatch banner by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/65


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.7.0...v0.8.0

---

Downloads and full notes on GitHub: [v0.8.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.8.0)
