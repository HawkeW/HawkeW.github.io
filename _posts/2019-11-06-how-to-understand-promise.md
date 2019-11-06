---
layout: post
title: "简单理解Promise"
date: 2019-11-06 16:44:00 +0800
categories: 前端学习
excerpt: 前端学习笔记:Promise(一):简单理解Promise
tags: Promise,前端
typora-root-url: ..
---

前段时间是一直看着廖雪峰老师的[JavaScript教程]( https://www.liaoxuefeng.com/wiki/1022910821149312 )在学习，看到浏览器部分就开始有点力不迷糊了，再加上是一段换工作之旅，折腾到现在都有点飘飘然不知道从何下手。于是又从浏览器部分开始看，终于看到了[`Promise`]( https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544 )这里。

干看下来还是有点不知所以，就来敲点字，查查资料啦。

在看教程的过程中，主要不理解的点主要集中在：

- 没有理解`promise`对象的执行过程
- 不知道`resolve`函数和`reject`函数是什么
- `job1.then(job2).then(job3).catch(handleError);`这段代码懵逼了……
- `async`？？？

于是在一番愉快(....)的探索之后，来到阮老师的[ES6入门]( http://es6.ruanyifeng.com/ )，内容更多更细致一点，便于理解代码。

所以以下主要是是阮老师ES6入门的`Promise`的学习笔记了。

## 定义

`Promise` 是异步编程的一种解决方案，ES6将其写进了语言标准，原生提供了`Promise`对象。

### 一个实例

 ES6 规定，`Promise`对象是一个构造函数，用来生成一个`Promise`实例。

 下面代码创造了一个`Promise`实例。  

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

### 两个基本函数

JavaScript引擎对`Promise`对象接收的函数`function(resolve, reject)`提供了两个函数作为参数，函数执行时会修改`Promise`对象的**状态**，并传递一个对应的参数。

- `resolve(value)`，可在异步操作成功执行时调用，将`value`值传递出去。
- `reject(error)`，可在异步操作失败时调用，将`error`值传递出去。

### 三个状态

一个`Promise`有以下三种状态——

-  `pending `：在`Promise`对象被创建时产生的状态，表示进行中
-  `fulfilled `：异步操作执行成功后，`resolve`函数会将`Promise`状态改变为`fulfilled`，表示执行成功
-  `rejected`：异步操作执行失败时，`reject`函数会将`Promise`状态改变为`rejected`，表示执行失败。

到这里，可以对Promise的运行过程可以基本有一个简单了解了，如图所示

<center>
    <img src="/images/03-FrontEnd/01PromiseObj.png"> <img>
    <p style="text-align:center;">Promise执行过程</p>
</center>
<p style="font-size:0.8rem;font-weight:bold;">注: 这里的test.status和test.value等仅做说明，tatus和value属性无法调用，即无法通过test.staus和test.value直接访问和获取值</p>

## Promise的基本使用

一个`Promise`实例生成后，可以用它的`then`方法来指定回调函数（调用`value`/`error`）。

- 使用`then`

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

- 使用`then`和`catch`

``` 
promise.then(function(value) {
  // success
}.catch(function(error) {
  // failure
});
```

## n个方法

`Promise`的原型包含很多个方法，这里就暂时不再深挖，上述的基本使用应该就满足了目前的学习了（吧？）。

下面罗列一下`Promise`的其他方法，后续拿来继续学习。

- `Promise.prototype.then()`。可以接收两个回调函数作为参数，第一个为成功（resolve）时的 `value` 参数，第二个为失败（reject）时`error`参数。
- `Promise.prototype.catch`。 `then(null, rejection)`或`.then(undefined, rejection)` 的别名，在`Promise`对象执行失败（reject）时调用
- `Promise.prototype.finally()`。不管`Promise`对象的状态如何，都会执行的操作。是`then`的一个特例。
- `Promise.all() `。包装多个`Promise` a,b,c。所有任务都`resolve`，新的实例才会`resolve`。相当于逻辑`与`/`&&`。
- `Promise.race()`。包装多个`Promise`。其中一个过程执行完即返回结果，不管失败或成功，在应用中会使程序更有容错性。
- `Promise.allSettled() `。包装多个`Promise`，所有`Promise`执行完毕后，状态都为`fulfilled`，同时返回一个`value`值，类型为数组。数组中每一个值为一个对象，包含各个实例的`status`和`value`/`reason`属性对应值。可以用来监听各个实例的当前执行情况。
- ` Promise.any()`。包装多个`Promise`。相当于逻辑`或`/`||`
- `Promise.try()`。与catch方法类似，是模拟`try`方法开发的
- `Promise.resolve()`。将参数对象转化为`Promise`对象。
- `Promise.reject()`。创建一个`Promise`对象，其状态(status)为`rejected`，`reason`值为参数值。

##  问题

到这里，在学习上还是存在一些问题的。

- 异步和同步理解的还不够深入
- `Promise`要拿来实际应用才行。

## 参考文献

- [《ECMAScript 6 入门》 作者：阮一峰](http://es6.ruanyifeng.com/)