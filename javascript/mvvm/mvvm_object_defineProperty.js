/**
 * 1、数据 -> 响应式的数据 -> Object.defineProperty
 * 2、input -> input/keyup -> 事件处理函数的绑定 -> 改变数据
 * 3、相关的DOM -> 数据 -> 绑定在一起
 *    操作数据的某个属性 -> 对应DOM就改变
 */
class MVVM {
  constructor(el, data) {
    this.el = document.querySelector(el);
    this._data = data;
    this.domPool = {};

    this.init();
  }
  init() {
    this.initData();
    this.initDom();
  }

  initDom() {
    this.bindDom(this.el);
    this.bindInput(this.el);

    console.log("---domPool--", this.domPool);
  }

  initData() {
    const _this = this;
    this.data = {};
    // 循环遍历设置 响应式数据
    for (let key in this._data) {
      Object.defineProperty(this.data, key, {
        get() {
          console.log("获取数据：", key, _this._data[key]);
          return _this._data[key];
        },
        set(newValue) {
          _this.domPool[key].innerText = newValue;
          _this._data[key] = newValue;
          console.log("--设置数据--", _this._data[key]);
          console.log("---_this---", _this);
          console.log("==this==", this);
        },
      });
    }
    console.log(this.data);
  }

  bindDom(el) {
    // Node.childNodes 返回包含指定节点的子节点的集合，该集合为即时更新的集合。ndList 变量为 NodeList 类型，且为只读
    const childNodes = el.childNodes;
    childNodes.forEach((item) => {
      // nodeType 属性可用来区分不同类型的节点，比如 元素, 文本 和 注释。 https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
      if (item.nodeType === 3) {
        const _value = item.nodeValue;
        if (_value.trim().length) {
          // 出现一次到多次 非贪婪模式   test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
          let _isValid = /\{\{(.+?)\}\}/.test(_value);
          if (_isValid) {
            // match() 方法会返回一个数组，它包括整个匹配结果，和通过捕获组匹配到的结果，如果没有匹配到则返回 null
            const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim();
            console.log("--_key--", _key);
            // parentNode 是指定节点的父节点。一个元素节点的父节点可能是一个元素 (Element) 节点、文档 (Document) 节点、文档碎片 (DocumentFragment`) 节点
            this.domPool[_key] = item.parentNode;
            // 插入数据
            item.parentNode.innerText = this.data[_key] || undefined;
          }
        }
      }

      item.childNodes && this.bindDom(item);
    });
  }

  /**
   * 绑定事件
   * @param {*} el
   */
  bindInput(el) {
    const _allInputs = el.querySelectorAll("input");
    _allInputs.forEach((input) => {
      const _vModel = input.getAttribute("v-model");
      if (_vModel) {
        // 循环绑定事件
        input.addEventListener(
          "keyup",
          this.handleInput.bind(this, _vModel, input),
          false
        );
      }
    });
  }

  /**
   * 设置值
   * @param {*} key
   * @param {*} input
   */
  handleInput(key, input) {
    const _value = input.value;
    this.data[key] = _value;
  }

  /**
   * 改变值
   * @param {*} key
   * @param {*} value
   */
  setData(key, value) {
    this.data[key] = value;
  }
}
