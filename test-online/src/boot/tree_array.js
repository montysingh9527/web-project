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

/** *
 *
 *  将列表型的数据转化成树形数据 => 递归算法 => 自身调用自身 => 一定条件不能一样， 否则就会死循环
 *  遍历树形 有一个重点 要先找一个头儿
 * ***/
export function tranListToTreeData(list, rootValue) {
  let arr = [];
  list.forEach((item) => {
    if (item.pid === rootValue) {
      // 找到之后 就要去找 item 下面有没有子节点
      const children = tranListToTreeData(list, item.id);
      if (children.length) {
        // 如果children的长度大于0 说明找到了子节点
        item.children = children;
      }
      arr.push(item); // 将内容加入到数组中
    }
  });
  return arr;
}

// this.treeData = tranListToTreeData(depts, '')

/**
 *  扁平的数组结构 -> 转树状结构
 * @param {*} data
 * @returns
 */
function buildTreeIterative(data) {
  const map = new Map();
  const tree = [];
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });
  data.forEach((item) => {
    const parent = map.get(item.parentId);
    if (parent) {
      parent.children.push(map.get(item.id));
    } else {
      tree.push(map.get(item.id));
    }
  });
  return tree;
}
const treeData = buildTreeIterative(flatArray);
// console.log(treeData);

/**
 * 使用reduce方法   扁平的数组结构 -> 转树状结构
 * @param {*} data
 * @returns
 */
function buildTreeWithReduce(data) {
  const tree = data.reduce((acc, item) => {
    const parent = item.parentId
      ? acc.find((el) => el.id === item.parentId)
      : null;
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
  return tree;
}

const treeData3 = buildTreeWithReduce(flatArray);
// console.log(treeData3);

/**
 * 
 * 扁平的数组结构 -> 转树状结构（使用递归）
let arr = [
  { menu: "1", level: 1 },
  { menu: "2", sonmenu: "22", level: 2 },
  { menu: "2", sonmenu: "21", level: 1 },
  { menu: "22", sonmenu: "221", level: 3 },
  { menu: "22", sonmenu: "222", level: 3 },
  { menu: "50", sonmenu: "51", level: 1 },
  { menu: "100", level: 1 },
];
====转换成====
[
        { menu: "1", level: 1, },
        {
          menu: "2",
          level: 1,
          children: [
            { menu: "2", sonmenu: "21", level: 1 },
            { menu: "2", sonmenu: "22", level: 2 },
            {
              menu: "22",
              level: 3,
              children: [
                  { menu: "22", sonmenu: "221", level: 3 },
                  { menu: "22", sonmenu: "222", level: 3 }
            ],
            },
          ],
        },
        {
          menu: "51",
          level: 1,
          children: [{ menu: "50", sonmenu: "51", level: 1,},],
        },
        { menu: "100", level: 1, },
];
 */

function deesp(data) {
  // 按level等级排序
  data.sort((a, b) => a.level - b.level);
  const deepson = (datalist, sonVal) => {
    // 如果是一级菜单
    if (sonVal.level == 1) {
      datalist.push({
        level: sonVal.level,
        menu: sonVal.menu,
        children: [Object.assign(sonVal, { level: 2 })],
      });
    } else {
      datalist.forEach((item) => {
        // 当前菜单名称和子级菜单名称相同，添加到children（说明同一菜单有两个子级）
        if (item.menu == sonVal.menu) {
          item.children.push(sonVal);
        } else {
          // 子级菜单
          if (item.sonmenu == sonVal.menu) {
            // 如果菜单有相同的则不添加
            let isadd = datalist.some((o) => o.menu == sonVal.menu);
            if (!isadd) {
              let obj2 = {
                level: sonVal.level * 1 - 1,
                menu: sonVal.menu,
                children: [sonVal],
              };
              datalist.push(obj2);
            }
          } else {
            // 递归
            item.children?.length && deepson(item.children, sonVal);
          }
        }
      });
    }
    return datalist;
  };

  return data.reduce((prev, cur) => {
    // 如果没有子级菜单，直接添加
    if (!cur.sonmenu) {
      prev.push(cur);
    } else {
      // 递归调用
      deepson(prev, cur);
    }
    return prev;
  }, []);
}
console.log("---logs---", deesp(arr));


/**
 * 数组递归添加 递归层级
 * 示例嵌套数组对象
 */
// const nestedArray = [
//   { value: "A", children: [ { value: "B", children: [ { value: "D", },{ value: "E", }, ], }, { value: "C", }, ],},
//   { value: "F",},
//   { value: "G",children: [{ value: "H" }],},
// ];
// 递归函数来为数组对象添加层级记录
function addDepthToNestedArray(arr, depth = 0) {
  for (const item of arr) {
    item.depth = depth;
    if (item.children) {
      addDepthToNestedArray(item.children, depth + 1);
    }
  }
}
// 调用递归函数
addDepthToNestedArray(nestedArray);
// 打印带有层级记录的嵌套数组对象
console.log("====nestedArray4===", nestedArray);
