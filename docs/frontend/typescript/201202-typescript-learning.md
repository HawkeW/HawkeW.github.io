---
title:  TypeScript - 初步学习TS
date:   2020-12-02 17:34:00
category: 
 - frontend
tag: 
 - TypeScript
---

### 初识TypeScript
#### 安装
- npm安装 
- VS插件
```bash
$ npm install -g typescript
```

#### 编译代码
命令行运行:
```bash
$ tsc xxx.ts
```
#### 使用
- 类型注解
```ts
function greeter(person: string) {
    console.log("Hello, " + person);
}
greeter("Jane")
```
- 接口(interface)
```ts
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    console.log("Hello, " + person.firstName + " " + person.lastName);
}
let user: Person = { firstName: "Jane", lastName: "Foxtin" };
greeter(user)

```
- 类
```ts
class Student {
    fullName: string;
    constructor(firstName, middleInitial, lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    console.log("Hello, " + person.firstName + " " + person.lastName);
}

let user = new Student("Jane", "M.", "User");

greeter(user);
```

### 基础类型
1. 布尔
2. 字符串
3. 元组
4. 枚举
5. Any
6. Void
7. Null和Undefined
8. Never
9. Object

```ts
// boolean
let isDone: boolean = false; 
// number
let decLiteral: number = 6; 

// string, 支持模板字符串
let name: string = "bob"; 

// array, 同数据类型数组
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

//tuple，已知元素数量和类型的数组
let x: [string, number];
x = ['hello', 10]; // OK
// 越界时，会使用联合类型替代
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

// enum, 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// 枚举存在以0为初识的元素编号，也可以手动指定编号
enum Color {Red = 1, Green, Blue} 
enum Color {Red = 1, Green = 2, Blue = 4} 
Color[2] // 获取枚举值的名字

//any，不指定变量类型
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
let newAnyArr:any[] = [123, '1', true];

//void，通常用于函数，表示无返回值
function warnUser(): void {
    console.log("This is my warning message");
}
// null 和 undefined
let u: undefined = undefined;
let n: null = null;

//never, 表示永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```