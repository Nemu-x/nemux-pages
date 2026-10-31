---
title: "🦥 SlothClash v0.10.0"
description: "ℹ️ You will be asked once to reinstall the helper service after this update. This release needs helper service 2.6.0, and the core changed; on Windows the in..."
pubDate: 2026-10-31
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.10.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.10.0) is out.

> ℹ️ **You will be asked once to reinstall the helper service** after this update. This release needs helper service 2.6.0, and the core changed; on Windows the installer handles it, on macOS and Linux click the banner and accept the prompt.

**🔓 Desync (experimental): YouTube, Discord and your sites without a VPN**
- Desync makes services work on networks that block them by inspecting the TLS handshake, **without sending that traffic through a VPN**: the connection still goes straight to the real server, only its first packets are reshaped so the filter cannot match them. Strategies are found automatically, tested per service, remembered per network and re-checked in the background. Open it from the Desync chip on Home or **Settings → Desync**. It is marked **Experimental**: it may not work on every network, and its options can still change.
- **Covers** YouTube, Discord (web, plus voice on Windows in TUN mode), and popular services with all their CDN domains so pictures and video load too: Facebook, Instagram, X.
- **My rules**: send any domain, domain suffix or app (by process name) through Desync, directly, or through your VPN. Rules for a destination win over rules for an app.
- **No subscription? "Desync only" profile.** On an empty Home choose *Unblock YouTube & Discord without VPN*: Desync routes, everything else direct, no servers needed.
- **With a subscription, only if you choose it.** When adding a subscription, tick *Connect Desync to this subscription* (always unticked), or turn it on later. Desync runs in front of your subscription, and anything it cannot fix falls back to your subscription's rules (*Through VPN (Desync didn't work here)*). Settings are per profile.
- **Honest checks.** Probes read real data (up to 64 KB over HTTP/2) instead of stopping at the headers, so a connection that opens and then freezes after the first kilobytes counts as a failure, not a success.
- **For providers:** `X-Desync-Desktop-Mode: off | deny` on an HTTPS subscription switches Desync off for it or forbids it; a provider cannot switch it on. Every header the client sends and reads is now documented on the wiki (*Subscription Headers*).
- **Copy diagnostics** produces an anonymised report (no URLs, names or IPs) to attach to a bug report.

**🛰️ REALITY: works with current Xray servers**
- Fixes timeouts against Xray 26.9.8+ (which requires the post-quantum `X25519MLKEM768` key share) and against servers that set `minClientVer`. The core now learns per server which handshake it needs, sends a current client version, and offers `reality-mlkem` / `reality-client-version` settings for the stubborn cases.
- `firefox` and `safari` fingerprints now send current Firefox 148 / Safari 26.3 hellos with the post-quantum share, the same ones genuine Xray clients send, instead of silently switching to Chrome's. Checked against Xray 24.12.31 up to 26.10.29.

**🧩 More of your panel's configs just work**
- Configs written for Citrus-based panels load as-is: VLESS over XDrive, `type: chain` groups, per-proxy REALITY client version, `mldsa65-verify`, Xray fingerprint names, comma-separated pins and names, Xray-style ECH, OpenVPN server identity, QUIC `disable-mtu-discovery`, `tcp-connect-timeout`, `sniffer.skip-threshold`, `dns.serve-expired`. The subscription `User-Agent` now lists these capabilities, so panels can hand them out only to clients that support them.

**🏢 Corporate VPN**
- **Certificate rotation handled.** When the gateway renews its certificate, you now get a clear prompt showing the new certificate to trust, instead of an endless failure caused by the old pinned certificate. Nothing is ever trusted automatically and TLS verification is never turned off.
- **macOS 12 and newer.** The macOS OpenConnect component is now built for macOS 12+; the previous one needed macOS 14 (Apple silicon) or 15 (Intel).

**📺 Remote control for paired devices**
- From a paired device's page you can now pick nodes and run delay tests, switch mode and profiles, update providers, list and close connections, and watch live traffic and logs, not just turn the VPN on and off.

**🔧 Smaller improvements and fixes**
- Connections: close a single connection, or every connection matching your search.
- Subscriptions: failed updates are shown and retried sensibly instead of being swallowed, and "updated" means a new config was actually downloaded. Profiles created by older versions keep auto-updating after their first manual refresh.
- Large subscriptions, connection lists and proxy lists are no longer silently cut off at an internal size limit (which could drop nodes); limits were raised to measured realistic sizes and an oversized response is now reported as an error.
- Under the hood: the desktop backend and UI were reorganised into smaller modules, with new test harnesses for the core lifecycle and golden tests for the generated config. Go 1.26.10 toolchain.
- **Mihomo core updated to `v1.19.33`**, built with our patch series in every release.


## What's Changed
* feat(core): current Firefox and Safari hellos for REALITY hybrid handshakes by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/123
* fix(core): log desync configuration notes once per process by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/124
* ci: move macOS jobs from macos-14 to macos-15 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/127
* feat(desync): probes read the response body to catch frozen connections by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/125
* feat(desync): opt-in Desync when adding a subscription, provider off/deny header by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/126
* fix(corp): macOS OpenConnect bundles for macOS 12+ by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/128
* feat(desync): mark Desync as experimental by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/129
* build(desync): pin the desync library at its v0.2.1 tag by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/130
* chore(release): 0.10.0 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/131


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.9.4...v0.10.0

---

Downloads and full notes on GitHub: [v0.10.0](https://github.com/Nemu-x/SlothClash/releases/tag/v0.10.0)
