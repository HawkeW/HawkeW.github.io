# `Cesium`- 添加万级`billboard`数据及优化（2）

上篇文章介绍了Cesium billboard的初步优化，即使用`primitives`代替`entities`API创建billboard，cesium 对 primitives 数据进行了优化，它具有更小的“体积”。

本文继续了解Billboard的表现。

文章依旧使用 [Chrome 性能分析工具](https://developer.chrome.com/docs/devtools/evaluate-performance/)，如果是初次使用或者对该工具不了解，可以点击链接进行学习。（需要梯子）



## Billboards渲染



- `DistanceDisplayConditions `, see [Cesium Version 1.26 Released](https://cesium.com/blog/2016/10/03/cesium-version-1.26-released)

### 参考

[Entity API Performance](https://cesium.com/blog/2018/06/21/entity-api-performance/)

[~10k Entitty Performance](https://community.cesium.com/t/10k-entity-performance/9058/3)