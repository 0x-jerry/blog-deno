---
title: 设计一个像 hexo 的博客系统(2)
date: 2021-09-27T02:16:47.000Z
tags: [Blog, System Design]
---

[前篇](./design-blog-system.md) 中的想法，貌似有点行不通，其中一个难点则是怎么去动态的传输 `Markdown` 文件的数据。

为什么要动态加载 `Markdown` 文件呢？[vite-plugin-md] 这个插件，可以自定义 `Markdown` 渲染，以及包裹一层 `Vue` 组件，一个比较好用的场景，
则是通过修改 `Markdown` 渲染的标签，改成自定义标签，例如 `a` 标签修改成 `v-link` 组件，这样，`v-link` 组件的实现，则可以替换原有 `a` 的功能，
实现一些差异化的功能，例如外链和页内链接做不同的显示。我知道这个通过 `markdown-it` 插件也可以做到，但是 `markdown-it` 插件，并不能混合 `js` 代码。

例如想实现图片的一些交互，如果用 `markdown-it` 插件来实现，则需要分离这部分 `js` 代码。如果通过自定义标签，则可以更加方便的处理这个功能。

<!-- more -->

## 尝试利用 Vite-Plugin-SSR

尝试用 [vite-plugin-ssr:pre-render] 这个例子来验证 `v-blog` 的想法，这能完美的解决部分问题，分页显示，标签页等，但也遇到一个难点。

例如，通过 `Markdown` 写一篇文章，一般会用 `<!-- more -->` 这样的注释来分割摘要内容，然后在文章列表渲染出来，那么怎么解决摘要的渲染呢？

### 基础解决方案

最开始的想法是，在渲染之前，通过 `markdown-it` 渲染，然后注入到当前页面的 状态（state） 里，但又需要另外一个问题，如果摘要里面，有自定义组件，
或者引入了图片资源，怎么办呢？

图片的链接问题，还是可以解决的，通过计算图片的相对地址以及用 `Vite` 计算哈希值的方式，替换图片链接即可。

比较困难的是，自定义组件怎么办呢？这个貌似必须要经过 `Vite` 编译才行。

真的是太难了 QAQ。

## 下一个方案

目前看来，最困难的问题，也就是怎么通过 `Vite` 去渲染摘要内容。主要难点是摘要内容不是一个文件，是一个在内存中提取出来的 `Markdown` 文本。

如果要通过 `Vite` 编译过程，这需要一个载体，也许是 `Vite` 的虚拟文件，也许是写一个脚本，直接生成对应的文件。

两种方案原理一样，也就体验上有一点点不同。找个时间，验证一下这个方案是否可行。

[vite-plugin-ssr:pre-render]: https://github.com/brillout/vite-plugin-ssr/tree/master/examples/vue-full
[vite-plugin-md]: https://github.com/antfu/vite-plugin-md
