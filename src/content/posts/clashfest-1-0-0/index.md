---
title: "🦥 ClashFest v1.0.0"
description: "A profile can now carry a JavaScript function that rewrites its configuration before the engine loads it — change DNS, rules, proxy groups, anything, without..."
pubDate: 2026-08-19
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.0.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.0.0) is out.

### Config scripts

A profile can now carry a JavaScript function that rewrites its configuration before the engine loads it — change DNS, rules, proxy groups, anything, without editing YAML, and your changes survive every subscription update.

```js
function main(config) {
  config.dns.enable = true
  return config
}
```

It uses the signature other Clash clients already implement, so scripts written elsewhere generally work here unchanged. Find it under **Profiles → ⋮ → Config script**. **Check** runs the script against your real config and tells you what is wrong; **Insert template** gives you a working starting point.

A few things worth knowing:

- **A broken script never costs you a working tunnel.** If a script stops working — say an update removed a key it expected — the app rebuilds the config without it and carries on, so a scheduled update at 3am does not leave you disconnected.
- **The app will not store a script that cannot run**, so a profile never ends up carrying dead code.
- Scripts get the config and nothing else: no file access, no network, no timers. One that runs longer than 3 seconds is stopped.
- The app's own security pass runs *after* your script, so a script cannot weaken it.

Operators who do not want users rewriting the config they serve can send `X-Brand-Lock-Config-Script: true`.

See [Config Scripts](https://github.com/Nemu-x/ClashFest/wiki/Config-Scripts) in the wiki.

### Core updated to mihomo v1.19.30

Brings **ZeroTier** outbound support, AmneziaWG v3.0, H2C and QUICv2 sniffing, a substantially rewritten sniffer, and a long list of DNS and QUIC fixes.

### Every proxy type is recognised again

The app's protocol tables had drifted behind the engine. `zerotier` and `shadowquic` were missing entirely, and `openvpn`, `tailscale`, `gost-relay`, `sudoku`, `dns` and `rematch` were not recognised in the offline node list — those nodes worked, but showed up without a protocol badge.

All of them now render correctly, with colours grouped by protocol family. Also fixed: a ZeroTier node was showing its 16-character network ID where the transport badge belongs.

### Font weight

The bundled faces ship at a light-ish weight that some people find hard to read. **Settings → Theme** now has a Regular / Medium / Semibold / Bold picker. Leaving it alone keeps the app byte-identical to before.

### Refresh before connecting

Optional setting: update the subscription automatically before the tunnel comes up, so you connect with fresh nodes instead of yesterday's.

### Battery

Cut background CPU and radio wakeups — the dashboard no longer keeps work alive when nothing is on screen.

---

**Upgrading:** nothing to do, profiles and settings carry over.

---

Downloads and full notes on GitHub: [v1.0.0](https://github.com/Nemu-x/ClashFest/releases/tag/v1.0.0)
