---
title: Cloudflare 加速 Github Pages
date: 2019-12-19T04:29:17.273Z
tags: [CDN, Domain]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

由于墙的原因，国内访问 Github Pages 的速度就是个迷，那么如何利用 CDN 加速呢？

## 准备工作

- 域名 (https://my.freenom.com/ 可申请免费域名)
- Cloudflare 账号
- Github Pages 设置

<!-- more -->

## 相关配置

就拿本域名来举例子，`xligem.ml`，对应原来的 Github Pages `cwxyz007.github.io`

在 Cloudflare 中添加域名，然后在 freenom 中设置 nameserver

在 Cloudflare 的 SSL/TLS -> Edge Certificates 中，打开 Always Use Https

在 Cloudflare 的 DNS 中添加 CNAME -> @, cwxyz007.github.io

在 Github Pages 的仓库设置中，找到 Custom domain，修改成 xligem.ml

然后就完成啦，现在通过 xligem.ml 访问 Github Pages 就会有 Cloudflare 的加速效果
