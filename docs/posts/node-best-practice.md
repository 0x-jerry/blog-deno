---
title: Node 项目配置最佳实践
date: 2018-04-03T05:13:42.000Z
tags: [Nodejs, JavaScript]
license: CC BY-NC 4.0
---

## 引文

在项目中，经常会有一堆配置文件，然后在其它文件里面引用的时候,如果层级比较多的时候，会出现路径很长的情况，例如在项目中有一个文件 `/a/b/c/index.js`

```js
const config = require('../../../config')

doSomething(config.someConfig)
```

<!-- more -->

就会出现很长的路径名。如果移动一下文件，那么就会涉及到 __多个__ 文件的更改，而且每次引入 `config`，都会出现这么长的路径，比较容易出错。那么有没有一种优雅的方式来引入项目的 `config` 文件呢？

## 优雅的引入 `config`

之前查看 `npm` 的一些问题的时候，偶然看到过，可以把本地文件夹当成 `package` 使用，如果可以这样的话，引入 `config` 就像这样 
 
```js
const config = require('config')
```

这样就很简单了，完全不需要知道 `config` 文件存放在哪个地方，只需要用就可以了。

__怎么能够实现这样呢？__

创建一个项目，目录类似下面这样

```
/config
  index.js
  package.json
index.js
package.json
```

### 配置 `config`

配置里面的东西就放在 `config/index.js` ，例如

```js
module.exports = {
  A:1,
  B:2,
  C:3,
}
```

在 `config/package.json` 中定义这个 `module`

```json
{
  "name": "config",
  "version": "1.0.0",
  "main": "index.js",
}
```

### 安装 `config`

然后在 `root` 目录下运行 `yarn add file:./config/`， __注意最后有 `/`__

在 `/package.json` 就会出现 `config` ，只不过对应的是 __文件__，而不是 __版本号__ 或者 __标签__

```json
{
  "name": "test",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "config": "file:./config"
  }
}
```

### 测试

最后在 `/index.js` 里面测试

```js
const config = require('config')
console.log(config.A)           \\1
console.log(config.B)           \\2
console.log(config.C)           \\3
```

## 写在最后

虽然这样可以更好的引入 `config` ，但也会出现不方便的时候，如果 `config` 文件频繁更改，那么每次更改都需要更新 `package`

不过既然是配置文件，那么我想更新频率应该不会很好，不过也看具体的使用情况。


