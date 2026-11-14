---
title: "🦥 SlothClash v0.10.1"
description: "ℹ️ You may be asked once to reinstall the helper service after this update: the core changed. On Windows the installer handles it; on macOS and Linux click t..."
pubDate: 2026-11-14
author: 'Nemu-x'
tags: ['slothclash', 'release']
---

[🦥 SlothClash v0.10.1](https://github.com/Nemu-x/SlothClash/releases/tag/v0.10.1) is out.

> ℹ️ **You may be asked once to reinstall the helper service** after this update: the core changed. On Windows the installer handles it; on macOS and Linux click the banner and accept the prompt.

**🧩 XHTTP: share links with data in headers work**
- XHTTP nodes that send upload data in request headers or cookies (`uplink-data-placement: header` or `cookie`) without an `uplink-data-key` now use the standard names `X-Data-0`, `X-Data-1`, ... (`x_data_0`, ... for cookies), as Xray servers expect. Before, such nodes sent headers named `-0`, `-1` and never connected; share links leave the key out when it is the default, so they were affected. Nodes with an explicit key are unchanged.

**🔒 XDrive: templated storage refused**
- XDrive nodes with `service: template` are now refused, like `service: local` already was, wherever they come from: subscriptions, providers, manual and local profiles. A template lets the config choose the method, address, headers and body of HTTP requests sent from your computer, including to devices on your local network, as soon as a node is tested. Such a node keeps its name but shows as disabled and carries no traffic; Google Drive XDrive nodes are unaffected.

**🔧 Fixes**
- VLESS over XDrive: one slow or cancelled connection no longer breaks every other connection sharing the same XDrive session; a session whose storage stops accepting writes for 30 s is dropped and replaced; idle sessions close after 16 s instead of polling the storage forever. Storage HTTPS now trusts the same certificate roots as the rest of the core.
- An XDrive node on a storage service this app does not run (anything but Google Drive, for example `s3` from newer Xray or a misspelled name) no longer makes a whole subscription or provider fail to load; the other nodes work. In profiles the app builds, that node shows as disabled (REJECT); in providers the core downloads itself, it fails when used with `xdrive service "s3" is not supported by this build` and sends nothing over the network.
- The subscription `User-Agent` now says which Citrus release the client is compatible with, the way Citrus itself does: `clash.meta/v1.19.34 citrus/v1.0.0-beta.3 SlothClash/0.10.1`. Panels that serve Citrus features by the `citrus/` token now recognise SlothClash; the capability list in brackets is gone. The `clash.meta/` prefix and the core version stay first, so format and protocol selection on other panels is unchanged.
- gRPC proxies: a server that sends a long run of empty gRPC frames can no longer crash the core (the reader used to call itself once per frame); a frame whose payload length is larger than its message is now refused.
- XHTTP: read and write deadlines are now separate and only end an operation that is still running when they pass. Before, any deadline closed the whole connection even while it was idle, and setting one direction moved the other, which could drop idle multiplexed (smux, yamux) sessions over XHTTP.
- A broken `vless://` or `vmess://` link in a subscription the core downloads itself no longer writes the whole link, with its UUID and keys, to the log; the warning names only the server and the node.
- A config or subscription with `external-ui: ./` (or any directory that holds the core's own files) no longer makes the core serve its working directory, the running config with its secret and node credentials included, at `/ui` without the controller password. The dashboard is turned off for such a config with a warning in the log; dashboards in a subdirectory such as `ui` work as before.
- Closing an inbound listener (SOCKS, HTTP, mixed, Shadowsocks, VMess, VLESS, Trojan and others) while its accept loop was still running was a data race in the core. No crash or wrong behaviour from it has been seen; it showed up only in the core's own race-detector tests, where a listener is closed twice. The flag the two sides share is now synchronized.
- A node with a malformed per-proxy `reality-opts.client-version` no longer makes the whole subscription fail to load: the value is ignored with a warning in the core log and the node uses the global REALITY client version. The same goes for the new `fragment-opts`, `mux.cool` and `reality-opts.mlkem-client-fingerprint` keys below; only `reality-opts.mldsa65-verify`, which pins the server's identity, still fails the config when it is wrong.
- Windows: on small or high-scaling screens (for example 1920×1080 at 150%, or 1366×768 at 125%) the main window no longer opens with its title bar above the top edge of the screen, where it could not be moved or closed. The window is shrunk to fit the screen; large screens keep the usual size. Thanks to @Intteger157.

**🛰️ Core: stock configs behave like stock mihomo**
- REALITY's automatic post-quantum key-share choice no longer flips on network trouble. Only a server that actually answered with its cover site's certificate counts as a key-share mismatch; timeouts, resets and dial errors are ignored, so a flaky network can no longer switch an older Xray server to the post-quantum share and break it.
- REALITY never replaces your fingerprint with Chrome's any more. `firefox` and `safari` use their current post-quantum hellos when a server needs one; other fingerprints (`ios`, `edge`, random) send their own hello unchanged. With `reality-mlkem: off`, `support-x25519mlkem768` behaves exactly as in stock mihomo.
- The `/proxies/{name}/delay` API answers as in stock mihomo again (stock timeout handling, `504 {"message":"Timeout"}`, latency reported for an unexpected status). The detailed errors the app's own probes use are opt-in with `detail=1`.
- `client-fingerprint` names of stock mihomo are case-sensitive again (as in stock mihomo); only Xray-only names such as `HelloChrome_131` are matched case-insensitively.
- Quieter logs: the REALITY policy line on every config load and the OpenVPN "no server identity check" note are now debug-level; failed delay tests no longer write warnings.

**🛰️ REALITY: Xray 26.11.9 and the Chrome 155 fingerprint**
- New `client-fingerprint` names `chrome155` and `hellochrome_155`: the Chrome 155 hello that Xray 26.11.9 and Citrus beta.3 send by default, checked against a real Chrome 155 capture. `chrome` itself stays Chrome 133, as in stock mihomo (`chrome133` names it explicitly); Xray's `hellochrome_auto` now means Chrome 155, as in Xray.
- REALITY reports client version `26.11.9` by default (was `26.10.29`), the Xray release the core is checked against. It only matters for servers that set `minClientVer` / `maxClientVer`; an explicit `reality-client-version` still wins.
- Automatic post-quantum key-share choice now also learns servers that drop the connection instead of answering (for example when the server's cover site is unreachable): after three such failures in a row it tries the other key share once and keeps it if it works. Such failures still never switch a server that has already been confirmed.
- New `reality-opts.mlkem-client-fingerprint`: the fingerprint a REALITY proxy uses only for handshakes with the post-quantum key share, for example `firefox` on a proxy whose `client-fingerprint` is `ios` (which has no such share and cannot reach Xray 26.9.8+ servers otherwise). A fingerprint without the share, or an unknown one, is ignored with a warning in the core log and the proxy loads as if the key were not set. Without the key nothing changes.
- REALITY nodes without a `client-fingerprint` (for example share links with no `fp=`) now connect with the `chrome` fingerprint, as Xray clients do, instead of failing every connection with "REALITY is based on uTLS, please set a client-fingerprint". `chrome` stays Chrome 133 here. `client-fingerprint: none` still fails as before, and nodes with an explicit fingerprint are unchanged.

**🛰️ Mihomo core updated to `v1.19.34`**
- New in the core: Snell v6 (`version: 6` with `mode: default`, `unshaped` or `unsafe-raw`; v6 needs a PSK of 12 to 255 bytes), several users on a Shadowsocks listener, `tcp-idle-timeout` for the mieru listener. Fixes: bytes an HTTP proxy sends right after its `CONNECT` answer are no longer lost, SSH clients close when the connection breaks, TUN auto-route rules, an overflow in SOCKS domain lengths, `httpupgrade` share links, EasyTier data-plane stalls, a proxy-provider without its own `age-secret-key` falls back to the global one, and TCP Fast Open on current Go releases.
- A Snell v6 node or listener with `mode: unsafe-raw` still loads, as in stock mihomo, but the core now logs a warning for it when the config loads: this mode does not use the PSK, so there is no authentication and no encryption and the traffic is plaintext; an `unsafe-raw` listener is an open proxy. Use `default` or `unshaped`.
- The TLS fingerprint library moved to a new major version: `firefox` is now Firefox 148 and `safari` Safari 26.3, both with the post-quantum key share, exactly as in stock mihomo `v1.19.34`. Sloth Clash's own copy of these two hellos is gone. With `reality-mlkem: off` and `support-x25519mlkem768: true`, `firefox` and `safari` now send the post-quantum share, as stock mihomo does.
- The core is built with Go 1.26.11 (was 1.26.10), which fixes GO-2026-6859 in `net/http`; the app itself already moved to it.
- `client-fingerprint: hellofirefox_148` and `hellosafari_26_3` (Xray's names, as in share links) now send the real Firefox 148 and Safari 26.3 hellos, the same ones `firefox` and `safari` now send. Before, they fell back to Firefox 120 and Safari 16.0, which have no post-quantum key share.

**🧩 More Citrus configs work**
- `tls.ca-roots` (`both`, `bundle` or `system`) chooses which root certificates the core trusts: with `bundle` it uses only the built-in Mozilla list and ignores certificates installed on the device. `tls.ca-denylist: true` refuses connections whose certificate chain goes through a state interception CA (Russian Trusted Root / Sub CA, Kazakhstan's Qaznet and ISCA roots). Both are off unless the config sets them; the built-in list adds about 200 KB to the core.
- `geox-sha256` pins the GeoIP, GeoSite, MMDB and ASN databases by SHA-256: a download with another hash is refused and the previous file is kept. Without a pin nothing changes.

**✂️ Splitting the TLS hello (`fragment-opts`)**
- New per-proxy `fragment-opts` (`packets`, `length`, `delay`, `max-split`, as in Xray's `fragment`): splits the TLS hello of a proxy's connections into small pieces, so networks that block by reading the server name from the first packet cannot read it. VLESS and VMess share links with Xray's `fm` parameter get the same setting. A block the core cannot use is ignored with a warning in the core log; the node loads without splitting instead of failing the whole subscription. Off unless a proxy sets it.
- VLESS links the app converts itself (a pasted link, or a subscription that is a list of links) now keep the `fm` fragment setting too, with the same values and checks as the core; before, the app dropped it. An `fm` that does not parse is left out, the node still imports.

**⚡ Faster downloads, less memory per connection**
- Downloads through TLS-based proxies (Trojan, VLESS and VMess over TLS, REALITY) are faster and use less CPU: the core now decrypts ahead while it writes and sends what it has decrypted in one write instead of one per TLS record. In a local benchmark 16 parallel Trojan downloads went from 2.1 to 2.9 GB/s with about a quarter less CPU per GB; a single download was about 18 % faster.
- An idle connection through such a proxy holds about 22 KB less memory (2000 idle Trojan connections: 140 MB → 96 MB). Shadowsocks, uploads and `DIRECT` connections behave as before.
**🚀 XHTTP packet-up: faster upload**
- In `packet-up` mode the core no longer waits for the server's answer to each upload request before sending the next one: like Xray's own client, it keeps up to 8 requests in flight, and the first data after a pause goes out at once instead of after `sc-min-posts-interval-ms`. In our lab upload got up to a third faster with no added delay, 60-80 % faster with a 30 ms round trip and about a quarter faster with 100 ms (Xray 24.12.31 and 26.11.9, Citrus); behind an nginx HTTP/2 front with a 50 ms round trip it went from 9 to 56 Mbit/s. Works with every Xray server from 24.12.31 on, Citrus and mihomo, including servers with a lowered `sc-max-buffered-posts` (down to 7, 8 for Citrus). Nodes with `alpn: [http/1.1]` keep waiting for each answer.

**🔀 VLESS: Xray mux (`mux.cool`)**
- New opt-in `mux.cool` block on VLESS nodes (`enabled`, `max-concurrency`, `max-connections`, `max-carriers`, `xudp-concurrency`, `xudp-proxy-udp443`, the same names as in Veles): the node's TCP connections and UDP share a few VLESS connections the way Xray's `mux` does, with UDP as XUDP. UDP to port 443 (QUIC) is refused by default so browsers fall back to TCP; `allow` carries it over the mux, `skip` sends it over a plain connection. It cannot be combined with `smux`, a Vision `flow` or XDrive: on such a node, or with values the core cannot use, the block is ignored with a warning in the core log that names the conflict, and the node works without the mux. Nodes without the block are unchanged.


## What's Changed
* fix(xdrive): refuse service template everywhere, like service local by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/132
* fix(xdrive): per-stream Mux.Cool failures, idle close, unknown storage handling by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/133
* fix(core): keep stock behaviour for stock config keys by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/136
* feat(subscription): advertise Citrus compatibility in the User-Agent by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/134
* Citrus dev sync: suite at 62d1f567, tls.ca-roots/ca-denylist and geox-sha256 patches by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/135
* test(core): Citrus interop lab by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/137
* fix(core): default the XHTTP uplink data key to X-Data by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/138
* fix(core): load XDrive nodes with an unsupported service, fail them on dial by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/139
* fix(deps): build the app with go1.26.11 (GO-2026-6859) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/143
* test(citrus): sync the compat suite and the Citrus lab with Citrus beta.3 candidate (22da58f1) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/140
* feat(core): Chrome 155 hello, REALITY client version 26.11.9, ML-KEM probe after silent handshakes by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/141
* chore(core): mihomo v1.19.34 (utls v1.9.0-alpha.1), drop 0024 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/142
* build(core): build the core with Go 1.26.11 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/144
* fix(core): hellofirefox_148 and hellosafari_26_3 send the real Firefox 148 and Safari 26.3 hellos by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/145
* feat(core): REALITY mlkem-client-fingerprint (patch 0031, from Veles) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/146
* feat(core): per-proxy ClientHello fragmentation, fragment-opts (patch 0032, from Veles) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/147
* fix(core): gRPC frame reader loop, XHTTP per-direction deadlines (patches 0033, 0034, from Veles) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/148
* fix(core): no share-link credentials in the core log (patch 0035, from Veles) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/149
* fix(core): external-ui never serves the core's own directories (patch 0036, from Veles) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/150
* feat(sharelink): map Xray fm fragment to fragment-opts in vless links by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/151
* fix(core): listener closed flag without a data race (patch 0040) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/153
* perf(core): relay waits on a small buffer and batches download writes (0038) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/155
* feat(core): REALITY without client-fingerprint dials as chrome (0041) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/156
* feat(core): opt-in VLESS mux.cool client (0039) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/152
* feat(core): XHTTP packet-up keeps up to 8 uploads in flight (0037) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/154
* test(citrus): pin the compat suite and the Citrus lab to Citrus v1.0.0-beta.3 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/157
* feat(core): warn about Snell v6 mode unsafe-raw at config load (0042) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/158
* test(citrus): Snell v6 case accepted with mihomo v1.19.34 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/159
* test(desync): Desync-only refusal test owns its profile directory by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/162
* fix(desktop): keep the Windows title bar on screen at high DPI scaling by @Intteger157 in https://github.com/Nemu-x/SlothClash/pull/160
* fix(core): ignore unusable proxy options instead of failing the profile (0043) by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/161
* chore(release): 0.10.1 by @Nemu-x in https://github.com/Nemu-x/SlothClash/pull/163

## New Contributors
* @Intteger157 made their first contribution in https://github.com/Nemu-x/SlothClash/pull/160

**Full Changelog**: https://github.com/Nemu-x/SlothClash/compare/v0.10.0...v0.10.1

---

Downloads and full notes on GitHub: [v0.10.1](https://github.com/Nemu-x/SlothClash/releases/tag/v0.10.1)
