---
title: "🦥 SlothClash v0.9.3"
description: "ℹ️ You may be asked once to reinstall the helper service after this update. The privileged service only spawns cores whose hash it has pinned, and the core c..."
pubDate: 2026-09-20
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.9.3](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.3) is out.

> ℹ️ **You may be asked once to reinstall the helper service** after this update. The privileged service only spawns cores whose hash it has pinned, and the core changed — on Windows the installer re-pins it silently, on macOS click the banner and accept the prompt.

**✨ The tray icon now shows what is actually running**
- Requested by users: like the other Clash desktops, the tray icon changes with the live mode instead of always showing the same sloth. Disconnected: plain icon. Connected with the system proxy set: a green dot. TUN mode: a blue ring. The dot-versus-ring difference is deliberate so the two connected states stay distinguishable on monochrome menu bars. Hovering the icon spells it out ("Sloth Clash · TUN mode"). Windows and macOS.
- New Settings → Appearance option **Tray icon**: system default (colorful on Windows, monochrome template on macOS), colorful, or monochrome. Applies within a second, no restart.

**🐛 "Start minimized", "Auto-connect on startup" and "Close to tray" could silently switch themselves back on — fixed**
- Reported by a user: after enabling all of them, turning them off did not stick (only "Launch on startup" did). Those three toggles were stored only in the embedded browser's local storage, which is written to disk on a delay and only flushed on a clean shutdown: a reboot with the app parked in the tray, an update, or a crash could throw the change away. "Launch on startup" lives in the registry, which is why it was the one that survived. All three now live in the app's own settings file and are written the moment you click, like the rest of the backend settings. Existing values are migrated on first launch; nothing to redo.
- Side effect you will notice: with "Start minimized" on, the window no longer flashes on screen for a moment before hiding — the app now starts hidden natively.

- **Mihomo core updated to `v1.19.31`.** Fixes in the core: Hysteria v1 UDP handling restored, Hysteria2 UDP sessions no longer leak when a connection closes, IPv6 URL parsing in XHTTP, a nil-pointer crash in WireGuard initialisation, a VLESS decryption cleanup panic, AmneziaWG v3 `RandomPaddingAddition` / `DisableCookies`, OpenVPN `tls-auth` HMAC digest, DomainSet wildcard matching with overlapping rules, and a batch of "connection not closed after error" leaks across outbounds (DoQ, mKCP, Snell, KCPTun, TUIC). New: EasyTier outbound, `stack: mips` for TUN, `identity-secret` for ZeroTier. Also lower memory use in gVisor and the config converter, and updated Tailscale (1.102.3), Mieru and Sudoku (0.5.0) libraries. Config generation and the runtime pipeline were verified against the new core.
- **Linux: "Install service" now tells the truth.** The Linux build runs the core in-process and does not talk to the privileged helper yet, so the button used to launch an installer without elevation, trigger a stray password prompt from `systemctl` and then fail with a permission error nobody could act on. It now says that the helper service is not wired on Linux yet and that Proxy mode is the supported path, instead of pretending to install something the app would never use. Privileged TUN on Linux is tracked as its own change.


## What's Changed
* 0.9.3 prep: core 1.19.31, state-aware tray icon, Linux service message, audit fix by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/74
* fix(settings): durable start-minimized / auto-connect / close-to-tray by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/75


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.9.2...v0.9.3

---

Downloads and full notes on GitHub: [v0.9.3](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.3)
