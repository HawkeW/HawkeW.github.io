---
title: Cesium + TS 实现航线绘制
date: 2021-05-17
sidebarDepth: 5
category:
  - frontend
tag:
  - TS
  - Cesium
description: Cesium + TS 实现在地球上进行航线绘制，并设置高度。
typora-root-url: ..
---

## 开始

**需求**

大体说明一下我们的需求：

1. 能够在地球上进行选点，绘制航线，并结束绘制
2. 绘制完毕后，逐一弹窗，并对点进行高度设置（或者微调经纬度）
3. 设置单点时，视角会移动到被设置的点； 设置完毕后，视角移动到下一个点。
4. 所有点设置完毕时，视角自适应查看所有航线

### `Cesium`

- 3D地球
- 用于显示航线及在地球上操作绘制

### `ts`

**ts 优点**

- 类型检测，确定变量类型后，IDE 会对变量进行类型检测，减少开发阶段的犯错
- 语法提示，上下文提示非常友好
- 便于重构
- ......

### 其它

- `Custome Element`： `ts`实现弹窗组件, 用于显示经纬度、高度及值的修改

### 最终效果

#### 目录

```
|-- Core
	|-- Base // 定义一些基本类
	|	|-- BaseDefine.ts
	|	|-- BaseDrawTool.ts
	|	|-- BaseFeimaViewer.ts
	|-- Primitive // 封装一些Cesium实例
	|	|-- Feima3dtiles.ts
	|	|-- FeimaAirline.ts
	|	|-- FeimaEntity.ts
	|	|-- FeimaPolyline.ts
	|-- Tool  // 绘制工具**
	|	|-- AirlineHelperTool.ts // 航线管理
	|	|-- DrawTool.ts  // 航线绘制工具
	|-- Utils // 常用类
	|	|-- Common.ts
	|-- Viewer // 地球实例
	|	|-- FeimaViewer.ts  // 一些初始化及地球操作的公用方法
	|-- WebComponents  // 自定义web组件
	|	|-- PopupInfo.ts  // 弹窗修改组件
	|-- FeimaEarth.ts
```

#### 使用

绘制航线

```js
const drawer = earth.viewer.airlineHelperTool
var airlineIndex = 0

// 航线绘制方法调用
drawer.startDrawingAirline()
  .then((positions)=>{
    // 航线配置
    const options = {
      id: 'airline' + airlineIndex,
      positions: positions,  // 航线位置数组
      homePosition: positions[0], // 起飞点
    }
    airlineIndex++
    
    // 添加航线标记点
    drawer.addAirline(options)
    
    // 获取需要修改的航线
    const airline = drawer.getAirline()
    // 修改航线
    return drawer.modifyAirline(airline)
  })
  .then(()=>{
    // 获取航线
    const airline = drawer.getAirline()
    console.log(airline)
  })
```

生成航线

```js
// 基于传入点生成航线
const positions = [
    { lat: 0, lng: 0, alt: 0 },
    { lat: 0, lng: 0, alt: 0 },
    { lat: 0, lng: 0, alt: 0 }
]
drawer.initAirlineByPositions(positions, 'airlineId')
```

## Cesium 概述

### `Cesium` 是什么 ？

- **The Platform for 3D Geospatial, 三维地理空间应用平台**。

### `Cesium` 最佳初始实践 —— 从本地库开始

- 下载安装 Cesium 源码: [Github](https://github.com/CesiumGS/cesium.git)或[Gitee 备份](https://gitee.com/xjldream/cesium.git)。
- `npm install` 安装依赖。
- `npm run build`, 然后`npm run start`， 本地运行
  ![cesium built locally](/assets/img/10-cesium-ts-airline/01-cesium-sandcastle_01.png)

#### 目录结构

- `Apps`, 示例
- `Build`, 打包
- `Documentation`, 文档
- `Source`, 源码。`npm run build` 生成 `Cesium.js` 文件
- `Specs`,
- `ThirdParty`
- `Tools3`

### 官方示例与文档

- [Hello World](https://sandcastle.cesium.com/?label=All)基本示例

  ![cesium hello world](/assets/img/10-cesium-ts-airline/01-cesium-sandcastle_02.png)
  
- [`SandCastle`](https://sandcastle.cesium.com/)  

-  [`Documentation`](https://cesium.com/docs/cesiumjs-ref-doc/)

### 一些其它资料

- 视频资料， [Cesium Lab](https://www.bilibili.com/video/BV1B7411G7HP)
- [资料汇总](https://zhuanlan.zhihu.com/p/34217817)

## `Cesium`基础与常用

### 事件监听

![cesium](/assets/img/10-cesium-ts-airline/02-cesium-handler.png)

#### 屏幕事件：`Cesium.ScreenSpaceEventHandler(element)`

- `setInputAction(action, type, modifier)`：
  - `action`: `function`， 当事件触发时会执行
  - `type`: [`ScreenSpaceEventType`](https://cesium.com/docs/cesiumjs-ref-doc/global.html#ScreenSpaceEventType)，提供一个屏幕输入事件，如**鼠标左键单击**， **鼠标移动** 等等的监听
  - `modifier`: 可选参数，[KeyboardEventModifier](https://cesium.com/docs/cesiumjs-ref-doc/global.html#KeyboardEventModifier)，提供一个键盘输入事件，当按键被按住时，才会触发上面的屏幕输入事件。`SHIFT` | `CTRL` | `ALT`

```js
var viewer = new Cesium.Viewer('cesiumContainer');
var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas); // 获取handler对象。

handler.setInputAction(function(event) {
  // do something when left click
  console.log(JSON.stringify(event));
}, Cesium.ScreenSpaceEventType.LEFT_CLICK); // 事件监听

handler.setInputAction(
  function(event) {
    // do something when left click and ctril key being held
    console.log(JSON.stringify(event));
  },
  Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  Cesium.KeyboardEventModifier.CTRL
); // 鼠标事件 + 键盘事件

// handler.destroy(); // 结束事件监听
```

![cesium-event-listener](/assets/img/10-cesium-ts-airline/02-cesium-event-listener.png)

在本实例中，我们需要用到监听的地方：

- 监听左键点击事件，在点击左键的时候确认存储点位；
- 监听鼠标移动事件，在鼠标移动的同时，获取鼠标位置并缓存`Polyline`的下一个点位
- 监听右键点击事件，结束绘制



#### 航线选取

选取一个航线时的操作

1. 点击地球 => 监听左键单击`LEFT_CLICK`
2. 事件分发 => 使外部可以监听该事件并进行一些操作

实体选取

- `Cesium.Scene.pick(windowPosition, width, height)`，该方法返回一个鼠标点击位置最上层的`Primitive`对象

事件分发

- `document.dispatchEvent(new Event("onAirlineSelect"))`

```js
watchSelectAirline() {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) => {
      var pick = viewer.scene.pick(movement.position);
      if (Cesium.defined(pick)) {
        const id = pick.id.id// 获取航线id 
        
        document.dispatchEvent(new Event("onAirlineSelect")); // 事件分发
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
```

#### 注意

实践中（`Vue`），地球实例是被包裹在`iframe`中的， 而`iframe`默认不会触发`click`事件。需要主动给`iframe`添加`click`事件

而相对应的，地球的`LEFT_CLICK`本身就是一个左键单击事件，在点击航线时也会触发。所以这里对它进行一次拦截，避免出现事件冲突。

拦截一次事件，这里使用的是`addEventListener` 监听`click`事件，配置`options`参数下的`capture`和`once`，对这次点击事件进行拦截。

> ### [语法](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#syntax)
>
> ```
> target.addEventListener(type, listener);
> target.addEventListener(type, listener, options);
> ```
>
> ### [参数](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters)
>
> - `type`
>
>   A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for.
>
> - `listener`，需要监听的事件
>
> - `options` Optional
>
>   ​	An options object specifies characteristics about the event listener. The available options are:
>   
>   `capture`  
>   
>   ​	A [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating that events of this type will be dispatched to the registered `listener` before being dispatched to any `EventTarget` beneath it in the DOM tree.
>   
>   `once`
>   
>   ​	A [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicating that the `listener` should be invoked at most once after being added. If `true`, the `listener` would be automatically removed when invoked.
>   
>   ......

```js
watchSelectAirline() {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) => {
      var pick = viewer.scene.pick(movement.position);
      if (Cesium.defined(pick)) {
        const id = pick.id.id// 获取航线id 
        
        // 拦截一次click事件
        document.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                e.stopPropagation();
            },
            {
                capture: true,
                once: true,
            }
        );
        document.dispatchEvent(new Event("onAirlineSelect")); // 事件分发
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

```

### 了解`Cesium`坐标

#### `Cesium`坐标对象

`Cesium` 主要包含 4 种坐标对象：

- 平面坐标[`Cartesian2`](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian2.html)：即`windowPosition`， 鼠标移动，左键单击，在地球上的操作返回的点实际就是`Cartesian2`坐标。
- 笛卡尔空间直角坐标[`Cartesian3`](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian3.html)，`{x,y,z}`表示的一个 3 维坐标点。原点就是椭球的中心，在计算机上进行绘图时，不方便使用经纬度直接进行绘图，一般会将坐标系转换为笛卡尔坐标系。`pickPosition`，存在兼容问题

- `WGS84`弧度坐标`Cartographic`，即用弧度表示的`WGS84`经纬度坐标。

- 4D 笛卡尔坐标`Cartesian4`

#### `Cesium`坐标转换

- `Cartesian2`转化为`Cartesian3`，即屏幕坐标转化为笛卡尔直角坐标
  - `Cesium.Viewer.Scene.Camera.pickEllipsoid(windowPosition[, ellipsoid[, result]])`, 屏幕坐标转椭球面坐标。这里不包含地形、模型、倾斜摄影表面，一般就是海拔为 0 的坐标。
  - `Cesium.Viewer.Scene.Globe.pick(ray, scene)`，通过`Cesium.Viewer.Camera.getPickRay`方法获取 `Ray`对象，即射线。该对象包含`origin`原点和`direction`方向，这两个属性可以帮助在地球表面获取一个点。
- `Cartographic`及`Cartesian3`的相互装换
  - `fromCartesian(cartesian3, [ellipsoid[, result]])`: 该方法将 笛卡尔空间直角坐标`Cartesian3`对象转换为`WGS84`弧度坐标`Cartographic`对象
  - `toCartesian(cartographic, [ellipsoid[, result])`：将`cartographic`对象转换为`Cartesian3`对象
- 弧度转化为角度： `Cesium.Math.toDegrees(radians)`

```js
function cartesian3ToWGS84(cartesian3) {
  if (cartesian3) {
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
    var position = {
      lat: Cesium.Math.toDegrees(cartographic.latitude),
      lng: Cesium.Math.toDegrees(cartographic.longitude),
      alt: cartographic.height,
    };
    return position;
  } else {
    return undefined;
  }
}
```

**本节参考**

[1][cesium中的坐标系及转换](https://www.cnblogs.com/telwanggs/p/11289954.html)

#### 坐标选取案例

##### 获取点的笛卡尔坐标

- 官方 demo: [Picking](https://sandcastle.cesium.com/?src=Picking.html&label=All)

- 示例给出了获取经纬度的方法`Camera.pickEllipsoid`

```js
var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;

var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

handler.setInputAction(function(event) {
  var cartesian3 = viewer.camera.pickEllipsoid(
    event.position,
    scene.globe.ellipsoid
  );
  if (cartesian3) {
    var position = cartesian3ToWGS84(cartesian3);
    console.log(position);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

##### 获取点的笛卡尔坐标（带高度）

```js
var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction(function(event) {
  var ray = viewer.camera.getPickRay(event.position);
  var cartesian3 = scene.globe.pick(ray, viewer.scene);
  if (cartesian3) {
    var position = cartesian3ToWGS84(cartesian3);
    console.log(position);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

## 航线绘制

**绘制动作拆解**

1. 确认开始绘制 => 绘制状态控制
2. **单击球面进行选点, 依次选取 n 个点, 获取该点海拔 => 事件监听（鼠标左键单击， 鼠标移动） & Polyline 显示存储**
3. **右键、双击结束绘制 => 事件监听（鼠标右键单击， 鼠标左键双击） & 产生航线对象**
4. 航线整体显示 => Cesium 相机视角调整

**实际绘制过程中，还有一些问题需要注意：**

- 怎么获取当前选中点的坐标？
- 怎么选中航线？

### 航线对象

在`airlineHelperTool`中，绘制完毕航线后对航线进行了存储，方便后续的修改操作

```ts
// 航线类型
type airlineEntity = {
  id: string;
  positions: FeimaPosition[]; // 位置数组
  polyline: any; // 航线的显示
  billboards: Cesium.Entity[]; // 航点
  originAlt: number; // 地面海拔
};

const airlines: airlineEntity[] = []; // 航线数组
```

- 每条航线包含
  - 一个 `polyline` （航线）
  - 多个 `billboard`（航点）
  - 地面海拔`originAlt`
  - 航线`id`
  - 航点位置数组`positions`

#### `Polyline`

官方提供了一个完整的官方示例: [Drawing on Terrain](https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html&label=All)，演示`Polyline`的贴地绘制。

- 通过`Cesium`提供的`Cesium.CallbackProperty()`方法，在鼠标移动时实时更新`polyline.positions`，将其显示在地球上

- `startDrawLineString` 方法返回一个回调`Cesium.Cartesian3[]`，即`Cartesian3`坐标数组

```js
var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;

function startDrawLineString(callback) {
  var positions = [];
  var poly;
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  //鼠标左键单击画点
  handler.setInputAction(function(windowPosition) {
    var ray = viewer.camera.getPickRay(windowPosition.position);
    var cartesian3 = scene.globe.pick(ray, scene);
    if (positions.length === 0) {
      positions.push(cartesian3.clone());
    }
    positions.push(cartesian3);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function(movement) {
    var ray = viewer.camera.getPickRay(movement.endPosition);
    var cartesian3 = scene.globe.pick(ray, scene);
    if (positions.length >= 2) {
      if (!Cesium.defined(poly)) {
        poly = new PolyLinePrimitive(positions); // 初始化
      } else {
        if (cartesian3 != undefined) {
          positions.pop(); // 移除上一个点
          positions.push(cartesian3); // 添加新的点
        }
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  //单击鼠标右键结束画线
  handler.setInputAction(function() {
    handler.destroy();
    callback(positions);
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  //单击鼠标右键结束画线
  handler.setInputAction(function() {
    handler.destroy();
    callback(positions);
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
}

const PolyLinePrimitive = (function() {
  function _(positions, id) {
    this.options = {
      id,
      polyline: {
        show: true,
        positions: [],
        material: Cesium.Color.RED,
        width: 3,
        clamptoGround: true,
      },
    };
    this.positions = positions;
    this._init();
  }
  _.prototype._init = function() {
    var _self = this;
    var _update = function() {
      return _self.positions;
    };
    this.options.polyline.positions = new Cesium.CallbackProperty(
      _update,
      false
    ); // PolyLinePrimitive.positions变化， 在其变化时更新polyline.positions
    viewer.entities.add(this.options); // 将polyline对象添加到entities中
  };
  return _;
})();
```

`polyline`绘制方法调用：

```js
startDrawLineString((cartesian3Arr) => {
  console.log(cartesian3Arr);
});
```

#### `Billboard`

- 广告牌对象，用于显示航点。
- 每一个广告牌为一个`svg`图片
- 包含`position`对象。修改 positions billboard 则改变位置

官方 demo: [Billboards](https://sandcastle.cesium.com/?src=Billboards.html&label=All)

### 视角调整

- `Cesium.Camera`对象提供一个`flyTo`方法可以移动相机视角

基于该方法封装了一个`cameraFlytTo`方法，可以配置高度

```js
  cameraFlyTo(position) {
    return new Promise<void>((resolve) => {
      if (
        JSON.stringify(this.currentCameraPosition) === JSON.stringify(position)
      ) {
        resolve();
      } else {
        const height = position.alt * 1.3 < 1000 ? 1000 : position.alt * 1.3;
        // 移动视角到最后一个点的新位置
        const options = {
          destination: Cesium.Cartesian3.fromDegrees(
            position.lng,
            position.lat - 0.03,
            height
          ),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-10.0),
            roll: Cesium.Math.toRadians(0.0),
          },
          duration: 2,
          complete: () => {
            this.currentCameraPosition = position;
            resolve();
          },
        };
        getFeimaCesiumViewer().camera.flyTo(options);
      }
    });
  }
```

- `zoomTo entities`: 查看所有实体

```js
function zoomToEntities() {
  viewer.zoomTo(viewer.entities);
}
```

### 航线更新

#### **选取航线**

监听航线选中事件; 点击航线，会更新当前航线实例为被点击的航线

```js
  watchSelectAirline() {
    const handler = new Cesium.ScreenSpaceEventHandler(
      getFeimaViewer().cesiumViewer.scene.canvas
    );
    const _self = this
    handler.setInputAction((movement) => {
      var pick = getFeimaViewer().cesiumViewer.scene.pick(movement.position);
      if (Cesium.defined(pick)) {
        // 拦截一次click事件，如果不拦截，将会触发整体的点击事件
        document.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            e.stopPropagation();
          },
          {
            capture: true,
            once: true,
          }
        );
        const id = pick.id.id.replace(/-/g, '')
        this.getAirline(id);
        // 事件分发
        document.dispatchEvent(new Event("onAirlineSelect"));
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
```

#### Vue 中监听航线选取事件

```js
import { onMounted, ref, getCurrentInstance } from "vue";
import {
  positionsStrToPositions,
  blocksData,
} from "../views/airlineManagement/blockManagement";

type airlinePosition = {
  alt: number; // 航点海拔
  relativeAlt: number; // 航点相对高度
  lat: number;  // 纬度
  lng: number; // 经度
  originAlt: number; // 地面海拔
}
type airline = {
  billboards: any;
  id: string;
  name: string;
  originAlt: number; // 起飞点海拔
  polyline: any; // 地图航线对象
  posStr: string[]; // 标记点文字
  positions:  airlinePosition[]
}
// 航线初始化及航线选取操作。编辑操作不在此处进行
export const useAirlineSelect = (projectId, earthIfram, earthInstance) => {
  const earthIframe = earthIfram; // 地图iframe ref
  const earth = earthInstance; // 地球实例
  // 展开航线任务
  const airlineFoldingStatus = ref([]);
  onMounted(() => {
    const getEarthInterval = setInterval(() => {
      if (earth.value != null) {
        console.log(earth.value)
        // 已获取地球实例。
        clearInterval(getEarthInterval);
        // 航线初始化
        if(projectId != null) {
          initAirlines(projectId.value);
        }

      } else {
        earth.value =
          earthIframe.value.contentWindow.document["FeimaEarthInstant"];

        // 监听选中航线事件
        earthIframe.value.contentWindow.document.addEventListener(
          "onAirlineSelect",
          airlineSelect
        );
        // iframe增加点击事件监听
        const earthContainer =
          earthIframe.value.contentWindow.document.getElementById("container");
        earthContainer.onclick = (e) => {
          isAirlineSelected.value = false
          document.dispatchEvent(new Event("click", { bubbles: true }));
        };
      }
    }, 500);
  });

  // 请求当前项目数据，并绘制项目已有航线
  const projectDetail = ref<blocksData>({});
  const airlines = ref<airline[]>([]);
  const currentAirline = ref<any>({});
  const $http = getCurrentInstance().appContext.config.globalProperties.$http;
  const initAirlines = (id) => {
    const drawer = earth.value.viewer.airlineHelperTool;
    $http
      .post("/api/airline/project/get", { id }, false, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((res) => {
        if (res.data != null && res.data != "") {
          projectDetail.value = res.data;
          projectDetail.value.blocks.forEach((block) => {
            const positionsStr =
              block.tasks[0].variable_height_coordinate_waypoints;
            if( positionsStr  ) {
              const airlineId = block.id;
              const positions = positionsStrToPositions(positionsStr);
              // console.log(positions)
              const drawedAirline = drawer.initAirlineByPositions(positions, airlineId);
              // 航线数据处理
              const airline = processAirlineData(drawedAirline);
              airlineFoldingStatus.value.push(false); // 展开新增的航线
              airline.name = block.survey_area_name;
              airlines.value.push({ ...airline });
            }
          });
          try {
            setTimeout(()=>{
              earth.value.viewer.zoomToEntities()
            }, 300)

          } catch (error) {
            console.log(error)
          }

        }
      });
  };

  // 处理生成的航线数据
  const processAirlineData = (_airline) => {
    _airline.posStrArr = []; // 航线点标记名称数组
    _airline.positions = _airline.positions.map((element, index) => {
      // 记录初始海拔高度
      if (!element.relativeAlt) {
        element.relativeAlt = 0;
      }
      const originAlt = element.alt - element.relativeAlt;

      const posStr = getAirlinePointName(index, _airline.positions.length);
      _airline.posStrArr.push(posStr);

      return { ...element, originAlt };
    });
    return _airline;
  };
  // 获取当前航线点标记名称
  const getAirlinePointName = (index, length) => {
    return index + 1;
  };
  // 选中航线
  const isAirlineSelected = ref(false)
  const selectedAirlineIndex = ref(null)
  const airlineSelect = (e) => {
    // toDo: 获取航线实例方式需要优化
    const drawer = earth.value.viewer.airlineHelperTool;
    const id = drawer.getAirline().id;
    const thisIdx = airlines.value.findIndex((item) => {
      return item.id === id;
    });
    currentAirline.value = airlines.value[thisIdx];
    // setTimeout(() => {
      if (!currentAirline.value.id) return;
      const findIndex = airlines.value.findIndex((airline) => {
        return airline.id === currentAirline.value.id;
      });
      if (findIndex === -1) {
        // 未选中航线
        return;
      }

      isAirlineSelected.value = true;

      airlineFoldingStatus.value[findIndex] = true;

      selectedAirlineIndex.value = findIndex
    // }, 500);
  };

  return {
    earthIframe,
    earth,
    airlineFoldingStatus,
    projectDetail,
    airlines,
    currentAirline,
    initAirlines,
    processAirlineData,
    getAirlinePointName,
    isAirlineSelected,
    airlineSelect,
    selectedAirlineIndex
  }
};

```

#### 更新航线点位

```js
  updateAirline(positions: FeimaPosition[]) {
    for (let i = 0; i < positions.length; i++) {
      this.airline.billboards[i].position = toCesiumCartesian3(
        positions[i]
      ) as any; // 更新billboard
      getFeimaEarth().viewer.drawTool.updatePolyline(
        this.airline.polyline[i],
        positions[i],
        i
      ); // 更新polyline点位
    }
  }
```

更新航点

```js
  updateBillboard(billboardId: string, newPosition: FeimaPosition) {

    const bbIndex = this.airline.billboards.findIndex((bb) => {
      return bb.id === billboardId;
    });
    this.airline.billboards[bbIndex].position = toCesiumCartesian3(
      newPosition
    ) as any;
  }
```

## 弹窗提示

### Custom element， 自定义元素

[MDN 示例](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)：

```ts
// Create a shadow root
this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'

// Create (nested) span elements
const wrapper = document.createElement('span');
wrapper.setAttribute('class', 'wrapper');
const icon = wrapper.appendChild(document.createElement('span'));
icon.setAttribute('class', 'icon');
icon.setAttribute('tabindex', 0);
// Insert icon from defined attribute or default icon
const img = icon.appendChild(document.createElement('img'));
img.src = this.hasAttribute('img')
  ? this.getAttribute('img')
  : 'img/default.png';

const info = wrapper.appendChild(document.createElement('span'));
info.setAttribute('class', 'info');
// Take attribute content and put it inside the info span
info.textContent = this.getAttribute('data-text');

// Create some CSS to apply to the shadow dom
const style = document.createElement('style');
style.textContent =
  '.wrapper {' +
  // CSS truncated for brevity

  // attach the created elements to the shadow DOM
  this.shadowRoot.append(style, wrapper);
```

使用

```js
// 定义该自定义元素
customElements.define('popup-info', PopUpInfo);

// html 中使用
<popup-info
  img="img/alt.png"
  data-text="Your card validation code (CVC)
  is an extra security feature — it is the last 3 or 4 numbers on the
  back of your card."
></popup-info>;
```

弹窗修改组件

`PopupInfo.ts`

```js

export type DataLine = {name: 'lat' | 'lng' | 'alt' | 'relativeAlt', label: string, value: string}

export default class PopUpInfo extends HTMLElement {
  datas: DataLine[]
  dom: HTMLElement
  private lat
  private lng
  private relativeAlt
  private alt
  private originAlt
  private firstTimeLoading
  constructor() {
    // Always call super first in constructor
    super();
    this.init()
  }
  init() {
    this.datas = [
      { name: "lat", label: "请输入纬度", value: "" },
      { name: "lng", label: "请输入经度", value: "" },
      { name: "relativeAlt", label: "相对起飞点高度", value: "" },
      { name: "alt", label: "当前点海拔高度", value: "" },
    ]

    this.initDocument(this.datas)
    this.dom = this.shadowRoot.children[0] as HTMLElement
  }
  initDocument(formData:DataLine[]) {
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    // console.log(style.isConnected);
    const wrapper = document.createElement('div')

    const dataForm = this.initDataForm(formData)
    const btns = this.initBtns()

    wrapper.setAttribute('class', 'wrapper')
    wrapper.appendChild(dataForm)
    wrapper.appendChild(btns)

    style.textContent = `some css`;

    // Attach the created elements to the shadow dom

    shadow.appendChild(wrapper)
    shadow.appendChild(style);
    // console.log(style.isConnected);
  }

  initDataForm(formData: DataLine[]) {

  }
  initBtns() {
    const btns = document.createElement('div')
    const cancelButton = document.createElement('button')
    const confirmButton = document.createElement('button')

    cancelButton.textContent = "取消"
    confirmButton.textContent = "确定"

    // 按钮点击事件
    cancelButton.onclick = ()=> document.dispatchEvent(new Event('popupCancel')) // 分发自定义事件
    confirmButton.onclick = ()=> document.dispatchEvent(new Event('popupConfirm'))// 分发自定义事件
    btns.appendChild(cancelButton)
    btns.appendChild(confirmButton)

    btns.setAttribute('class', 'btns')
    cancelButton.setAttribute('class', 'cancel')
    confirmButton.setAttribute('class', 'confirm')

    return btns
  }
  update(e: any) {
    const updateKey = e.path[0].dataset.key
    const updateValue = e.path[0].value
    if(updateKey === "relativeAlt") {
      this.formData[2].value = updateValue // 相对高度
      this.formData[3].value = (parseFloat(updateValue || 0) + parseFloat(this.originAlt)).toFixed(2) // 海拔高度 = 初始值 + 相对高度
      this.updateLines(this.formData)
    }
    if(updateKey === "alt") {
      this.formData[2].value = (parseFloat(updateValue || 0) - parseFloat(this.originAlt || 0)).toFixed(2) // 相对高度 = 海拔高度 - 初始海拔高度
      this.formData[3].value = updateValue // 海拔高度
      this.updateLines(this.formData)
    }
  }
  // 监听取消事件
  cancel (callback) {
    const handler = (evt)=>{
      this.close()
      callback(this.datas)
      document.removeEventListener('popupCancel',handler)
    }
    document.addEventListener('popupCancel', handler)
  }
  // 监听确认事件
  confirm (callback) {
    const handler = (evt)=>{
      this.close()
      callback(this.datas)
      document.removeEventListener('popupConfirm',handler)
    }
    document.addEventListener('popupConfirm', handler)
  }
  open() {
    this.style.display = 'block';
  }
  close() {
    this.style.display = 'none';
  }
  get formData() {
		return this.datas;
	}
	set formData(value) {
		this.datas = value
    value.forEach((elem)=>{
      this[elem.name] = elem.value.valueOf()
    })
    this.updateLines(value)
	}
  setOriginAlt(alt) {
    this.originAlt = alt
  }
}
```

`js`调用

```js
import PopupInfo, { DataLine } from "../WebComponents/PopupInfo";
initPopup()
// 初始化弹窗
  initPopup() {
    if (!customElements.get("popup-info")) {
      customElements.define("popup-info", PopupInfo);
    }
    // 初始化Popup弹窗组件
    const dialog = new PopupInfo();
    document.body.appendChild(dialog);
    dialog.style.display = "none"; // 初始隐藏
  }
```

## 参考

[Cesium 中级教程 3 – Camera – 相机（摄像机）](https://zhuanlan.zhihu.com/p/66434400)
