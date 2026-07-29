---
title: "🦥 SlothClash v0.8.1"
description: "⚠️ After updating you'll be asked once to reinstall the helper service (requires helper service 2.4.2+, which powers the TUN recovery below). Click the banne..."
pubDate: 2026-07-29
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.8.1](https://github.com/Nemu-x/SlothClash/releases/tag/v0.8.1) is out.

> ⚠️ **After updating you'll be asked once to reinstall the helper service** (requires helper service **2.4.2+**, which powers the TUN recovery below). Click the banner, accept the UAC prompt — it won't come back.

**🛠️ TUN "Access was denied creating the TUN adapter" — fixed for good**
A force-killed core (an in-app update, a crash, Task-Manager) never deleted its wintun adapter, and the leftover registered adapter made every later connect fail with *"access is denied"* — a state that survived **both a reboot and a service reinstall**, because a registered network device is untouched by either. Now:
- 🧹 The privileged service can force-remove a stale wintun adapter (new `DELETE /tun/remove`) — the one thing the unprivileged app could never do itself.
- 🔁 On a failed connect with that signature, the app removes the leftover adapter and retries automatically — no more manual Device Manager surgery.
- 🚀 After an unclean previous exit, any leftover adapter is cleared at startup, before the first connect.
- 🏷️ The Windows TUN adapter now has a stable name (`SlothClash`) instead of the generic `Meta`, so a fresh adapter never collides with a stale one or a co-installed Clash client. A subscription- or user-set device name still wins; macOS/Linux are unchanged.

**✅ Rules — enable/disable individual rules from the dashboard**
- A checkbox on every row in the Rules table. Turn a rule off and it applies **live** (no manual reconnect) and stays listed so you can turn it back on.
- Works for **both** subscription rules and your own custom ones. A rule-set toggles as a whole.

**🌐 Proxies — reveal hidden groups**
- Proxy groups the subscription marks as `hidden` are collapsed by default. A **"Show hidden"** toggle in the Proxies header reveals them (badged), and only appears when there's something to reveal.

**🔒 Security & dependencies**
- Production dependency audit is now **clean** — patched/removed the flagged packages (js-yaml, dompurify; dropped an unused react-router) and refreshed dependencies within their version ranges.


## What's Changed
* feat(rules,proxies): dashboard rule toggle + hidden proxy-group reveal by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/66
* chore(deps): refresh within-range deps + dompurify override (prod audit clean) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/67
* ci(release): auto release title + notes from Changelog by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/68


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.8.0...v0.8.1

---

Downloads and full notes on GitHub: [v0.8.1](https://github.com/Nemu-x/SlothClash/releases/tag/v0.8.1)
