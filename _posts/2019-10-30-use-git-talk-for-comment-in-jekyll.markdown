---
layout: post
title:  "使用gitalk作为jekyll博客的评论组件"
date:   2019-10-30 15:30:00 +0800
categories: Jekyll
excerpt: 使用gitalk快速添加博客评论组件
typora-root-url: ..
---

在使用gitalk之前，有检索到关于gitment组件的文章，但经过测试使用后，发现一直报错` [object ProgressEvent]  `并无法进行初始化。

你可以在文章下方看到基于gitalk的评论组件，也可以点击[Demo]( https://gitalk.github.io/ )，来测试一下看看它是否是你想要的效果。

如果你和我一样，认为自己面向的用户基本都有github账户，那么你可以直接参考上面的这篇[yizibi](https://yizibi.github.io/2018/09/26/Mac-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E6%95%99%E4%BD%A0%E5%9C%A8Jekyll%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/](https://yizibi.github.io/2018/09/26/Mac-)一步一步教你在Jekyll博客添加评论系统/)的文章进行设置。

你也可以从这里进入[gitalk官方文档]( https://github.com/gitalk/gitalk )，参考[中文说明]( https://github.com/gitalk/gitalk/blob/master/readme-cn.md )来设置。

这里仅附上源码，同时对上文中的[gitalk官方文档]( https://github.com/gitalk/gitalk )或[yizibi](https://yizibi.github.io/2018/09/26/Mac-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E6%95%99%E4%BD%A0%E5%9C%A8Jekyll%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/](https://yizibi.github.io/2018/09/26/Mac-)一步一步教你在Jekyll博客添加评论系统/)的文章中没有说明的部分进行简单补充。如果你需要使用，也可以直接将代码粘贴到指定的文件中去。

# Gitalk调用

以下代码需要放到`post.html`中，即你的文章模板里。这里我是放在了文章下方，如下图所示。

```
//post.html
<!--   gitalk    -->

<div class="comment">
    <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css"> 
    <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
    //上面这些引用内容我放在了_includes/head.html，方便统一查看，你可以继续放在这里
    <div id="gitalk-container"></div>
    <script>
    var gitalk = new Gitalk({
        id: 'page.date', //在官网描述中，id默认为location.href，即评论后回到当前页面。所以你可以直接屏蔽这行代码
        clientID: 'd457861dcc1a62123b10', //你需要参考yizibi的文章来申请Cliend ID和下方的ClientSecret
        clientSecret: 'b5e1a5cd5b92856760bf0db81f8e294f9d1a6ede',
        repo: 'HawkeW.github.io',//这里可以直接填你的仓库名称
        owner: 'HawkeW',//github用户名
        admin: ['HawkeW'], //github用户名
        labels: ['Gitalk'],//不用调整
    })
    gitalk.render('gitalk-container')
    </script> 
</div>
```

# 代码位置

![01.location](/images/02-gitalk/01.location.png)

# 开始使用gitalk吧

Windows用户到这里位置就已经设置完毕，你可以在本地预览，然后提交到服务器进行初始化操作。初始完毕后，就可以提交评论啦~

整体的调用操作还是很简单的