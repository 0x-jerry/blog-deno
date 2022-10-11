---
title: V2Ray+Nginx+TLS
date: 2019-08-14T07:08:11.906Z
tags: [Nginx, V2Ray, TLS]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

**这是一篇技术性文章，读者需要掌握基础的 Linux 基础，关于安装等一些简单的操作不做详细介绍**

这是一个比较复杂的配置，但是如果拆分开来，也就都一些比较简单的配置堆在一起而已。拆分如下：

1. 申请域名
2. DNS 配置
3. Nginx Https 配置
4. V2Ray 配合 TLS 配置

服务器，博主用的 Debian 10，其它类型服务器大同小异

<!-- more -->

## 域名申请

请自行 Google，不做讲解，假设申请的域名是 `test.v2ray.cn`

## DNS 配置

这里用 [Cloudflare] 的免费 DNS 解析服务，登录上去，添加域名

然后在 DNS 里面配置服务器地址

**这里注意一下** Crypto 里面的配置，由于 Cloudflare 自带 SSL 服务，默认会选择 `Flexible` 方案，这可能会 [导致无限重定向的问题](https://support.cloudflare.com/hc/en-us/articles/115000219871)。所以这里需要改成 `Full(strict)` 方案

然后在对应的域名服务商那里配上 Cloudflare 的域名服务器(nameservers)

到此 DNS 就配置完了

## Nginx Https 配置

DNS 配置完了，当然还需要配置 Https 才行

第一步当然是 [安装 Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)

然后是安装 TLS 证书，这里使用 [Certbot] 傻瓜式一键安装，安装完之后，应该就可以用 Https 访问申请的域名了

## V2Ray 配合 Nginx

这里直接参考 [V2Ray 白话文](https://guide.v2fly.org/advanced/wss_and_web.html#配置)

[cloudflare]: https://www.cloudflare.com/
[certbot]: https://certbot.eff.org/lets-encrypt/debianother-nginx
