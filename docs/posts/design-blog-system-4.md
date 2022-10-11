---
title: 设计一个像 hexo 的博客系统(4)
date: 2021-10-26T07:43:57.000Z
tags: [blog, system-design]
---

接 [前篇](./design-blog-system-3.md)，距离上一次更新，差不多快一个月了，咕咕咕 :)。

现在这个博客，也就是建立在 [vite-plugin-blog] 这个插件之上的。也就是前篇提到的 `v-blog`。粗略的尝试了一下之前的想法。

<!-- more -->

## Vite Plugin Blog

这个库，主要是利用 [marked] 把 `.md` 转换成 `.vue` 文件并保存在硬盘上。

一点点优点：

1. 建立在 vite 之上，所以还是比较快的
2. 可利用 vite 插件
3. 写主题更加方便
4. 支持在 `markdown` 中直接用 `vue` 组件

结合 [vite] 插件系统，实现了 [Hexo 的 layout](https://hexo.io/docs/front-matter#Settings-amp-Their-Default-Values) 功能。

结合 [vite] 的 [glob-import](https://vitejs.dev/guide/features.html#glob-import) 功能，可把 `markdown` 当做排版工具来使用，例如，[timeline](https://blog.0x-jerry.icu/timeline) 这个页面，就是把 `markdown` 当成排版工具，生成出来的。

再结合 [vite] 的 [auto-import](https://github.com/antfu/unplugin-auto-import) 插件，可实现在 `markdown` 中直接使用 `vue` 组件。

例如：

```md
<v-count />
```

展示的效果如下：

<v-count></v-count>

## 总结

现在差不多能用了，本来还想搞搞主题相关的东西，但是并没有太多的精力。先就这样吧。

[vite]: https://vitejs.dev/
[markdown-it]: https://github.com/markdown-it/markdown-it
[marked]: https://github.com/markedjs/marked
[vite-plugin-blog]: https://github.com/0x-jerry/vite-plugin-blog
