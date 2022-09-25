---

title: 【教程向】如何在 Chromium 同步谷歌账号
date: 2020-07-01
category: 
 - article
tag: 
 - Chrome

sidebar: false
typora-root-url: ..\.vuepress\public
---

:::tip

本篇主要介绍如何在windows中使用 `Chromium`，以及如何在 `Chromium` 同步谷歌账号

:::

## 从下载到使用

**下载**

点击 [The Chromium Projects](https://www.chromium.org/getting-involved/download-chromium) 进入下载页面并下载。你也可以点击[这里](https://download-chromium.appspot.com/)

**解压、使用**

`Chromium`无需安装，下载完成后直接解压即可使用。你可以把它解压到你的软件存储目录，如`D:/Program Files`中。

双击打开`chrome.exe`。

![chromium-use-01](/assets/img/07-Chromium/chromium-use-01.png)

此时，你会看到浏览器上方提示：`缺少 Google API 密钥，因此 Chrominum 的部分功能将无法使用`。

![image-20200701120558578](/assets/img/07-Chromium/chromium-01-use-02.png)

此时，浏览器虽然已经可以使用了。但是如果你需要使用 Google API 相关内容的话，还需要手动配置API。~~不愧是垄断界一哥，劝退小能手， 罚款缴纳者……~~

## 获取API Keys

使用 `Chromium` 如果你需要使用一些 `Chrome` 的功能，比如最常使用的**同步账号**（收藏夹，保存在账号的密码等），需要通过API来进一步操作。

API Keys 获取的英文文档在[这里](https://www.chromium.org/developers/how-tos/api-keys)。

<div style="color:#FF6666;"><strong>文档很详细的英文说明了操作步骤，愿意读英文建议直接读文档！</strong></div>

下面图片说明下主要步骤——

1. 准备。先去[**chromium-dev论坛**](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev)，登录和订阅（官方说不订阅的话，页面列出的API无法查看，我还没有试过不订阅会怎么样）。然后进入并[谷歌云平台](https://console.cloud.google.com/)。
2. 创建项目。找到  **创建项目**  的按钮（页面上方），点击创建新项目，任意命名即可。

![image-20200701105723073](/assets/img/07-Chromium/chromium-02-new-project.png)

![image-20200701105845506](/assets/img/07-Chromium/chromium-02-new-project-2.png)

3. 启用想要添加的API。点击 **API和服务** --  **库**，然后点击刚刚创建的项目，进入到 **API库** 页面。在 **API库** 页面搜索一个库，并 **启用** 这里以`Chrome Sync API`（`同步API`）为例

![image-20200701110156759](/assets/img/07-Chromium/chromium-03-api-library-1.png)

![image-20200701110228342](/assets/img/07-Chromium/chromium-03-api-library-2.png)

![image-20200701110413358](/assets/img/07-Chromium/chromium-03-api-library-3.png)

![chromium-04-use-api](/assets/img/07-Chromium/chromium-04-use-api.gif)

4. 获取OAuth 客户端ID。回到首页，点击 **API和服务** --  **凭据** (**credentials**)，进入凭据页面。在页面顶端点击 **创建凭据** -- **OAuth 客户端ID**。如碰到需**配置同意屏幕**，可以直接配置， **应用名称**填写后**保存**，重新点击顶部的 **创建凭据** -- **OAuth 客户端ID**  即可。在**创建OAuth客户端ID**页面，选择应用类型为“**桌面应用**”，填写名称后点击**创建**。创建成功后，会弹窗出创建的**客户端ID**和**客户端秘钥**。可以存在本地，或者忽略即可，它们在**凭据**页面的 **OAuth 2.0客户端ID** 处是可以获取到的。

![image-20200701111947519](/assets/img/07-Chromium/chromium-05-credentials-1.png)

![image-20200701112152088](/assets/img/07-Chromium/chromium-05-credentials-2.png)

![image-20200701112315305](/assets/img/07-Chromium/chromium-05-credentials-3.png)

![image-20200701112349882](/assets/img/07-Chromium/chromium-05-credentials-4.png)

![image-20200701112808024](/assets/img/07-Chromium/chromium-05-credentials-5.png)

![image-20200701113021613](/assets/img/07-Chromium/chromium-05-credentials-6.png)

![image-20200701115910195](/assets/img/07-Chromium/chromium-05-credentials-8.png)

![image-20200701120031240](/assets/img/07-Chromium/chromium-05-credentials-9.png)

5. 获取API密钥。点击顶部的 **创建凭据** -- **API密钥**，等待创建成功即可。同样，你可以保存在本地或者稍后在本页**API密钥**查看。

![image-20200701113347351](/assets/img/07-Chromium/chromium-05-credentials-7.png)

![image-20200701120118480](/assets/img/07-Chromium/chromium-05-credentials-10.png)

![image-20200701120308865](/assets/img/07-Chromium/chromium-05-credentials-11.png)

## 怎样使用API密钥？

尽管官方的文档没说明了在开发时需要提供对应的API凭据，但是没有对如何在系统方便地使用作出说明，或者说基本没有直接的入口。**谷歌是真不怎么想让你用`Chromium`** **[Google really doesn’t want you to use Chromium](https://medium.com/@aidansw/google-really-doesnt-want-you-to-use-chromium-e58ad62df3f6)**。

（不过对于大部分用户，`Chrome` 确实足够方便了）

实际上，在windows中使用 上方获取的API，需要进行一步环境变量的配置。

在桌面右键单击 **计算机/我的电脑** -- **属性** -- **高级系统设置** -- **环境变量**，在系统变量中**新建**并添加刚刚获取到的**凭据**和**API密钥变量**即可。

![image-20200701115355844](/assets/img/07-Chromium/chromium-06-environment-1.png)

比如，设置

![image-20200701115650181](/assets/img/07-Chromium/chromium-06-environment-2.png)

```js
GOOGLE_API_KEY = your_api_key //api密钥
GOOGLE_DEFAULT_CLIENT_ID = your_client_id //OAuth客户端ID
GOOGLE_DEFAULT_CLIENT_SECRET = your_client_secret //OAuth客户端密钥
```

## 同步吧！

按照上方步骤，设置完环境变量后，重启电脑，再次打开 `Chrome.exe`，点击右上角账户的同步，就会进入登录页，不再跳入404啦。开始愉快的同步吧！