## `Cesium`添加万级`billboard`数据及优化

由于月飞行架次一般都是万级数据，所以这次做了万级数据的显示测试，主要用于测试Cesium渲染效率及表现，方便后续做数据接入。

本文主要学习和参考：[Cesium | 海量点的加载与性能优化](https://juejin.cn/post/6972420331982028837)，欢迎点击原文阅读。输出本篇文章主要是为记录测试和学习的过程，毕竟好久没有水一篇正经文章了。。。

### 测试说明

- 本次测试的主要数据来源： `pointList.json`文件中的10000条测试数据
- `drawMarkers`函数作为10000条数据的绘制入口，对每个点的坐标添加随机数处理， 避免点聚集
- 循环调用n次`drawMarkers`， 以实现n * 10000 点效果

**工具：**

主要使用的是`Chrome`自带的`Performance`分析工具。第一次使用它，也是第一次做性能方面的分析，感觉比较新鲜，哈哈



### 实体添加方式

`Cesium` 本身是支持两种常见方式创建`Billboard`(本文又称标记点）。由于初次开发时主要用于航线的起止点标记显示，一般也就2个点，所以并未对添加方式做深入探讨，直接选用了通过实体的添加方式，即调用`Viewer.Entities.add()`添加`billboard`实例。

实际使用时做了封装处理，这里展示核心代码：

```js
class Marker {
    constructor(options) {
        this.init(options)
    }
    init(options) {
        const cartesian = toCesiumCartesian3(options.position);
        viewer.entities.add({
          position: cartesian,
          billboard: {
            image: './1.png',
            pixelOffset: new Cesium.Cartesian2(0,0),
            width:  20,
            height: 20,
            rotation: 0,
          },
        });
    }
}
```

#### 创建过程

代码实现

```js
import pointList from './pointList.json'

const drawMarkers = ()=> {
  pointList.forEach((point:any) => {
    const marker = new Marker({
        position: {
          lat: point.lat + Math.random()*0.0001,
          lng: point.lng + Math.random()*0.0001,
          alt: point.alt + Math.random()*200,
        }
    })
  });  
}

for(let i = 0; i < 10; ++) {
    drawMarkers()
}
```

- 从第一次调用`drawMarkers`，到`billboard`批量显示，约10s
- 该实例共循环调用十次`drawMarkers`方法，每一个`drawMarkers`函数运行10000条数据的实体添加
- `drawMarkers`循环调用`entities.add`创建`billboard`，每次调用约`530ms~650ms`之间

![image-20211102165623995](H:\blog\docs\.vuepress\public\assets\img\11-cesium-ts-mass-marks\01-performance-entity-all.png)

#### **渲染过程**

合计约5s

![image-20211102170855509](H:\blog\docs\.vuepress\public\assets\img\11-cesium-ts-mass-marks\01-performance-entity-render.png)



### 优化：primitives添加方式

使用过高德地图API的应该知道，高德地图的常用标记点有`Marker`，以及海量点`MassMarks`。实际上，通过`Entities.add`添加的`billboard`， 与`Marker`类似，拥有更多的属性及方法可以被调用；那么Cesium是否可以创建一种压缩版的Marker，从而达到类似海量点的效果呢？答案是肯定的，即通过`primitives.add`添加`BillboardCollection`，然后调用`BillboardCollection.add`创建一个`billboard`。

#### 伪`MassMarks`实现：

以下是模拟高德`MassMarks` 接口做出的封装：

```typescript
type MassMarksOptions = {
  zIndex?: number,
  opacity?: number,
  zooms?: [],
  cursor?: string,
  alwaysRender?: false,
  style?: StyleObjectOptions 
}
type StyleObjectOptions = {
  anchor?: [number, number],
  url?: string,
  size?: [number, number],
  rotation?: number
}
type MassMarkData = {
  lnglat: [number, number, number | undefined], 
  name: string,
  id: string| number
}
class MassMarks {
  private points:MassMarkData[];
  private entity:Cesium.BillboardCollection;
  private style: StyleObjectOptions;
  constructor(options:MassMarksOptions) {
    this.entity = scene.primitives.add(new Cesium.BillboardCollection());
    this.style = options.style || { url: '', size: [20, 20] };
  }

  setData(markData:MassMarkData[]) {
    this.points = markData
    for (let i = 0;i < markData.length; i++) {
      const point = markData[i];
      const [ lng, lat, alt ] = point.lnglat
      const cartesian3: Cesium.Cartesian3 = toCesiumCartesian3({ lat, lng, alt: alt || 0 })
      const billboard = this.entity.add({
        position : cartesian3,
        image: this.style.url || '',
      })
      billboard.id = point.id
      this.idMap[point.id] = i
    }
  }
}
```

接口及参数描述可以参考高德API, 这里不再赘述。

在这里的实现，核心代码是`setData`方法，它主要：

- 循环`markData`中的元素
- 处理`markData`中的元素的坐标
- 调用`Cesium.BillboardCollection.add()`创建一个`billboard`对象。

#### 整体效果

当前通过`primitives`添加`billboard`，从开始创建，到显示完成，合计用时约1.3s。 效果整体如下：

![image-20211103154935528](H:\blog\docs\.vuepress\public\assets\img\11-cesium-ts-mass-marks\02-performance-primitives-all.png)

#### 创建过程

实现代码：

```js
import pointList from './pointList.json'

let i = 0
let allMarkers = []
const drawMarkers = ()=> {
  // 处理数据为MassMarkData数组
  const maskData:MassMarkData[] = pointList.map((point:any) => {
    return {
      id: point.id + '_' + index,
      name: point.name + index,
      lnglat: [ point.lon + Math.random()*0.001, point.lat + Math.random()*0.001, Math.random()*200, ]
    }
  });
  allMarkers = allMarkers.concat(maskData)
}

for(let i = 0; i < 10; ++) {
    drawMarkers()
}

const massMask = new MassMarks({
    style: {
        url: './1.png',
        size: [20,20],
    }
})
// 调用setData方法批量创建标记点
massMask.setData(allMarkers)
```



![image-20211103160702356](H:\blog\docs\.vuepress\public\assets\img\11-cesium-ts-mass-marks\02-performance-primitives-create.png)

- 优化后，`drawMarkers` 不再直接调用绘制接口绘制`billboard`，而是处理数据格式后，将数据交给`setData`处理

- 每个`setData`循环数组中的10000条数据，每次循环调用`Cesium.BillboardCollection.add`添加一个`billboard`， 并做一些标记操作（添加id等）

- `setData` 执行共计耗时不到`400ms`

#### 渲染过程

从创建完成，到`Cesium`结束渲染，共计耗时0.9s左右

![image-20211103160448840](H:\blog\docs\.vuepress\public\assets\img\11-cesium-ts-mass-marks\02-performance-primitives-render.png)



### 总结

| 方式         | 实体方式 | Primitives方式 | 优化提速 |
| ------------ | -------------- |--------- |--------- |
| 总计耗时 | 10s           |   1.3s    |  8倍    |
| 创建耗时 | 5s          |   0.4s    |  12倍    |
| 渲染耗时 |  5s         |    0.9s    |  5倍    |

1. 可以看到，整体上的优化是比较明显的。从10s左右甚至以上显示，到1.3s显示，提升了8倍左右的速度。

2. 在渲染完毕后，实体方式创建十万点后拖动地图会感受到明显的卡顿，且基本不能够流畅运行；而通过`primitives`方式，则较为流畅，且点数少的地方明显速度更快。

3. 但是，目前直接的渲染十万个点，即使使用primitives方式创建，在点密集的地方，也会感受到比较明显的卡顿。

所以在实际运行过程，我还是倾向于推荐在大图时使用做点聚合显示的来对这种万级数量点做处理的，这里暂时不需要实现，后续有机会再去学习咯。

最后，附一张GPU

![image-20211103194714997](H:\blog\docs\.vuepress\public\assets\img\11-cesium-ts-mass-marks\03-full-gpu-usage.png)
