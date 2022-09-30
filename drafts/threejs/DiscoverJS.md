1. 正交与透视投影的区别？
https://discoverthreejs.com/book/first-steps/first-scene/

## 快速起步

### 六步走

1. 初始化配置
2. 创建`scene`
3. 创建`camera`
4. 创建一个`geometry`/`model`并把它添加到`scene`
5. 创建`renderer`
6. `renderer`渲染`scene`

```js
import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

// 1 确认容器
const container = document.querySelector('#scene-container');

// 2 创建scene
const scene = new Scene();
scene.background = new Color('skyblue');

// 3 创建camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 10);

// 4 创建一个实体
const geometry = new BoxBufferGeometry(2, 2, 2);
const material = new MeshBasicMaterial();
const cube = new Mesh(geometry, material);

// 并添加到scene
scene.add(cube);

// 5 创建一个renderer
const renderer = new WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);

// 6 rendereer渲染scene
renderer.render(scene, camera);
```

### 模块化代码

#### 隐私与安全

局部化你的代码，避免暴露出的内容直接修改你的实现，造成奇怪的bug。

**bad**: 

```js
class World {
  constructor() {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
  }
}
```

这种写法会导致以下结果：

```js
const world = new World();

// camera, scene, renderer可以被直接访问并进行修改操作
console.log(world.camera);
console.log(world.renderer);
console.log(world.scene);
```

**good**:

```js
let camera;
let renderer;
let scene;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
  }
}
```

这样的写法，保证了camera、scene、renderer无法被外部实例访问到。



## 常见`API`

### Camera

#### 更新投影比例`updateProjectionMatrix()`

## 物理渲染
物理渲染 `physically based rendering (PBR)`

- `PBR`材料: `MeshStandardMaterial`
- 深入了解`PBR` [Physically Based Rendering: From Theory To Implementation ](http://www.pbr-book.org/)
- 光 `DirectionalLight`，模拟远处的点光源

- `MeshBasicMaterial`不是物理渲染，不需要提供光源；其它材料一般都需要
- 基于物理渲染，可以允许我们快速变更光源；反之，在需要替换光源时，我们可能需要处理整个场景

#### 创建光源

- `Physically correct lighting` 计算光源的远近照射效果
- `PBR` 计算光源在物体表面的反射

```js
renderer.physicallyCorrectLights= true
```

#### 创建物理尺寸场景

- `three.js` 尺寸单位为米
- `camera.far = 100` / `camera.near = 0.1` 即代表我们可以看到距离摄像头 [0.1米 ~ 100米] 范围内的内容
- 使用米作为单位是惯例而不是强制

### 问题s

1. 正交投影与透视投影区别？



## 转换，坐标系，场景图

在`3D`空间中移动物体是学习`three.js`路径的基本技能。我们可以把它拆解成两个部分：

1. 使用坐标系描述三维空间
2. 使用(矩阵)转换在三维空间在中移动物体

在此过程中，我们会遇到一些“数学”的对象如：

- 场景图(the scene graph)， 描述组成场景的物体的组织形式的结构体
- 向量(vectors)， 用于描述三维空间位置及其它信息
- 描述旋转的两种方式：欧拉角(Euler angles)和四元数(quaternions)
- 矩阵变换

学习线代：[linear algebra course](https://www.khanacademy.org/math/linear-algebra)

学习`WebGl`的坐标相关知识：[excellent article on learnopengl.com](https://learnopengl.com/Getting-started/Coordinate-Systems).

### 平移，旋转和缩放，三种基本变换

平移(Translation)，旋转(Rotation)和缩放(Scaling)，简称`TRS`

至此为止我们已经见过两种变换：存储在对象的`position`属性中的`translation`，以及存储在对象`rotation`属性中的`rotation`。而缩放`scaling`则被对象的`scale`属性控制。

所有通过`scene.add`添加的对象都有这些属性，包含meshes, 灯光和相机，而材料materials  和geometries 则没有。

```js
camera.position.set(0, 0, 10);
light.position.set(10, 10, 10);
cube.rotation.set(-0.5, -0.1, 0.8);
```