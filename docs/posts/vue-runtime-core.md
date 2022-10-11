---
title: Vue3 - Runtime Core
date: 2020-03-09T02:42:19.967Z
tags: [Vue, Vue3]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

Vue 3.0 系列之 Runtime Core，对应代码版本 [vue-next](https://github.com/vuejs/vue-next/tree/fb4856b36375fcf3eecaf89f260b272052a0b432)

这一节的内容太多了，看了两天，也才刚刚把源码读完，还有很多细节的地方没有看。先记录一下从创建一个 App 开始，Vue 做了那些事情吧。这一部分主要包括 各个 hook 的处理，异步依赖的处理以及更新虚拟 Dom 的处理。

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

<!-- more -->

## 一图胜千言

本来想写一些过程的，但是光画脑图，都花了半天时间。还是直接贴脑图结果吧。剩下的发下一篇文章

![Vue 3](./vue-runtime-core/Vue3.png)

## 目录结构

对应文件的一些说明

- components: 原生组件
  - BaseTransition.ts: HOC，Transition 组件，处理 transition 相关 hook
  - KeepAlive.ts: HOC，Keep Alive 组件，添加 actived、deactived hook，缓存组件
  - Portal.ts: 特殊组件，在 patch 的时候调用 Portal.process 函数
  - Suspense.ts: 特殊组件，主要用于处理 setup 为异步函数的情况。在 patch 的时候做特殊处理
- helpers: renderer 相关辅助函数
  - createSlots.ts: 创建 Slot
  - renderList.ts: 创建 列表 负责函数
  - renderSlot.ts: 创建 Slot VNode
  - resolveAssets.ts: 查找当前实例上注册的的 component 或者 directive
  - scopeId.ts: SFC 样式作用域 id 管理
  - toHandlers.ts: v-on Object 格式的 key 转换成 on\* 格式
  - useCssModule.ts: 获取当前实例的 css
  - useSsrContext.ts: 注入 SSRContext
- apiComputed.ts: 代码很少，两行代码，主要用于 track 依赖项
- apiCreateApp.ts: 创建 App 实例，实例相关配置和 mount 操作都在此处
- apiDefineComponent.ts: 嗯...，实现的函数，就一行，统一 component 的定义。其它代码都是为了服务 TypeScript 的 类型处理
- apiInject.ts: 保存自定义变量在当前实例上，并继承父实例的自定义变量，并在需要的时候注入到目标实例(provide/inject)
- apiLifecycle.ts: 向向前实例注入生命周期钩子，SSR 的时候不处理
- apiOptions.ts: 处理 2.x 的组件书写格式，把各个参数以 3.x 的方式处理，生命周期转换成 hook
- apiWatch.ts: 创建 watch，主要执行 source 的 getter，然后在 effect 里面开启 track，这样，就可以采集到所有的依赖项，然后当依赖项更改时，触发 callback
- component.ts: 主要处理 Vue 组件的 setup 函数
- componentProps.ts: 处理传给组件 props ，统一成 NormalizedProp。特殊处理了 boolean 类型的 prop，和 directive 的生命周期 hook
- componentProxy.ts: 定义 componentInternal 的 Proxy
- componentRenderUtils.ts: 创建组件的根节点渲染结果。对比两个 vNode，判断是否需要更新。更新高阶组件的 el 对象
- componentSlots.ts: 对 vNode 的 slots 做统一化处理，统一成 Slot
- directives.ts: 向 vNode 注入 directive 相关处理，以及执行 directive 相关的生命周期 hook
- errorHandling.ts: Vue 错误处理
- h.ts: jsx 的 createElement 函数
- hmr.ts: 调试开发时，动态更新相关内容，build 版本无关
- hydration.ts: 混合应用的相关 Dom 的创建
- index.ts: 入口，负责导出公共 api
- renderer.ts: 主要负责 diff vDom 以及执行 diff 之后的 patch
- scheduler.ts: 任务调度，主要用于在一个 tick 中执行所有数据的更新
- vnode.ts: 创建一个空的 Virtual Node
- warning.ts: 运行时警告提示，报错 vue 自己的 trace
