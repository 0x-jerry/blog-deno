---
title: AJAX 基础
date: 2017-10-27T13:08:27.000Z
tags: [Ajax]
license: CC BY-NC 4.0
---

> 一种在无需重新加载整个网页的情况下，能够更新部分网页的技术

## AJAX 的核心部分

AJAX 的核心逻辑代码真心少的可怜～，总结一下，一共就三部分。

1. 创建 `XMLHttpRequest` 对象
2. 创建 `XMLHttpRequest` 在 `readyState` 发生变化时的回调函数
3. 使用 `XMLHttpRequest` 发送请求

<!-- more -->

```js
function loadXMLDoc(url, callback) {
    // 创建对象
    let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

    // 接收到数据之后的处理
    xmlhttp.onreadystatechange = function() {
        callback(xmlhttp)
    }

    // 发送请求
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// 处理函数
function callbackTest(xmlhttp) {
    // 请求成功
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // do somthing
    }
}
```

看到这里，其实就完了，真正的逻辑就这么几行代码。AJAX 处理的事情就到这里结束了，具体拿到请求之后的数据怎么处理，那些都不是 AJAX 需要关心的事情

__具体实例可参考 [AJAX 实例](https://www.w3cschool.cn/ajax/aeqvxfnu.html)__