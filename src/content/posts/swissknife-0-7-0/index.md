---
title: "v0.7.0"
description: "The Offboard playbook now covers the full checklist, not just the basics. New optional steps, each reported individually:"
pubDate: 2026-07-15
author: 'Nemu-x'
tags: ['swissknife', 'release']
---

[v0.7.0](https://github.com/Nemu-x/SwissKnife-for-MS-Graph/releases/tag/v0.7.0) is out.

## ✨ Highlights

### 🚪 Offboarding — all the way
The Offboard playbook now covers the full checklist, not just the basics. New optional steps, each reported individually:
- 📧 **Auto-reply (OOF)** — permanent out-of-office with a custom or default message
- ↪️ **Mail forwarding** — server-side inbox rule to a colleague (survives sign-in block)
- 🙈 **Hide from address lists (GAL)**
- 📅 **Calendar hand-off** — read access for the manager
- 👥 **Remove from all groups** — one report line per group; dynamic/distribution groups fail gracefully

Full sequence: block sign-in → revoke sessions → OOF → forwarding → GAL → calendar → OneDrive backup → groups → licenses → (optional) delete.

### 📄 Bulk / CSV runner
A new page for mass operations driven by a CSV file: **create users**, **assign licenses**, **add to groups**. Column-validated preview, downloadable templates, sequential execution with live progress, cancel between rows, and a per-row success/failure report.

### 🚀 Onboarding accelerators
- 🎫 **Temporary Access Pass** — issue a TAP with configurable lifetime and one-time use; shown once with a **QR code** for easy phone entry during MFA setup
- 🌍 **Guest invitations (B2B)** — invite external users via `/invitations`, with optional invitation email

### 🛡️ Security review (read-only)
A new page for tenant audits:
- **Conditional Access** — all policies with On / Off / Report-only state and full JSON definitions
- **Enterprise apps** — per-app delegated grants (admin vs user consent, scopes) and application permissions

### 🔑 App secret rotation
One click to issue a new client secret on an app registration (complements the existing expiry monitor). The secret is shown once — copy it or lose it, exactly like the portal.

### 🧹 Cleanup got elastic
- Multi-select files with **Select all** and trim version history in bulk with a single typed confirmation
- Scan results **persist after trimming** — no more full re-scan after every action
- Live progress, cancel support, per-file failure reporting

## 📦 Packaging
- 🪟 **Windows**: installer + portable for **x64 and ARM64** (the NSIS installer is back — it was silently missing in v0.6.0)
- 🍎 **macOS**: proper **DMG** for **Apple Silicon and Intel** with drag-to-Applications layout, install notes, and a one-click Gatekeeper quarantine fix
- 🐧 **Linux**: **AppImage**, deb, rpm, tar.gz for **x64 and ARM64**
- 🔏 `SHA256SUMS.txt` signed with minisign, as before

## 🧪 Quality
- 30 Go tests against a fake Graph server (offboarding order & safety, version-trim logic, request bodies, guards)
- Frontend unit tests + an EN↔RU locale-parity gate
- Playwright GUI smoke over the real production bundle
- Optional read-only smoke suite against a live test tenant
- golangci-lint; the release pipeline now refuses to publish without its core artifacts

## 🔧 Fixes
- **About** shows the real version (release tag in CI builds, `x.y.z-dev` locally); the update checker no longer claims a dev build is "the latest version"
- Landing page: real app icon instead of an emoji; download buttons only for assets that actually exist in the latest release
- GitHub Pages & AUR publishing now trigger automatically after each release

## ⚠️ New Graph permissions
The new features need additional Application permissions (+ admin consent): `MailboxSettings.ReadWrite`, `Mail.ReadWrite`, `Calendars.ReadWrite`, `GroupMember.ReadWrite.All`, `UserAuthenticationMethod.ReadWrite.All`, `User.Invite.All`, `Application.ReadWrite.All`, `Policy.Read.All`. See the [Permissions wiki page](https://github.com/Nemu-x/SwissKnife-for-MS-Graph/wiki/Permissions) for the per-feature matrix.

**Full Changelog**: https://github.com/Nemu-x/SwissKnife-for-MS-Graph/compare/v0.6.0...v0.7.0

---

Downloads and full notes on GitHub: [v0.7.0](https://github.com/Nemu-x/SwissKnife-for-MS-Graph/releases/tag/v0.7.0)
