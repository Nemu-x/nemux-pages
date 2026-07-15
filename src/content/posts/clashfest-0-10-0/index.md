---
title: "🦥 ClashFest v0.10.0"
description: "Major release: 93 commits, ~35 PRs. Driven by a large security-hardening wave, plus networking features and age encryption."
pubDate: 2026-07-12
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v0.10.0](https://github.com/Nemu-x/ClashFest/releases/tag/v0.10.0) is out.

Major release: **93 commits, ~35 PRs**. Driven by a large security-hardening wave, plus networking features and age encryption.

### 🔒 Security hardening (14+ fixes)
- APK verification before installing updates; SSRF protection in logo/metadata fetching
- Production signing and keystore removed from dev/CI; release steps after signing are safe
- YAML hardening (quoted-key bypass), runtime trust boundaries, path traversal in provider paths
- Geo databases: pinned by commit + SHA-256 (instead of removing/downloading at build time)
- External control now opt-in by default; auth applied before profile load
- ReDoS limits, bounds on untrusted-profile processing, CI/Gradle inputs pinned
- Core → mihomo v1.19.28 (fixes CVE-2026-42505 in crypto/tls)

### 🌐 Network
- **Network-switch reaction** — instant Auto-group failover on Wi-Fi ↔ LTE
- **TUN stack now defaults to System** + operator header `X-Network-Stack` (system/gvisor/mixed/auto)
- Fixed VPN teardown latency (cancel in-flight health checks on reset) — the VPN key clears faster

### 🔑 Profiles
- Age-encrypted subscriptions + on-device key generation; key read from the URL fragment
- REMATCH-NAME rules; userinfo fetch moved to Go; `profile-update-interval` seeded from header

### 🎨 UI / Stability
- Theme architecture rework — fixes dark-theme crash, config-driven DayNight
- soft-recreate — no Android 16 crash on accent/theme changes
- Operator hide-global-mode; many small fixes (exclude-filter, home-node summary, provider prefetch)

------------

## What's Changed
* feat(theme): config-driven DayNight rework + custom accent picker by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/139
* fix(proxy): apply exclude-filter to group member list in the UI by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/140
* fix(home): populate the Node row on connect without opening the picker by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/141
* feat(brand): X-Brand-Hide-Global-Mode operator policy (works unbranded) by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/142
* Home/TUN/branding polish: instant connect-disconnect, subscription tun.stack, operator name fixes by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/143
* fix(import): skip direct prefetch of proxy-gated providers; clear coded fetch errors by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/144
* Chore/core 1.19.28 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/145
* feat(rules): REMATCH-NAME support + unknown proxy-type crash fix by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/146
* Feat/userinfo in go by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/147
* build(ci): vendor kr328 maven artifacts, cache gradle in CI by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/149
* feat(profiles): age-encrypted subscription support + on-device key generation by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/150
* feat(profiles): auto-extract age key from the subscription link fragment; E-30 for undecryptable bodies by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/151
* Feat/soft recreate by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/152
* feat(network): react to default-network switches - instant auto-group failover by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/153
* fix(network): make default-network failover reliable by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/154
* fix(network): serialize deferred switch retries by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/155
* fix(security): exclude age profiles from Android backups by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/156
* fix(security): handle quoted top-level YAML keys in hardener by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/157
* fix(update): verify APK updates before install by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/158
* fix(security): harden brand logo DNS resolution by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/159
* fix(ci): keep production signing out of dev builds by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/160
* fix(security): apply runtime auth before profile load by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/162
* fix(security): sanitize native git version metadata by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/163
* fix(build): remove mutable Maven mirror fallback by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/165
* fix(security): require opt-in for external control by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/166
* fix(security): remove committed release keystore by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/168
* fix(ci): avoid running third-party actions after exposing signing material by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/164
* fix(security): remove assemble-time geofile downloads by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/167
* fix(security): honor HTTP metadata opt-out for cached headers by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/170
* fix(security): harden runtime trust boundaries by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/171
* fix(security): bound untrusted profile processing by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/172
* build(security): pin CI and Gradle inputs by @Rerowros in https://github.com/Nemu-x/ClashFest/pull/173
* fix(core): cancel in-flight health checks on reset to unblock VPN tea… by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/174
* feat(network): default to system TUN stack + X-Network-Stack operator header by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/175
* chore(release): bump version to 0.10.0 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/176


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v0.9.0...v0.10.0

---

Downloads and full notes on GitHub: [v0.10.0](https://github.com/Nemu-x/ClashFest/releases/tag/v0.10.0)
