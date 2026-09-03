---
title: "🦥 SlothClash v0.9.2"
description: "ℹ️ You may be asked once to reinstall the helper service after this update. The privileged service only spawns cores whose hash it has pinned, and the core c..."
pubDate: 2026-09-03
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.9.2](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.2) is out.

> ℹ️ **You may be asked once to reinstall the helper service** after this update. The privileged service only spawns cores whose hash it has pinned, and the core changed — on Windows the installer re-pins it silently, on macOS/Linux click the banner and accept the prompt.

**✨ JavaScript config override — the escape hatch the other editors can't cover**
- A profile can now carry a `function main(config, ctx)` that rewrites its generated configuration before the core sees it. It is for everything the extend-config / proxy-groups / rules editors cannot express, because they are declarative and this is not: rename every node matching a pattern, build one group per country, drop nodes by name, apply a tweak only in TUN mode. Open it from a profile's context menu → **Script (JS)**.
- **Preview before you apply.** The preview runs your script through the real generation pipeline twice — with and without it — and shows a side-by-side diff of the two configs plus anything you `console.log`. It writes nothing and does not touch the running connection, so it is safe to press while connected.
- **A broken script can never break your VPN.** Syntax error, thrown exception, endless loop, a value that cannot be written to the config — the script's output is discarded, the configuration is generated exactly as it would have been without a script, and the reason (with line and column) is shown in the editor and badged on the profile. Connecting still works.
- **A script cannot cut the app off from its own core.** The proxy port, the controller endpoint and its secret, and the corporate-VPN split are re-applied after your script runs. Everything else — DNS, TUN, sniffer, rules, proxies, groups — is yours.
- Scripts run in a sandboxed interpreter with no filesystem, network, process or timer access, a fresh state on every run, a 3-second limit and a bounded output buffer. A script can only ever come from your own editor: a subscription, a provider header, a share link or an imported profile can never set one. Full API reference: `docs/SCRIPT_OVERRIDE.md`.

**🐛 Sites felt slower than they should — dead IPv6 addresses handed to apps, fixed**
- On profiles whose TUN section excludes the private IPv6 range (`fc00::/7` — a very common default), the IPv6 addresses we handed out for every domain had no route into the tunnel. Apps still tried them first: the browser burned a full connection timeout on the IPv6 attempt of every dual-stack site before falling back to IPv4, which showed up as pages (YouTube, Google Fonts and friends) taking seconds to pull assets, with nothing in the logs. Measured: `curl -6` hung for 21 s where `curl -4` finished in 0.27 s. We now drop the IPv6 fake-address pool whenever the profile's own routing rules would leave it unreachable, so apps go straight to the working path. IPv6 itself stays enabled and still travels inside the tunnel — nothing leaks.

**🐛 A broken `dns:` section in a hand-edited profile was silently swallowed**
- If a profile's DNS section was malformed (a list where a mapping belongs, typically from a hand-edited merge template), the pre-launch check quietly replaced it with defaults instead of telling you the core had rejected it. The real error is now surfaced.

- **Mihomo core updated to `v1.19.30`.** Brings a security fix in the core's Go TLS stack (CVE-2026-56862) and a TUN fix where hijacked DNS replies could be sent zero-filled or stale. New protocol coverage lands with it: ZeroTier outbound, AmneziaWG 3.0/3.1, an `ip-stack` option for WireGuard/OpenVPN/MASQUE/ZeroTier, H2C and QUICv2 sniffing, `handshake-timeout` for Hysteria2, `client-metadata` for AnyTLS and `rate-limit` for the restls listener. Config generation and the runtime pipeline were verified against the new core.


## What's Changed
* Mihomo core 1.19.30 + IPv6 fake-ip pool routability guard by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/71
* Per-profile JavaScript config override by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/72


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.9.1...v0.9.2

---

Downloads and full notes on GitHub: [v0.9.2](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.2)
