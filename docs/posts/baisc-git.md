---
title: Git 安装及常用命令
date: 2017-04-17T01:45:21.000Z
tags: [Git]
license: CC BY-NC 4.0
---

> git 是一个分布式版本控制软件，最初由林纳斯·托瓦兹（Linus Torvalds）创作，于 2005 年以 GPL 发布。最初目的是为更好地管理 Linux 内核开发而设计。

> git 是用于 Linux 内核开发的版本控制工具。与 CVS、Subversion 一类的集中式版本控制工具不同，它采用了分布式版本库的作法，不需要服务器端软件，就可以运作版本控制，使得源代码的发布和交流极其方便。git 的速度很快，这对于诸如 Linux 内核这样的大项目来说自然很重要。git 最为出色的是它的合并追踪（merge tracing）能力。

## 安装环境

linux 环境下安装 Git

```
sudo apt-get install git
```

<!-- more -->

## 基础配置

**配置文件**

三种配置文件：

1. `/etc/gitconfig` 文件：包含系统上每一个用户及他们仓库的通用配置。如果使用带有 `--system` 选项的 `git config` 时，它会从此文件读写配置变量。
2. `~/.gitconfig` 或 `~/.config/git/config` 文件：只针对当前用户。可以传递 `--global` 选项让 Git 读写此文件。
3. 当前使用仓库的 Git 目录中的 `config` 文件（就是 `.git/config`）：针对该仓库。

每一个级别覆盖上一个级别的配置：3 中的配置覆盖 2 中的配置，2 中的配置覆盖 1 中的配置。

**配置用户信息**

根据需求，可以配置不同种类的配置，例如下面的配置适用于所有仓库。若需要其它配置，可以在设置相应仓库下的配置文件

```
git config --global user.name "John Doe" #你的用户名
git config --global user.email johndoe@example.com #你的邮箱地址
```

**默认编辑工具**

vim 是 linux 下的一款文本编辑软件

```
git config --global core.editor vim
```

**检查配置信息**

```
git config --list #检查所有配置
git config user.name #检查 user.name 这一项配置
```

**获取命令帮助**

三种获取帮助的方式

```
git help config #获取 config 的命令帮助
git config --help #获取 config 的命令帮助
man git config  #获取 config 的命令帮助
```

## 仓库操作

**初始化仓库**

```
git init
```

**添加文件**

这里的 `add` 表示添加到下一次提交，而不是添加到项目里面

```bash
git add "*.c" #添加所有 .c 文件
```

**提交**

```bash
git commit -m 'create github' #提交暂存区并附上说明：create github
git commit -a -m 'creat github' #直接提交所以已跟踪的文件并附上说明
```

[粗略理解 Git 工作过程](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

**查看状态**

查看每个跟踪的文件的状态

```
git status
```

**忽略文件**

在工作目录创建一个文件名为 `.gitigrone`，然后列出忽略列表。

忽略列表可以使用 glob 模式（一个简化的正则表达式）。

`.gitigrone` 模板：https://github.com/github/gitignore

**查看修改**

```
git diff
```

**移除文件**

`rm` 后面的参数可以使用 `glob` 模式

```bash
git rm README #移除 README 文件，会删除相应的文件
git rm --cached README #仅移除 Git 对 README 文件的追踪，不会删除文件
```

**移动文件**

`git mv` 命令相当与执行一下三条命令：

```
mv README readme
git rm README
git add readme
```

所以 `mv` 命令相当于重命名

```bash
git mv README readme #将 README 更名为 readme
```

**查看提交历史**

`git log` 参数较多，详细研究点击 [`git log` 详情](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)

```bash
git log #查看所有记录
git log -p -2 #查看最近的两次提交记录，以及详细信息
```

**撤销操作**

```
git commit --amend
#在你上次提交之后，追加提交，只算一次提交，即这一次提交会覆盖上一次提交
```

取消暂存的文件

```
git reset HEAD README #取消 README 文件的暂存
```

撤消对文件的修改

```bash
git checkout --README #撤销对 README 文件的修改，回到上一次提交的状态
```

## 工具

- Git 教学：https://git-scm.com/book/zh/v2
- Git 指令参考：https://git-scm.com/docs
- Liunx 下的图形界面 Git：https://www.gitkraken.com/
