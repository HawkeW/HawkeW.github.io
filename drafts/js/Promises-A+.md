 一个安全、友好使用JavaScript promise的开放标准——由开发者制定，为开发者所用

 `promise`代表一个异步操作的最终值(`eventual result`)。与promise交互的最主要的方法就是调用`then`方法，它注册一些回调(`callbacks`)去接收`promise`的最终值(`eventual result`)或者没有成功执行(`fullfiled`)的原因。

 该规范说明了then方法的执行过程`behavior`，提供了一个可操作(`interoperable`)的基础，所有符合Promises/A+的promise 实现都可以基于此基础提供。因此，该规范需要是稳定的。Promises/A+组织可能不定期、小量地、向下兼容地调整此规范以满足新发现的案例，但是只会在尽量审慎地讨论、考量、测试后，才会集成大的、无法向下兼容的修改。

 在此之前， Promises/A+ 发布了早期的Promises/A 提案的行为条款，扩展到了实际(`de facto`)的行为，省略了未指定的、有问题的部分。
  最后，Promises/A+ 规范的核心不在于如何创建(create)、完成(fulfill)或拒绝(reject)Promise实例，而在于专注提供一个可交互的`then`方法。 


简单理解是Promises/A+是一个专注于描述`then`方法的`promise` 规范。

## 1. 术语

 1.1  `promise`是一个执行过程符合此规范的、拥有`then`方法的`function`或者`object`
 1.2 `thenable`是一个拥有`then`方法的`function`或`object`
 1.3 `value`是任意一个合法的`JavaScript`值，包含`undefined`, `thenable`或`promise`
 1.4 `exception`是一个由`throw`关键字创建的值`value`
 1.5 `reason`是一个描述`promise`被拒绝原因的值`value` 

## 2. 要求

### 2.1 `Promise` 状态

-  `Promise`有且只有三个状态： `pending`, `fulfilled`, `rejected`

### 2.1.1 `promise`处于`pending`状态时：

- 2.1.1.1 它可能变成`fulfilled`或者`rejected`

### 2.1.2`promise` 处于 `fulfilled` 状态时：

- 2.1.2.1 它不会再变成其它状态
- 2.2.2.2 它一定会有一个**不会改变**的值`value`

### 2.1.3 `promise` 处于 `rejected`状态时：

- 2.1.3.1 它不会再变成其它状态 
- 2.2.3.2 它一定会有一个**不会改变**的值`value`
  这里的**不会改变**意味着等价的 `immutable identity`(如===)，而不是指其深层的不变性(`deep immutability`)



### 2.2 `then`方法

`Promise`必须提供一个`then`方法获取当前的状态、终值(`eventual value`)或者原因(`reason`)
`Promise`的`then`方法接收两个参数:

```js
promise.then(onFulfilled, onRejected)
```

**2.2.1** `onFulfilled`和`onRejected`都是可选参数

- 2.2.1.1 如果`onFulfilled`不是一个函数(`function`)，它会被忽略
- 2.2.1.2 如果`onRejected`不是一个函数(`function`),它会被忽略

**2.2.2** 如果`onFulfilled`是一个函数(`function`):

- 2.2.2.1 它**一定会**在`promise`执行完成时(`fulfilled`)被调用，此时`promise`的值`value`会作为它的第一个参数传入

- 2.2.2.2 它**一定不会**在`promise` 执行完成(`fulfilled`)之前被调用

- 2.2.2.3 它一定不会被调用超过一次

**2.2.3** 如果 `onRejected` 是一个函数(`function`):

- 2.2.3.1 它**一定会**在`promise`被拒绝(`rejected`)时被调用，此时`promise`的值`value`会作为它的第一个参数传入

- 2.2.2.2 它**一定不会**在`promise` 被拒绝(`rejected`)之前被调用

- 2.2.2.3 它**一定不会**被调用超过一次

**2.2.4** 在执行上下文运行到只剩平台代码之前，`onFulfilled`或者`onRejected`**一定不会**被调用

**2.2.5** `onFulfilled`和`onRejected`**一定会**被当做函数调用（而不是某个对象的方法，比如不能`this.`）



**2.2.6** `then`可以在同一个`promise`上被多次调用。即支持链式调用

- 2.2.6.1  当`promise`执行完成时，所有相应的`onFulfilled`**一定会**按照`then`的顺序进行调用

- 2.2.6.2  当`promise`执行完成时，所有相应的`onRejected`**一定会**按照`then`的顺序进行调用



**2.2.7** `then`**一定会**返回一个`promise`

```js
const promise2 = promise1.then(onFulfilled, onRejected);
```

- 2.2.7.1 如果`onFulfilled`或者`onRejected`返回一个值(value)`x`，则执行**Promise解析程序**`[[Resolve]](promise2, x)`

- 2.2.7.2 如果`onFulfilled`或者`onRejected`抛出一个异常值`e`，`promise2`也**一定会**被拒绝并返回`e`作为原因(reason)

- 2.2.7.3  如果`onFulfilled`不是一个函数且`promise1`进入了执行完成状态，`promise2`也**一定会**执行完成并返回`promise1`的值(value)

- 2.2.7.4 如果`onRejected`不是一个函数且`promise1`进入了被拒绝状态，`promise2`也**一定会**被拒绝并返回`promise1`的原因(reason)



### 2.3 **Promise解析程序**

 **Promise解析程序**是一个接收一个`promise`和一个值的抽象操作，本文用`[[Resolve]](promise, x)`表示。如果`x`是`thenable`，且`x`的表现有一点点像`promise`，解析程序就会尝试使`promise`采用`x`的状态。否则，解析程序会把`promise`执行完成，并返回值`x`作为`promise`的值

 只要`thenable`暴露一个符合并向下兼容的Promises/A+协议的`then`方法，这种处理方式，将使`promise`的实现具有可互操作性(`interoperate`)；这样，即使一个拥有`then`方法的实现不符合Promises/A+协议，也能够被符合Promises/A+协议的实现理解

 执行`[[Resolve]](promise, x)`的步骤如下：

**2.3.1** 如果`promise` 和 `x`指向同一个对象，则拒绝`promise`并抛出一个类型异常(`TypeError`)作为其原因

**2.3.2** 如果`x`是一个`promise`，则采用`x`的状态

- 2.3.2.1 如果`x`状态为`pending`，`promise`保持为`pending`状态，直到`x`执行完成或被拒绝

- 2.3.2.2 如果/当`x`状态为执行完成，`promise`也将被执行完成，并返回`x`的值

- 2.3.2.3 如果/当`x`状态为被拒绝，`promise`也将被拒绝，并返回`x`的被拒绝原因

**2.3.3** 否则，如果`x`是一个对象或函数，

- 2.3.3.1 `then`将被赋值为`x.then`

- 2.3.3.2 如果检索属性`x.then`时返回了一个异常`e`（即没有找到`x.then`）,则拒绝`promise`并返回原因`e`
  - 2.3.3.3 如果`then`是一个函数，将调用`then`并传入`x`作为`this`，第一个参数为`resolvePromise`，第二个参数为`rejectPromise`。
    - 2.3.3.3.1 如果/当 `resolvePromise` 以值`y`调用时，执行`[[Resolve]](promise, y)`
    - 2.3.3.3.2 如果/当 `rejectPromise` 以异常`r`调用时，拒绝`promise`并返回原因`r`
    - 2.3.3.3.3 如果/当 `resolvePromise` 和 `rejectPromise` 被调用时，或者或者被相同的参数多次调用时，只有第一次调用有效的，其它的调用会被忽略。
    - 2.3.3.3.4 如果`then`调用时抛出一个异常`e`，
      - 2.3.3.3.4.1 如果/当 `resolvePromise` 或`rejectPromise` 已经被调用，则忽略这个异常；
      - 2.3.3.3.4.2 否则，拒绝`promise`并返回异常`e`

- 2.3.3.4 如果`then`不是一个函数，`promise`将执行完成并返回值`x`

**2.3.4** 如果`x`不是对象或函数，`promise`将执行完成并返回值`x`



## 3. 说明

3.1 在本文中, 平台代码`Platform code` 指的是引擎、环境、以及promise实现代码。 这在实践中保证了已完成`onFullfilled`和已拒绝`onRejected`异步执行，在事件循环执行到`then`后，于新的堆栈中被调用。这可以通过宏任务( macro-task )机制如 `setTimeout`或者`setImmediate`，或者通过微任务(micro-task) 机制如`MutationObserver` 或者`process.nextTick`来实现。由于promise实现被当成平台代码，它本身也可能包含一个任务调度队列或者`trampoline`在其中调用处理程序。

3.2 即在严格模式下，`this`为`undefined`， 或者在宽松模式下，为全局对象

3.3 只要满足所有需要，实现可以允许`promise2 === promise1`。每一个实现需要纪录它是否可以产生`promise2 === promise1`, 以及是在什么情况下相等。

