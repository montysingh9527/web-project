/**
 * 1、数据 -> 响应式的数据 -> new Proxy()
 * 2、input -> input/keyup -> 事件处理函数的绑定 -> 改变数据
 * 3、相关的DOM -> 数据 -> 绑定在一起
 *    操作数据的某个属性 -> 对应DOM就改变
 */

class MVVM {
  constructor(el, data) {
    this.el = document.querySelector(el);
    this.data = data;
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
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
     * Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
     *
     * 第一个参数：要包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
     * 第二个参数：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为
     */
    this.data = new Proxy(this.data, {
      get(target, key) {
        console.log('---获取值--', target, key);
        /**
         * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
         * Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 proxy handler (en-US) 的方法相同。Reflect 不是一个函数对象，因此它是不可构造的
         *
         * target：需要取值的目标对象
         * propertyKey：需要获取的值的键值
         */
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        _this.domPool[key].innerText = value;
        /**
         * 在一个对象上设置一个属性
         * target：设置属性的目标对象。
         * propertyKey：设置的属性的名称。
         * value：设置的值。
         */
        console.log('---设置值--', target, key, value);
        return Reflect.set(target, key, value);
      },
    });
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
