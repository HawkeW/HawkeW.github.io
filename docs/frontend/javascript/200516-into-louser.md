---

title:   【JS】深入了解闭包
date:   2020-05-16
category: 
 - frontend
tag: 
 - JavaScript
description: 关于闭包
typora-root-url: ..
---



第一遍学习廖雪峰的Javascript教程时，对闭包的理解就一直很模糊。当然，也可能是因为还没有主动去留意过。这周让已经工作的朋友推荐了一些闭包相关的资料，深入地来复习一下闭包的概念。

## 从一段代码说起

现在，有一个需求：

**创建10个`<a>`标签，点击对应标签，弹出来对应的序号。**

于是，你开始构思这样一段代码：

```javascript
<div id="app"></div>
<script>
  (function () {
    //获取div节点
    var div = document.getElementById("app");
    //创建10个<a>标签，并添加到div中
    for (var i = 0; i < 10; i++) {
      //创建一个<a>标签
      const a = document.createElement("a");
      //给a标签href赋#值,防止跳转页面
      a.href = "#";
      //给a标签内部赋值，让它显示得个性一些
      a.innerHTML = "第" + i + "个链接\n\n";
      //向div中添加这个a子节点
      div.appendChild(a);
    }
	//找到html中的所有<a>标签
    var nodes = document.getElementsByTagName("a");
    //给所有<a>标签添加点击事件,并弹出对应序号j
    for (var j = 0; j < nodes.length; j++) {
      nodes[j].addEventListener("click", function () {
       	alert(j);
      });
    }
  })();
</script>
```

**Nice!** 

~~你对自己的`Javascript`基础表示很满意，并竖起了大拇指。~~

![01-Example01-nice.gif](/assets/img/05-Clousre/01-Example01-nice.gif)

好了，我们开始运行吧！

你用浏览器打开了这个`html`页面，不错，所有的`<a>`标签当然都正确地生成了。

但是，当你开始点击标签的时候，却发现，不管点击哪一个链接，弹框里竟然显示的都是`10`！

![01-Example01](/assets/img/05-Clousre/01-Example01.gif)



### 哪里出了问题？

让我们冷静一下。

好了，仔细想想，可以想象：代码应该是在给所有`<a>`标签添加点击事件时这里出了问题:

```javascript
for (var j = 0; j < nodes.length; j++) {
  nodes[j].addEventListener("click", function () {
    alert(j);//不知道为什么，运行之后这里全部都变成了10，而不是预期中的j
  });
}
```

我们不难得出结论，结果是`10`，是因为总共有10个`<a>`标签（可以通过改变第一段代码中生成的`<a>`数量来判断）。而`j`在循环结束后，最终值正好是`10`！

那么，是怎样的运行机制，导致结果都变成了最终值呢？

这里我们不妨先做一下假设：

1. 所有的`<a>`的`click`事件，是在for循环结束后，被绑定了`alert(10)`

2. 所有的`<a>`的`click`事件直接被绑定了`alert(j)`，而在调用的时候，`j`变成`10`了，所以最终都变成了`alert(10)`

让我们带着疑问，继续往下看吧。

### 另一段代码

在下面这段代码中，我们定义了一个`count()`函数，其内部引用了局部变量`arr`。我们希望实现的是，创建3个函数，并且把函数都保存在`arr`数组中去。

```javascript
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];//=>arr[0]
var f2 = results[1];//=>arr[1]
var f3 = results[2];//=>arr[2]
```

看了这段代码，我们可以很容易得出“`f1()`，`f2()`，`f3()`运行后的结果分别为`1`,`4`,`9`”，这样一个结论。

![01-Example01-easy](/assets/img/05-Clousre/01-Example01-easy.gif)

但是，实际运行时，却发现：

```javascript
f1();//16
f2();//16
f3();//16
```

![01-Example01-nani](/assets/img/05-Clousre/01-Example01-nani.gif)



### 熟悉而陌生

上面两段代码，除了都涉及到循环外，我们还可以看到很强的相似性：

- 调用的方法是在函数内部定义的，且引用了函数内部的*局部变量*
- 调用的方法是在函数外部执行

实际上，这两个例子就是`Javascript`中的`闭包`在“作祟”。

## 作用域

### 编译过程

通常，编程语言在一段代码执行之前，会进行三个主要步骤：

1. 词法分析： 把字符串分解成`词法单元(token)`
2. 语法分析： 将词法单元流（数组）转换成由元素逐级嵌套组成的`抽象语法树（Abstract Syntax Tree，AST）。`；
3. 代码生成：将`AST`转换为可执行代码

当然，JavaScript的处理过程并不仅仅是如此。例如，JavaScript引擎还会经过特定的步骤优化运行性能，包括对冗余元素的优化。

### 作用域

#### 词法作用域

**定义** ：是定义在词法（分析）阶段的作用域，是由写代码时变量和块作用域的位置决定的。

**作用**：词法分析阶段，JavaScript引擎就能知道标识符的位置以及如何声明的。这使JavaScript能够预测在执行过程中查找对应的标识符

#### 函数作用域

**定义**：是定义在函数声明时的作用域。

**作用**：

	1. 属于这个函数的全部变量都可以在整个函数范围内，包括嵌套在其内部的作用域内使用和复用。
 	2. 隐藏内部实现
 	3. 规避命名冲突

#### 块作用域

**定义**：具有块作用域的变量或函数，仅可以在当前的块（通常在{ ... }内）中被调用，而无法在该块作用域外进行调用。

**作用**：避免变量被混乱地复用，提升代码可维护性

##### let

对于下面的代码，使用`var`声明变量`i`：

```javascript
for(var i = 0; i < 10; i++){
    //一段代码
}
console.log(i);//10
```

虽然`i`仅仅在`for`循环内被使用，但其却被绑定到上层的作用域中去了。

而使用`let`标识符定义变量`i`, 则在for循环外部将无法访问到`i`的值。 

```javascript
for(let i = 0; i < 10; i++){
    //一段代码
}
console.log(i);//Uncaught ReferenceError: i is not defined
```

##### try { ... } catch{ ... }

```javascript
try {
	undefined(); // 执行一个非法操作来强制制造一个异常 
}
catch (err) { 
    console.log( err ); // 能够正常执行！ 
}
console.log( err ); // ReferenceError: err not found
```



### 作用域链

当JavaScript进行变量解析（即查找变量）时，

在示例1中，我们使用`var`关键字定义了变量`j`，它是该匿名函数内的局部变量，作用于整个函数。

### 作用域链





## 概念

**概念1**：当函数可以记住并访问所在的*词法作用域*，就产生了闭包，即使函数是在当前词法作用域之外执行<sup>[1]</sup>

**概念2**：当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的*变量或函数*时，就产生了闭包



产生的条件

## 引用

[1] 你不知道的JavaScript（上卷）,第五章

[2] JavaScript权威指南（第6版）