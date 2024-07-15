---
title: 【Node.js】Node.js后端开发入门(2)：Express最佳实践
date: 2021-10-24
category: 
 - backend
tag: 
 - Node.js
typora-root-url: ..\.vuepress\public
---

## Express最佳实践

### 热更新工具 - `nodemon`

安装:: 

```shell
npm install --global nodemon
```

使用：

用`nodemon xx `代替 `node xx`

```bash
nodemon app.js
```

### 模板引擎- `art-template`

- [`art-template`中文文档](https://aui.github.io/art-template/zh-cn/docs/)
- [express-art-template](https://aui.github.io/art-template/express/)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置

```js
app.engine('art', require('express-art-template'))
```

使用:

```js
app.get('/', function(req, res) {
    // express 默认会去项目的vies 目录查找index.html
    res.render('index.html', {
        title: 'hello world'
    })
})

// index.html
...

<div>{{title}}</div>
```

修改`views`视图渲染存储目录

```js
app.set('views' , "目录路径")
```

### 获取GET表单请求数据

Express 内置了一个API, 可以直接通过`req.query`获取get请求数据

### 获取post表单请求数据

Express 没有内置获取表单POST请求体的API, 这里使用一个第三方包, `body-parser`

文档： [body-parser](https://www.expressjs.com.cn/resources/middleware/body-parser.html)

安装：

```sh
npm install body-parser
```

使用：

```javascript
var bodyParser = require('body-parser')
```

示例：

```javascript
var express = require('express')
// 1. 引入
var bodyParser = require('body-parser')

var app = express()

// 2. 配置
// 配置 body-parser
// 只要加入这个配置，则可以再req请求体对象上多一个属性: body
// 即可以通过req.body来获取表单 POST请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // 3. 使用
  res.end(JSON.stringify(req.body, null, 2))
})
```