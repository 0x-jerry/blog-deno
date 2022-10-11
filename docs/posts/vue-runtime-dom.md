---
title: Vue3 - Runtime Dom
date: 2020-03-05T00:46:31.000Z
tags: [Vue, Vue3]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

Vue 3.0 系列之 Runtime Dom，对应代码版本 [vue-next](https://github.com/vuejs/vue-next/tree/fb4856b36375fcf3eecaf89f260b272052a0b432)

## 目录结构

- components: 两个 transition 相关的 Vue 组件
- directives: v- 指令相关处理
- modules: Element 属性对比，替换相关处理
- index.ts: 挂载 Vue 到 Host 上，Host 有可能是 Document 有可能是 Hydration App
- nodeOps.ts: 封装 Element 相关操作，统一不同平台上的操作
- patchProp.ts: 对比 Element 上的属性，执行替换操作

<!-- more -->

### components

**Transition.ts** 组件主要处理 Element 的 class 在适当的时候添加以及删除，实际实现是 runtime-core 中的 **BaseTransition** 组件

**TransitionGroup.ts** 组件主要给子组件添加 transition hook，以及子组件在添加/删除/移动的时候，添加 transition class

### directives

**vModel.ts** 主要用于给 `select,textarea,input` 添加各种事件，例如 `change, input` 等，再根据 modifiers 执行对应的功能代码

**vOn.ts** 中 **withKeys** 是为了兼容 2.x 的语法，**withModifiers** 则是 3.0 的新版本，主要处理 modifiers

**vShow.ts** 中的代码很少，也很简单，就是处理 el.style.display，还考虑到了 transition，原始 display 值保存在 `el._vod`(Vue original display)

### modules

modules 文件夹是为处理 Element 原生属性

**attrs.ts** 分别处理了 svg 和 非 svg 的 attr 设置，特殊处理了 boolean 值，因为 Vue 会把所有非字符串 attr 的值转换成字符串，所以 boolean 值需要特殊处理

**class.ts** 处理 className，一样分 svg 和 非 svg，特别注意 transition 相关的 className，transition 相关 classes 保存到 `el._vtc`(vue transition classes) 中的

**events.ts** 在原生回调函数上 wrapper 了一层 invoker，invoker 只要在监听参数不变的情况下，实现重用

**prop.ts** 处理 element 上的 props，特殊处理了 `InnerHTML,textContent`，progress 的 `value` 和 boolean 值的 prop

**style.ts** 处理了 css 变量，自动添加前缀，特殊处理了 `!important` 语法

### nodeOps.ts

本文件主要封装了 Element 的常用函数，主要为了分开 svg 和非 svg 的相关操作，统一 api

### patchProp.ts

本文件主要是统一一个 api 来管理 patch 操作，特殊处理了 `:true-value, :false-value` 语法，保存到 `el._trueValue, el._falseValue` 中

## 总结

Runtime Dom 主要就是为了执行 dom diff 之后的 patch 操作，代码看起来相对比较简单，另外添加了两个原生组件 `Transition` 和 `TransitionGroup`
