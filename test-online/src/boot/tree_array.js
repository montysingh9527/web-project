/**
 * tree 树状结构数据操作
 */

/**
 * 扁平的数组结构 -> 转树状结构（不使用递归）
 * 根据id，和pid构建出树形数组结构(tree array)，
 * 这种情形经常出现在嵌套的目录结构
 * @param {*} list 
 * @returns 
 * [{ id: "12", parentId: "0", text: "Man",  children: null,},
    { id: "7", parentId: "12", text: "Other", children: null, },]
  转：
  [{id: "12", parentId: "0",text: "Man",
  children: [
    { id: "7", parentId: "12", text: "Other", children: null,}
  ]}]
 */
function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i++) {
    map[list[i].id] = i;
    list[i].children = [];
  }

  for (i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parentId !== "0") {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
