---
title:  vuepress 创建和使用你的博客：环境，目录与配置
date:   2021-02-01 18:50:00
category: 
 - vuepress
typora-root-url: ..\.vuepress\public
---

## 前置环境

### Node和npm

检查是否安装`npm`和`node`。打开`cmd`输入`node -v`和`npm -v`有返回值则已安装。

没有安装，可以点击进入[淘宝镜像](https://npm.taobao.org/mirrors/node/v14.5.0/)安装最新版本，它在国内的访问速度比较快。注意选择对应的系统，如windows 64为则`win-x64`-->`node.exe`。

安装完成后重新键入`node -v`和`npm -v`测试

### Git

在桌面右键，看看是否有git bash等提示。如果没有则安装。windows可以在这里安装：[Git-for windows](https://npm.taobao.org/mirrors/git-for-windows/)

### Visual Studio Code

`Visual Studio`是微软的代码编辑器，可以用来修改博客中的代码，也支持预览`markdown`文本。同时有丰富的插件可以使用，如`汉化`等

官方下载地址：https://visualstudio.microsoft.com/zh-hans/thank-you-downloading-visual-studio/?sku=Community&rel=16

### typora

虽然visual studio可以预览markdown文本，但是个人觉得实际使用体验应该还是typora为佳。可以去官方下载：https://typora.io/

### 其他下载方式

如果官方下载比较慢，你也可以在腾讯安全管家等的软件管理下载到这些软件：

- node.js
- Git
- Visual Studio Code
- typora

## 克隆代码

### 创建`Gitee`仓库

在你的gitee账号，创建一个仓库。命名为：`blog`（这里可以随意命名）。

### `fork`仓库

然后打开[进入我的blog仓库](https://gitee.com/onceonce/blog)点击`fork`，这一步操作会把我的代码复制到你的`blog`仓库中

![Gitee，一度的blog仓库](/assets/img/09-create-use-blog/01-onceonce-blog.png)

![Gitee，fork一度的blog仓库](/assets/img/09-create-use-blog/01-onceonce-blog-fork.png)

### clone代码到本地

`fork`仓库到你的账号之后，你就拥有这个仓库了。

**仓库地址**

- 一般为`https://gitee.com/你的用户名(英文)/仓库名`。

如我的用户名`onceonce`，仓库名`blog`，则我的仓库链接为：`https://gitee.com/onceonce/blog`

- 当然，最简单的是在浏览器窗口复制一下

![Gitee，一度的blog仓库的地址](/assets/img/09-create-use-blog/01-onceonce-blog-url.png)

**`clone`代码到本地**

在本地文件夹（如桌面）右键，选择`git bash here`。然后输入`git clone + 你的仓库地址`。

```bash
$ git clone https://gitee.com/onceonce/blog
```

克隆成功后， 你可以在本地看到刚刚克隆的文件夹和其中的代码。

![克隆blog仓库](/assets/img/09-create-use-blog/02-clone-operation.png)

![克隆到本地的文件夹](/assets/img/09-create-use-blog/02-clone-operation-local.png)

![博客文件夹的目录](/assets/img/09-create-use-blog/02-clone-operation-local-directory.png)

## Vuepress

### 安装本地依赖

使用`npm`快速安装`vuepress`: 

```bash
npm install -D vuepress
```

### 本地打开博客

1. **进入文件夹**

复制刚刚克隆的`blog`文件夹的路径。

![复制博客文件夹路径](/assets/img/09-create-use-blog/02-local-path.png)

我的是在桌面：`C:\Users\Administrator\Desktop\blog`

打开`cmd`，使用`cd + 文件夹路径`操作进入文件夹。

```bash
C:\Users\Administrator>cd C:\Users\Administrator\Desktop\blog
```

![进入文件夹路径](/assets/img/09-create-use-blog/02-local-path-enter.png)

如果你的文件夹不在C盘，还需要增加一步换盘符操作。

如在E盘的blog文件夹中，cd之后还需要进入E盘：

```bash
C:\Users\Administrator>cd E:\blog
C:\Users\Administrator>E:
```

**2.安装依赖**

进入文件夹后，输入`npm install`，安装这个博客需要的依赖包：

![安装依赖](/assets/img/09-create-use-blog/03-install-dependencies.png)

![安装依赖成功](/assets/img/09-create-use-blog/03-install-dependencies-finished.png)

安装完成后，你可以看到刚刚的文件夹中多出了`node modules`

<img src="/assets/img/09-create-use-blog/03-installed-node-modules.png" alt="image-20200714113742864" style="zoom: 67%;" />

安装完项目需要的依赖，项目才可以正常在本地运行。

3. **本地运行**

继续输入`npm run dev`，等待加载完成后，就可以进入博客的本地开发环境了：

![本地运行](/assets/img/09-create-use-blog/03-local-run.png)

最后提示为：

![image-20200714114845200](/assets/img/09-create-use-blog/03-local-run-success.png)

现在，你可以在本地浏览器输入 http://localhost:8080 访问博客了

![本地进入博客](/assets/img/09-create-use-blog/03-local-blog.png)

以后在本地运行，只要进入在cmd进入当前目录，然后使用`npm run dev`命令就可以了

### 查看博客目录

到目前为止，你已经可以进行基本的本地访问操作了。

现在，你需要知道刚才clone的代码目录都是什么功能： 

####  blog目录

你可以看到这些内容

- **.git**文件夹：这是git对文件进行版本管理的文件夹，里面会记录你对文件夹和文件进行的修改和各种操作。当然，这个不是自动的，之后会告诉你这里是怎么记录的。**可以暂时忽略**
- **docs**文件夹：docs文件夹存放了博客相关的内容，包括你的图片，文章等等。放在这里面的文章才会被生成网页代码。**主要看这里**
- **drafts**文件夹：这个是我用来存放草稿的文件夹。因为docs文件夹下的内容将会生成文章，而与它同级的内容则不会。
- **node_modules**文件夹：如上文所说，这里是存放博客所需要的依赖、插件等等。**可以暂时忽略**
- **.gitignore**：gitignore文件可以告诉git哪些文件需要提交给gitee仓库，哪些不需要。比如，node_modules文件夹是不需要提交给gitee的。因为它体积大，并且需要的时候可以随时安装
- **deploy.sh**：这个文件是用于自动发布博客到你的仓库中去。**可以暂时忽略**
- **package.json**和**package-lock.json**：这两个文件记录了博客需要的依赖，使用`npm install`命令安装的依赖就是从这里发现的。**可以暂时忽略**

![博客文件夹目录](/assets/img/09-create-use-blog/04-directionory.png)

#### /blog/docs目录

上文说了，docs目录下的所有内容，都会被自动生成网页。

而这个生成网页的动作，就是在`npm run dev`（`测试/本地环境运行`）以及之后会说到的 `npm run build`（这个命令通常是项目的`打包`操作。在这里，这个命令会`创建网站资源`）。

**.vuepress**

- dist

其中docs目录下的`.vuepress`文件夹，是主题自带的内容，上述命令中的`打包`和`本地环境运行`操作创建的网站资源，会被放到 .vuepress 文件夹下 dist 文件夹中，它包含一个`index.html`，就是博客的主页了。

- public

.vuepress 下的public文件夹一般用于存放图片资源、音乐资源等，在文档中，想要使用public下的图片，可以直接使用相对路径去获取。比如，`.vuepress/public/assets/img/123.jpg`，在`md`文档中，你应该使用 `/assets/img/123.jpg`的方式去调用。

- config.js

config.js 文件是对网站的基本配置。比如，你可以在这里修改网站的标题，网站的logo，头像，音乐等等

**README.md**

docs目录下的README.md文件，将会被打包为博客的首页。所以，一些关于首页相关的配置，会在这里面进行操作。具体的配置，可以查看官方文档：[默认主题--首页](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)

**其他**

docs目录下， 诸如`article`，`frontend`，`uniapp`，`vue`，`vuepress`之类的文件夹，则是可以自己创建和修改的，没有太多的含义，但是，它们会被处理成网页地址的一部分。

比如`frontend`文件夹下，有一篇文章`123.md`，在 打包操作 之后生成的本地环境，你访问这篇文章的地址就是：`https://localhost:8080/frontend/123`

### 创建你自己的文章
你可以简单地对已经存在的`.md`文件进行修改，并重新运行博客项目来预览你的修改。
通过修改和尝试，可以很快地了解`vuepress`是怎么运行的

### 部署你的博客

所谓部署，就是把你的博客内容发布，这样别人才可以通过在浏览器输入网址来访问你的博客。
你可以通过在文件夹路径下，右键打开`Git bash here`, 并输入`bash deploy.sh`来快速的部署网站。
```bash
bash deploy.sh
```
注意，你需要修改发布的地址。因为当前发布地址为 `git@github.com:HawkeW/HawkeW.github.io.git` ，是我的`Github`仓库地址。 你可以把`HawkeW/HawkeW.github.io.git`替换为你自己的仓库地址。通常为：`[用户名]/[用户名].github.io`（Github）或`[用户名]/[用户名].gitee.io` (Gitee)

你可以在这里查看其他[部署方式](https://vuepress-theme-reco.recoluan.com/views/other/deploy.html)

### 查看你的博客吧！

经过上一步的部署之后，你可以在浏览器输入网址查看你的博客网站啦

- 如果你发布到Github Pages，则地址为：`http://[用户名]/[用户名].github.io`

- 如果你发布到Gitee Pages，则地址为：`http:[用户名]/[用户名].gitee.io`