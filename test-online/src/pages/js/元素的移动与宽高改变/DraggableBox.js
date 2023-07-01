import boxController from "./box-controller.js";

export default class DraggableBox {
  constructor(container, { id, classList, size, bgColor, pos }) {
    this.container = document.querySelector(container);
    this.id = id;
    this.classList = classList.join(" ");
    this.size = size;
    this.width = size[0];
    this.height = size[1];
    this.bgColor = bgColor;
    this.pos = pos;
    this.left = pos[0];
    this.top = pos[0];

    // 鼠标按下
    this._handleMouseDown = null;
    // 是否触摸
    this._handleElementMove = null;
    // 是否拉升
    this._handleElementScale = null;
    // 是否抬起
    this._handleMouseUp = this.handleMouseUp.bind(this);

    this.render(); // 初始化
    this.bindEvent(); // 事件绑定
  }
  // 初始化渲染函数
  render() {
    this.el = this.createBox();
    this.container.appendChild(this.el);
  }
  /**
   * 事件绑定
   */
  bindEvent() {
    this._handleMouseDown = this.handleMouseDown.bind(this);
    this.el.addEventListener("mousedown", this._handleMouseDown, false);
  }
  /**
   * 创建盒子
   * @returns
   */
  createBox() {
    const el = document.createElement("div");
    el.className = this.classList;
    el.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background-color: ${this.bgColor};
        position: absolute;
        top: ${this.top}px;
        left: ${this.left}px;
    `;
    return el;
  }
  // 触摸事件
  handleMouseDown(e) {
    // 触摸提升z-index
    boxController.elFocus(this.el);
    // 鼠标在当前元素上的位置 =  鼠标在可视区域的X - 元素偏移量
    const x = e.clientX - this.el.offsetLeft;
    const y = e.clientY - this.el.offsetTop;

    const diffX = this.el.offsetWidth - x;
    const diffY = this.el.offsetHeight - y;
    // console.log(diffX, diffY)

    // 当鼠标位于盒子边角位置
    if (diffX <= 10 && diffY <= 10) {
      // 执行拉升
      this.elementScale(e);
    } else {
      // 执行拖动
      this.elementMove(x, y);
    }
  }
  // 拉升事件绑定
  elementScale(e) {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    this._handleElementScale = this.handleElementScale.bind(this, { x, y });
    window.addEventListener("mousemove", this._handleElementScale, false);
    this.el.addEventListener("mouseup", this._handleMouseUp, false);
    // 当鼠标拖动离开元素时解绑
    window.addEventListener("mouseup", this._handleElementScale, false);
  }
  // 移动事件绑定
  elementMove(x, y) {
    console.log(x, y);
    this._handleElementMove = this.handleElementMove.bind(this, { x, y });
    window.addEventListener("mousemove", this._handleElementMove, false);
    this.el.addEventListener("mouseup", this._handleMouseUp, false);
  }
  // 移动
  handleElementMove(...args) {
    console.log('==...args==',args);
    
    const [startXY, e] = args;
    const x = e.clientX - startXY.x;
    const y = e.clientY - startXY.y;

    let posX = 0;
    let posY = 0;
    if (x <= 0) {
      posX = 0;
    } else if (x >= document.body.clientWidth - this.el.offsetWidth) {
      posX = document.body.clientWidth - this.el.offsetWidth;
    } else {
      posX = x;
    }

    if (y <= 0) {
      posY = 0;
    } else if (y >= document.body.clientHeight - this.el.offsetHeight) {
      posY = document.body.clientHeight - this.el.offsetHeight;
    } else {
      posY = y;
    }

    this.el.style.left = posX + "px";
    this.el.style.top = posY + "px";

    this.pos[0] = posX;
    this.pos[1] = posY;
  }

  // 拉升
  handleElementScale(...args) {
    const [initalXY, e] = args;
    const diffX = e.clientX - initalXY.x;
    const diffY = e.clientY - initalXY.y;

    // 判断是否在50范围
    const newWidth =
      this.el.offsetWidth + diffX <= 50 ? 50 : this.el.offsetWidth + diffX;
    const newHeight =
      this.el.offsetHeight + diffY <= 50 ? 50 : this.el.offsetHeight + diffY;

    this.el.style.width = newWidth + "px";
    this.el.style.height = newHeight + "px";

    initalXY.x = e.clientX;
    initalXY.y = e.clientY;
    this.size[0] = newWidth;
    this.size[1] = newHeight;
  }

  // 鼠标抬起解绑事件
  handleMouseUp() {
    window.removeEventListener("mousemove", this._handleElementMove, false);
    window.removeEventListener("mousemove", this._handleElementScale, false);
    window.removeEventListener("mouseup", this._handleElementScale, false);
    this.el.removeEventListener("mouseup", this._handleMouseUp, false);
    this.el.removeEventListener("mouseup", this._handleElementScale, false);
  }
}
