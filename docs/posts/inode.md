---
title: Linux 下 iNode 解决方案
date: 2017-09-19T01:04:54.000Z
tags: [iNode, Linux]
license: CC BY-NC 4.0
---

由于学校的 iNode 客户端 Linux 版太古老了，安装起来遇到各种各样的问题。所以就在
github 搜了一搜，看有没有什么开源的 iNode 的替代品。结果就让我找到了！

开源的 iNode 替代品 [njit8021xclient](https://github.com/liuqun/njit8021xclient/blob/master/ReadMe.html)。

## 安装

按照 [install.html](https://github.com/liuqun/njit8021xclient/blob/master/Install.html) 编译安装。

编译的时候注意**第一次**需要**先**在 `njit-clinet` 项目的根目录下运行命令

<!-- more -->

```bash
autoreconf --install
```

然后安装说明编译安装就行了。

不同的 Linux 版本 `autoreconf` 可能不同，可自行搜索安装。

## 运行

```bash
iwconfig #查看网卡
sudo njit-client 用户名 密码 网卡 #可在后面添加 & 符号，使其后台运行。
sudo njit-client 用户名 密码 网卡 &
```

网卡需要输入你电脑连上的那个网卡。有时候是**无线**的网卡，有时候是**有线**的网卡。

## 其他相关

### 自动获取 IP

可能还需要设置自动获取 ip，设置方式：
打开网络连接设置。找到设置面板。然后在 IPv4 设置中选择 DHCP 模式。

如图：

![设置网卡](./inode/dhcp.png)

### 修改 dns

```bash
#临时修改 dns
sudo vim /etc/resolv.conf #修改 nameserver 后面的地址就好了。
```

也可以直接在设置面板里面设置 dns，设置如图：

![设置 dns](./inode/dns.png)

在 Additional DNS servers 后面填上 dns 地址即可。我填的的是阿里提供的 DNS 地址。
