---
title: Vue3 - Reactivity
date: 2020-03-05T21:37:20.000Z
tags: [Vue, Vue3]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

Vue 3.0 系列之 Reactivity，对应代码版本 [vue-next](https://github.com/vuejs/vue-next/tree/fb4856b36375fcf3eecaf89f260b272052a0b432)

## 目录结构

- baseHandlers.ts: Proxy 的基础 handler
- collectionHandlers.ts: Set,Map,WeakMap,WeakSet 的 Proxy handler
- computed.ts: getter 负责 track 响应式变量，setter 负责 trigger 响应式
- effect.ts: 负责 追踪、分发 响应式变量的各种更改，包括增加、删除、设置、清除
- index.ts: 入口，负责 export 接口
- lock.ts: 全局锁
- operations.ts: 定义 Proxy 操作常量
- reactive.ts: 监听对象，添加响应式函数
- ref.ts: 主要把非 Reactive 对象转换成 Reactive 对象，以及 wrap 和 unwrap 一层 get/set

<!-- more -->

通过浏览各个文件，可以发现 operations.ts 没有依赖。然后是 effect.ts，只依赖 reactivity 中的 operation.ts ，那么就可以先从这两个文件开始看，然后再找依赖最少的文件，这样源码读起来，就会相对容易一点。

### baseHandlers.ts

主要创建 `mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers` 四种 ProxyHandler

### collectionHandlers.ts

主要是在 `get, size, has, add, set, delete, clear, forEach` 的时候添加 track 和 trigger 使其具有响应式

### computed.ts

功能不多，就是在变量的 getter 里面 添加 track，setter 里面 trigger 对应的 reactive

### reactive.ts

主要函数 `createReactiveObject`，用 Proxy 代理 target，分别存在 toProxy 和 toRaw 里面

### ref.ts

就像[目录结构](#目录结构)里面介绍的一样，主要把非 Reactive 对象转换成 Reactive 对象

## 总结

Reactivity 主要是负责给变量添加相应式，给 Vue 的 mutable 打下基础
