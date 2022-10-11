---
title: 设计一个像 hexo 的博客系统(3)
date: 2021-09-28T03:11:43.000Z
tags: [blog, system-design]
---

接 [前篇](./design-blog-system-2.md)，在利用 `Vite` 系统的虚拟文件时，碰到一些小问题。所以抛弃虚拟文件，
采用直接生成文件的方式，这样肯定在开发的时候，肯定会慢一点点，利用缓存等技术，影响倒也还能接受。

## 为什么抛弃虚拟文件

<!-- more -->

要回答这个问题，先看看 `v-blog` 目的，`v-blog` 的目的就是为了利用更加现代化的系统来开发博客系统。

在开发的时候，尝试去实现一个 `layout` 的功能，使用方式 [Hexo:layout]。

初步尝试，是利用 [vite-plugin-pages] 以及 [vite-plugin-vue-layout] 这两个插件，但是 [vite-plugin-pages] 处理 `route` 自定义块
是用 `fs` 读取文件的方式，也就是说，无法利用虚拟文件的方式，去生成 `route` 自定义块。

考虑到之后，可能还有类似使用 `fs` 读取文件的插件。因此，放弃使用虚拟文件的方式，采用直接生成文件。

## 下一步

现在已经比较可以确定，是可以实现的。

目前的方案：监听特殊的文件夹，例如 `posts` 文件夹，借鉴 `vite-plugin-md` 的转换方式，把 `md` 文件，动态转换成 `vue` 文件。

未完待续...

[hexo:layout]: https://hexo.io/docs/front-matter#Settings-amp-Their-Default-Values
[vite-plugin-pages]: https://github.com/hannoeru/vite-plugin-pages
[vite-plugin-vue-layout]: https://github.com/JohnCampionJr/vite-plugin-vue-layouts
