<template>
  <li v-for="item of data" :key="item.id">
    <p>ID：{{ item.id }}</p>
    <p>Name：{{ item.name }}</p>
    <p>
      <span>{{ item.age }}</span>
      <span>
        <input
          type="number"
          :value="item.age"
          @input="setAge(item.id, $event.target.value)"
        />
      </span>
    </p>
    <ul v-if="item.children">
      <!-- 递归当前组件 -->
      <curstomer :data="item.children" @setAge="setAge"> </curstomer>
    </ul>
  </li>
</template>

<script setup>
// 引入当前组件
import curstomer from "./customer.vue";
const props = defineProps({
  data: Array,
});
// console.log(props.data);

const emit = defineEmits(["setAge"]);

const setAge = (id, age) => {
    // 提交事件
    emit("setAge", id, age)
    console.log("--------id----age----",id, age)
};
</script>

