---
title: Hexo 入门
date: 2017-10-25T13:08:27.000Z
tags: [Blog, Hexo]
license: CC BY-NC 4.0
---

就把这篇文章算做自己的第一篇技术文章吧！以后这个博客就拿来记录自己的一些技术心得。

官方文档已经很详细了，为什么我还要写一遍呢？记录之，巩固之

## 安装之前的准备

安装 [Nodejs](http://nodejs.cn/) 和 [npm](https://www.npmjs.com/)，推荐使用 [nvm](https://github.com/creationix/nvm) 来安装。既然都推荐使用 [nvm](https://github.com/creationix/nvm) 了，那就再推荐一下包管理工具 [Yarn](https://yarnpkg.com/zh-Hans/)

<!-- more -->

## 安装 Hexo

如果上面安装好了，那现在就特别简单了。

```bash
npm install hexo-cli -g #全局安装
npm isntall hexo-cli --save #当前项目安装
```

以上二选一即可，当然用 [Yarn](https://yarnpkg.com/zh-Hans/) 安装也是可以的

```bash
yarn global add hexo-cli #全局安装
yarn add hexo-cli #当前项目安装
```

## 初始化

安装完成之后，那就是找个文件夹来初始化博客项目了。随便找个文件夹，运行

```bash
hexo init
npm install # 或者 yarn
```

然后，就好了～

> Tips：这里需要全局安装，若不是全局安装，则需要在安装 Hexo 的那个目录下的 config.json 里面的配置相应的命令然后使用 npm 或者 yarn 运行

## 配置

配置文件为 `_config.yml` ，配置文件的详细说明 [Hexo 配置](https://hexo.io/zh-cn/docs/configuration.html)

这里找到配置文件，就可以为所欲为啦！自己去魔改吧。这里还不能说是魔改，毕竟只是一些基本的配置！

## 写作

既然是博客，那肯定需要有写作的地方才行啊，所以要怎么写一篇新文章呢？很简单，在博客的目录运行如下命令

```bash
hexo new '新文章'
```

就这样，一篇新文章就这样诞生了，当然还得需要你去充实它～

> Tips：文章使用 [Markdown](https://github.com/Melo618/Simple-Markdown-Guide) 语法来排版，特别好用，不会就赶紧看看吧。十分钟即可入门，两小时即可熟练使用。

## 测试

写好了文章，那要怎么看效果呢，为怎么知道我写了之后的排版到底是怎么样的呢？简单哟～，一句命令搞定

```bash
hexo s
```

然后在浏览器里面打开 http://localhost:4000 ，就可以预览你的博客啦～

## 部署到 GitHub Page

[GitHub](https://github.com/) 提供了一个 [GitHub Page](https://pages.github.com/) 页面，咱们就用这个页面来存放自己的博客吧，当然也可以部署到自己的服务器上～，这里就只介绍怎么部署到 [GitHub Page](https://pages.github.com/) 上～

### 创建 GitHub Page 仓库

创建一个仓库名为 `username.github.io` 其中 `username` 就是你的 GitHub 的用户名

### 添加 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) 插件

这是一个快速部署到 GitHub 的插件，安装也特别简单，一句命令搞定

```bash
npm install hexo-deployer-git
```

### 配置 deploy

然后在之前介绍的配置文件中配置 deploy

```yml
deploy:
  type: git
  repo: git@github.com:username/username.github.io.git # 把 username 替换成你自己用户名
```

### 部署

万事俱备，只欠东风～

```bash
hexo deploy # 或者 hexo d
```

之后，应该会提示你登陆 GitHub ，登陆之后就会自动部署到你的 GitHub Page ，然后你可以通过访问 username.github.io 来访问你自己的博客

## 主题

到了这里，你已经可是使用 Hexo 来写博客了，但是呢！默认的主题不好看，对不起，我是外貌协会的，怎么办～没关系，配置文件里面不是有 `theme` 这个配置项吗，那就说明，主题是可以更改的！

[Hexo 主题](https://hexo.io/themes/) 这里有很多主题，你只需要下在下来放到 `themes`文件夹里面，然后把配置文件里面的 `theme` 改成相应的主题名字即可，当你再次测试你的博客的时候，你会发现你的主题已经改变了。

## 更多

到这个时候，估计你应该会有很多问题了，但是呢，你的那些问题都不是问题，你可以查阅 [Hexo 文档](https://hexo.io/zh-cn/docs/)，以及相关主题的文档来解决你的问题，当然也欢迎在下方留言，我们可以一起交流，讨论～
