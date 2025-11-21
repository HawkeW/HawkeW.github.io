---

title:  【NPM】一个打包脚本与AI IDE引发的血案
date: 2025-11-21
category: 
 - frontend
description: 一个npm打包脚本与AI IDE引发的血案
tag: 
 - JavaScript
typora-root-url: ..
main_image: '\images\mainimage\4-skateboarder-rides-past.jpg'
---
## TL;DR
- 现象：在 Windows/PowerShell 下，`npm run build -- --buildName=test` 参数丢失，`minimist(process.argv)` 只剩 `{ _: [] }`。
- 原因：不是 Node 的锅，是 npm CLI 与 PowerShell 的参数转发在 10.x 某些版本上不稳定。
- 验证：直接执行 `node build.mjs --buildName=test` 正常；走 `npm run` 脚本运行就掉链子。
- 解决：升级到 `Node v22.21.1 + npm v10.9.4`

## 环境
- 终端：PowerShell（Windows）
- 正常版本：Node v20.19.4，npm v10.8.2
- 异常版本：Node v22.14.0，npm v10.9.2
- 修复版本：Node v22.21.1，npm v10.9.4

## 打包异常
今早准备打包前端版本的时候，报错 `buildName is not provided`，打包命令如下：

```bash
$ npm run build -- --buildName=test
```

`package.json` 配置如下
```json
{

  "name": "packagename",
  "type": "module",
  "scripts": {
    "build": "node build.mjs"
  }
}
```


`build.mjs` 脚本实际内容如下
```js
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

const buildName = argv.buildName

if(!buildName) {
	console.error('BuildName not provided, exit now.');
    process.exit(1);
}

// 打包过程略
```


也就是说，`build` 脚本没有正确的读到传参。打印`argv`变量，发现值也是空：

```js
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

console.log(argv) // { _: [] }
```


想了一下，这个问题之前也出现过——在一次版本升级过程中，升级了`node v22`（v22.14.0），当时出现传递参数错误的问题，就先进行`node v20`(v20.19.4)降级就直接解决了，而近期又对`node` 做了版本升级，于是基本是`node/npm`相关的问题了。

**正常版本**：node v20.19.4
**异常版本**：node v22.14.0

PS: 在尝试过程中，猜测 Node 22 有传参方式变更，于是随手测试使用了，进行了一次打包(有点莫名其妙)。
```bash
$ npm run build --buildName=test
```

实际当然是不行的。

## 神奇 AI 在哪里 —— 能修就修

按照惯例，有问题先找 AI。这次也不例外。

便继续询问 `GPT` 解决方案——

### 起初，错误的问题

由于之前尝试使用了`npm run build --buildName=test`，在首次对话时，图省事就直接把这行脚本复制进去了。

> 问：
> node 升级到22版本，npm run build --buildName=test 参数没有传递到scripts脚本中

`gpt`一通调整，判断是少写了 `--` 参数，于是对代码进行了兼容处理，并输出报告：

> 答：
> **问题原因**
> 1. 升级到 Node 22 后，随之升级的 npm 10 对 run-scripts 的参数转发更严格：不使用 -- 分隔时， --foo=bar 不会通过 argv 传给脚本，而是作为 npm 配置暴露为环境变量 npm_config_foo 。
> 2. 你的构建脚本 scripts/build.mjs 之前只从 process.argv 读取参数，导致 npm run build --buildName=... --publish 未加 -- 时，脚本拿不到参数
> 
> **使用方式**
>  1. 推荐（npm 7+/10 标准用法）： npm run build -- --buildName=test
>  2. 兼容（你习惯的用法）： npm run build --buildName=test

可以看到，AI对我错误的输入进行了拷打，【**推荐（npm 7+/10 标准用法）**】，然后进行了兼容操作（不是）。

### 兼容，能跑就行
*能跑 ≠ 正解，但先把路打通。*

很快啊，AI 输出了兼容代码。内容如下：

```js
import minimist from 'minimist';

const getNpmConfig = (name) => {
  const lc = String(name).replace(/-/g, '_').toLowerCase();
  return process.env[`npm_config_${lc}`] ?? process.env[`npm_config_${name}`];
};

const argv = minimist(process.argv.slice(2));

const buildName = argv.buildName ?? getNpmConfig('buildName') ?? getNpmConfig('buildname');

if(!buildName) {
	console.error('BuildName not provided, exit now.');
    process.exit(1);
}

// 打包过程略

```

再执行打包命令操作，问题也就解决了，无论是
```bash 
 $ npm run build --buildName=test
```

还是：
```bash 
 $ npm run build -- --buildName=test
```

都可以正确执行，项目先顺利打包了。

本题完，end of story。

## 问题解决了？但是……

但是打包之后，回头再来看看上下文

1. 我不是要解决`npm run build --buildName=test`的兼容问题，实际用推荐的写法，`npm run build -- --buildName=test`，也是不行的
2. 用`minimist` 这种插件不就是为了避免处理args吗，现在又来手动处理，好不优雅

### minimist 的 bug？
查了一下minimist，已经三年没有更新了，所以也没有新版本可供使用。去 github仓库查看issues，并没有相关问题。难道是minimist对新版本的node版本有兼容问题？

### Node.js 的 breaking changes？

既然可能和node版本相关，于是尝试查找 Node v20 → v22 之间有没有 breaking changes 会导致相关问题

然而Node 版本迁移文档[Node.js — Node.js v20 to v22](https://nodejs.org/en/blog/migrations/v20-to-v22) ，以及Node.js release文档 [Node.js — Node.js Releases](https://nodejs.org/en/about/previous-releases) 版本发布文档，并没有说明相关更新

在查询相关内容未果后，本地继续尝试调试

### 绕过 npm
跳过中间人，直接和 Node 对话。

从前文可知，`npm run build -- --buildName=test` 实际执行的脚本是 `node build.mjs` 。而根据`npm-run-script`文档[npm-run-script | npm Docs](https://docs.npmjs.com/cli/v8/commands/npm-run-script) ，`npm run-script <command> [-- <args>]` `--` 后面的内容即为args参数，会传递给脚本。

接下来直接尝试运行：
```bash
$ node build.mjs --buildName=test
```

日志输出`argv`参数：
```bash
{ _: [], buildName: 'test' }
```

argv参数成功获取了！

那基本可以排除`minimist`本身的问题，可以猜测到大概率是 `npm run scripts`的传参问题了

## AI 拷问室：npm-run-script

再次询问AI，根据上下文，AI把问题归因于node版本问题导致的差异——

> 问：
> 	为什么直接运行 node build.mjs --buildName=test ，process.argv 可以正常获取参数，但是 npm run build -- --buildName=test 不行呢？同时 node20 版本可以，node22 版本不行
> 	
> 答：
> 	*此处省略一部分AI对脚本缺少`--`符号的拷打和给出解决方案部分内容*
> 	原因概述：
> 	.....
> 	直接执行 node build.mjs ... 时，参数由 Node 进程原样接收，所以 process.argv 能看到全部传参。
> 	
> 	通过 npm run build -- ... 时，参数先经过 npm 的 run-scripts。**升级到 Node 22 通常伴随 npm 升级到 v10，npm 10 改变了转发逻辑**：
> 	
> 	**这就是 Node20 可以、Node22 不行的差异**：npm 版本升级导致 run-scripts 的参数转发行为变化，不是 Node 本身的解析问题。
> 	.....
> 	
> 	**结论**
	   **你看到的 minimist(process.argv) 为空是 npm 10 的运行时行为变化，属于预期。**
	   .....
> 


但是奇怪的是，之前我们查看更新日志，并没有发现相关的更新，难道是看漏了？

### 要事实，不要幻觉！

> 问：
> “你看到的 minimist(process.argv) 为空是 npm 10 的运行时行为变化，属于预期。”  这个有没有更新说明可以作为证据？


> 答：
> ......
> 
> 权威证据:
> 1. npm 配置文档：明确说明两点。
> - `--`将停止 CLI 解析，之后的内容应作为脚本参数传递。
> - 以 npm_config_ 开头的环境变量会被当作配置项，未显式赋值的布尔配置默认 true ，并且在 npm 脚本里 Node 会优先使用小写版本的这些环境变量。来源： https://docs.npmjs.com/cli/v8/using-npm/config/ （“Command Line Flags”和“Environment Variables”章节）
> 
> 2. npm CLI v10 Windows/PowerShell 下的回归问题（与你的现象完全一致）：
> - 复现示例显示在 PowerShell 中运行 npm start -- command --arg=value 时，子进程process.argv 缺少 --arg=value ；而在 cmd.exe 中可以正确传递。环境为 Node v22.0.0、npm v10.6.0。来源（Release 10.x 标注）： https://github.com/npm/cli/issues/7440
> 
> 3. npm 7 的老问题解释了 PowerShell 对 -- 的特殊处理与 npm 的参数解析交互，导致参数被“吃掉”：
>- 指出 PowerShell 将 -- 视为“参数结束”，配合 npm 的解析库会出现脚本拿不到后续参数的情况，并给出工作原理和修复思路。来源： https://github.com/npm/cli/issues/3136
>
> 4. npm 10 的另一份案例（Windows/PowerShell）：
>- 在 npm 10.5.2 + Node 20 上，运行 npm run ... -- -test-arg test-arg-value 导致 process.argv 被错误地改写，印证了 v10 在 Windows/PowerShell 上的参数转发不稳定。来源： https://github.com/npm/cli/issues/7375
> ......
> *此处省略一部分AI对脚本缺少`--`符号的拷打和给出解决方案部分内容*

终于，AI找到了一些事实性依据，但是仍然定性为“npm 版本差异问题”。

## 原因定位与证据
- npm 配置文档对 `--` 与 `npm_config_*` 的说明：https://docs.npmjs.com/cli/v8/using-npm/config/
- Windows/PowerShell 下 npm CLI v10 参数转发的回归问题（与你的现象一致）：https://github.com/npm/cli/issues/7440
- npm 7 历史问题解释 PowerShell 对 `--` 的特殊处理与 npm 解析交互：https://github.com/npm/cli/issues/3136
- npm 10 的另一案例（Windows/PowerShell）印证参数转发不稳定：https://github.com/npm/cli/issues/7375

一句话：PowerShell 把 `--` 当分界线，npm CLI 某些版本没处理好。

### 事情的真相只有一个

众所周知，AI会有幻觉问题。在对话过程中，AI根据上下文做了一些总结，将问题原因归因于版本问题，并且“义正言辞”地表示 `npm 10`改变了转发逻辑，把问题归因于 版本的差异化。

在倒数第二个对话中，
1. AI并没有确认 `npm`版本变化情况，而是直接推测是 npm 升级到了 v10  （升级到Node 22通常伴随 npm 升级到 v10）
2. AI下结论了变更是预期内的（是 npm 10 的运行时行为变化，属于预期）

那么对以上事实性部分再次进行确认

### npm 版本

**正常版本**：node v20.19.4，npm `v10.8.2`
**问题版本**：node v22.14.0，npm `v10.9.2`

**不存在大版本变更，且小版本更新日志未体现。**

### npm CLI

在最后一次对话中，终于提供了事实链接：

> npm 10 的另一份案例（Windows/PowerShell）： https://github.com/npm/cli/issues/7375

Issue 中反馈了： [BUG] Passing CLI arguments via a Node scripts no longer works

基本上可以确认是npm cli版本与powershell适配的一些问题了。于是升级 node 22到最新的版本，problem solved！

相关版本如下：
**正常版本(node 20)**：node v20.19.4，npm v10.8.2
**问题版本(node 22)**：node v22.14.0，npm v10.9.2
**正常版本(node 22)**：node v22.21.1, npm v10.9.4

## 解决方案与建议
- 优先方案：升级到 `Node v22.21.1 + npm v10.9.4`（或更高的无问题组合）。
- 临时兜底：在脚本中读取 `process.env.npm_config_*` 来获取参数值。
- 规避路径：在定位问题期间，直接运行 `node build.mjs --buildName=test` 验证逻辑，不经 `npm run`。
- 版本管理：使用 `nvm-windows` 或 `volta` 管理并锁定 Node/npm 版本，减少环境漂移带来的不确定性。
- 排查模板：优先确认平台（Windows/PowerShell）、直接 Node 复现、检索 npm CLI issue 与发布说明。

## 总结

1. 对话上下文（特别是首轮对话）很重要，会被AI反复引用/尝试解决。所以要文对问题
2. AI幻觉还是存在，与AI对话，需要多问它要事实性依据
3. 从经验触发，相信直觉还是必要的，比如一开始的版本问题，反而是更好排查的方向。不过这里又分了好几个项目，比如 `node`，比如 `npm cli`，还牵扯到一些 npm-run-script 问题，信息复杂的时候，关注点会被迫分离。
4. 实用建议：遇到 run-scripts 参数问题时，优先直接用 `node` 验证 + 检查 npm CLI issue，形成排查模板。