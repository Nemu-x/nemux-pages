---
title: "🦥 SlothClash v0.9.1"
description: "🐛 Auto-connect on startup could hang on \"connecting\" — fixed"
pubDate: 2026-08-08
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.9.1](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.1) is out.

**🐛 Auto-connect on startup could hang on "connecting" — fixed**
- With **Auto-connect on startup** enabled, the connection could get stuck on "connecting" after launch. A background startup task claimed a connect "generation" *after* the auto-connect had already fired, which aborted the auto-connect's attempt and left the status hanging. The startup ordering is fixed so auto-connect — and a fast manual Connect — can no longer be superseded that way, and auto-connect now waits for the background boot to settle before firing and retries only on a real failure. (Auto-connect is off by default; only users who enabled it were affected.)


## What's Changed
* Release 0.9.0 - Corporate VPN, IPv6 leak fix, reliability by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/70


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.9.0...v0.9.1

---

Downloads and full notes on GitHub: [v0.9.1](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.1)
