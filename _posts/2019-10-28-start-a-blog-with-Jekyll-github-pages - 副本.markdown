---
layout: post
title:  "如何使用Jekyll+Github pages 快速搭建个人博客？(Jekyll篇)"
date:   2019-10-28 12:04:00 +0800
categories: Jekyll学习笔记
excerpt: 在互联网有一个完全自己合法操控的地址，想干嘛就干嘛 ，果然还是很酷呀……
typora-root-url: ..
---



在互联网有一个完全自己合法操控的地址，想干嘛就干嘛 ，果然还是很酷呀……

作为一个穷x，本人的要求非常简单——

* 免费，免费，免费
* 有一个的可访问的服务器地址，暂时不用购买域名/服务器
* 样式可以自己通过css定义，也有可选的模板

那么，经过~~没有对比的~~慎重选择之后，就直接选择了Jekyll + github pages啦，开始无脑操作吧……



注意：前置技能

- `win` + `R` （或开始菜单--运行）输入`cmd`，`Enter`。打开windows命令行窗口

- `cd + 路径/文件夹名称`

  在命令行窗口输入cd + 路径/文件夹，点击`Enter`，即进入文件夹目录。

  如果是跨盘的路径，需要再次输入对应的盘符

  

  **操作示例**——

  打开命令行，显示

  ` C:\Users\Administrator>`

  假如想进入`C:\Users`目录下，在命令行界面输入，`cd C:\Users`即可，如

  ` C:\Users\Administrator> cd C:\Users`  

  则返回

  `C:\Users>`

  说明已经成功进入了C盘的Users文件夹目录下。

  ![cmd-op](\images\01-JekyllBlog\cmd-op.gif)

  如果我们想进入`D:\Program Files`目录下，接着刚才的操作，就需要进行如下输入:

  `C:\Users>cd D:\Program Files`

  `Enter`, 命令行返回

  `C:\Users>`

  此时我们再输入`D:`即可进入`D:\Program Files`目录下啦，操作如下：

  `C:\Users>D:`

  返回

  ` D:\Program Files `

  进入成功~！

  

## 环境准备

由于Jekyll是基于ruby开发的，所以这里是需要搭建ruby的环境。另外Jekyll并不是面向windows开发的，所以还需要搭建类似于linux的环境（gcc,make）

###  Jekyll环境准备

1. 安装ruby和gem

   点击[下载Ruby installer](https://rubyinstaller.org/downloads/)，选择Ruby+Devkit的套包直接下载安装就ok啦。

2. 安装gcc和make

   gcc和make的安装稍微有点麻烦，本文是通过这里是通过 **MinGW** 来安装的，具体可以参考这篇博客。[windows 环境下安装gcc](https://blog.csdn.net/qq_16485855/article/details/84567639)。也可以在这里[点击下载**MinGW**]( https://sourceforge.net/projects/mingw/files/MinGW/ )。然后参考上面这篇博文安装就可以了。需要注意的是，安装完成之后一定要设置好路径，不然系统是没办法找到gcc和make，也就无法正常运行下面的只领了。

3. 安装bundler

   在命令行窗口，输入gem install bundler，等待安装

4. 测试是否准备就绪

   这里主要检测的是上述的环境是否成功搭建。主要是通过命令行语句。

   快捷键 `win + R`，输入`cmd`,然后`Enter`进入命令行。

   * 测试ruby环境：`ruby -v` 成功返回ruby版本号。   `gem -v`成功返回gem版本号
   * 测试gcc环境：`gcc -v`
   * 测试make: `make -v`
   * 测试Bundler

各个命令都正确返回语句，Jekyll的安装环境就准备就绪了。

### Jekyll安装

快捷键`Win`+`R`,输入`cmd`并`Enter`打开命令行工具。

在命令行界面输入

` gem install jekyll bundler`

Jekyll就会开始安装啦。安装完毕后，可以使用`jekyll -v`来测试一下是否安装成功。

## 创建博客及使用

### 创建博客

**jekyll new + 博客名**

在本地电脑选择合适的目录，新建一个Jekyll博客框架。

如，这次我在F盘操作。

打开命令行工具。输入`F:`，然后`Enter`,进入F盘目录下。

再输入

`jekyll new userName.github.io`

等待一段时间，Jekyll就会生成一个博客框架啦~	

![JekyllNewBlog](\images\01-JekyllBlog\JekyllNewBlog.png)

![JekyllNewBlog](\images\01-JekyllBlog\JekyllNewBlog.png)

创建博客中…… 

![JekyllNewBlog-1](\images\01-JekyllBlog\JekyllNewBlog-1.png)

博客创建完毕~

最后，我们使用cd+文件夹名，进入刚刚创建的博客目录下，准备进行下一步的操作。

`cd username.github.io`



### 在本地访问博客

在博客目录下，使用Jekyll serve或bundler exec Jekyll serve，即可以在本地生成链接打开博客预览修改内容。

刚刚我们已经cd操作进入生成的username.github.io文件夹了，那么我们直接接着上一步——

`jekyll serve`

在命令行窗口，可以看到返回了一个Server address，后面跟着的`http`开头的地址就是我们的访问地址。

![JekyllNewBlog-2](\images\01-JekyllBlog\JekyllNewBlog-2.png)

现在，我们在浏览器输入这个http地址，就可以在本地访问博客了。

![JekyllNewBlog-3](\images\01-JekyllBlog\JekyllNewBlog-3.png)



### 目录结构

打开页面后，我们可以看到页面整体的框架内容。

其中**Posts**部分是所有博客的展示窗口。**Welcome to Jelkyll !** 是Jekyll默认生成的一篇博文。

![JekyllNewBlog-5](\images\01-JekyllBlog\JekyllNewBlog-5.png)



对应的，我们可以在本地文件夹中，看到这样的目录结构，而_posts文件夹下的markdown后缀的文件，就是这篇标题为**Welcome to Jekyll!**的文章对应的文件了。

![JekyllNewBlog-6](\images\01-JekyllBlog\JekyllNewBlog-6.png)

![JekyllNewBlog-7](\images\01-JekyllBlog\JekyllNewBlog-7.png)

你可以继续了解[一个基本Jekyll网站的目录结构]( http://jekyllcn.com/docs/structure/ )。

### 修改和预览

我们进入_post文件夹后可以看到，当前这篇文章的命名，是以  YYYY-MM-DD-英文标题（Y:年，M:月，D:日）  这样的格式来进行命名的。我们创建新文章的时候，也需要这样进行命名。

现在，我们用markdown文本编辑工具来打开示例用的`2019-10-28-welcome-to-Jekyll`文件。

你可以使用windows自带的 Notepad++，也可以下载一个markdown编辑器来打开。

这里我使用的是Typora作为markdown编辑器。打开之后就是这样的。

![JekyllNewBlog-8](\images\01-JekyllBlog\JekyllNewBlog-8.png)

可以看到，文章的最前方有一块儿区域是用来定义文章的显示样式（post模板的样式）、标题、日期和分类的。我们在这里简单对文字进行一下调整，然后回到刚刚的网页，使用F5刷新，可以看到对应的文字也会发生变化。

这里，我调整里标题，并回到页面刷新，可以看到，文章标题已经变成了**Welcome to My Site!**

![JekyllNewBlog-9](\images\01-JekyllBlog\JekyllNewBlog-9.png)

### 新增文章

在_posts文件夹下，我们复制一下示例文件，并把文件改名为"2019-10-28-Hello-World.markdown"。打开文件，并编辑内容。将标题和时间修改，把正文内容删除，并输入“Hello World！”。

![JekyllNewBlog-10](\images\01-JekyllBlog\JekyllNewBlog-10.png)

回到之前打开的网页，刷新——

![JekyllNewBlog-11](\images\01-JekyllBlog\JekyllNewBlog-11.png)





恭喜，你的第一篇文章生成啦~！



### 深入学习

更深入了解Jekyll,你可以点击这里进入国内大牛们翻译维护的[Jekyll中文站]( http://jekyllcn.com/ )，或进入[Jekyll官网（英文）]( https://jekyllrb.com/ )学习。

