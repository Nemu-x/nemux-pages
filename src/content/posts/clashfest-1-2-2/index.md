---
title: "🦥 ClashFest v1.2.2"
description: "Operators can now name the proxy group whose current node the Home Node row, the VPN notification and the profile card show: X-Brand-PrimaryProxyGroup: <grou..."
pubDate: 2026-10-06
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v1.2.2](https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.2) is out.

### Pin the group your node comes from

Operators can now name the proxy group whose current node the Home **Node** row, the VPN notification and the profile card show: `X-Brand-PrimaryProxyGroup: <group name>` (`base64:` prefix for non-ASCII names). It is a policy header, so it works without `X-Branding-Enabled`. Picking a node in another group no longer changes what Home shows, and **Change node** in the notification opens the picker on that group. In Global mode Home shows `GLOBAL`, as before.

Home and the notification also stopped disagreeing about which group to read: they now share one rule.

### Proxy groups as dropdown lists

The node picker has a new button next to the filter that switches between **tabs** and **dropdown lists**. In the dropdown view every group is a row with its current choice; tap it to expand its nodes. Each group has its own latency test. Search, sort and filter work inside every group, and while you search, groups without a match are hidden and the rest open by themselves. Your choice is remembered. Operators can set the default with `X-Brand-ProxyGroupLayout: tabs|dropdown`; once you use the button yourself, your choice wins.

Group tabs are now separated by thin dividers, so long rows of groups are easier to tell apart.

### When was the subscription last updated

Subscription cards show **Updated 2 hours ago** (or **just now**).

This also fixes how the app knew that time. It used to take it from the newest file in the profile folder, and the active config is rewritten on every connect, so "last updated" really meant "last connected". With **Update before connect** on, a profile you connected to every day always looked fresh and was not updated before connecting. It now uses the time the subscription itself was downloaded.

### REALITY works with old and new Xray servers

REALITY nodes now pick the right handshake on their own. Xray 24.x servers drop the X25519MLKEM768 key share, while 26.9.8+ servers require it, and a server never says which kind it is. In **Auto** (the new default) the app tries the classic handshake first, switches after a failure and remembers what worked for each server. **Settings → Network** offers Auto / Always / Never and the REALITY client version reported to servers that check `minClientVer`. This replaces the 1.2.1 on/off toggle; if you had turned it on, it becomes Always.

### Fixes

- Editing a rule no longer drops its options such as `no-resolve` or `src`.
- JSON subscriptions are now hardened like YAML ones (local ports closed, `allow-lan` off), and in-app edits apply to them.
- Live logs no longer leave a native subscriber running after you close them.
- Less background work: the power-button animation runs only while Home is visible, the Settings tab is idle, and the app recovers when it reconnects to its service.
- Ready for Android 16: Back in the profile editor still asks before discarding changes, and Back in Browse files goes up a folder.

### Google Play and F-Droid

ClashFest is on its way to Google Play, and the F-Droid listing is in review. Both will ship the same package, signed with the same key as these GitHub builds, so you will be able to switch between them without reinstalling. Builds from Play and F-Droid are updated by their store and have no built-in update check.

**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v1.2.1...v1.2.2

---

Downloads and full notes on GitHub: [v1.2.2](https://github.com/Nemu-x/ClashFest/releases/tag/v1.2.2)
