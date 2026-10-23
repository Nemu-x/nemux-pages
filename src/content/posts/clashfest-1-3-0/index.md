---
title: "🦥 ClashFest v1.3.0"
description: "A remote for your TV, a real Android TV interface, core 1.19.33 and Citrus compatibility."
pubDate: 2026-10-23
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.3.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.3.0) is out.

A remote for your TV, a real Android TV interface, core 1.19.33 and Citrus compatibility.

## 📺 New — Control your TV from your phone

Pair your phone with ClashFest on an Android TV and drive it from the couch, **without a VPN on the phone**.

- **Pair in seconds.** On the TV, **Settings → Remote control** shows a big QR code and a PIN; scan it from the phone, then **Control a TV**.
- **A remote that looks like Home.** Power, live speed, Rule / Global, active profile and node — plus the same node picker with latency tests.
- **More when you need it.** Profiles, connections, providers, safe settings (IPv6, TUN stack) and actions like **Health check** and **Reconnect**.
- **Always in sync.** The remote presses the TV app's own buttons, and anything changed on the TV shows up on the phone instantly.
- **Clean exit.** **Forget TV** unpairs it even when the TV is offline.

## 🛋️ New — A real Android TV interface

- **Built for the remote.** Left rail instead of the bottom bar, two-column Home, node picker as a side panel, clear D-pad focus everywhere, overscan-safe margins.
- **Simpler by default.** Things that can't work on a TV (camera scan, clipboard, copy buttons) are gone; power tools — rules editor, proxy chain, config editors, Browse files — wait behind **Settings → Advanced tools on TV**.

## 🍊 New — Citrus compatibility (experimental)

ClashFest stays on **vanilla mihomo**, but now understands configs written for the [Citrus](https://github.com/getmikan/Citrus) core.

- **New transports and groups.** VLESS over **XDrive** (client side) and **`type: chain`** groups with per-hop health checks.
- **REALITY extras.** Per-proxy `client-version` and `mldsa65-verify`, Xray fingerprint names, comma-separated pins and names, ECH in the Xray forms.
- **Tuning keys.** OpenVPN server identity, `disable-mtu-discovery` (Hysteria2, MASQUE), `tcp-connect-timeout`, `sniffer.skip-threshold`, `dns.serve-expired`.
- **Panels can tell.** The subscription User-Agent lists these features, so providers serve them only to clients that support them.

## ⚙️ Core — mihomo 1.19.33

- **Security fix** in crypto/tls (CVE-2026-97031).
- Fake-IP pool fix, rewritten dialer-proxy loop check, sub-millisecond latency results, newer WireGuard and mieru.

## 🎯 Node picker polish

- **Stays open.** A short pull no longer closes it; visible handle, fixed height (no jump on first open), sticky group header.
- **Reads at a glance.** Collapsed groups show their current node; protocol badges are one capsule (`VLESS · WS · TLS`) with a new TLS badge; Hysteria2 / TUIC show QUIC; latency is a tinted pill.

## 🛠️ Fixes

- **Operator headers apply on every update.** Network stack, share-links lock and bypass preset no longer lag by hours, and a header the provider removed is cleared. If the stack changes, the app asks you to reconnect.
- **Fresh groups after an update** instead of stale members in the picker.
- **Deleting the active profile** switches to another one instead of leaving none selected.
- **No more garbled profile names** like `>��iS�`.
- **Scheduled auto-update fires again** — it now counts from the last download, not the last connect.
- **App Routing shows preinstalled apps** such as Gemini, Chrome, YouTube and Gmail.
- **GeoIP / GeoSite rules work in the Google Play build** — the databases are bundled now.
- **Edge-to-edge on Android 15+** uses the current APIs.

## 🏪 Google Play & F-Droid

ClashFest is live on [F-Droid](https://f-droid.org/packages/com.nemu.clashfest.clash.alpha/) and **approved on Google Play**. All channels ship the same package and signing key, so you can switch without reinstalling.

---

🧪 Tested on-device: Moto razr 40 (Android 15) and Android TV emulators, against real and lab subscriptions.

## What's Changed
* chore(fdroid): recipe for 1.2.2 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/251
* ci(play): export the release key for Play App Signing with PEPK by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/252
* build(play): minSdk 24 for the Play bundle by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/253
* docs(operator-api): sync headers.md with the wiki for 1.2.2 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/254
* fix(build): bundle geo databases into the Play .aab too by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/255
* chore(fdroid): sync the recipe with the reviewed MR by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/256
* docs(readme): Get it on F-Droid by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/257
* feat(picker): node-picker polish from TG feedback by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/258
* chore(design): split ProfileAdapter into focused files by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/259
* chore(service): split ProfileManager into focused files by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/260
* chore(main): split MainActivity into focused files by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/261
* chore(design): split MainDesign into focused files by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/262
* fix(subscription): apply operator policy headers on every update by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/263
* fix(picker): refresh group members after the engine reloads a profile by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/264
* feat(core): Citrus compatibility on vanilla mihomo (XDrive, chain, REALITY extras) as patches 0003-0014 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/265
* fix: active profile on delete, garbled names, auto-update timing by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/266
* feat(companion): remote buttons — control a paired TV from the phone by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/267
* chore(core): bump mihomo to v1.19.33 (crypto/tls CVE fix) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/268
* docs(agents): core bump uses go list -mod=mod, never go mod tidy by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/269
* feat(tv): proper Android TV layout — left rail, two-column Home, side-panel node picker, D-pad focus by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/270
* feat(tv): second TV pass — 10-foot remote control, operator tab, polish, and a simpler TV by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/271
* chore(companion): track the protocol's main branch by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/272
* fix(app-routing): list preinstalled apps that have a launcher icon by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/273
* fix(ui): opt into edge-to-edge and drop deprecated window APIs by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/274
* chore(release): 1.3.0 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/275


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v1.2.2...v1.3.0

---

Downloads and full notes on GitHub: [v1.3.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.3.0)
