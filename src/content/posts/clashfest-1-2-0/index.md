---
title: "🦥 ClashFest v1.2.0"
description: "The in-app QR scanner no longer uses ML Kit. It is now a small camera view with the ZXing decoder that was already in the app for Companion pairing, so it wo..."
pubDate: 2026-10-02
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.2.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.0) is out.

### Scan QR codes without Google

The in-app QR scanner no longer uses ML Kit. It is now a small camera view with the ZXing decoder that was already in the app for Companion pairing, so it works on phones without Google Play services and the APK lost the 5 MB native barcode model.

### REALITY keeps working on new Xray servers

Xray-core 26.9.8+ rejects a REALITY handshake that does not offer the X25519MLKEM768 key share. ClashFest now turns on `support-x25519mlkem768` for every REALITY node in your subscription and uses the `chrome` fingerprint when the node has none or one that cannot carry ML-KEM (in the current uTLS only `chrome` can). Nodes inside remote proxy-providers are out of reach for this; ask your operator to set the two fields there.

### Hand-edited config stays edited

Editing a File profile's `config.yaml` through **Browse files** used to be undone on the next connect: the in-app DNS, hosts, tunnels, rules and provider edits were replayed over your text. Your edit now takes over (it already contains them), pressing Back asks before throwing an edit away, and the Files screen says so up front.

### Rules Hub shows when a provider last updated

Each rule source row shows the time of the last successful download next to its interval, as a real date and time, while the VPN is running.

### MIPS, mihomo's own network stack

**Settings → Network → Stack Mode** gains **MIPS Stack (mihomo)**, the pure-Go userspace stack that became mihomo's default in 1.19.32. It can also come from a subscription (`tun.stack: mips` with Stack Mode on Auto) or from an operator's `X-Network-Stack: mips`. The app default stays System. The effective stack is now written to the Logs screen on every connect.

### Fixes

- **DNS & Hosts crashed** when a profile listed several IPs for one host (`test.com: [1.1.1.1, 2.2.2.2]`). The editor reads and writes such entries now; type them as `test.com = 1.1.1.1, 2.2.2.2`.
- **Hide-Routing brand header** works on its own again: three tabs when the operator sets it, Operator in Routing's slot when paired with the Operator tab.
- **Per-profile User-Agent override** was ignored on the very next fetch after choosing a preset; it now applies immediately.
- An untrusted ASN database URL in a subscription was replaced by a country database and broke `IP-ASN` rules; it is now replaced by a trusted ASN mirror.
- The DNS & Hosts toggle no longer says "experimental".
- The Russian "app is broken" screen linked to the upstream repository instead of ClashFest.

### Subscription requests identify the app and the core

Subscription downloads send `mihomo/<core version> ClashFest/<app version>`. Panels that pick the output format by the first token (Marzban, Remnawave) keep serving the Clash Meta format, and panels that gate protocols on the core version (mikan) can now see it. A per-profile User-Agent override still replaces the whole string.

### Smaller APK

The bundled `Country.mmdb` is gone (the core only ever read `geoip.metadb` next to it) and unused post-quantum tables from the certificate library are no longer packaged, together with the scanner change about 8 MB less per architecture (compressed).

### Core updated to mihomo v1.19.32

Highlights from upstream: the MIPS stack is the engine default with a new `congestion-controller` option (cubic / reno / bbr / bbr3), lazy receive buffers and checksum offload for it; CPU feature detection via auxv on Linux (hardware AES/SHA); MSS now accounts for TCP options; fixes for an anytls race, a nil dereference in HTTP/2 transports, sing-mux half-close, EasyTier restart after an overlay failure and mieru inbound UDP; utls 1.8.8, mieru 3.38, sing-tun 0.4.27. Full list: https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.32

---

Downloads and full notes on GitHub: [v1.2.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.0)
