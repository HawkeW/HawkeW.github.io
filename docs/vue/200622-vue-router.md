---
title:  【学习笔记】Vue Router 速览 -- 官方文档
date: 2020-06-22
category: 
 - vue
typora-root-url: ..\.vuepress\public
---

之前学习`vue`基础部分之后，接手的项目和方向就直接调整为`uni-app`了，所以就一直没有什么机会去使用`vue router`去管理页面。

那么这次主要通过速览的方式，通过文档了解和学习`vue router`的基本使用和处理方法。**注：学习笔记，内容与官方文档基本一致！**

## 安装和基本使用

### 安装
在`vue`项目中使用`vue-router`，需要先进行安装操作。
```js
npm install vue-router
```
`npm`安装后，在项目根目录`main.js`中明确安装路由功能:

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

### 使用

#### 创建

在官方文档中，`vue router`的创建分为四步：

 1. 定义 (路由) 组件。

```js
const Foo = template: '<div>foo</div>';
const Bar = template: '<div>bar</div>';
```

2. 定义路由

```js
const routes = [
    { path:'/foo', component: Foo },
    { path: '/bar', component: Bar }
]
```

3. 创建 router 实例

```js
const router = { routes //routes: routes的缩写 }
```

4. 挂载 router 到根实例

```js
const app = new Vue({
  router
}).$mount('#app')
```

当 `router` 被挂载到根实例后，可以通过 `this.$router` 访问路由器。

#### 使用

1. 在`html`中使用`<router-link>`和`<router-view>`组件。

```js
 <div id="app">
  <h1>Hello App!</h1>
  <p>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <router-view></router-view>
</div>
```
2. 使用`router` 的实例方法进行跳转

- `router.push(location, onComplete?, onAbort?)`：向`history`栈中添加一个新的记录，当用户点击浏览器回退时，可以回到之前的页面。等同于`<router :to='...'>`
- `router.replace(location, onComplete?, onAbort?)`
- `router.go(n)`

在`vue`实例内部，可以通过`this.$router`调用

## 通过API进行路由跳转

### `router.push()`

- `router.push`调用等同于点击`<router-link :to="...">`。

- `router.push`会向 `history` 栈添加一个新的记录，当用户点击浏览器后退按钮时，可以回到之前的 URL。

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

- `params`总是和`name`一起出现，而与`path`一起时，则会被忽略

### `router.replace（）`

- 与`router.push`区别在于，`router.replace`会直接替换当前`history`记录，而不会添加新的记录
- 相当于`<router-link :to="..." replace>`

### `router.go()`

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

`vue router`实际是效仿`window.history` API的。 上述的调用，分别对应着`window.history.pushState`，`window.history.replaceState`，`window.history.go`

[Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

## 动态路由匹配

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

其中`id`为`动态路径参数（dynamic segment）`，上述代码中设置，`/user/foo`、`/user/bar`都将映射到`User`模板中。并且，该参数值将会被设置到`this.$router.params`，可以通过`this.$router.params.id`获取到值。

**一个路由中设置多个路径参数：**

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

### 响应路由参数的变化

使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，只改变参数的路由跳转，将会**复用原来的组件实例**，这种复用比销毁再创建更为高效，但是，**组件的生命周期钩子函数不会再被调用**。

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

```js
//beforeRouteUpdate 导航守卫
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
      
  }
}
```

### 多页面匹配

```js
{
  // 会匹配所有路径,通常用于客户端404错误
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

注意，`pathMatch`的值为被通配符匹配到的内容，而不是页面的路由。

## 嵌套路由

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 匹配 /user/:id
          path: '',
          component: UserHome
        },
        {
          // 匹配 /user/:id/profile
          path: 'profile',
          component: UserProfile
        },
        {
          // 匹配 /user/:id/posts
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

1. 当配置嵌套路由时，如果想在匹配到的父级路由下渲染内容，可以设置`path`为`''`
2. 子路由的配置与路由配置相同

## 命名路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

- 命名路由，应该就是相当于用一个`alias`标识一个路由，从而更方便的引入

- 被标识的路由如果需要接收一个参数，如上方的`:userId`，则可以通过`params`传入

```js
//router-link
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
//router.push
router.push({ name: 'user', params: { userId: 123 }})
```

## 命名视图

```text
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

- 命名视图可以用于同时（同级）展示多个视图，如`sidebar`和`main`
- 可以在界面设计多个单独命名的视图，而不是只有一个单独的出口`router-view`
- 没有设置名称的`router-view`，会被默认设置为`default`

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>

<!-- NavBar.vue -->
<div>
  <router-link to="/settings/emails">emails</router-link>
  <br>
  <router-link to="/settings/profile">profile</router-link>
</div>

<!-- UserEmailsSubscriptions.vue -->
<div>
  <h2>User Emails Subscriptions</h1>
</div>

<!-- UserProfile.vue -->
<div>
  <h2>User Profile</h1>
</div>

<!-- UserProfilePreview.vue -->
<div>
  <h2>User Profile Preview</h1>
</div>
```

```js
//路由配置
{
  path: '/settings',
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

官方示例基本展示了命名视图的使用，可以看到，基本模式如下：

- 父级组件`router-link`路由跳转
- 父级组件配置多个`router-view`，其中，`name`属性为空的将匹配`default`组件，不为空的则匹配对应名称的组件。
- 路由配置嵌套子级路由。对于一个视图，使用一个组件渲染，即仅需配置`component`；同级路由下的多个视图，则需要配置多个组件，即配置`components`。

::: tip

`Vue Router`避免了页面进行非必须的跳转，在同级路由下直接通过多个`router-view`展示多个组件。

:::

## 重定向和别名

- 重定向至路径

	```js
	routes: [{ path: '/a', redirect: '/b' }]
	```

- 重定向至命名路由：
	```js
	routes: [{ path: '/a', redirect: { name: 'foo' }}]
	```

- 通过方法动态确定重定向目标：
	```js
	routes: [{ path: '/a', redirect: to => {
    	//方法接收`目标路由` 作为参数，
    	//`return` 重定向的 字符串路径/路径对象
  }}]
	```

## 路由组件传参

- 组件中使用`$route`会使得其与对应路由高度耦合，只能在某些特定的URL上使用，限制了灵活性

  例如，若组件使用`$route.params.id`获取参数，则只有在使用路由跳转的时候传入参数`id`(`/user:id`)，组件才可以拿到这个`id`值

- 所以，可以通过`props`进行解耦，使得组件有更高的复用性，且易于测试

### 传参方式

- 布尔模式

```js
//将props值设置为true，route.params将会被设置为组件属性
const router = new VueRouter({
	routes: [
        { path: '/user/:id/:date', component: User, props: true } //把 route.params 传给 props,有几个参数传几个参数
    ]
})
```

- 对象模式，会将参数原样设置为组件属性值。适用于静态的参数值

```js
const router = new VueRouter({
  routes: [
    { 
        path: '/promotion/from-newsletter', 
        component: Promotion, 
        props: { name: 'world' } //静态参数
    }
  ]
})
```

- 函数模式

```js
function dynamicPropsFn(route){
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

const router = new VueRouter({
  routes: [
    { path: '/search/:years', component: SearchUser, props: dynamicPropsFn}
  ]
})
```

### 接收参数

组件在接收参数时，有两种方式——

1. 通过`props`接收参数获取 
2. 直接通过`$attr`获取`router-view`中不作为 prop 被识别 (且获取) 的 `attribute` 绑定。

```js
...
	<router-view class="view" foo="attr1" bar="attr2"></router-view>
...
const routes =[
    { path: '/attrs', component: Hello, props: { name: 'World' }},
]
```

```js
//Hello.vue
<template>
  <div>
    <h2 class="hello">Hello {{name}} {{ $attrs }} </h2>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Vue!'
    }
  }
}
</script>
```

`/attrs`页面：

**Hello World { "foo" : "attr1", bar: "attr2" }**