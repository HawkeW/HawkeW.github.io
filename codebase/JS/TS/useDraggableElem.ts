type tSelector = string // selector 值需要为 类/id 选择器
type tSelectors = { 
  sonSelector: string, // 可点击拖拽的元素, 必须是被移动元素的子元素 或其本身
  fatherSelector: string  // 需要移动的元素
}

const useDraggableElem = (selector: tSelector | tSelectors):void => {
  // 初始数据
  let draggableElem:HTMLElement, // 被移动元素
    dragTriggerElem:HTMLElement, // 触发拖拽元素
    oMsDown = false, 
    nStartX = 0,
    nStartY = 0,
    nMouseX = 0,
    nMouseY = 0

  // 获取元素节点
  if(typeof selector === 'string') {
    draggableElem = document.querySelector(selector)
    dragTriggerElem = document.querySelector(selector)
  } else {
    draggableElem = document.querySelector(selector.fatherSelector)
    dragTriggerElem = document.querySelector(selector.sonSelector)
  }
  // 可拖拽元素样式修改
  dragTriggerElem.style.cursor = 'move'

  const mousedown = (evt1: MouseEvent )=> {
    
    // 判断是否已进入可拖拽元素
    const exit = !dragTriggerElem.contains(evt1.target as HTMLElement) 
    if(exit) {return}
    oMsDown = true

    // 记录原始位置
    nStartX = draggableElem.offsetLeft 
    nStartY = draggableElem.offsetTop 

    // 记录鼠标点击位置
    nMouseX = evt1.clientX
    nMouseY = evt1.clientY
  }
  const mouseup = (e: MouseEvent )=> {
    oMsDown = false
  }
  const mousemove = (evt2: MouseEvent )=> {
    if(!oMsDown) return
    // 样式调整
    draggableElem.style.left = String(nStartX - nMouseX + evt2.clientX) + 'px'
    draggableElem.style.top = String(nStartY - nMouseY + evt2.clientY) + 'px'
  }

  document.onmousedown = mousedown
  document.onmouseup = mouseup
  document.onmousemove = mousemove

}

export default useDraggableElem
