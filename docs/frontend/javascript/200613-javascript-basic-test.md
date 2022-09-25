---

title:   【JS】JavaScript基础测试题
date:   2020-06-13
category: 
 - frontend
tag: 
 - JavaScript
description: 习题练习
typora-root-url: ..
---


## 第 1 题

```js
if(false){
    var a = 1;
    let b = 2;
}
console.log(a);
console.log(b);
```

`a`变量提升，成功打印; `b`let 定义，查找不到，报索引错误`b is not defined`

## 第 2 题

```js
var a = 1;
if(true){
    console.log(a);
    let a = 2;
}
```

`let`锁定`if(){}`中的变量，但是会报索引错误

## 第 3 题

```js
var a = {n: 1}
var b = a
a.x = a = {n: 2}

console.log(a.n, b.n);
console.log(a.x, b.x);
```

解答：

1, 1

undefined, { n : 2 } 

等价于

```js
var a;
var b;
a = { n : 1 }存储空间的索引
b = { n : 1 }存储空间的索引
a = { n : 2 }存储空间的索引
b.x = { n : 2 }存储空间的索引

a.n//2
a.x//undefined
b.n//1
b.x//{ n : 2 }
```
## 第 4 题

```js
console.log(c);
var c;
function c(a) {
    console.log(a);
    var a = 3;
    function a(){
    }
}
c(2);
```

解题：

undefined

3

错误

解答：

```js
// 变量提升也有优先级, 函数声明 > arguments > 变量声明
//输出
function c(a){
    console.log(a);
    var a = 3;
    function a(){
    }
}

function a(){
}
```

## 第 5 题

```js
var c = 1;
function c(c) {
    console.log(c);
    var c = 3;
}
console.log(c);
c(2);
```

答：

function c(c) {
    console.log(c);
    var c = 3;
}

 2

解答：

```js
//执行过程
function c(c){//函数提升
	console.log(c);
    var c = 3;
}
var c;
c = 1;//函数被覆盖
console.log(c) //1
c(2)// TypeError: c is not a function
```

## 第 6 题

```js
var name = 'xiaoming';
(function () {
    if (typeof name === 'undefined') {
        var name = 'chen';
        console.log(name);
    } else {
        console.log(name);
    }
})();
```

答： 

xiaoming

解答

```js
var name = 'xiaoming';
(function () {
    var name;  // 变量name会提升到作用域顶部
    if (typeof name === 'undefined') {
        name = 'chen'
        console.log(name)
    } else {
        console.log(name)
    }
})();
```

## 第 7 题

```js
var a = 10;  
function test() {  
    a = 100;  
    console.log(a);  
    console.log(this.a);  
    var a;  
    console.log(a); 
}
test();
```

100

10

100

## 第 8 题

```js
if (!('a' in window)) {
    var a = 1;
}
console.log(a);
```

undefined

## 第 9 题

```js
var a = 1;

function c(a, b) {
    console.log(a);
    a = 2;
    console.log(a);
}
c();
```
答：
1
2
解答

```js
function c(a, b) {
    console.log(a);
    a = 2;
    console.log(a);
}
var a ;
a = 1;
c();//没有传参
```

undefined

2

## 第 10 题

```js
var val=1;
var obj={
    val:2,
    del:function(){
        console.log(this);                    
        this.val*=2;
        console.log(val);
    }
}

obj.del();

```

答：

{
    val:2,
    del:function(){
        console.log(this);                    
        this.val*=2;
        console.log(val);
    }
}

4

解答

```js
obj{} //准确的说是obj的值，包括继承的原型__proto__等
4
```

## 第 11 题

```js
var name = "xiaoming";
var object = {
    name: "chen",
    getNameFunc: function () {
        return function () {
            return this.name;
        }
    }
}
console.log(object.getNameFunc()());
```

答

xiaoming

## 第 12 题

```js
var name = "xiaoming";
var object = {
    name: "chen",
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        }
    }
}
console.log(object.getNameFunc()());
```

答：

chen

解析:

`object.getNameFunc()`先执行，`getNameFunc`中的this指向`object`，并赋值给`that`

`ovject.getNameFunc()`执行之后，返回函数 `function()`，产生闭包，可以访问其所在的外层作用域变量`that（object）`

执行返回的函数`(function(){ return object.name })()`，最终打印`chen`

## 第 13 题

```js
(function() {
  var a = b = 3;
})();
console.log(typeof a === 'undefined');
console.log(typeof b === 'undefined');
```

答：

true

false

执行过程

## 第 14 题

```js
var a = 6;
setTimeout(function () {
    a = 666;
}, 0)
console.log(a);
```

6

## 第 15 题

```js
function fn1() {
    var a = 2;
    function fn2 () {
      a++;
      console.log(a);
    }
    return fn2;
}
var f = fn1();
f();
f();
```

3

4

## 第 16 题

```js
var a = (function(foo){
    return typeof foo.bar;
})({foo:{bar:1}});

console.log(a);
```

答：

undefined

## 第 17 题

```js
function f(){
    return f;
}
console.log(new f() instanceof f);
```

答：

undefined

解答

- `instanceof` 返回值为`boolean`

- `new f()` 返回值为 `f()`，而不是类`f()`的实例，没有继承关系

## 第 18 题

```js
function A () {
}
A.prototype.n = 1;

var b = new A();

A.prototype = {
    n: 2,
    m: 3
}
var c = new A();

console.log(b.n, b.m);
console.log(c.n, c.m);
```

答：

2, 3

2, 3

解答：

```js
var b;
A.prototype = {
    constructor:A,
    n:1
}
b = new A();//function(){ n:1 };
A.prototype = {
    constructor:A,
    n:2,
    m:3
}
```

