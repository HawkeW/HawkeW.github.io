---
layout: post
title:  "使用gitalk作为jekyll博客的评论组件"
date:   2019-10-30 14:30:00 +0800
categories: test
excerpt: Github pages使用方法
typora-root-url: ..
---

在使用gitalk之前，有检索到关于gitment组件的文章，但经过测试使用后，发现一直报错` [object ProgressEvent]  `并无法进行初始化。

你可以在文章下方看到基于gitalk的评论组件，也可以点击[Demo]( https://gitalk.github.io/ )，来测试一下看看它是否是你想要的效果。

如果你和我一样，认为自己面向的用户基本都有github账户，那么你可以直接参考上面的这篇[yizibi](https://yizibi.github.io/2018/09/26/Mac-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E6%95%99%E4%BD%A0%E5%9C%A8Jekyll%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/](https://yizibi.github.io/2018/09/26/Mac-)一步一步教你在Jekyll博客添加评论系统/)的文章进行设置。

你也可以从这里进入[gitalk官方文档]( https://github.com/gitalk/gitalk )，参考[中文说明]( https://github.com/gitalk/gitalk/blob/master/readme-cn.md )来设置。

这里仅附上源码，同时对上文中的[gitalk官方文档]( https://github.com/gitalk/gitalk )或[yizibi](https://yizibi.github.io/2018/09/26/Mac-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E6%95%99%E4%BD%A0%E5%9C%A8Jekyll%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/](https://yizibi.github.io/2018/09/26/Mac-)一步一步教你在Jekyll博客添加评论系统/)的文章中没有说明的部分进行简单补充。如果你需要使用，也可以直接将代码粘贴到指定的文件中去。

