---
title: Base64 和 Blob
date: 2019-04-25T19:04:19.979Z
tags: [JavaScript]
license: CC BY-NC 4.0
---

## 介绍

利用 Base64 可以非常方便的存储/读取二进制文件，本文介绍如何在 Base64 和 Blob 之间转换

为什么要转换成 Blob 呢？ 因为 Blob 可以非常方便的转换成其他格式(文本，二进制，ArrayBuffer 等等)

> Base64 是一组相似的二进制到文本(binary-to-text)的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。Base64 这个词出自一种 MIME 数据传输编码。

> Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

<!-- more -->

## Base64 To Blob

1. 用 `atob` 解码一个 Base64 字符串 (`btoa` 可以把二进制数据编码成 Base64 格式)
2. 把转换后的字符串写进 Unit8Array 数组里面
3. 把 Unit8Array 数组转换成 Blob

```js
/**
 * https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 *
 * @param {string} dataURI
 * @param {number} sliceSize
 */
function dataURIToBlob(dataURI, sliceSize = 512) {
  const b64Data = dataURI.trim().split(',')[1]
  const contentType = dataURI.split(',')[0].split(':')[1].split(';')[0]

  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
```

## Blob To Base64

1. 直接利用 FileReader 把 Blob 转换成 Base64

```js
/**
 * @param {Blob} blob
 */
function readBlob(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (evt) => resolve(evt.target.result)

    reader.readAsDataURL(blob)
  })
}
```

## 参考

- https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
- https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/SDK/High-Level_APIs/base64
- https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
