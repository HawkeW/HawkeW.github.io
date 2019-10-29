---
layout: post
title:  "如何使用Jekyll+Github pages 快速搭建个人博客？(Git篇)"
date:   2019-10-29 14:30:00 +0800
categories: Jekyll
excerpt: Github pages使用方法
typora-root-url: ..
---



在[如何使用Jekyll+Github pages 快速搭建个人博客？(Jekyll篇)]({% post_url 2019-10-28-start-a-blog-with-Jekyll-github-pages-Jekyll %})，我们已经在本地创建了博客的编写环境，展示了预览状态下的博客。这篇文章将会让你的博客在互联网拥有地址，可以从任何地方在线访问。

## 环境准备

### Git下载安装

由于Github pages项目是放在github上服务器的，这里我们需要通过某种方式把本地的文档和代码推送到github上，这样才可以访问到我们的博客网站。

从本地把文档推送到github服务器中，这个操作这里我们是通过Git来完成的。[点击下载Git](https://git-scm.com/downloads)

这里直接选择了默认的最新版本，下载完成后打开，选择安装路径之后一路确定到底，git就安装成功了。

![Git-download](/images/01-JekyllBlog/Git-download.png)

如果你不确定是否安装成功，可以在这里使用 ` Win` + ` R` 打开命令行，输入 ` git --version` ，如果返回类似 ` git version  2.23.0.windows.1` 这样的语句，说明已经安装好了。

### Git配置

如果是第一次在本地使用Git，需要配置一下用户名和邮箱。我们在桌面右键，点击Git bash here，进入Git命令行窗口。依次输入以下指令：

```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

### Github账号

本地环境准备好后，你需要有一个Github账号来使用Github pages。账号注册过程很简单，只需要填一下用户名，邮箱和密码，然后在用来申请的邮箱里点一下邮件的验证就注册成功了。

**注意**：用户名将来与你的博客默认地址有关。如用户名是abc，那博客的默认地址则为`abc.github.io`。当然，这个地址可以通过某种方式替换掉为自己购买的网址，这里就暂时不讨论了。

![GithubSignup](/images/01-JekyllBlog/GithubSignup.png)



## Github pages

### 创建

注册并登录账号后，点击Start a project创建一个项目。

![GithubNewRepo](/images/01-JekyllBlog/GithubNewRepo.png)

将项目（仓库）名称设置为 `username.github.io`(图中报错是因为我已经创建了该项目（仓库）)。勾选`Initialize this repository with a README`。最后点击`Create repository`成功创建项目。

![GithubNewRepo-1](/images/01-JekyllBlog/GithubNewRepo-1.png)

点击创建成功后，你可以点击右上角的`用户名`-->`Your repositories`，进入你的仓库列表。在这里可以看到刚刚创建好的`[username].github.io`，仓库内部有一个README.md文件。

恭喜你，现在已经可以通过访问`http://[username].github.io`进入自己的博客啦！

此时进入博客地址，你会发现博一片空白。这是因为我们的仓库中没有内容。

我们可以对README.md随意输入字符`Hello World`，再回到页面刷新，会发现页面出现了`Hello World`！在上一篇文章中，我们看到jekyll生成了超多的文件。其实从这里也可以大概了解到，一个博客其实肯定不是一个简单的md文件组成的，这也是我们需要用到jekyll 框架的原因之一。

### 远程操作

我们已经有了一个Github page地址，和一个用来存放博客页面文件的Github仓库。现在，我们只需要把在[Jekyll篇]({% post_url 2019-10-28-start-a-blog-with-Jekyll-github-pages-Jekyll %})生成的文档传到Github仓库就可以了。

#### 1.克隆仓库到本地

在本地电脑中，进入在[jekyll篇]({% post_url 2019-10-28-start-a-blog-with-Jekyll-github-pages-Jekyll %})创建的username.github.io文件夹的上级目录。由于我这里是在F:盘创建了username.github.io，所以我进入F:盘根目录就可以了。

进入上述的目录后，右键单击空白处-->Git bash Here，进入git命令行窗口。

回到Github后台，点击创建好的username.github.io仓库，进入后点击Clone or download，复制仓库地址。

![GithubPage-1](/images/01-JekyllBlog/GithubPage-1.png)

在命令行窗口，输入`git clone + 仓库地址`，并回车，如果你是第一次远程操作，那么Git会要求你输入Github用户名和密码。接着，Git将会把创建好的博客内容复制到本地，并创建一个和仓库名称同名的文件夹。

在上篇中，我在本地已经创建了`[username].github.io`这个文件夹，git会检测到并直接把仓库中的内容直接复制到该文件夹下。

克隆结束后，进入该文件夹，会发现里面多了个`README.md`文件，这正是我们在创建仓库的时候生成的文件。同时，还可以发现一个`.git`文件夹。

#### 2.推送博客到仓库

通过Git操作，我们可以快速的把之前生成的博客内容推送到github仓库。

可以依次使用下方的代码进行操作：

```
git remote add origin [你的仓库地址]
git add .  
git commit -m "First commit" 
git status
git push origin master
```

 现在，进入你的博客地址，你就会发现博客和在本地预览的一模一样啦！

#### 3.继续学习

使用github page，我们会频繁的用到git指令。

其中，最常用的就是

```
git add .  #git add 添加变更文件。"."为所有文件，你可以将它替换为文件名，如 git add README.md
git commit -m ""  #提交修改，双引号中的内容是给自己看的修改内容
git status #查看提交的修改状态
git push origin master #推送本地的commit到远程仓库origin中
```

Git是一个非常强大好用的版本控制系统，你可以到[廖雪峰的官方网站-Git教程]( https://www.liaoxuefeng.com/wiki/896043488029600 )或[猴子都能懂的GIT入门]( https://backlog.com/git-tutorial/cn/ )继续学习Git相关的操作内容。