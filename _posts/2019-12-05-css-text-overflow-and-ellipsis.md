---
layout: post
title:  "文本溢出省略号效果"
date:   2019-12-05 10:50:00 +0800
categories: Wordpress, 前端
tags: 前端, overflow, css
excerpt: css实现在文本溢出时使用省略号替换溢出文本
typora-root-url: ..
---



最近在用wordpress给公司搭建个简单官网，这里处理的是在调整首页产品推荐的样式时，对标题溢出效果做一个调整。

当前网站使用的是Elementor编辑器，所以在section里给直接添加了一个HTML组件来添加css和js代码。

因为公司对这个网站要求很简单，只做展示使用。所以我也不是特别想折腾，就先简单整个文本溢出效果，让版面先变得整齐起来就可以了。

**原始效果：**

![css-textoverflow-01](/images/04-css/css-textoverflow-01.jpg)

**实现效果**：

![css-textoverflow-02](/images/04-css/css-textoverflow-02.jpg)

文本溢出的实现有2种常见形式：

- 单行文本

- 多行文本

产品标题设置的是多行文本，所以可以使用多行文本的处理方式来处理。

可以看到图中是分了这个section是分了四列的，每一列可以添加一个小组件。这里我是添加了两个woocommerce产品组件，也因此，他们的内部结构是相似的。

在对这两个组件检查后，也确认了他们的标题部分有相同的样式（class）名：**woocommerce-loop-product__title** ，所以就很简单了——在之前添加的**HTML组件**里直接添加style样式代码，修改woocommerce-loop-product__title 就可以了。

下面就来看看处理方法吧。

## 单行文本

```
.product-title{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
```

- `overflow:hidden`即为对超出宽度的元素进行隐藏。

- `text-overflow:ellipsis`将溢出的文本用省略号( ellipsis )替换

- `white-space:nowrap`规定文本不进行换行操作

## 多行文本

### -webkit内核

```
overflow: hidden;  
text-overflow: ellipsis;  
display: -webkit-box;  
-webkit-line-clamp: 3;  
-webkit-box-orient: vertical; 
```

- `webkit-line-clamp` 限制在一个块元素显示的文本的行数。
- `display: -webkit-box` 将对象作为弹性伸缩盒子模型显示 。
- `-webkit-box-orient` 设置或检索伸缩盒对象的子元素的排列方式 。

## 使用

```
.woocommerce-loop-product__title{
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
```



## 参考

[CSS文本溢出显示省略号](https://www.cnblogs.com/yzg1/p/5089534.html) 