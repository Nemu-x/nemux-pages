---
title: "🦥 SlothClash v0.9.0"
description: "⚠️ After updating you'll be asked once to reinstall the helper service (this release needs helper service 2.5.0, which powers the new Corporate VPN and the l..."
pubDate: 2026-08-08
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.9.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.0) is out.

> ⚠️ **After updating you'll be asked once to reinstall the helper service** (this release needs helper service **2.5.0**, which powers the new Corporate VPN and the latest fixes). Click the banner, accept the UAC prompt — it won't come back.

**🏢 Corporate VPN (OpenConnect) alongside your tunnel — new**
- A new opt-in **Corporate VPN** tab runs a corporate SSL-VPN (Cisco AnyConnect protocol, via bundled OpenConnect) at the same time as your regular tunnel — split-tunnel: your company's subnets go through the corporate VPN, everything else keeps flowing through SlothClash. Dead-simple login (server + username), remembers your server and username (never the password), and trusts the gateway certificate once. Works on **Windows** (bundled TAP driver, installed on demand) and **macOS**. Turn it on in Settings → Experimental.

**🛡️ IPv6 leak closed**
- With TUN active, blocked sites could still leak over your real IPv6 connection — the tunnel only captured IPv4, so a site could quietly load over IPv6 outside the VPN (invisible until your network actually had working IPv6). IPv6 is now routed through the tunnel by default, so nothing leaks. You can still turn it off in Settings → Connection ("Enable IPv6") if your network's IPv6 is broken.

**🚀 Auto-connect on startup (opt-in) — reliable on a cold boot**
- A new **"Auto-connect on startup"** switch brings the VPN up automatically when the app launches. On a cold boot it now waits for the privileged helper service to be ready and retries, instead of firing once too early and silently not connecting ("launched but the adapter never came up").

**🐛 Switching Proxy ↔ TUN no longer strands you**
- If applying a traffic-mode switch to the running core fails, the app now rolls back to the previous mode (and restores the system proxy) instead of leaving you with no working connection.

**🩹 Clearer TUN adapter errors**
- When the TUN adapter can't be created, the message now matches what actually happened — e.g. if the helper service is too old to clear a leftover adapter, it points you to the "Update service" banner instead of promising a fix that can't run.

**🔒 Lock the proxy port**
- The local mixed-port is random by default (a fresh free port each start, which avoids collisions but changes on reconnect / subscription switch). New **"Lock proxy port"** switch in Settings → Connection pins it to a fixed value, so apps you point at `127.0.0.1:<port>` manually keep working. If the pinned port is busy, we fall back to a random one for that session and note it in diagnostics.

**🔁 Rule toggles apply to live traffic immediately**
- Enabling/disabling a rule (or editing rules) now closes existing connections after the reload, so the change takes effect on already-open sockets (e.g. a browser's) instead of only new ones — no more toggling the VPN off and on to make it stick.

**🎨 Proxy group icons**
- Proxy groups now show the `icon` from your subscription (as many providers set) next to the group name. Broken image URLs are hidden gracefully; emoji icons are supported too.

**🐛 Rules can target a proxy node directly**
- A rule whose policy is an individual proxy (not a group), e.g. `IP-CIDR,…,HK-FL-Mieru`, no longer fails validation with *"references unknown policy"*. mihomo accepts it, so we do too now.

**🐛 First Connect after launch is reliable**
- Fixed a startup race where the first Connect could race the background core warm-up and show green while traffic didn't route (a reconnect fixed it). Connect now waits for the warm-up to settle and the warm-up steps aside once you hit Connect.

**🛡️ A crash in one screen no longer blanks the whole app**
- Each screen is wrapped in an error boundary: if a page hits a render error, it shows a recoverable message (with a copyable error and a reload button) while the sidebar stays usable, instead of leaving a blank window.

**🐛 Update button on macOS/Linux opens the release page**
- The "update available" action on non-Windows no longer tries to download the Windows installer (on an Apple-silicon Mac it was grabbing the arm64 Windows `.exe`); it now opens the release page, where the right build lives. Direct download+install stays Windows-only.


## What's Changed
* feat(corp-vpn): Corporate VPN coexistence — OpenConnect sidecar (macOS + Windows/TAP) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/69


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.8.1...v0.9.0

---

Downloads and full notes on GitHub: [v0.9.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.0)
