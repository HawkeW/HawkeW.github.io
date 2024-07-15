---
title:  响应式编程 - vue3 的响应式实现
date: 2023-02-28
category: 
 - vue
typora-root-url: ..\.vuepress\public
---

## 响应式编程

响应式编程是一种声明式编程范式，通常涉及数据流或变化的传播。

比如，在命令式编程中，`let a = b + c`将在表达式计算结束后中止，后续`b`和`c`的更新不会影响到`a`的值。

而在响应式编程中，`b`和`c`的值变化时，`a`的值将自动计算更新。

### Question

在JS中，怎么实现一个值跟随某个值的变化而变化？


你可能听说过`观察者模式`或者`发布/订阅模式`。在前端开发的场景里，我们实际也经常遇到类似的使用案例

### 观察者模式

#### Js Event

```html
<!DOCTYPE html>
<html>
<body>

<h2>JavaScript addEventListener()</h2>

<p>此示例使用 addEventListener() 方法将 click 事件附加到按钮。</p>

<button id="myBtn">试一试</button>

<p id="demo"></p>

<script>
document.getElementById("myBtn").addEventListener("click", displayDate);

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}
</script>

</body>
</html>
```

#### Observable - RxJs

```ts
import './style.css';

import { map, timer } from 'rxjs';

const output = document.createElement('output');
document.body.prepend(output);

timer(0, 1000)
  .pipe(map(() => new Date().toLocaleTimeString()))
  .subscribe((time) => (output.textContent = time));
```

#### Mqtt: 一个基于客户端-服务器的消息发布/订阅传输协议。

```ts
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  // 订阅
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt') // 发布
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
```

![渲染](/assets/img/13-vuebase/mqtt.jpg)

#### 发布订阅者模式与观察者模式异同

[observer vs  pub subpattern](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)

关于两者之间的细微差异，本文不是重点，就暂且忽略咯。

#### 观察者模式特点

观察者模式是一种行为型设计模式，它定义了一种对象间的一对多依赖关系，以便一个对象的状态发生改变时，所有依赖于它的对象都能够得到通知并自动更新。

以下是观察者模式的主要特点：

- 主题和观察者之间的松散耦合：主题和观察者之间的联系是松散的，主题只知道观察者的接口，而不知道观察者的具体实现。这种松散耦合使得主题和观察者可以相互独立地变化，而不会对对方造成太大的影响。

- 一对多的依赖关系：一个主题可以有多个观察者，每个观察者都可以订阅或取消订阅主题的通知。这种一对多的依赖关系使得主题状态改变时，所有依赖于它的观察者都能够得到通知并进行更新。

- 发布-订阅模式：观察者模式可以看作是一种发布-订阅模式，主题就像是发布者，而观察者就像是订阅者。主题状态的变化相当于是发布了一个消息，所有的观察者都可以订阅这个消息并得到通知。

- 可扩展性：观察者模式具有很好的可扩展性，可以在不修改现有代码的情况下增加新的观察者或主题。这使得系统更加灵活，更容易适应需求的变化。

- 性能问题：观察者模式在设计时需要考虑性能问题，因为每个观察者都需要被通知，如果观察者数量过多，可能会导致性能问题。因此，需要在设计时进行合理的优化和控制。

## Vue的响应式编程实现

> `Vue` (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。—— `cn.vuejs.org`

```ts
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }, 
  methods: {
    add() {
      this.count++;
    }
  }
}).mount('#app')
```

```html
<div id="app">
  <button @click="add">
    Count is: {{ count }}
  </button>
</div>
```

这是一个Vue的基本示例：在点击按钮 `button` 时， `count`的值会加 `1`, 然后实时更新到`html`中。

假如使用原生实现:

```html
<!DOCTYPE html>
<html>
<body>
<div id="app">
  <button id="myBtn">
    Count is: 0
  </button>
</div>

<script>
document.getElementById("myBtn").addEventListener("click", add);

let count = 0;
function add() {
  count++;
  document.getElementById("myBtn").innerHTML = `Count is ${count}`;
}
</script>
</body>
</html>
```

对比一下核心的add方法：
原生的使用，需要更新值，查找一个元素，然后更新这个元素。

而Vue的使用：更改`count`值，页面就自动进行了响应式的更新。

```ts
// 原生
let count = 1;
function add() {
  count++;
  const btn = document.getElementById("myBtn"); // 元素查询
  btn.innerHTML = `Count is ${count}`; // 元素更新
}

// VueJS
createApp({
  data() {
    return {
      count: 0
    }
  }, 
  methods: {
    add() {
      this.count++; // 
    }
  }
})
```

案例 2

```html
<template>
  <div>{{hello}}</div>
</template>

<script setup>
  import {onMounted} from 'vue';
  const hello = ref("你好世界");

  // 页面挂载
  onMounted(() => {
    setTimeout(() => {
      hello.value = "The world!"; // 3s后，页面更新为"The world!"。
    }, 3000);
  });
</script>
```

那么，Vue是通过怎样的方式实现的响应式呢？



### Vue的渲染机制

[深入响应式系统](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)

在 vue 中，ui 的渲染流程：

![渲染](/assets/img/13-vuebase/vue-dom-rendering.png)

1. 模板Template 将会被（编译器`compiler`）编译为渲染函数（运行时`render`）代码
在编译为渲染函数代码时，`Vue` 对于组件的响应式状态进行了`依赖收集`，这样，当响应式状态改变时，可以`触发重绘`，达到响应式更新的效果。

2. 渲染函数代码在运行时产生虚拟`DOM`树
   
3. 虚拟DOM树通过挂载`mount`和更新`patch`，最后渲染为真实的DOM

#### 虚拟DOM

虚拟`DOM`的概念由`React`率先开拓，在不同的框架中都有应用，当然也包括`Vue`

```ts
type HTMLElementTagName = 'div' | 'a';

interface VNode {
  tag: HTMLElementTagName;
  props: Record<string, any>;
  children?: VNode[] | string;
}

const vnode: VNode = {
  tag: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* 更多 vnode */
  ]
}

```

上述内容描述了一个div标签。

- 在运行时中，渲染器将会遍历整个虚拟 `DOM` 树，并据此构建真实的 `DOM` 树。这个过程被称为挂载 (`mount`)。

挂载前
```ts
const vnode: VNode = {
  tag: 'div',
  props: {
    id: 'hello'
  },
  children: [
    {
      tag: 'div',
      children: 'world'
    }
  ]
}
```

挂载后：

```html
<div id="hello">
  <div>world</div>
</div>
```


- 如果我们有两份虚拟 `DOM` 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为更新 (`patch`)，又被称为“比对”(`diffing`) 或“协调”(`reconciliation`)。

对于新的虚拟`DOM`：

```ts
const vnode: VNode = {
  tag: 'div',
  props: {
    id: 'hello'
  },
  children: [
    {
      tag: 'div',
      children: 'hello world'
    }
  ]
}
```

更新后：

```html
<div id="hello">
  <div>hello world</div>
</div>
```

#### 渲染函数 render function

[渲染函数](https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes) 会把代码转换为虚拟DOM，它的返回值是VNode

```ts
const vnode = h('div', { id: 'foo' }, [])

vnode.tag // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

#### 挂载函数实现

挂载函数接收虚拟Dom和一个container ，它将`VNode`转换为真实的DOM树，并渲染到container上。

```ts
type HTMLElementTagName = 'div' | 'a';

interface VNode {
  tag: HTMLElementTagName;
  props: Record<string, any>;
  children?: VNode[] | string;
}

function mount(vnode: VNode, container: HTMLElement) {
  const ele = document.createElement(vnode.tag);

  // 遍历props属性，将其中的事件和属性绑定到ele上
  for (const key in vnode.props) {
    if (key.startsWith("on")) {
      // on开头，则为事件
      ele.addEventListener(key.substring(2).toLowerCase(), vnode.props[key]);
    } else {
      // 普通属性
      ele[key] = vnode.props[key] as keyof HTMLElement;
    }
  }

  // 节点挂载
  if (typeof vnode.children === "string") {
    ele.innerText = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((node) => mount(node, ele));
  }

  contaniner.appendChild(ele);
}
```

#### 更新函数 patch

相对于挂载函数，更新函数的实现无疑是复杂的，它需要实现——

1. 获取更新前后的虚拟DOM
2. 对比 `diff`：对比两个虚拟DOM，节点的增删改，props属性的修改等等
3. 更新 `patch`: 将需要更新的内容渲染为真实的DOM

这个过程涉及到大量的计算和资源的调度，比如：
- 遇到同一时间多个值修改时，不能直接进行顺序的变更，而是需要对更新任务进行调度和合并；
- 复杂节点的变更，往往需要进行深层级的对比，而这个过程不能卡死页面

所以更新的实现，这里就暂不讨论了。

### vue 的响应式实现

了解了Vue的渲染机制，响应式的流程我们也会有一个大概的思路了：

VNode变更——> DOM更新

即，在JS维护的虚拟DOM变量变更时，我们通过挂载和更新的形式，来创建和更新UI就行了。

#### JS 中的响应式

回头看看最初的问题。

在 js 中，`let a = b + c`， a 的值不会随着 b,c 的改变而改变。那么，应该如何实现响应式的变更，达到 a 随着 b、c 值的改变而改变呢？

> 在响应式的`let a = b + c`中，表达式读取了`b`和`c`的值，并将计算结果赋值给`a`。在`b`和`c`的值改变时，再次执行该表达式，更新`a`的值。

我们可以实现一个观察者类：

```ts
type Callback = ()=>void;
class Dep<T> {
  value: T;

  observers: Set<Callback> = new Set

  constructor(val: T) {
    this.value = val;
  }

  getValue() {
    return this.value;
  }
  
  setValue(val: T) {
    this.value = val;
    this.notify()
  }

  addObserver(observer: Callback) {
    this.observers.add(observer);
  }

  notify() {
    this.observers.forEach(observer=> observer());
  }
}

const b = new Dep(1)
const c = new Dep(2)

let a = 0;
b.addObservers(update)
c.addObservers(update)
function update() {
  a = b.value + c.value;
  console.log('update', a);
}

setTimeout(()=> {
  b.setValue(b.getValue()+1)
}, 1000)
```

在上述例子中，我们通过发布订阅模式，实现了一个发布/监听模式的数据更新。这挺不错，却不够优雅：
- 对于一个值的每一个属性，都需要手动进行拦截处理
- 需要添加观察者到每一个元素中去……

有没有其他形式？

当然。我们不妨把`let a = b + c`认为是一个需要被执行的函数：

```ts
let a = 0;
function update () {
  a = b + c;
}
```

那么，我们可以实现一个包装函数，在 b,c 的值被读取时，记录下运行的函数，然后在 b,c 值变更时，再次执行这个函数就好了！

现在，我们需要一点点小小的魔法。

#### 一点点魔法：effect

对于一个表达式`let a = b + c`, `b`的值的变更引起了 a 的值的变化，那么我们就说这个值的变化是有副作用(side effect)的。

我们把上面的发布订阅模式做一点点调整，只保留读取和写入：

```ts
class Dep<T> {
  _value: T;
  constructor(val: T) {
    this._value = val;
  }
  get value() {
    return this._value;
  }
  set value(val: T) {
    this._value = val;
  }
}
```

现在，我们想实现这样一个函数，它接收一个需要被执行的副作用函数，在副作用函数执行前，将其记为`activeEffect`。

```ts
type EffectFn = () => void;
let activeEffect: EffectFn | undefined;
function effect(fn: EffectFn) {
  activeEffect = fn;
  fn();
}
```

而在函数执行的时候，我们需要读取`get`到对应的变量值，此时我们把当前的`activeEffect`记录下来（依赖收集），表明在这个值变化`set`时，需要调用该`activeEffect`。

```ts
const depsMap = new Map();
class Dep<T> {
  _value: T;

  constructor(val: T) {
    this._value = val;
  }

  get value() {
    // 收集依赖
    let targetBucket = depsMap.get(this);
    if (!targetBucket) targetBucket = new Set();
    activeEffect && targetBucket.add(activeEffect);
    depsMap.set(this, targetBucket);
    return this._value;
  }

  set value(val: T) {
    this._value = val;
  }
}
```

最后，在值变更`set`的时候，我们获取当前值对应的所有的依赖函数`activeEffect`，并执行：

```ts
const depsMap = new Map();
class Dep<T> {
  _value: T;

  constructor(val: T) {
    this._value = val;
  }

  get value() {
    // 收集依赖
    let targetBucket = depsMap.get(this);
    if (!targetBucket) targetBucket = new Set();
    activeEffect && targetBucket.add(activeEffect);
    depsMap.set(this, targetBucket);
    return this._value;
  }

  set value(val: T) {
    this._value = val;
    // 触发更新
    let targetDeps = depsMap.get(this);
    targetDeps?.forEach((effect) => effect());
  }
}

```

这样，我们就可以实现一个简单的响应式效果了：

```ts
const a = new Dep(0);
let b = new Dep(1);
let c = new Dep(2);
const update = () => {
  a.value = b.value + c.value;
  console.log(a.value);
};

effect(update); // 每1s打印2次值

setInterval(() => {
  b++;
  c++;
}, 1000);
```

当然，实际上，这依然是发布订阅的形式：

```ts
class Dep<T> {
  _value: T;

  constructor(val: T) {
    this._value = val;
  }

  get value() {
    // ==> addObserver
    // 收集依赖
    let targetBucket = depsMap.get(this);
    if (!targetBucket) targetBucket = new Set();
    activeEffect && targetBucket.add(activeEffect);
    depsMap.set(this, targetBucket);
    return this._value;
  }

  set value(val: T) {
    this._value = val;
    // ==> notify
    // 触发更新
    let targetDeps = depsMap.get(this);
    targetDeps?.forEach((effect) => effect());
  }
}
```

只不过是把依赖收集在一个全局变量中，方便后续的维护而已：

- 分支处理
- 过期依赖清理

等等....

#### Vue3响应式


在之前的实现中，我们用观察者模式的实例的形式来管理一个值，在`get`/`set`时进行依赖收集和通知。

我们知道，在ES6之前，Vue2是使用`Object.defineProperty`来拦截对象值的读取和写入操作，并进行依赖的处理。

而`ES6`语法中，新增了内置对象[`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy), 从字面上看也可以看出大概是代理的意思：

> Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

那么，自然而然地，Vue使用了Proxy进行代理模式的重构。

下面，我们对`Dep`的实现使用 `Proxy` 重构。

```ts
const depsMap = new Map();
class Dep<T> {
  _value: T;

  constructor(val: T) {
    this._value = val;
  }

  get value() {
    // 收集依赖
    let targetBucket = depsMap.get(this);
    if (!targetBucket) targetBucket = new Set();
    activeEffect && targetBucket.add(activeEffect);
    depsMap.set(this, targetBucket);
    return this._value;
  }

  set value(val: T) {
    this._value = val;
    // 触发更新
    let targetDeps = depsMap.get(this);
    targetDeps?.forEach((effect) => effect());
  }
}

```

首先，我们将对应的依赖收集和依赖触发相关的逻辑提取出来：

```ts
// 副作用函数
type EffectFn = () => void;
let activeEffect: EffectFn | undefined;
function effect(fn: EffectFn) {
  activeEffect = fn;
  fn();
}

// 依赖Map
const depsMap = new Map();

// 依赖收集
function track<T>(target:T, key: string) {
  // 收集依赖
  let targetBucket = depsMap.get(this);
  if (!targetBucket) {targetBucket = new Set()};
  activeEffect && targetBucket.add(activeEffect);
  depsMap.set(this, targetBucket);
}

// 依赖触发
function trigger<T>(target:T, key: string) {
  // 触发更新
  let targetDeps = depsMap.get(this);
  targetDeps?.forEach((effect) => effect());
}
```

然后，我们希望通过`Proxy`的api，实现一个函数，它接收一个对象，返回该对象的代理，并在其中处理`get`和`set`方法。现在，我们把它命名为 —— `reactive`。

```ts
function reactive<T extends object>(obj: T) {
  return new Proxy(obj, {
    get: (target, key, receiver) => {
      track(target, key);
      return Reflect.get(target, key, receiver)
    },
    set: (target, key, val, receiver)=> {
      const value = Reflect.set(target, key, val, receiver);
      trigger(target, key)
      return value;
    }
  })
}
```

这样，我们就实现了最基础的Proxy形式的响应式机制了。

你可能会问，这样的实现和`Object.defineProperty`有什么区别呢？

当然了，Vue的实现没有止步于此——

比如，在JS中我们可以通过`for in` 遍历对象的属性，可以通过`delete`删除属性，可以动态的添加属性，这在上述的`Object.defineProperty`是无法支持的，而使用Proxy的实现，让这些都变成了现实。[`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

#### 响应式的变更

```ts
function mount(vnode: VNode, container: HTMLElement) {
  const ele = document.createElement(vnode.tag);

  // 遍历props属性，将其中的事件和属性绑定到ele上
  for (const key in vnode.props) {
    if (key.startsWith("on")) {
      // on开头，则为事件
      ele.addEventListener(key.substring(2).toLowerCase(), vnode.props[key]);
    } else {
      // 普通属性
      ele[key] = vnode.props[key] as keyof HTMLElement;
    }
  }

  // 节点挂载
  if (typeof vnode.children === "string") {
    ele.innerText = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((node) => mount(node, ele));
  }

  contaniner.appendChild(ele);
}

type HTMLElementTagName = 'div' | 'a';

interface VNode {
  tag: HTMLElementTagName;
  props: Record<string, any>;
  children?: VNode[] | string;
}

let vnode: VNode = reactive({
  tag: 'div',
  props: {
    id: 'hello'
  },
  children: [
    {
      tag: 'div',
      children: 'hello'
    }
  ]
})

effect(mount(vnode, document.body))

setTimeout(()=> {
  vnode.children[0].children = 'hello world'
}, 1000)

```


### 前端hook

#### React 中的hook
在`React`中，`Hook`是一种特殊的函数，用于在函数组件中添加状态和其他`React`特性。`React`的`Hook`通常采用`useXXX`的命名方式，其中`XXX`是`Hook`的名称。例如，`useState`、`useEffect`、`useContext`等。

采用这种命名方式有以下几个原因：

- 语义化：`useXXX`命名方式可以清晰地表达这个函数是一个`React Hook`，而不是普通的函数。同时，命名中的`use`也表明这个`Hook`是用于处理状态或其他`React`特性的。

- 一致性：在`React`中，所有的`Hook`都采用`useXXX`的命名方式，这种统一的命名方式可以使开发者更容易理解和记忆，也方便了文档和教程的编写。

- 避免命名冲突：使用`useXXX`命名方式可以避免命名冲突，因为`React`会自动检查所有`Hook`的名称，确保`Hook`的名称是唯一的。

总之，`useXXX`的命名方式是`React Hook`的一种约定，它能够提高代码的可读性、一致性和可维护性，避免命名冲突等问题。

#### Vue 中的hook

实践：VueUse https://vueuse.org/core/useDraggable/