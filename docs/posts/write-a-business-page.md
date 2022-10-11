---
title: 写一个业务页面
date: 2022-09-06T03:05:10.589Z
tags: [Component, Vue]
license: CC BY-NC 4.0
publish: false
---

简单记录一下一个业务页面开发的过程

简单的过程：梳理原型，根据原型做设计稿，根据设计稿开发页面。

重要记录一下，根据设计稿开发页面的过程。

一般来讲，这个开发过程，前端可以先把页面画好，然后和后端联调具体的接口。

流程：

1. 画页面的时候，可以完全屏蔽后端接口，根据视图显示的模块/数据，设计好视图需要的数据结构。
2. 预留适配函数，页面中的每一个模块，都具有一个自己的数据结构，和一个数据适配函数
3. 在对接接口的时候，获取数据的过程和适配的过程可以完全分开。（主要得益于 vue 的响应式模型）

简单的代码结构：

```vue
<script lang='ts' setup>
import { computed } from 'vue';

// ---- api

const apiData = {
  a: {} as any,
}

initData()

async function initData() {
  getCompAData()
}

async function getCompAData() {
  const res = await fetch('/path/to/comp/a')

  apiData.a = await res.json()
}

// ----

const dataA = computed(() => {
  // adaptor
  // return {
  //   a: apiData.a.a || 0
  // }

  return {
    // fake data or mock data
    a: 1,
  }
})
</script>

<template>
  <CompA :data="dataA"></CompA>
</template>
```