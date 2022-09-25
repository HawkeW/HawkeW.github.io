---
title:  vuepress 初体验：快速搭建博客
date:   2020-06-11
category: 
 - vuepress
typora-root-url: ..\.vuepress\public
---

## 基础配置

### 安装 node.js

请先安装`Node.js`和`npm`，参考链接：[廖雪峰的官方网站--JavaScript教程--安装Node.js和npm](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025597810528)。或者直接下载安装当前（2020年7月）最新版本：[Node v14.5.0 淘宝镜像](https://npm.taobao.org/mirrors/node/v14.5.0/)，记得选择对应你的系统。

安装完成后，打开`cmd`，分别输入`node -v`，可以看到类似如下输出：

```bash
> node -v
v7.6.0
> npm -v
4.1.2
```

### 安装本地依赖

```js
npm install -D vuepress
```

### UI插件配置

```npm install -D @vuepress/plugin-back-to-top  @vuepress/plugin-nprogress```

安装完毕后，在`config.js`中配置

```js
plugins:[
    ["@vuepress/back-top"],//返回页面顶部按钮
    ["@vuepress/nprogress"],//进度条
]
```

### PWA支持

```js
npm install -D @vuepress/plugin-pwa
```
安装完毕后，在`config.js`中配置
```js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],

  ],
  plugins: [
   ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  	}]
  ]
}
```

