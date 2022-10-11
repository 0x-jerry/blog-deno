---
title: Docker 编译 ScratchBlocks
date: 2019-04-26T21:51:30.459Z
tags: [Docker, Linux]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

## 简介

很久之前就研究过 Docker，苦于一直没有找到应用场景（毕竟经常写的是前端）

最近在研究 `Scratch-Blocks` ，每次打包都需要在虚拟机里面打包（因为需要 Python 和 Java 环境），还比较慢。
今天就尝试了一下是不是可以用 Docker 来打包，这样就可以直接挂服务器上一键打包了。结果是肯定的，当然没问题

## Dockerfile

既然是 Docker， 那第一步肯定是写 Dockerfile 和 Dockerignore 了，Dockerignore 根据项目写就完了，语法和 gitignore 一样

<!-- more -->

需要注意的是，要缓存 node_modules，所以在执行 build 命令之前需要先单独复制 yarn.lock 文件，然后执行 `yarn install --ignore-scripts` 达到缓存 node_modules 的目的

这是因为 `RUN, COPY, ADD` 指令每次都会创建中间容器（缓存用），这样每次 yarn.lock 改变才会执行 `yarn install` 命令，这样也就达到了缓存 node_modules 的目的

有时候可能还需要 `package.json` 文件，这里也加上

```Dockerfile
# linux core, only 5M
FROM alpine

WORKDIR /app

# install nodejs python java
RUN apk update && apk add python nodejs yarn openjdk8

# cache node_modules accord by yarn.lock
COPY yarn.lock /app
COPY package.json /app
RUN yarn install --ignore-scripts

COPY . /app

# build
RUN yarn build
```

然后打包 `docker build --rm -f "Dockerfile" -t scratch-blocks:latest .`，收工完成

文中提到的命令以及参数请参考 [docker build 文档](https://docs.docker.com/engine/reference/commandline/build/)、[Dockerfile 文档](https://docs.docker.com/engine/reference/builder/)
