<template>
  <div>
    <input
      type="text"
      placeholder="请输入ID/Name查询"
      @input="search($event.target.value)"
    />
    <div>
      <p>{{ searchedData.name }}</p>
      <p>{{ searchedData.age }}</p>
    </div>
    <hr />
    <ul>
      <Customer :data="data" @setAge="setAge"></Customer>
    </ul>
  </div>
</template>

<script setup>
import { customerData } from "./data.js";
import { reactive, toRefs } from "vue";
import { Customer, Customers } from "./components/Customer";

const curstomers = new Customers({
  searchedData: {},
  data: customerData,
});

console.log("---new Customers---", curstomers);
const { data, searchedData } = toRefs(curstomers.state);
const { setAge, search } = curstomers;

/**
 * a: {
 *  b: {
 *    c: {
 *    }
 *  }
 * }
 *
 * a.b.c = 3
 *
 * setC (value) {
 *  a.b.c = value
 * }
 *
 * getC () {
 *  return a.b.c
 * }
 */

// const state = reactive({
//   data: customerData,
//   searchedData: {},
// });

// /**
//  * 修改值
//  * @param {*} id 修改id
//  * @param {*} age 输入值
//  */
// const setAge = (id, age) => {
//   console.log("-----age---", id, age);
//   const customer = getCustomer(id, state.data, "id");
//   console.log("---customer----", customer);
//   customer.age = age;
// };

// /**
//  * 搜索查询
//  * @param {*} value 输入值
//  */
// const searchData = (value) => {
//   if (!isNaN(Number(value))) {
//     const customer = getCustomer(value, state.data, "id") || {};
//     state.searchedData = customer;
//     return;
//   }

//   state.searchedData = getCustomer(value, state.data, "name") || {};
// };

// /**
//  * 树形结构查询
//  * @param {*} value 查询值（输入值）
//  * @param {*} data  数据源
//  * @param {*} field 查询字段 id/name
//  */
// function getCustomer(value, data, field) {
//   let result = null;
//   for (let i = 0; i < data.length; i++) {
//     let item = data[i];

//     const condition =
//       field === "name"
//         ? item.name.toLowerCase().includes(value.toLowerCase())
//         : item.id === Number(value);

//     if (condition) {
//       result = item;
//       if (result) {
//         return result;
//       }
//     }
//     if (item.children && item.children.length > 0) {
//       result = getCustomer(value, item.children, field);
//       if (result) {
//         return result;
//       }
//     }
//   }
// }
</script>



