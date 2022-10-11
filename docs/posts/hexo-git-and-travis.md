---
title: hexo+git+travis自动部署
date: 2018-11-08T05:41:11.000Z
tags: [Hexo, Git, Travis CI]
license: CC BY-NC 4.0
---

> 本文介绍如何使用 TravisCI 来实现 `git push` 之后，自动更新 GitHub Page

## 准备

本文章，默认读者已熟悉 travis 配置，以及 git 相关命令

## 流程

1. git push
2. travis 执行脚本
   1. 安装依赖 `npm install` or `yarn`
   2. 配置 git global config
      <!-- more -->
   3. clone git page 仓库
   4. 生成 html 静态文件
   5. commit 更新时间
   6. push

## 生成 github token

生成 token, 让 travis 可以根据 token 拿到 push 到 git 的权限

[生成 token 地址](https://github.com/settings/tokens)

![gen-new-token](./hexo-git-travis/gen-new-token.png)

生成新的 token 之后，在 travis 对应的仓库里面设置环境变量

![settings](./hexo-git-travis/settings.png)

之后就是写配置文件了

## Travis Config

确定流程之后，就可以开始写配置文件 `.travis.yml`:

> `date '+%Y-%m-%d %H:%M:%S'` 是获取系统时间，具体参考 [date command](http://manpages.ubuntu.com/manpages/cosmic/man1/date.1.html), [set variable in bash](https://stackoverflow.com/questions/4651437/how-to-set-a-variable-to-the-output-of-a-command-in-bash)

- git commit -m "Site updated - `date '+%Y-%m-%d %H:%M:%S'`"

```yaml
language: node_js
node_js: stable

before_install: # 配置 git global config
  - git config user.name "cwxyz007"
  - git config user.email "jie844067636@gmail.com"

install: # 安装依赖
  - yarn

before_script: # clone git page 仓库到 public 文件夹
  - mkdir ./public
  - cd ./public
  - git clone "https://${GitRepo}" .
  - cd ..

script: # 生成 html 静态文件
  - hexo g

after_script: # commit 更新时间 以及 push
  - cd ./public
  - git add .
  - git commit -m "Site updated - `date '+%Y-%m-%d %H:%M:%S'`"
  # GitToken 为上面配置的环境变量
  # GitRepo 在 env.global 有配置
  - git push "https://${GitToken}@${GitRepo}" master:master

branches:
  only: # 只更新 master 分支
    - master

cache: # 缓存 node_module 加快更新速度
  yarn: true
  npm: true

env: #环境变量
  global:
    - TZ: Asia/Shanghai
    - GitRepo: github.com/cwxyz007/cwxyz007.github.io.git
```

## 坑

在配置 `git commit` 命令的时候，配置为

```yaml
script:
  - git commit -m "Site updated - `date '+%Y-%m-%d %H:%M:%S'`" # 正确
  - git commit -m "Site updated: `date '+%Y-%m-%d %H:%M:%S'`" # 错误
```

提交上去之后，Travis 提示 command not found，通过查找，发现是 yaml 语法错误，因为 `Site updated` 后面的 `:` 没有转义，所以整句命令执行出错，谨记！
