---
title: "🦥 ClashFest v1.4.0"
description: "Desync without a VPN server, desync on top of your subscription, mihomo 1.19.34 and Xray 26.11.9 compatibility."
pubDate: 2026-11-14
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.4.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.4.0) is out.

Desync without a VPN server, desync on top of your subscription, mihomo 1.19.34 and Xray 26.11.9 compatibility.

## 🧩 New — Desync: open blocked services without a VPN server

Some blocking systems only read the first message of a connection. Desync sends it in a shape they fail to read, and the connection goes **directly** to the service — no VPN server, no extra hop.

- **Desync only (no VPN).** A profile that needs no subscription: pick YouTube, Discord, Instagram and other services (or add your own domains), and they open directly. Everything else stays untouched.
- **Desync for services — on top of a subscription.** In the profile menu of a subscription: the chosen services go direct with desync **when it works on your network**, and through the subscription as before when it does not. The app checks in the background and switches by itself; DNS and the subscription's own rules and groups are not changed.
- **Automatic strategy.** Networks block in different ways, so ClashFest tries several strategies per service, keeps one that actually transfers data, and rechecks every 10 minutes. You can still pick one by hand.
- **Shows what it does.** The Home card says `Desync: YouTube, Instagram`, `checking`, or `everything through the VPN`.
- **Providers stay in control.** The `X-Desync` subscription header allows it (default), turns it on by default, or denies it for a subscription.

## ⚙️ Core — mihomo 1.19.34

- **Newer TLS fingerprints**: utls 1.9.0 with Firefox 148 and Safari 26.3 hellos and QUIC / ECH fixes.
- **Snell v6** support (the core warns about the unencrypted `unsafe-raw` mode).
- Fixes for SOCKS, HTTP CONNECT, SSH and EasyTier outbounds, newer sing / sing-tun.

## 🔐 Xray 26.11.9 compatibility

- **`chrome155` fingerprint** (Chrome 155, as in Xray 26.11.9) and REALITY client version **26.11.9** by default.
- **ML-KEM choice holds on bad networks.** A dropped connection no longer counts as the server refusing ML-KEM, so the choice doesn't flip on a shaky link; `chrome120` and other non-ML-KEM fingerprints connect to new Xray servers again.
- **New proxy keys** for panels: `reality-opts.mlkem-client-fingerprint`, `fragment-opts` (split the first ClientHello, Xray-style), opt-in VLESS `mux.cool` (Mux.Cool + XUDP), and `chrome` when REALITY has no `client-fingerprint`.
- **Faster XHTTP packet-up** (up to 8 uploads in flight) and steadier gRPC / XHTTP connections.
- **One bad node no longer breaks a subscription.** An unusable `fragment-opts`, `mux.cool`, `client-version` or `mlkem-client-fingerprint` is now ignored with a warning in the log, instead of the whole profile being rejected.
- **Citrus beta.3** configs keep working (XDrive fixes, compatibility suite pinned to v1.0.0-beta.3).

## 🛠️ Fixes

- **One ClashFest window in Recents.** Opening a subscription link, a notification or the Quick Settings tile no longer leaves a second (sometimes blank) ClashFest card.
- **Rules Save button no longer hides under 3-button navigation.**
- **Home update button works for Desync profiles** — it regenerates the profile from its settings.
- **More air in the node picker** around an expanded group.
- **Lighter operator logos** — branded subscriptions decode their logo at display size, using less memory.
- **Share links in logs no longer show credentials** when a link fails to parse.
- **Background config checks no longer touch the engine's cache file.**

## ⚠️ Heads-up — Android 6.0 or newer

ClashFest now needs **Android 6.0+** (it was 5.0+): Material Components 1.14 no longer supports Android 5.x. Phones on Android 5.0–5.1 stay on v1.3.0. The Google Play build already required Android 7.0+ and is unchanged.

---

🧪 Tested on-device: Motorola razr 40 (Android 15) — Desync only and desync on top of a subscription (YouTube, Instagram, Discord), mihomo 1.19.34 core with a real subscription, a subscription with unusable proxy options; Xray lab 24.12.31 → 26.11.9 for REALITY, ML-KEM, fragment-opts, mux.cool and XHTTP.

## What's Changed
* perf(branding): downsample operator logos when decoding by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/276
* build(deps): Material Components 1.14 and minSdk 23 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/277
* docs(agents): target API 36, minSdk 23 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/278
* feat(core): add patch 0015, current Firefox and Safari hellos for REALITY by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/281
* feat(desync): automatic strategy per service by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/282
* feat: Desync-only profile with setup and settings screens by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/280
* feat(core): desync outbound and bridge by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/279
* fix(core): keep the engine's cache file out of non-applying parses by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/283
* docs(operator-api): REALITY client version default is 26.10.29 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/284
* feat(desync): transfer test for automatic strategy selection by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/285
* feat(desync): desync on top of a subscription by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/286
* chore(core): pin desync v0.2.1 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/287
* feat(core): Citrus beta.3 / Xray 26.11.9 client compatibility (chrome155, ML-KEM memo, 26.11.9) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/289
* chore(core): mihomo v1.19.34 (utls v1.9.0-alpha.1, Snell v6) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/290
* fix(core): gRPC frame loop, XHTTP deadlines, quiet share-link warnings (Veles) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/293
* feat(core): REALITY mlkem-client-fingerprint and chrome by default (Veles P7) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/291
* feat(core): fragment-opts splits a proxy's first ClientHello (Veles P19) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/292
* feat(core): opt-in VLESS mux.cool client (patch 0037, from Veles P15) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/294
* feat(core): XHTTP packet-up keeps up to 8 uploads in flight (patch 0038, from Veles P5/P8) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/295
* test(citrus): pin the compat suite to Citrus v1.0.0-beta.3 (b0f91a16) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/296
* feat(core): warn about Snell v6 mode unsafe-raw at config load (patch 0039) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/297
* fix(core): ignore unusable proxy options instead of failing the profile (patch 0040, from Veles) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/298
* fix(ui): one window in Recents, rules Save above 3-button nav, Desync update button, picker spacing by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/300
* chore(release): 1.4.0 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/299


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v1.3.0...v1.4.0

---

Downloads and full notes on GitHub: [v1.4.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.4.0)
