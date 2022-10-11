---
title: 设计一个像 hexo 的博客系统(1)
date: 2021-09-26T07:37:40.000Z
tags: [blog, system-design]
---

本文尝试设计一个博客框架，以解决在使用 [Hexo] 时不痛快的点。

## 为什么造轮子

[Hexo] 是一个偏向传统的博客系统，通过模板系统，把每一篇文章渲染出来。主题，插件都非常多。也非常优秀。

既然 [Hexo] 有这么多优点，为什么还要造轮子呢？

几年前也写过 [Hexo] 主题 [hexo-theme-simple]，后来也不维护了。原因比较简单，我更加喜欢用 `Vue` 来写前端，用 `JQuery` 配合模板来写，总是写的碍手碍脚的。

前不久，尝试用 [vite] 配合 [vite-ssg]，重构了一次博客，效果还不错。

用起来舒服了很多，但是也遇到一些问题，例如 **分页** 就没有很好的解决方案。

先尝试以前后端分离 + `SSG` 的方式来设计一套博客系统。

<!-- more -->

## 简介

为了方便描述，暂定名称 `v-blog`。

`v-blog` 的诞生时为了让静态博客能利用更加现代化的系统来开发，如 [vite]。

## `v-blog` 系统设计

初步想法，采用 **前后端分离** 的方式。

一个 `main-server` 服务器，用于处理 `markdown` 文件，以及分页等信息。

一个 `render-server` 服务器，用于服务端渲染/生成，开发时，用作服务端渲染，部署时，用作服务端生成。

### main-server 设计

`main-server` 仅提供 API 供 `render-server` 消费。可采用 `koa` 的洋葱模式，提供插件开发。

核心提供 `markdown` 文件处理，分页信息，标签信息，以及默认渲染。

### render-server 设计

`render-server` 由 [vite] 驱动，主要提供一些插件，以提供更好的开发体验。

## 实践

先记录一下这个想法，接下来尝试做一个验证，追踪地址： [v-blog-system](https://github.com/0x-jerry/v-blog-system)

[hexo]: https://hexo.io/
[hexo-theme-simple]: https://github.com/0x-jerry/hexo-theme-simple
[vite]: https://vitejs.dev
[vite-ssg]: https://github.com/antfu/vite-ssg
