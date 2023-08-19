<template>
  <div class="home">
    <q-btn>Home</q-btn>
  </div>
</template>

<script setup>
import qtable from "app/config/qtable.json";
import { ref } from "vue";

console.log("---logs-qtable--", qtable);

// 顶部菜单
const header_menu = ref([]);
// props右边菜单
const props_left_menu = ref([]);
// table数据 {props:{category: []}, slots: [{}]}
const table_data = ref({});

/**
 * 处理二级数据
 * @param {*} datas
 */
function deep_params(datas) {
  // console.log("---datas--", datas);
  let data = [];
  let obj = {};
  for (const key in datas) {
    // console.log('---logs--key-',key);
    if (
      ["params", "definition"].includes(key) &&
      Object.keys(datas[key]).length
    ) {
      for (const k in datas[key]) {
        obj = {
          ...datas[key][k],
          title: k,
          [key]: deep_params(datas[key][k]),
          type: type_props(datas[key][k]),
        };
      }
    } else {
      obj = {
        title: key,
        type: type_props(datas[key]),
        ...datas[key],
      };
    }
  }
  data.push(obj);
  return data;
}

/**
 * 处理type展示
 * @param {*} datas
 */
function type_props(objs) {
  const isFun = objs.type === "Function";
  if (isFun) {
    // (rows, sortBy, descending) => Array - required!    （required表示必填）
    return `(${(objs.params && Object.keys(objs.params).join(",")) ?? ""}) => ${
      objs.returns?.type ?? "void"
    } ${objs.required ? "- required!" : ""}`;
  } else {
    // String | Function - required!
    return Array.isArray(objs.type)
      ? objs.type?.join(" | ")
      : objs.type + (objs?.required ? "- required!" : "");
  }
}

/**
 * 递归处理
 */
function comput_scope(datas) {
  // console.log("---logs--datas-", datas);
  // const isdeep =  Object.keys(datas).some(i=> ['scope',"params","definition"].includes(i))
  // if(isdeep){
  //   Object.keys(datas).forEach(key=>{
  //     if(['scope',"params","definition"].includes(key)){
        
  //     }
  //   })
  // }
  return datas;
}

/**
 * 处理数据
 * @param {*} key 键
 * @param {*} datas 数据
 */
function filter_props(keys, datas) {
  const isProps = keys === "props";
  const prevtype = isProps ? {} : [];
  return Object.entries(datas)?.reduce((prev, [key, cur]) => {
    if (isProps) {
      const cats = cur.category?.split("|");
      cats?.forEach((item) => {
        const curs = {
          // title: key,
          // type: type_props(cur),
          ...deep_params(cur),
        };
        if (prev[item]) {
          prev[item].push(curs);
        } else {
          prev[item] = [curs];
        }
      });
    } else {
      // console.log('---logs-cur--',cur);
      if (keys == "slots") {
        const objs = {
          ...comput_scope(cur),
          title: key,
          type: type_props(cur),
        };
        prev.push(objs);
      }
    }
    return prev;
  }, prevtype);
}

const init_table = () => {
  for (const key in qtable) {
    if (!["leftmenu", "mixins", "meta"].includes(key)) {
      header_menu.value.push({
        name: key,
        menuLen: Object.keys(qtable[key]).length,
      });
      table_data.value[key] = filter_props(key, qtable[key]);
    }
  }
};

init_table();

// console.log("---logs--4444-", props_left_menu.value);
// console.log("---header_menu---", header_menu.value);
console.log("---table_data---", table_data.value.slots);
</script>

<style scoped lang="scss">
</style>
