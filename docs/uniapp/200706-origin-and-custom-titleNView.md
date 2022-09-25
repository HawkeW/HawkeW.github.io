---

title: 【uni-app】原生与自定义导航栏开发及动态修改
date: 2020-07-06
category: 
 - uniapp
tag: 
 - uni-app
typora-root-url: ..\.vuepress\public
---

使用uni-app的原生导航栏和自定义导航栏两种形式，实现一个简单的二级搜索页面

<!-- more -->

## 需求

- 一级搜索页输入关键词并点击搜索，将进入二级搜索页面并展示搜索结果。
- 二级搜索页顶部导航不可输入，点击后返回一级搜索页
- 使用`nvue`渲染，所以文件格式都为`nvue`

## UI方案

### 效果预览

![search-input-01-effect](/assets/img/08-searhinput/search-input-01-effect.gif)

### 自定义导航栏

`uni-app`支持关闭原生导航栏+前端标签组件模拟导航栏进行开发，同时官方也强调自定义HTML组件模拟导航栏会有性能问题<sup>[1]</sup>。

官方的`uni ui`提供了**自定义导航栏组件**：[NavBar 导航栏](https://ext.dcloud.net.cn/plugin?id=52)，其中提供了带搜索框的样式。

使用自定义导航栏的，优缺点如下：

- 优点：更方便的自定义和动态修改
- 缺点：官方说明中的性能问题

#### 基本实现思路

1. 页面`style`设置`navigationStyle`值为`custom`
2. 手动`HTML`绘制导航栏或直接使用插件

#### 主要代码

**`pages.json`**

`pages.json`中配置页面`navigationStyle`为`custom`

```js
//pages.json
{
    "pages":[
        {
    	"path": "pages/customTitle/customFirst",//一级搜索
    	"style": {
        "navigationStyle":"custom"
    	}
    },{
    	"path": "pages/customTitle/customSecond",//二级搜索
    	"style": {
        "navigationStyle":"custom"
    	}
    },
    ]
}
```

**一级搜索页：**

```js
//customFirst.nvue
<template>
  <view>
    <!-- 顶部状态栏 -->
    <view :style="`height: ${iStatusBarHeight}px;`" class="status-bar"></view>
    
    <!-- 自定义导航栏 -->
    <uni-nav-bar :fixed="false" background-color="#1577fe" color="#ffffff" >
      <!-- 搜索框 -->
      <view class="input-view">
        <uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
        <input :focus="true" confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="search" v-model="keyword">
      </view>
      <!-- 左插槽 -->
      <view slot="left" @click="back">
        <uni-icons type="back" color="#FFFFFF"></uni-icons>
      </view>
      <!-- 右插槽 -->
      <view slot="right" @click="search">
        <text class="search">搜索</text>
      </view>
    </uni-nav-bar>
  </view>
</template>
```

**二级搜索页：**

实际配置与一级搜索页基本一致，只不过去除了右侧的`搜索` 。这里增加了一短代码`<view>`模拟关键词搜索结果

```js
//customFirst.nvue
<template>
	<view>
     <!-- 顶部状态栏 -->
    <view :style="`height: ${iStatusBarHeight}px;`" class="status-bar"></view>
     <!-- 自定义导航栏 -->
    <uni-nav-bar :fixed="false" background-color="#1577fe" color="#ffffff"  >
    <!-- 搜索框 -->
    <view class="input-view" @click="back">
      <uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
      <input class="nav-bar-input" type="text" :placeholder="keyword">
    </view>
    <!-- 左插槽 -->
    <view slot="left" @click="back">
      <uni-icons type="back" color="#FFFFFF" ></uni-icons>
    </view>
   </uni-nav-bar>
 	<view class="">
     测试关键词： {{keyword}}
   </view>
  </view>
</template>
```

#### 注意事项

1. 页面设置为自定义导航栏时，需要设置一个`status-bar`的占位高度，否则内容会直接顶到顶部。`nvue`中可以通过获取状态栏高度+动态style的方式，其他模式可以直接使用uni-app的[`css`变量](https://uni-app.dcloud.io/frame?id=css%e5%8f%98%e9%87%8f) `var(--status-bar-height)`设置占位块的高度。

```js
<!-- 顶部状态栏 -->
<view :style="`height: ${iStatusBarHeight}px;`" class="status-bar"></view>
<!-- 顶部状态栏 -->
```

2. 使用`navBar`插件实现导航栏搜索框，如果需要修改搜索框两侧占位`button`的宽度，修改`uni-nav-bar.vue`插件源码中的样式中`uni-navbar__header-btns-left`、`uni-navbar__header-btns-right`、`uni-navbar__header-btns`的宽度`width`值即可。如果你使用`slot`插槽去设置左右占位`button`的宽度，也可以直接注释掉这几个样式的`width`。

### 原生导航栏

原生导航栏中的`searchInput`，`backbutton`和`buttons`都是在`pages.json`中完成配置的。具体可见官方文档：[导航栏](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)

优点：页面UI实现起来很方便。只需要对`searchInput`、`backbutton`、`buttons`进行样式的配置即可

缺点：

- 想要动态修改搜索框里的值，会很麻烦。官方并没有提供这样的API；在APP端需要通过H5+的`webview`修改，而H5端则需要通过修改`dom`的操作来执行。
- 需要对不同端分别进行配置。如需要在APP端和H5端实现原生搜索框，则需要在`style`中分别对`h5`和`app-plus`进行配置。

#### 基本实现思路

页面style设置配置`searchInput`（中间的搜索框）和`buttons`（左边的`返回`和右边的`搜索`按钮）

#### 主要代码

```js
//originFirst.nvue
<template>
	<view class=""></view>
</template>
//originSecond.nvue
<template>
	<view class="">keyword : {{keyword}}</view>
</template>

//pages.json
{
    pages:[
          {
      "path": "pages/originTitle/originTitle",
      "style": {
        "navigationBarBackgroundColor": "#1577fe",
        "navigationBarTitleText": "uni-app",
        "h5": {
          "titleNView": {
            "autoBackButton": true,//自动显示回退按钮
            "backButton": {//自定义回退按钮
              "background": "#FFFFFF",
              "color": "#FFFFFF",
              "colorPressed": "#FFFFFF"
            },
            "searchInput": {//自定义搜索框
              "align": "left",//文本对齐方式
              "placeholder": "搜索",//搜索框占位符
              "borderRadius": "5px",//角半径
              "backgroundColor": "#FFFFFF",//背景色
              "autoFocus": true//自动聚焦
            },
            "buttons": [{
              "color": "#FFFFFF",
              "fontSize": "14px",
              "text": "搜索"
            }]
          }
        },
        "app-plus": {
          "titleNView": {
            "backButton": {
              "color": "#FFFFFF",
              "colorPressed": "#FFFFFF"
            },
            "searchInput": {
              "align": "left",
              "placeholder": "搜索",
              "borderRadius": "5px",
              "backgroundColor": "#FFFFFF",
              "autoFocus": true
            },
            "buttons": [{
              "color": "#FFFFFF",
              "fontSize": "14px",
              "text": "搜索"
            }]
          }
        }
      }
    ]
}
```

## 动态修改

无论是自定义导航栏，还是`uni-app`的原生导航栏，都是可以进行样式修改的。

但是，就像之前提到过的那样，`uni-app`没有提供对`searchInput`进行修改的API，所以需要通过`H5+`等API或者直接修改`dom`等方式进行修改。

### 参数传递

回到需求中去，可以看到主要需要修改的内容为一级搜索页面和二级搜索页面的 `searchInput` 中展示的关键词。

这里，可以在一级页面和二级页面分别定义一个`keyword`，并通过`uni-app`的页面跳转传参来实现在不同页面`keyword`的赋值。

用户在一级搜索页面点击`搜索`，则执行`search`函数，通过带参数的`uni.navigateTo`实现一级页面到二级页面的传参。

而二级页面回到一级页面，`uni.navigateBack`无法传递参数，但是可以使用`getCurrentPages()`拿到上一个页面，调用页面的`$set`方法来修改上一个页面的`keyword`值。

```js
//一级搜索页面
data(){
    return{
        keyword:''
    }
},
methods(){
    search() {//点击搜索后运行
        uni.navigateTo({
            url:`./customSecond?keyword=${this.keyword}`
        })
    }
}
//二级搜索页面
data(){
    return{
        keyword:''
    }
},
onLoad(e){
    this.keyword = e.keyword; //onLoad周期可以拿到上一个页面传过来的参数
},
methods(){
    back(){//点击导航栏的输入框，或者回退button后运行
        var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2]; //上一个页面
		prevPage.$set(prevPage, "keyword", this.keyword)
		uni.navigateBack()
    }
}
```

### 自定义导航栏

实现了参数的传递后，自定义导航栏的参数修改可以说是非常简单了。

在本例中，一级页面中的`v-model="keyword"`把搜索框的值传递给`keyword`，当搜索框的输入值变化时，`keyword`值也会同步变化。

而进入二级搜索页面时，可以通过输入框的`:placeholder="keyword"`，直接就可以把`keyword`值赋值给`input`的`placeholder`，在`onLoad`钩子拿到值之后，被被渲染到页面中。

### 原生导航栏

`uni-app`提供了一些**[页面生命周期函数](https://uni-app.dcloud.io/frame?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)**，允许动态获取输入框的值，以及监听导航栏的相关事件

- `onNavigationBarSearchInputChanged`：监听原生标题栏搜索输入框输入内容变化事件
- `onNavigationBarSearchInputConfirmed`：监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
- `onNavigationBarSearchInputClicked`：监听原生标题栏搜索输入框点击事件
- `onNavigationBarButtonTap`：监听原生标题栏按钮点击事件，参数为Object
- `onBackPress`：监听页面返回，返回 `event = {from:backbutton、 navigateBack}` ，`backbutton` 表示来源是左上角返回按钮或 android 返回键；`navigateBack`表示来源是 `uni.navigateBack` ；详细说明及使用：[onBackPress 详解](http://ask.dcloud.net.cn/article/35120)

在一级搜索页面，可以在`onNavigationBarSearchInputChanged`钩子获取搜索框的输入值，并将其赋值给`keyword`；在`onNavigationBarSearchInputConfirmed`和`onNavigationBarButtonTap`（点击`搜索`按钮）调用`search`函数，进行页面的跳转

在二级搜索页面的`onNavigationBarSearchInputClicked`，调用`back()`方法返回一级搜索页面。

#### APP端——H5+ API

**官方示例**

官方的[uni-app在App端动态修改原生导航栏](https://ask.dcloud.net.cn/article/35374)代码示例中，提供了相关的思路及api使用：

1. 获取`webView`对象，通过`webView`的相关API`setTitleNViewButtonStyle`（修改导航栏按钮），`setTitleNViewButtonBadge`（修改导航栏按钮的角标），`setTitleNViewSearchInputFocus`（修改导航栏搜索框的`focus`状态）

2. 通过`currentWebview` 的`getStyle()`、`setStyle()`方法进行更新。

   详细的顶部标题栏相关的可修改样式，可以参考`H5+ API--Webview`

   - [WebviewTitleNViewStyles](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles): 窗口标题栏控件样式
   - [WebviewTitleNViewBackButtonStyles](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewBackButtonStyles): 窗口标题栏自定义返回按钮样式
   - [WebviewTitleNViewButtonStyles](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewButtonStyles): 窗口标题栏自定义按钮样式
   - [WebviewTitleNViewSearchInputStyles](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewSearchInputStyles): 窗口标题栏搜索框样式

这篇官方的这篇示例文章是2018年的，代码中使用的`webview`的API已经更新，需要通过新的API去获取`webView`对象。示例代码更新后应该如下：

```js
// #ifdef APP-PLUS  
var webView = this.$mp.page.$getAppWebview();  
var currentWebview = plus.webview.currentWebview();
// 修改buttons  
// index: 按钮索引, style {WebviewTitleNViewButtonStyles }  
webView.setTitleNViewButtonStyle(0, {  
    text: 'hello',  
});  

// 修改按钮上的角标  
// index: 按钮索引, text: 角标文本内容  
webView.setTitleNViewButtonBadge({  
    index: 0,  
    text: 10,  
});  

// 设置 searchInput的 focus  
// focus: true | false  
webView.setTitleNViewSearchInputFocus(true)  

// 设置 searchInput的 text  
webView.setTitleNViewSearchInputText(text)  

// searchInput 通过 webview 的 setStyle 方法进行更新  
var tn = currentWebview.getStyle().titleNView;  
if (tn.buttons) {    
uni.getSystemInfo({    
    success:function(res){    
        if (res.platform=="ios") { // 这里在HBuilderX 1.9.9版本有个bug，searchInput的I变小写了 ，临时绕过下。更高版本会修复此bug    
            tn.searchinput.placeholder = 'test';    
            currentWebview.setStyle({    
                titleNView: tn    
            });    
        } else{    
            tn.searchInput.placeholder = 'test'; //这里有个已知bug，HBuilderX 1.9.9上，当searchInput位于首页时，动态设置placehold会导致buttons的点击事件消失。更高版本会修复此bug    
            currentWebview.setStyle({    
                titleNView: tn    
            });    
        }    
    }    
})    
}    

// #endif
```

参考示例代码，APP端使用plus API修改一级页面的输入值：

```js
var currentWebview = plus.webview.currentWebview();
currentWebview.setTitleNViewSearchInputText(this.keyword);
```

修改二级搜索页面的`placeholder`：

```js
var currentWebview = plus.webview.currentWebview();
currentWebview.setTitleNViewSearchInputFocus(false);
var tn = currentWebview.getStyle().titleNView;
if (tn) {
    uni.getSystemInfo({
        success: function(res) {
            if (res.platform == 'ios') {
                tn.searchInput.placeholder = this.keyword;
                currentWebview.setStyle({
                    titleNView: tn
                });
            } else {
                tn.searchInput.placeholder = this.keyword;
                currentWebview.setStyle({
                    titleNView: tn
                });
            }
        }
    });
}
```

#### H5端——DOM操作修改

JS模拟事件更新input：

```js
function changeInput(dom, st) {
    var evt = new InputEvent('input', {
        inputType: 'insertText',
        data: st,
        dataTransfer: null,
        isComposing: false
    });
    dom.value = st;
    dom.dispatchEvent(evt);
}
```

修改一级搜索页面搜索框值`value`：

```js
const page = document.querySelectorAll(".uni-input-input[type=search]")[0];
changeInput(page,this.keyword)
```

直接修改二级搜索页面搜索框的`placeholder`：

```js
const page = document.querySelectorAll(".uni-input-input[type=search]")[0];
pages.placeholder = this.keyword;
```

需要注意的是，在H5端修改`dom`，要在`onReady`进行更新，否则会被实例的默认值覆盖。

## 总结

对比下来，虽然`uni-app`声称原生导航框具有**更高的性能**，所有样式集中在`pages.json`中让页面代码看似让`template`中的代码简洁许多。但是使用起来**颇为复杂**，**一旦涉及到导航栏参数的修改**，则**需要调用各种API**拿到参数值或者去修改参数值，对于不同端，还需要进行不同的操作。

而自定义导航栏，在动态设置方面给了很大的操作空间。同时，修改样式也更加简单。

所以，如果你的标题栏是静态配置的，那么原生导航栏是一个不错的选择；如果你需要对标题栏的内容进行任何程度的修改，那么还是建议使用自定义导航栏进行导航栏的开发。



## 引用

 [1] [uni-app导航栏开发指南](https://ask.dcloud.net.cn/article/34921)

 [2] [uni-app 页面生命周期函数](https://uni-app.dcloud.io/frame?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)

 [3] [uni-app在App端动态修改原生导航栏](https://ask.dcloud.net.cn/article/35374)

 [4] [HTML5 中国产业联盟 > API Reference > webview](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview)

