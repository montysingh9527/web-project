/**
 * 生成节点类
 * @class Element
 */
export default class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
