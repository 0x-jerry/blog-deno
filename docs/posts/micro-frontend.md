---
title: 微前端
date: 2021-05-31T18:03:01.122Z
tags: [Micro Frontend, Web]
---

本文尝试分享一下「微前端」这个概念，以及目前（2021-06-01）主要的几种实现方案。

## 什么是微前端？

引用一句 [micro-frontends] 的一句话

> Techniques, strategies and recipes for building **a modern web app** with **multiple teams** that can **ship features independently**.

简单翻译一下，大概意思是：用技术、策略和方法隔离不同 **团队** 开发的 **功能**，并构建 **现代化的 web 应用**。

经常有听到「微前端框架」这个词，那「微前端」是一门技术？不，微前端并不是一门技术，微前端仅仅是一种手段，通过制定一些标准，合作开发这个项目的团队都遵守这些标准。再通过这些标准整合起来的架构，也就成了「微前端」。

<!-- more -->

## 那么微前端到底解决的是什么问题？

想想我最初接触微前端，还是第一份正式工作的时候，当时是在一个创业公司，刚刚成立几个月。我进去的时候，公司有两个应用，一个 A 应用，一个 B 应用，分别对应两个域名。现在公司想做整合，把两个应用的功能整合在一起，组合起来，举个栗子。A 应用有两个页面，分别是 A-1，A-2。现在 B 应用，想要 A-1 这个功能，也就是这个页面，而且想要保持同步更新，也就是，只发布一次，就能同时更新 A 应用中的 A-1 和 B 应用中的 A-1。

当时的想法比较简单，因为公司用的 vue 框架，而 vue 组件可以打包成一个 js 文件。所以，一个简单的做法，就是把 A 应用中所有功能做成组件，然后打包成一个 js 文件，然后在 B 应用中，引用这个 js 文件，取其中的 A-1 组件，这样也就解决了问题。

其中核心的代码，大概是这样：

```ts
// <script src="//xxx.A.js"/>
const { A1 } = window._A

export const routes = [
  {
    path: '/a-1',
    component: A1,
  },
]
```

从这个栗子中，可以看到，解决的问题也就是：如何在一个应用中引入一个不需要自己维护的能力或者功能。

进而拓展一下，可以理解成，我简单写一个模板，然后配置其中每个模块的功能，这样，一个应用就完成了。每个模板的功能，都交由不同的团队去维护。如果能实现这样的一个工具，那么就能大大的缩短一款产品的开发成本（想想就开心，做梦真好）。

在写这片文章的时候，有幸读到 [微前端的核心价值](https://www.yuque.com/kuitos/gky7yw/rhduwc)。

文中用了一整个章节来讨论「微前端」的价值，我简单的总结一下文中的概念，大致是：「微前端」解决的是如何让一个应用存活 3-5 年之后，开发者还能继续为其赋能，就像文章结尾所讲。

> 那么微前端的使命我认为是：「让天下没有短命的控制台」。

至此，我想，你应该大致对「微前端」有了一个了解。接下来就我们就唠嗑一下怎么解决这些问题。

## 微前端怎么解决这些问题的？

微前端，可看作是「微服务」派生出来的一个概念。也有点像 OOP(Object-Oriented Programing) 中的单一原则（Single Responsibility Principle），一个类、方法只做一件事情。

讲到一件事情，我们就不得不分析业务，把业务剥离开来，抽成一个一个的服务。然后再通过一些技术手段，来整合不同的服务。

先简单分享一下我想到的几种方式：

1. 用 npm package / git submodule 来管理
2. 用 iframe 加载
3. 开发 micro frontend 框架

### npm package / git submodule

这种方式，用起来就比较简单，就和用普通的 js 模块一样，除了分离出代码，没有任何其它优势。

### iframe

因为 iframe 的特性，天然的隔离性，优势也比较明显：运行环境隔离、独立发布。但同时缺点也很多：加载慢，性能堪忧、隔离性太强，以至于
会话状态共享都成了一个问题。

整体思考下来，iframe 除了隔离性好之外，也没有什么优势。

### micro frontend 框架

框架就有很多啦，不同的框架，优势也各不相同。我选了三个不同的轮子，简单的捋一捋里面的原理。

- Luigi: https://github.com/SAP/luigi ，利用 iframe 构建的微服务框架
- EMP: https://github.com/efoxTeam/emp ，使用 webpack5 的 module federation 技术
- Single-SPA: https://github.com/Single-SPA/Single-SPA ，路由框架
- qiankun: https://github.com/umijs/qiankun ，建立在 Single-SPA 之上的解决方案

接下来，就看看不同框架之间的优劣。

## 微前端框架体验

简单的写写每个框架的处理方式，不一定全对，但一定不会全错 :)。

### Luigi

先看看 [Luigi]，一个利用 `iframe` 构建的后台微服务框架。可看作是一个路由框架，主要用于构建后台配置页面。

通过 [`Luigi.setConfig`](https://docs.luigi-project.io/docs/luigi-core-api?section=luigi-config) API 来配置网站的路由、授权、导航、本地化等。然后 [Luigi] 框架通过 `iframe` 切换不同的路由。

消息机制也是通过 `window.postMessage` 实现，源代码 [source](https://github.com/SAP/luigi/blob/883c3924cf2ae83fce400cbfd7bf84f8c11359d7/client/src/helpers.js#L111-L119)

```js
  sendPostMessageToLuigiCore(msg) {
    if (this.origin) {
      window.parent.postMessage(msg, this.origin);
    } else {
      console.warn(
        'There is no target origin set. You can specify the target origin by calling LuigiClient.setTargetOrigin("targetorigin") in your micro frontend.'
      );
    }
  }
```

路由也是通过封装的 `LuigiClient.linkManager`、`Luigi.navigation` 来管理跳转，实际原理也是通过发送消息来实现的，源代码 [source](https://github.com/SAP/luigi/blob/883c3924cf2ae83fce400cbfd7bf84f8c11359d7/client/src/linkManager.js#L56-L83)

```js
  navigate(path, sessionId, preserveView, modalSettings, splitViewSettings, drawerSettings) {
    if (this.options.errorSkipNavigation) {
      this.options.errorSkipNavigation = false;
      return;
    }
    if (modalSettings && splitViewSettings && drawerSettings) {
      console.warn(
        'modalSettings, splitViewSettings and drawerSettings cannot be used together. Only modal setting will be taken into account.'
      );
    }

    this.options.preserveView = preserveView;
    const relativePath = path[0] !== '/';
    const hasIntent = path.toLowerCase().includes('?intent=');
    const navigationOpenMsg = {
      msg: 'luigi.navigation.open',
      sessionId: sessionId,
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        intent: hasIntent,
        modal: modalSettings,
        splitView: splitViewSettings,
        drawer: drawerSettings
      })
    };
    helpers.sendPostMessageToLuigiCore(navigationOpenMsg);
  }
```

其它，如生命周期等，也是类似通过发送消息的方式来实现的。

整体体验下来，不是特别方便，代码有一定的侵入性。由于 `iframe` 的特性，每次切换，都要请求一下资源，略慢。

[Luigi] 体验的差不多了，下一个 [EMP]

### EMP

通过官方仓库 [EMP]，中`projects` 里面的示例，体验了一下。

整体体验下来，开发比较流畅，但是文档目前不太完善。

主要原理是通过 [webpack5] 的 [module-federation](https://webpack.js.org/concepts/module-federation/) 来加载远程模块。

因此高度依赖 [webpack5]，对于其它打包工具,目前还不能很好的兼容。如果仅仅是当做路由框架，也是可行的。

因为直接暴露模块，因此没有通信和生命周期的的问题。但是样式隔离问题依旧存在，全局变量污染问题也存在。

下一个 [Single-SPA]

### Single-SPA

粗略体验，文档完善，社区也很活跃。而且有 [SSR](https://single-spa.js.org/docs/ssr-overview) 方案。

[Single-SPA] 整个文档，都在强调 [Single-SPA] 是一种思路，具体实现方案，可自行选择。例如 [qiankun] 和 [EMP] 都可看作其一种具体的实现方案。

[Single-SPA] 建议用加载 运行时模块(runtime module) 的方式，来组织「微前端」中不同的服务，例如用，尚在提案阶段的 [import-maps](https://github.com/WICG/import-maps)，[import-maps 兼容性](https://caniuse.com/import-maps) 或者 [webpack-module-federation] 功能。

官方会在处理「微前端」相关问题时，都会推荐一种实现方案，具体方案建议阅读 [Single-SPA] 文档。

下一个 [QianKun]，一个 [Single-SPA] 的具体实现方案。

### QianKun

通过官方的示例，简单体验了一下，相比前几个框架，这个体验下来是最流畅的。接下来，看看 [QianKun] 中具体细节的一些处理方式。

关于资源加载部分，乾坤用的是 [import-html-entry] 的方式。配置就比较简单，直接给一个 `html` 入口即可。基本原理是把 html 中的标签转移在当前需要挂载的 `div` 上，如果浏览器环境支持 [Shadow-Dom]，则会用 `shadow dom` 来处理环境隔离，具体代码 [source: Shadow-Dom](https://github.com/umijs/qiankun/blob/972872f5fe62ca87b6911fbe8c62b389ac65f9c5/src/loader.ts#L75-L92)。

关于 `JavaScript` 执行环境，用的是 [import-html-entry] 的 `sandbox`，可保证不会污染全局变量。

关于样式隔离，则是通过自动给每一条样式添加一个 `scoped` 来实现隔离 [source: Css-Scoped](https://github.com/umijs/qiankun/blob/972872f5fe62ca87b6911fbe8c62b389ac65f9c5/src/loader.ts#L95-L105)，如果支持 [Shadow-Dom] 则不需要处理。

虽然支持 `shadow-dom`，但是建议不要使用 `shadow dom`，因为这会导致一些其它问题，例如第三方库中的 `Modal` 无法使用。

关于通信，[QianKun] 实现了一套基本的状态管理方案 [Global-State](https://qiankun.umijs.org/api#initglobalstatestate)。具体原理，则是通过 全局 实例来处理的。[source: Global-State](https://github.com/umijs/qiankun/blob/HEAD/src/globalState.ts#)

### 小结

准确来讲，仅有三个框架，因为 [Single-SPA][single-spa] 主要介绍的是理念。

三个框架，各有千秋，但是 [QianKun][qiankun] 目前看来是相对比较好的方案，代码侵入少，环境隔离好。

具体的代码看了，接下来聊聊 「微前端」 具体解决了哪些问题。

## 微前端需要解决的问题

1. 服务更新问题
2. 通信问题
3. 样式隔离问题
4. 环境隔离问题

### 服务更新问题

关于更新的问题，进一步的问题可以提炼成：关于「微前端」中的不同服务，是否需要主应用来控制版本呢？

我认为这个答案是否定的，不需要主应用来控制里面服务的版本，也就是主应用里面的服务，无论什么时候都是最新的版本，主应用不关心里面的服务的版本。

由此，也可确定，服务之间，应该尽可能的减少通信。因为频繁的通信，即可导致耦合较大，就必须要有版本控制，否则，出问题的概率就比较大。

### 通信问题

有上一个问题的讨论结果，可得出，通信功能只要满足能用即可。并不要实现特别复杂的机制。

由不同「微前端」方案，也衍生出不同的通信方案：

1. [Luigi] 用到的 `window.postMessage`
2. [Single-SPA] 提到的 `window.addEventListener/dispatchEvent` [source](https://single-spa.js.org/docs/recommended-setup/#ui-state)
3. [EMP] 中自定义的模块，则可直接暴露函数
4. [QianKun] 中自己实现一个 [Global-State]

### 样式隔离问题

推荐阅读 [Single-SPA-CSS]，样式隔离的一些指导和分析。

[Single-SPA-CSS] 推荐 一份公用的样式，然后每个服务的样式，都自己去借助工具或者一些技术做到自我隔离。例如 [css-module](https://github.com/css-modules/css-modules) 技术，或者 `Vue` 的 `scoped` 方案。

但如果使用像 [Luigi] 这样利用 `iframe` 的框架，则天然支持样式隔离。

或者是 [QianKun] 那样，加载的时候，自动添加上一层 `scope`。

### 环境隔离问题

环境隔离，主要问题是全局环境变量的问题。要处理这个问题，第一个想到的肯定就是，人工约定一个格式，先到先得。这种方式够用，但不够友好。

如果是用 `iframe`，则没有这个问题。

看 [QianKun] 的源代码的时候，看到其用到了 `Sandbox` 这个东西。仔细读了读，实际上是通过 [import-html-entry] 的 [source: getExecutableScript](https://github.com/kuitos/import-html-entry/blob/ab3e788ee868177ecf407f79b00d52ca2e2cdd47/src/index.js#L52-L63) 实现的。

```js {11}
function getExecutableScript(scriptSrc, scriptText, proxy, strictGlobal) {
  const sourceUrl = isInlineCode(scriptSrc) ? '' : `//# sourceURL=${scriptSrc}\n`

  // 通过这种方式获取全局 window，因为 script 也是在全局作用域下运行的，所以我们通过 window.proxy 绑定时也必须确保绑定到全局 window 上
  // 否则在嵌套场景下， window.proxy 设置的是内层应用的 window，而代码其实是在全局作用域运行的，会导致闭包里的 window.proxy 取的是最外层的微应用的 proxy
  const globalWindow = (0, eval)('window')
  globalWindow.proxy = proxy
  // TODO 通过 strictGlobal 方式切换 with 闭包，待 with 方式坑趟平后再合并
  return strictGlobal
    ? `;(function(window, self, globalThis){with(window){;${scriptText}\n${sourceUrl}}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
    : `;(function(window, self, globalThis){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
}
```

核心代码，就是 `;(function(window, self, globalThis){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy)` 这一句了。在运行代码的时候，通过闭包机制，替换 `window,self,globalThis` 三个变量。

我个人认为，这个方面就看情况了，如果开箱支持，那就用。如果不支持，那也没有必要非得用这种方式，就「约定」的方式也挺好的，
也没什么大问题。

## 需要微前端吗？

现在，对微前端有了一个整体的认识，我们真的需要微前端吗？

这个问题，每个人的看法不一样，**这里我就随便聊聊，看看就完事了，当真就输了。是否真的需要，还需自己考虑。**

整体来讲，「微前端」在我看来，应用场景有限，入门需要一定的成本，虽然可以分离业务，也有很多优点。

但是缺点也很明显，成本上去了，团队交流成本，开发成本都上升了。举一个小例子，有个需求需要应用 A 支持一下，但是应用 A 是其它团队负责，原本估计一天就能搞定的事情，经过交流，确认，最后开发，要三天才能搞定。
在 [qiankun-技术圆桌] 中也提到过，「微前端」的目的是为了支持不同的技术栈（这点可推导出是为了支持不同的开发团队）。

因此，在我看来，在项目没有大到一定程度（必须要跨团队）的时候，没必要考虑「微前端」。

## 推荐阅读

- [micro-frontends]，一篇对「微前端」简单介绍的文章。
- [martinfowler-micro-frontends]，分析「微前端」的优劣势，和一些实现方案以及细节处理方式。
- [qiankun-技术圆桌]，探讨「微前端」的目的，使命。
- [Single-SPA Concept](https://single-spa.js.org/docs/microfrontends-concept)，「微前端」概念介绍，以及开发方向指导。
- [Single-SPA Recommended-setup](https://single-spa.js.org/docs/recommended-setup)，「微前端」推荐实现方案。

## 参考文献

- [micro-frontends]
- [martinfowler-micro-frontends]
- [web-component]
- [qiankun-技术圆桌]
- [webpack-module-federation]
- [luigi]
- [emp]
- [single-spa]
- [qiankun]
- [webpack5]
- [single-spa-css]
- [import-html-entry]
- [global-state]
- [shadow-dom]

[micro-frontends]: https://micro-frontends.org/
[martinfowler-micro-frontends]: https://martinfowler.com/articles/micro-frontends.html
[web-component]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[qiankun-技术圆桌]: https://www.yuque.com/kuitos/gky7yw/rhduwc
[webpack-module-federation]: https://webpack.js.org/concepts/module-federation/
[luigi]: https://github.com/SAP/luigi
[emp]: https://github.com/efoxTeam/emp
[single-spa]: https://github.com/single-spa/single-spa
[qiankun]: https://github.com/umijs/qiankun
[webpack5]: https://webpack.js.org/
[single-spa-css]: https://single-spa.js.org/docs/ecosystem-css
[import-html-entry]: https://github.com/kuitos/import-html-entry
[global-state]: https://qiankun.umijs.org/api#initglobalstatestate
[shadow-dom]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
