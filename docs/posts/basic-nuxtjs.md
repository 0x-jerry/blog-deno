---
title: NuxtJS 初识
date: 2020-03-28T07:13:46.000Z
tags: [SSR, Vue, NuxtJS]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

NuxtJS 框架是一款基于 Vue.js 的渐进式框架，主要整合了 Vue.js 的 SSR 功能，提供了很多服务端渲染的功能，以及开箱即用的打包等配置。

NuxtJS 中提供两种方式 SSR 或者 SPA 的方式:

- SPA: 普通的单页应用模式，仅仅是处理了路由导航，Vue 的 history 模式。
- SSR: 服务端渲染，同构模式，服务端提前渲染，然后和配合客户端的路由合并（优势）

<!-- more -->

NuxtJS 也就在使用 SSR 模式的时候具有很多优势，如果是普通的 SPA，则可以用前后端分离开发模式更方便。

NuxtJS 的应用场景可以是需要 SEO 优化，需要减少渲染时间的网站。一般来说，这两个需求是在一起的。

如果没有以上的两个需求，则不需要使用 NuxtJS，使用 Vue.js 的 SPA 模式，配合动态路由，普通场景下也能满足需求。

记录一下 VueJS 的 SSR 流程:

1. 服务端预渲染开始，暂停数据响应式，服务端不需要响应式
2. 传入需要预渲染需要的 data，或者使用 Vuex
3. 根据 VueRouter 匹配路由组件
4. 预渲染整个 App，输出 html
5. 客户端接受 html 以及客户端 js
6. 客户端混合 html 和 js，使 app 的数据具有响应式
