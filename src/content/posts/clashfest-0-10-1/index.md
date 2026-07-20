---
title: "🦥 ClashFest v0.10.1"
description: "This release makes subscription updates more reliable, improves node and proxy-group handling, introduces a secure local proxy panel, and updates the mihomo ..."
pubDate: 2026-07-19
author: 'Nemu-x'
tags: ['clashfest', 'release']
---

[🦥 ClashFest v0.10.1](https://github.com/Nemu-x/ClashFest/releases/tag/v0.10.1) is out.

This release makes subscription updates more reliable, improves node and proxy-group handling, introduces a secure local proxy panel, and updates the mihomo core.

## 🔄 Subscription updates

* **Per-profile “Update via proxy” toggle** (#178)

  Subscription downloads previously always followed the tunnel routing rules. This could break panels that are only accessible outside the tunnel.

  You can now choose the preferred update route for each profile in the full profile editor. The option is enabled by default to preserve the previous behaviour.

* **Automatic route fallback**

  If the preferred route fails in a way that appears to be route-related, ClashFest automatically retries once using the alternative route.

  This also allows profiles with completely dead nodes to recover. Previously, the update request could be sent through those dead nodes and fail indefinitely.

* **Clearer update errors**

  Subscription update failures now explain what actually went wrong.

  ClashFest can now detect and display:

  * ⏳ Expired subscriptions, including the expiration date
  * 🔗 The provider’s support link
  * 📱 Device limit errors
  * 🌐 Server HTTP status errors

  This fixes cases where an expired subscription returned a valid configuration with all nodes removed, causing ClashFest to incorrectly report a missing node.

* **Early validation of server responses**

  Responses that are not valid configurations are now rejected immediately instead of being saved and later failing with a confusing YAML parsing error.

## 🧩 Nodes and proxy groups

* **Denser node picker**

  The node picker header has been reduced from approximately `280dp` to `110dp`, allowing significantly more nodes to fit on screen before scrolling.

  The repeated subscription name and connection status have been removed, while sorting and filtering are now displayed as compact icons.

  Active non-default sorting or filtering options are highlighted, and their current values are available in tooltips.

* **Custom latency target** (#189)

  Long-press the ping button to test latency against a custom website for the current run.

  Keep in mind:

  * 📶 This measures latency, not download speed
  * 🌍 Real websites usually respond slower than the default empty connectivity endpoint
  * ⚖️ Nodes should be compared using the same target
  * 🔁 Automatic `url-test` groups continue using the URL defined in the subscription

* **Proxy-group membership now matches mihomo exactly**

  Offline group previews are now resolved by the core itself.

  This ensures that the following options behave exactly as they do while connected:

  * `include-all`
  * `use`
  * `filter`
  * `exclude-filter`

  This fixes incorrect node counts while disconnected and prevents excluded nodes from appearing in groups.

* **Improved handling of hidden groups**

  Groups hidden by **“Hide non-selectable groups”** no longer appear while disconnected and disappear immediately when the tunnel starts.

## 🌐 Network

* **Local proxy panel**

  A new local proxy panel provides a stable address and credentials that can be copied into another application or container.

  Access is protected by biometric authentication.

  The feature is disabled by default, and strict network hardening remains enabled unless you explicitly turn it on.

## ⚙️ Core

* mihomo updated to **v1.19.29**

## 🧹 Maintenance

* Removed an unused local-proxy IPC implementation
* Removed three permanently hidden views
* Cleaned up additional dead code


## What's Changed
* fix(ui): trust engine group membership, drop offline merge heuristic by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/181
* feat(preview): resolve offline proxy-group membership in the engine by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/182
* feat(network): local proxy panel with credentials by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/183
* chore(core): bump mihomo to v1.19.29 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/184
* feat(subscription): try the other route when the preferred one fails by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/185
* fix(profiles): match the engine's group visibility rule offline by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/186
* feat(proxy-picker): give the node list the room the header was taking by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/187
* chore: drop dead local-proxy IPC and hidden group-type views by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/188
* feat(proxy-picker): long-press ping to measure latency to your own host by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/190
* chore(release): bump version to 0.10.1 by @Nemu-x in https://github.com/Nemu-x/ClashFest/pull/191


**Full Changelog**: https://github.com/Nemu-x/ClashFest/compare/v0.10.0...v0.10.1

---

Downloads and full notes on GitHub: [v0.10.1](https://github.com/Nemu-x/ClashFest/releases/tag/v0.10.1)
