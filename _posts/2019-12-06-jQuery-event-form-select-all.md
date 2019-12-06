---
layout: post
title:  "jQuery事件及表单全选、全不选、反选变化练习"
date:   2019-12-06 18:40:00 +0800
categories: 前端学习
tags: 前端, 表单, jQuery
excerpt: 前端笔记：jQuery实现表单全选、全部选、反选等功能 
typora-root-url: ..
---

之前在廖雪峰的官方网站操作了几行jQuery后，就好久没有看了，今天下午算是闲一点，捡起来复习复习，顺便往下学习。

本篇练习代码外，学习内容及示例代码整理自[事件（jQuery）-廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1025427850131520#0)。

## jQuery事件

### 事件绑定

jQuery事件其实并没有那么难理解，就是通过`on`方法来将元素绑定一个事件，传入事件名称和处理函数。多数事件`on`也可以省略。即：

```javascript
a.on('click', function () {
    alert('Hello!');
});
//上述代码可以等价于
a.click(function() {
    alert('Hello!');
});
```

| 鼠标事件              |                   | 键盘事件      |                       | 其他常用事件 |                                                       |
| :-------------------- | ----------------- | ------------- | :-------------------- | ------------ | ----------------------------------------------------- |
| click/dblclick        | 鼠标单击/鼠标双击 | keydown/keyup | 键盘按下时/键盘松开时 | change       | 当`<input>`、`<select>`或`<textarea>`的内容改变时触发 |
| mouseenter/mouseleave | 鼠标进入/鼠标移出 | keypress      | 按一次键后触发        | submit       | 当`<form>`提交时触发                                  |
| mousemove             | 鼠标在DOM内部移动 | focus/blur    | 当DOM获得/失去焦点    | ready        | 当页面被载入并且DOM树完成初始化后触发。               |
| hover                 | 悬停              |               |                       |              |                                                       |

`ready`常用于初始化代码，仅作用于`document`对象。可以保证在DOM树初始化之后再执行相关的代码。

`change`可以用于监视元素变化，方便进行一些交互操作。

### 事件解绑

可以通过`off('事件名', function)`来解绑事件。

### 事件触发

一个事件的触发总是由用户操作引发的。程序自身的Javascript代码对DOM元素的改变和操作**不会**触发事件。

所以，在代码操作时，如果需要被监测，要通过在代码中触发该事件实现`trigger('事件名')`或直接调用事件的无参方法。

```javascript
var input = $('#test-input');
input.change(function () {
    console.log('changed...');
});

var input = $('#test-input');
input.val('change it!'); // 无法触发change事件

var input = $('#test-input');
input.val('change it!');
input.change(); // 触发change事件<==>input.trigger('change')
```



## jQuery练习

### 练习要求

对于Form 表单，实现以下逻辑：

1. 当用户勾上“全选”时，自动选中所有语言，并把“全选”变成“全不选”；
2. 当用户去掉“全不选”时，自动不选中所有语言；
3. 当用户点击“反选”时，自动把所有语言状态反转（选中的变为未选，未选的变为选中）；
4. 当用户把所有语言都手动勾上时，“全选”被自动勾上，并变为“全不选”；
5. 当用户手动去掉选中至少一种语言时，“全不选”自动被去掉选中，并变为“全选”。

---

<form id="test-form" action="test">
    <legend>请选择想要学习的编程语言：</legend>
    <fieldset>
        <p><label class="selectAll"><input type="checkbox"> <span class="selectAll">全选</span><span class="deselectAll">全不选</span></label> <a href="#0" class="invertSelect">反选</a></p>
        <p><label><input type="checkbox" name="lang" value="javascript"> JavaScript</label></p>
        <p><label><input type="checkbox" name="lang" value="python"> Python</label></p>
        <p><label><input type="checkbox" name="lang" value="ruby"> Ruby</label></p>
        <p><label><input type="checkbox" name="lang" value="haskell"> Haskell</label></p>
        <p><label><input type="checkbox" name="lang" value="scheme"> Scheme</label></p>
		<p><button type="submit">Submit</button></p>
    </fieldset>
</form>

<script>
'use strict';
var
    form = $('#test-form'),
    langs = form.find('[name=lang]'),
    selectAll = form.find('label.selectAll :checkbox'),
    selectAllLabel = form.find('label.selectAll span.selectAll'),
    deselectAllLabel = form.find('label.selectAll span.deselectAll'),
    invertSelect = form.find('a.invertSelect');
form.find('*').show().off();
form.find(':checkbox').prop('checked', false).off();
deselectAllLabel.hide();
form.off().submit(function (e) {
    e.preventDefault();
    alert(form.serialize());
});
selectAll.click(function(){
    if (selectAll.prop('checked')){ 
      langs.prop('checked', true);
      selectAllLabel.hide();
      deselectAllLabel.show();
    }else {
      langs.prop('checked', false);
      deselectAllLabel.hide();
      selectAllLabel.show();
    }
});
invertSelect.click(function(){
   langs.prop('checked', function(){
   return !this.checked;
   })
    langs.change();
})
langs.change(function(){
   let all = true;  
   for(let i = 0; i < langs.length; i++){
       all = all && langs[i].checked;
   }
   if (all){
     selectAll.prop('checked', true);
     selectAllLabel.hide();
     deselectAllLabel.show(); 
   }else{  
     selectAll.prop('checked', false);
     selectAllLabel.show();
     deselectAllLabel.hide();
   }
});
</script>

### 实现思路

反思一下，我是先动手再来找问题的，所以反反复复了很久。所以写这篇文章，也是为了重新梳理一下思路。

首先，第一条和第二条，逻辑是一样的，只是最后赋给下面这些语言的`checked`属性以及`全选`和`全不选`的显示属性的值不一样而已。所以这两个是一个函数。那么就需要判断当前的状态来决定是进行**全选**还是**全不选**操作。我在一开始写的是先自定义一个状态值`status`，通过`status`来判断。其实，`全选/全不选`的`checked`值本身就是一个状态....

第三条，反选。第一想法竟然是用map()想对每一个元素进行**判断**然后再赋值……后来冷静地看了看评论区的代码（我错了，不是好习惯……），发现实际直接取反就行了。代码量少的锅……除了map，也可以使用jQuery的prop函数对`checked`赋值。

第四条和第五条，是对全选字样和勾选状态的判断，可以归于一个**部分选择**的函数。这里主要就是两个状态

1. 字样为`全选`，`checked`状态为`false`，此时表单内容没有全部勾选。
2. 字样为`全不选`，`checked`状态为`true`，此时表单内容全部勾选。

也就是说，需要对表单内容的变化进行监视，通过对表单中的语言栏勾选情况遍历并进行判断。如果全部为`true`，就为状态2，否则为状态1。然后对应的状态中，进行值的调整就可以了。

经过上述梳理，代码主要分为三个部分：

- 全选/全不选
- 反选
- 部分选择



### 实现代码

**HTML结构源码如下：**

```
<!-- HTML结构 -->
<form id="test-form" action="test">
    <legend>请选择想要学习的编程语言：</legend>
    <fieldset>
        <p><label class="selectAll"><input type="checkbox"> <span class="selectAll">全选</span><span class="deselectAll">全不选</span></label> <a href="#0" class="invertSelect">反选</a></p>
        <p><label><input type="checkbox" name="lang" value="javascript"> JavaScript</label></p>
        <p><label><input type="checkbox" name="lang" value="python"> Python</label></p>
        <p><label><input type="checkbox" name="lang" value="ruby"> Ruby</label></p>
        <p><label><input type="checkbox" name="lang" value="haskell"> Haskell</label></p>
        <p><label><input type="checkbox" name="lang" value="scheme"> Scheme</label></p>
		<p><button type="submit">Submit</button></p>
    </fieldset>
</form>
```

**练习代码：**

```javascript
'use strict';

var
    form = $('#test-form'),
    langs = form.find('[name=lang]'),
    selectAll = form.find('label.selectAll :checkbox'),
    selectAllLabel = form.find('label.selectAll span.selectAll'),
    deselectAllLabel = form.find('label.selectAll span.deselectAll'),
    invertSelect = form.find('a.invertSelect');

// 重置初始化状态:
form.find('*').show().off();
form.find(':checkbox').prop('checked', false).off();
deselectAllLabel.hide();
// 拦截form提交事件:
form.off().submit(function (e) {
    e.preventDefault();
    alert(form.serialize());
});

// TODO:绑定事件
//全选、全不选
selectAll.click(function(){
    if (selectAll.prop('checked')){ 
      langs.prop('checked', true);
      selectAllLabel.hide();
      deselectAllLabel.show();
    }else {
      langs.prop('checked', false);
      deselectAllLabel.hide();
      selectAllLabel.show();
    }
});
//反选
invertSelect.click(function(){
   langs.prop('checked', function(){
   return !this.checked;
   })
})
/**map方法实现，逻辑基本一样
invertSelect.click(function(){
   langs.map(function(){
     this.checked = !this.checked;
   })  
})

**/
//
langs.change(function(){
   //记录勾选状态的值
   let all = true;  
   for(let i = 0; i < langs.length; i++){
       all = all && langs[i].checked;
   }
   if (all){
      //全部为checked,修改为状态2
     selectAll.prop('checked', true);
     selectAllLabel.hide();
     deselectAllLabel.show(); 
   }else{  
       //部分为checked,修改为状态1
     selectAll.prop('checked', false);
     selectAllLabel.show();
     deselectAllLabel.hide();
   }
});
```

### 问题

- 初始后单击反选，全选、全不选字样以及勾选状态不会变化。

  在写这篇文章时进行代码测试，才发现这个问题。不过因为是刚好看完上面的内容，所以可以知道：通过Javascript代码操作的元素，不会触发`change事件`。因此，在修改元素值之后，要通过主动调用事件才可以被监视到变化。

  更正后的反选代码如下

  ```javascript
  invertSelect.click(function(){
     langs.prop('checked', function(){
     return !this.checked;
     })
     langs.change();
  })
  ```

- 代码量大

  本来是觉得自己的代码量已经还可以了，结果评论区大神果然多，拿来膜拜一下 

  可以看到，

  - 全选函数这里用jQuery的`toggle()`函数直接取反，省去了很多判断，非常方便
- 反选函数这里是使用箭头函数来替代了匿名函数
  
  不过这位大神没有补充部分选择的函数，很好奇部分选择这里怎么写会更好看。
  
  [马甲与小号](https://www.liaoxuefeng.com/user/1297641350627362)：[可以用 toggle 代替 show 和 hide](https://www.liaoxuefeng.com/discuss/1023622307115840/1302343731642402)
  
  ```javascript
  selectAll.click(function() {
      langs.prop('checked', selectAll.prop('checked'));
      selectAllLabel.toggle();
      deselectAllLabel.toggle();
  })
  invertSelect.click(function() {
      langs.prop('checked', (index, value) => !value);
  })
  ```

## 总结

以上就是今天jQuery的学习啦。本来只是想单纯的记录下这次的思路和存在的问题，可以看到过程中有很多小细节需要反思，比如

- 直接上手（老毛病）
- 想当然（缺乏经验）
- 问题发现慢（直到文章写一半才发现直接直接反选时全选状态不变化）。

当然，进度太慢了，这哪有机会实现2020年致富脱贫呀……

以上。