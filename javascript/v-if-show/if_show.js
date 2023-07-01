/**
 * 1、代理数据与数据劫持
 * 2、初始化DOM
 *
 * showPool: [
 *  {
 *      dom,
 *      {
 *          type: if / show,
 *          show: true / false,
 *          data: 绑定的数据
 *      }
 *  }
 * ]
 *
 * eventPool: [
 *  [
 *      dom,
 *      handler
 *  ]
 * ]
 *
 * 3、初始化视图
 * 4、eventPool 事件处理函数的绑定
 * 5、改变数据的同时，改变DOM
 */

class IfShow {
  constructor(options) {
    const { el, data, methods } = options;

    this.el = document.querySelector(el);
    this.data = data;
    this.methods = methods;

    this.showPool = new Map();
    this.eventPool = new Map();

    this.init();
  }
  // 初始化
  init() {
    // 初始化数据
    this.initData();
    // 初始化dom
    this.initDom(this.el);
    // 初始化视图
    this.initView(this.showPool);
    // 初始化事件
    this.initEvent(this.eventPool);
    console.log("--showPool--", this.showPool);
    console.log("--eventPool--", this.eventPool);
  }

  // 1、代理数据与数据劫持
  initData() {
    console.log("---data----", this.data);
    for (let key in this.data) {
      console.log(this, "----", key, "====", this.data[key]);
      // this.boxShow1 -> this.data.boxShow1
      Object.defineProperty(this, key, {
        get() {
          console.log("访问：", key, this.data[key]);
          return this.data[key];
        },
        set(newValue) {
          console.log("设置：", key, newValue);
          this.data[key] = newValue;
          // 更新dom状态
          this.domChange(key, this.showPool);
        },
      });
    }
  }

  // 2、初始化DOM
  initDom(el) {
    // Node.childNodes 返回包含指定节点的子节点的集合
    const _childNodes = el.childNodes;
    if (!_childNodes.length) {
      return;
    }

    _childNodes.forEach((dom) => {
      // nodeType 属性可用来区分不同类型的节点，比如 元素, 文本 和 注释。
      if (dom.nodeType === 1) {
        const vIf = dom.getAttribute("v-if");
        const vShow = dom.getAttribute("v-show");
        const vEvent = dom.getAttribute("@click");

        if (vIf) {
          this.showPool.set(dom, {
            type: "if",
            show: this.data[vIf],
            data: vIf,
          });
        } else if (vShow) {
          this.showPool.set(dom, {
            type: "show",
            show: this.data[vShow],
            data: vShow,
          });
        }

        if (vEvent) {
          this.eventPool.set(dom, this.methods[vEvent]);
        }
      }
      // 递归
      this.initDom(dom);
    });
  }

  // 3、初始化视图
  initView(showPool) {
    this.domChange(null, showPool);
  }
  // 改变dom状态
  domChange(data, showPool) {
    if (!data) {
      for (let [k, v] of showPool) {
        switch (v.type) {
          case "if":
            // v-if 删除节点 且添加<!--v-if-->注释节点    createComment() 方法用来创建并返回一个注释节点。
            v.comment = document.createComment("v-if");
            !v.show && k.parentNode.replaceChild(v.comment, k);
            break;
          case "show":
            // v-show 隐藏节点
            !v.show && (k.style.display = "none");
            break;
          default:
            break;
        }
      }
      return;
    }
    for (let [k, v] of showPool) {
      if (v.data === data) {
        switch (v.type) {
          case "if":
            // v-if 删除节点 且添加<!--v-if-->注释节点    createComment() 方法用来创建并返回一个注释节点。
            v.show
              ? k.parentNode.replaceChild(v.comment, k)
              : v.comment.parentNode.replaceChild(k, v.comment);
            v.show = !v.show;
            break;
          case "show":
            // v-show 隐藏节点
            v.show ? (k.style.display = "none") : (k.style.display = "block");
            v.show = !v.show;
            break;
          default:
            break;
        }
      }
    }
  }

  // 4、  eventPool 事件处理函数的绑定
  initEvent(eventPool) {
    for (let [k, v] of eventPool) {
      k.addEventListener("click", v.bind(this), false);
    }
  }
}
