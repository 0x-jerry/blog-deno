---
title: WebAssembly 入门
date: 2022-03-27T14:25:25.000Z
tags: [Rust, WebAssembly]
---

> 这篇文章本来是上个月就应该写好的，不过中途去准备晋升了，有点累，就拖了拖，现在总算是差不多了 Orz。

这篇文章主要介绍一下 [WebAssembly]，以及记录通过 [Rust] 实践的结果。

<!-- more -->

## [WebAssembly] 简介

借用官网的一段话：

> WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.
> <br><br>
> WebAssembly（缩写为 Wasm）是一种用于基于堆栈的虚拟机的二进制指令格式。Wasm 被设计为编程语言的可移植编译目标，支持部署在 web 端以及服务器端。

这么看来， [Wasm] 就是一个中间产物，不管你用什么编程语言写，只要编译成 [Wasm]，那么，其他应用程序，只要支持执行 [Wasm]，就可以执行你编写的程序。

而且，[Wasm] 的运行速度也非常不错，Talk is Cheap, Show me the speed.

## 实践

[Wasm] 官网已经列举了有哪些编程语言支持编译到 [Wasm]，请参考 [支持列表](https://webassembly.org/getting-started/developers-guide/)。

我选择了 [Rust]，主要是想趁机入门一下 [Rust] 这门语言。毕竟这本语言已经被吹成是未来前端工具链的基石了。[Rust] 相关的知识，可参考 [Rust 语言圣经](https://github.com/sunface/rust-course)。

具体相关的代码仓库 [mmcq.js]。这是一个提取图片主题色的库，计算量较大，所以用 [Wasm] 实现，速度上的对比应该
会比较明显。

就起结果来看，速度大概提升 75% 左右。JavaScript 实现 vs Rust 实现， 不同图片大小耗时对比：

| JavaScript | WebAssembly |
| ---------- | ----------- |
| 13 ms      | 3 ms        |
| 147 ms     | 17 ms       |
| 205 ms     | 34 ms       |
| 403 ms     | 103 ms      |

由此可见，[WebAssembly] 的提升效果还是蛮明显的。

不过，[WebAssembly] 相关的工具链目前还不是特别完美，拿 [wasm-pack] 来举例子，目前打包的产物，配合 Webpack 引入 Wasm 还需要一些额外的配置，无法做到无缝衔接。最佳实践，还需要探索。

## 结语

[WebAssembly] 应用的场景主要重在计算方面，在计算量不高的场景下，JS 已经足够了。另附一些相关参考的资料：

- [wasm-pack]
- [WebAssembly]
- [mmcq.js]

[wasm-pack]: https://github.com/rustwasm/wasm-pack
[webassembly]: https://webassembly.org/
[wasm]: https://webassembly.org/
[rust]: https://www.rust-lang.org/
[mmcq.js]: https://github.com/0x-jerry/mmcq.js
