---
title:  Electron 学习 01： 运行第一个 electron 客户端
date:   2020-12-03 17:14:00
category: 
 - frontend
tag: 
 - Electron
---
### 初次运行
#### 环境配置
- 安装`node`和`npm`：官网安装
- 创建项目并在项目中安装`electron`：
```bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```
#### 最小目录结构
```
my-electron-app/
├── package.json
├── main.js
└── index.html
```
#### `main.js`文件

```js
const { app, BrowserWindow } = require('electron') // 引入electron的app和BrowserWindow模块

//定义一个函数，用于创建一个新的浏览窗口
function createWindow () { 
  // 创建一个新的800*600的窗口
  const win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: { 
      nodeIntegration: true // 打开开发人员工具
    }
  })

  win.loadFile('index.html') // 加载index.html
}

app.whenReady().then(createWindow) // 在第一次初始化时调用createWindow

app.on('window-all-closed', () => { // 侦听器，监听 关闭所有窗口 事件
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => { // 侦听器，监听 激活 事件，在程序激活且没有可视窗口时才创建窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```
#### `index.html`文件
```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
    </p>
</body>
</html>
```

#### package.json
```js
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### 运行

```bash
npm start
```

### 基础知识
#### 应用结构
- **Chromiun** 用于显示网页内容
- **Node.js** 用于本地文件系统和操作系统
- **自定义APIs** 用于使用经常需要的OS本机函数

#### 进程
- **主进程**：负责创建浏览器窗口实例，并管理所有网页及其渲染进程
- **渲染进程**： 负责管理单个网页；通过IPC与主进程通信在网页上进行GUI操作
- **通信模块**：`ipcMain`，`ipcRenderer`

#### APIs

- [Electron API](https://www.electronjs.org/docs/tutorial/quick-start?q=electron-vue#electron-api)
- [NodeJs API](https://www.electronjs.org/docs/tutorial/quick-start?q=electron-vue#nodejs-api)

