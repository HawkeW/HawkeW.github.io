---

title: 【Node.js】Node.js后端开发入门(1)：了解Express
date: 2021-10-11
category: 
 - backend
tag: 
 - Node.js
typora-root-url: ..\.vuepress\public
---

## Express快速开始

### Hello World

1. 确保已安装`node.js`

2. `npx`直接生成项目。或者安装`express-generator`， 再用`express`生成

   ```bash
   // 方式1
   $ npx express-generator
   ```

   ```bash
   // 方式2
   $ npm install -g express-generator
   $ express
    
   $ express --view=pug myapp
   ```


2. 在项目目录安装依赖

   ```bash
   $ cd myapp
   $ npm install
   ```

3. 运行项目(Windows)。

    ```bash
    $ npm start
    ```

4. 项目目录如下

   ```
   .
   ├── app.js
   ├── bin
   │   └── www
   ├── package.json
   ├── public
   │   ├── images
   │   ├── javascripts
   │   └── stylesheets
   │       └── style.css
   ├── routes
   │   ├── index.js
   │   └── users.js
   └── views
       ├── error.pug
       ├── index.pug
       └── layout.pug
   
   7 directories, 9 files
   ```

5. 项目默认端口为`3000`, 浏览器输入`http://localhost:3000`效果如下:

   ![image-20211011151611574](\image-20211011151611574.png)

### 基本路由（routing）

路由的定义基本结构如下

```js
app.METHOD(PATH, HANDLER)
```

- `app`为`express`实例

- `METHOD`为 `HTTP` 请求方法, 全部小写
- `PATH`是服务器中的路径
- `HANDLER`为当路由匹配时的处理函数

简单的示例:

```js
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```

### 静态文件服务

#### 单个static路径

提供图片、`CSS`文件、`Javascript`文件等服务，可以使用`Express`内置的中间件函数`express.static`

函数调用方式：

```js
express.static(root, [options])
```

- `root`参数标明提供的静态文件服务所在的根目录
- 更多参数见[`express.static`](http://expressjs.com/en/4x/api.html#express.static)

比如，可以按照下方代码提供项目路径下`public`目录下的静态文件：

```js
app.use(express.static('public'))
```

现在，向`public`文件夹下添加图片`demo.jpg`，就可以通过`http://localhost:3000/demo.jpg`这个地址访问该图片了。

> `Express` 相对于提供的路径查找文件，所以静态路径的名称(如上面的`public`)将不会展示在URL中

#### 多个static路径

`Express`支持添加多个静态路径。多次调用`express.static`即可实现

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

相对于单个路径，配置多个路径时，`Express` 会顺序查找静态路径中的内容。如此时向`files`文件夹添加一张图片`1.png`, 访问`http://localhost:3000/1.png`时，Express会经历类似: “查找`public`路径=> 查找失败=> 查找`files`路径=> 查找成功 ”的过程，最后成功返回`1.png`图片;

> 注意: 为了获得最佳效果, 使用 [反向代理](http://expressjs.com/en/advanced/best-practice-performance.html#use-a-reverse-proxy) 缓存可以提高静态文件服务的表现。

#### 请求路径修改

可以添加一个不存在的虚拟路径作为静态文件服务的路径前缀。`app.use`函数支持提供一个`path`参数作为中间件函数的触发路径。

```js
app.use('/static', express.static('public'))
```

这样， 使用以下路径就可以访问上面提到的文件了：

`http://localhost:3000/static/demo.jpg`

`http://localhost:3000/static/1.png`

#### 最佳实践：使用绝对路径

但是，`express.static`函数的路径参数是相对于启动node进程服务的路径。如果从其他目录启动express app，更安全的做法是使用绝对路径：

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

