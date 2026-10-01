---
title: "🦥 SlothClash v0.9.4"
description: "ℹ️ You may be asked once to reinstall the helper service after this update. The privileged service only spawns cores whose hash it has pinned, and the core c..."
pubDate: 2026-10-01
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.9.4](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.4) is out.

> ℹ️ **You may be asked once to reinstall the helper service** after this update. The privileged service only spawns cores whose hash it has pinned, and the core changed — on Windows the installer re-pins it silently, on macOS click the banner and accept the prompt.

**🐧 Linux: the helper service and TUN mode now actually work**
- Until now the Linux build ran the core in-process and never talked to the privileged helper, so TUN had no root path and "Install service" could not do anything useful (reported on Arch/Garuda, issue #73). The Linux app now uses the same helper as macOS over a unix socket: **Install service** asks for authorisation through polkit (`pkexec`), installs a systemd unit that only your user's group can reach, pins the shipped core by hash exactly like on the other platforms, and the app routes the core through it. TUN mode is then available; Proxy mode keeps working without the helper as before.
- No polkit on your system, or the prompt was dismissed? The app shows the exact `sudo …` command to run once instead; the files it points at are kept in the app data directory, not in `/tmp` (which is often mounted no-exec).
- If the service is installed but its socket is not up, you get the same "reinstall the helper service" banner as on the other platforms instead of a bare connection error.

**📦 Linux AppImage is now self-contained and updatable**
- The AppImage bundles GTK and WebKitGTK, so it runs on any distro from Ubuntu 22.04 up without installing `webkit2gtk-4.1` first (the old one needed it from the system). It carries update information, so AppImageUpdate and compatible tools can fetch new releases as deltas, and ships AppStream metadata for app stores. Asset names follow the AppImage convention: `SlothClash-x86_64.AppImage` and `SlothClash-aarch64.AppImage` (the old `SlothClash-linux-*.AppImage` links stop working with this release). Submitted to the AppImage catalog.

**🐛 "Reinstall the helper service" banner did not appear when it was needed — fixed**
- After a core update, macOS users saw a raw `HTTP 503 … does not match any pinned hash` error on Connect and no hint what to do. The app already knew this meant "the helper service is pinned to the previous core, reinstall it", but that flag only reached the banner on the next app start. The banner now appears the moment the condition is detected — at startup, before you even press Connect, or right after a failed connect — with the one-click reinstall.

**🔧 Subscription requests now identify the real core and app version**
- The `User-Agent` on subscription downloads is now `clash.meta/v<core> SlothClash/<version>` (for example `clash.meta/v1.19.32 SlothClash/0.9.4`) instead of a hard-coded `clash.meta/mihomo; SlothClash/1.0`. Panels that pick which protocols to hand out by the client's core version (mikan, among others, gates mieru, sudoku, trusttunnel, shadowquic and Hysteria2 Gecko on it) now receive the right answer. The leading `clash.meta/` is kept on purpose: Marzban and Remnawave select the clash-meta output format by that prefix. If a build has no core version baked in, the UA falls back to `clash.meta/mihomo SlothClash/<version>` rather than inventing a number.

- **Mihomo core updated to `v1.19.32`.** Fixes: effective MSS now accounts for TCP options, a race in AnyTLS idle-session cleanup, OpenVPN `P_DATA_V1` AEAD additional data, sing-mux half-close, a nil dereference when an H2 connection setup is cancelled, mieru inbound UDP user metadata, EasyTier restart after a silent overlay failure, and HWCap detection on Linux. New: `load-balance` `hash-key` to pin a session on the inbound user, `congestion-controller` option for TUN, and the core's own `mips` userspace stack is now the default TUN stack. The TUN settings dialog gained `mips` as an explicit choice; "Default" inherits it on this core.


## What's Changed
* chore(core): mihomo 1.19.32 + mips TUN stack by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/76
* fix(service): reinstall banner on stale core pin by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/78
* feat(subscription): core-aware User-Agent by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/77
* feat(linux): privileged helper service, pkexec install, TUN by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/79
* build(linux): self-contained AppImage for the AppImage catalog by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/80


**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.9.3...v0.9.4

---

Downloads and full notes on GitHub: [v0.9.4](https://github.com/Nemu-x/SlothClash/releases/tag/v0.9.4)
