# 白话 Git基本使用

本文只介绍Git最基本的使用。

如需进一步理解Git，或者了解更多的Git操作，请参考以下链接

- [Git-Git是什么](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)
- [猴子都能懂的GIT入门](https://backlog.com/git-tutorial/cn/)

下面以Gitee为例，介绍Git的基本使用。

请先 创建一个Gitee 账号，并登陆[Gitee](https://gitee.com/)。

## 创建仓库

1. 登陆Gitee后，右上角 "+" => "新建仓库"

![image-20221107170223156](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221107170223156.png)

2. 填入"仓库名称"后，点击创建按钮

![image-20221107170320517](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221107170320517.png)

3. 创建成功

![image-20221107170340215](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221107170340215.png)

创建成功后，有一些简单的教程，下面增加一些注释：

**Git 全局设置:**

```bash
git config --global user.name "Onceonce" // 全局设置本地电脑用户名
git config --global user.email "897878405@qq.com" // 全局设置本地电脑邮箱
```

**创建 git 仓库:**

```
mkdir hello-gitee // 在本地创建一个hello-gitee文件夹
cd hello-gitee // 进入hello-gitee 文件夹目录
git init  // 初始化 git 仓库
touch README.md // 创建README.md文件 
git add README.md // 将README.md添加到git的暂存修改
git commit -m "first commit" // 将暂存修改提交为一条记录
git remote add origin https://gitee.com/onceonce/hello-gitee.git // 将本地的文件夹指向远程的git仓库
git push -u origin "master" // 将本地的修改推送到远程
```

**已有仓库?**

```
cd existing_git_repo // 进入到本地的目录 existing_git_repo
git remote add origin https://gitee.com/onceonce/hello-gitee.git // 将当前目录指向远程的git仓库
git push -u origin "master" // 将本地修改推送到远程
```

## 本地安装Git

如已安装，跳过进入下一步。没有安装，则前往地址安装：

[Git下载地址](https://git-scm.com/)

下载完成后，双击打开。安装过程可以一路点击"**Next**"



## 本地创建文件夹

在本地创建一个文件夹，比如 "**HelloGitee**"



## 本地配置Git用户

git指令运行回优先使用本地配置（项目目录下的配置），本地配置没有，则使用全局配置

优先级：本地配置>全局配置

### **Git 全局设置**

**命令：**

```bash
git config --global user.name "用户名" // 全局设置本地电脑用户名
git config --global user.email "邮箱" // 全局设置本地电脑邮箱
```

注意将用户名替换为自己的用户名，邮箱替换为`Gitee`的登录邮箱

**示例：**

```bash
$ git config --global user.name "hughew" // 全局设置本地电脑用户名
$ git config --global user.email "hughew@foxmail.com" // 全局设置本地电脑邮箱
```

![image-20221109114333697](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109114333697.png)

### Git本地配置

本地配置是指仓库目录下的配置。 与全局配置相比，少了`--global`参数

**命令：**

```bash
git config user.name "用户名"
git config user.email "邮箱"
```

**示例：**

```bash
$ cd HelloGitee // 进入本地HelloGitee目录
$ git config user.name "hughew" // 全局设置本地电脑用户名
$ git config user.email "hughew@foxmail.com" // 全局设置本地电脑邮箱
```



### 查看配置

**命令**

```bash
git config --list
```



**示例**：

![image-20221109114433426](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109114433426.png)

## "绑定"远程

**为什么绑定**

所谓的绑定操作，就是告诉本地的文件夹需要同步的远程地址是哪个。如果不绑定，是无法知道需要推送到哪个远程的

### 绑定仓库地址

**命令：**

`git remote add origin [仓库地址]`

`git remote add`指令即添加远程仓库，运行该命令后，git会将 `origin`记录 为  仓库的远程地址

**示例：**

```bash
$ git remote add origin https://gitee.com/onceonce/hello-gitee.git
```

该示例将`origin` 记录为`https://gitee.com/onceonce/hello-gitee.git`

### 修改仓库地址

假如某一天，你想把仓库从Gitee搬到Github上，那么在Github上创建仓库，再将本地的仓库地址指向新的地址就可以一键完成切换了。（当然，完全切换过程还药把代码推到新的仓库才行）

**命令：**

`git remote set-url origin [新仓库地址]`

**示例：**

```bash
$ git remote set-url origin https://gitee.com/onceonce/hello-gitee.git
```



## Git流程

### 省流版本

**创建流程**：本地初始化->本地修改->本地暂存->本地提交->推送远程

```bash
git init
git add .
git commit -m "提交"
git push origin
```

**修改流程**：本地修改->本地暂存->本地提交->推送远程

```bash
git add .
git commit -m "提交"
git push origin
```

**拉取更新流程**：查看更新->拉取更新->本地修改->本地提交->推送远程

```bash
git fetch
git pull 
git add .
git commit -m "本地修改"
git push origin
```



### Git初始化

进入之前创建的HelloGitee目录后，使用`git init`命令可以初始化目录仓库

![image-20221109124628016](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109124628016.png)

### 本地修改

在Git目录下对文件对内容做出修改或创建文件后，可以使用`git status`命令查看git状态。

比如，创建了`README.md`文件：

![image-20221109124816009](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109124816009.png)

git 会说，当前文件时 `Untracked files`，因为文件还没有被添加到git中去。同时提示使用 `git add <file>..`把文件添加到待提交内容去



### 本地暂存

我们可以使用`git add`指令将创建的文件或修改的内容添加到git暂存中去。

命令：

```bash 
git add [文件]
```



`git add`有两种**常用**形式，

添加所有修改：`git add .`，`.`即为选中所有

添加单个修改：`git add [文件名]`。



**示例：**

```bash
$ git add README.md
```



![image-20221109125530251](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109125530251.png)

添加完成后，可以使用`git status`查看状态，可以看到文件已经变"绿"了，即暂存成功了：

![image-20221109125607323](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109125607323.png)

### 本地提交

所谓提交commit，是把暂存修改里的内容记录下来，告诉git和未来的你自己：这次修改，我做了什么事情。

**命令：**

```bash 
git commit -m "提交信息"
```



**示例：**

```bash
 git commit -m "这是第一次提交"
```

![image-20221109130117052](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109130117052.png)

当把所有修改提交完毕后，`git status`再次查看，可以看到已经没有变更内容了

![image-20221109130133992](C:\Users\APP-Chenxiashen\AppData\Roaming\Typora\typora-user-images\image-20221109130133992.png)

### 推送远程

将本地所有的提交推送到远程，从而可以在任意地方获取到最新的代码。

**命令：**

```bash
git push [name] [branch]
```

**示例：**

```bash
git push origin
# 或者推送到 origin 的 master 分支
git push origin master
```



这里的`origin`可能会有点困惑。还记得我们之前绑定仓库的操作嘛？

```bash
$ git remote add origin https://gitee.com/onceonce/hello-gitee.git
```

这里的指令实际的操作就是把地址`https://gitee.com/onceonce/hello-gitee.git`记录成仓库名称为`origin`的地址

那么下次，git 进行推送操作的时候，就可以直接以名称`origin`作为远程地址的"代称"了。

所以，这里的`git push origin`，就是推送到之前的远程仓库地址了。

### 拉取远程修改

当其他人或者你在其他地方做了一些修改，并且推送到了远程，那么远程的代码就会和你本地的代码有差异。这时，我们就可以通过"拉取"操作，拉取远程的代码，把本地的代码同步为最新的代码。

注：你可以直接在Gitee上修改文件，然后在本地拉取做一次测试。

#### 查看远程是否有更新

`git fetch`

#### 拉取远程代码

**命令**

```bash
git pull [name] [master]
```

**示例**

```bash
$ git pull origin master
```

