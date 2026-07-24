---
title: "🗡️ SwissKnife for MS Graph v0.8.0"
description: "- Offboarding backup now uses Graph server-side copy: files are copied"
pubDate: 2026-07-24
author: 'Nemu-x'
tags: ['swissknife', 'release']
---

[🗡️ SwissKnife for MS Graph v0.8.0](https://github.com/Nemu-x/SwissKnife-for-MS-Graph/releases/tag/v0.8.0) is out.

### ⚡ OneDrive backup is now cloud-side (much faster)
- Offboarding backup now uses Graph **server-side copy**: files are copied
  entirely inside Microsoft's cloud — bytes no longer transit your machine,
  folders are copied recursively in a single async operation.
  Real-world measure: a 4.7 GB / 936-file OneDrive went from hours to minutes.
- Automatic fallback to the previous download/upload path if the cloud copy
  cannot start; re-runs skip items that already exist in the target.

### ▶️ Live playbook progress
- The **Steps** panel now streams in real time: every step shows a spinner
  while running and a ✓/✗ with details when done.
- The backup step shows the scanned volume up front ("936 files · 4.7 GB")
  and live overall progress ("1.9 GB / 4.7 GB — 41%").
- New **Cancel** button stops the run after the current step.
- Playbook state now lives in the app store: you can switch pages during a
  run and come back — steps, progress and the final report survive; the
  completion toast arrives even from another page.

### 🛡️ Safer offboarding
- Warning next to **Remove all licenses**: without a license the mailbox is
  permanently deleted after ~30 days — convert the user to a shared mailbox
  first to keep mail.
- Warning next to **Delete user** about mailbox/OneDrive loss.

### 💾 Nothing lost on navigation
- One-time secrets (Temporary Access Pass, freshly created app client
  secrets) are kept until you explicitly close them.
- Heavy results (usage reports, expiring-credentials scan, service-principal
  permissions) are cached and restored when you return to the page.

### 📦 Windows installer (NSIS)
- English + Russian installer UI, installs to
  `Program Files\Nemu-x\SwissKnife for MS Graph`.
- Desktop-shortcut component, "launch now" checkbox, running instance is
  stopped automatically before upgrade.
- Uninstaller keeps your data by default; removing profiles, secrets, audit
  log and UI settings is an explicit opt-in.
- Executable renamed to `SwissKnifeGraph.exe`.

### ❤️ Support
- New "Support the project" card in Settings with crypto donation addresses.

### Fixes & internals
- Graph async-operation polling hardened (transient network errors tolerated,
  `waiting` status no longer treated as failure, 2-hour per-item cap).
- Wrapped Graph errors are now recognized by 403/404 helpers.
- All backend events are safe in headless runs (tests/CI).
- New tests: server-side copy (no local transit), playbook cancel, backup steps.

> **Upgrade note:** v0.7.0 installed to a different folder with its own
> uninstaller entry, so installing v0.8.0 does **not** remove it. Please
> uninstall the old version manually (Apps → "swissknife-app") — your
> profiles, secrets and settings are stored per-user and are not affected.
> The next release will handle this migration automatically.


**Full Changelog**: https://github.com/Nemu-x/SwissKnife-for-MS-Graph/compare/v0.7.0...v0.8.0

---

Downloads and full notes on GitHub: [v0.8.0](https://github.com/Nemu-x/SwissKnife-for-MS-Graph/releases/tag/v0.8.0)
