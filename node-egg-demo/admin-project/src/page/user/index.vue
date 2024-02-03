<!--
 * @Description: 
 * @Date: 2024-01-15 22:17:57
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\user\index.vue
-->
<template>
  <div class="user-wrap">
    用户管理
    <q-btn @click="chang_create" label="创建用户"></q-btn>
    <div class="">
      <div class="q-my-md text-red">用户数量:{{ table_data.length }}</div>
      <div v-for="(item, idx) in table_data" :key="idx" class="row q-gutter-md">
        <div class="">{{ item.username }}</div>
        <div>{{ item.password }}</div>
        <img :src="img_url + item.avatar" alt="" width="100" />
        <div>{{ item.gender }}</div>
        <q-btn @click="deleteData(item)" label="删除" dense color="primary"></q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api_user } from "src/api/index.js";

const img_url = BASE_URL;
const table_data = ref([]);

/**
 * 创建
 */
const chang_create = async () => {
  // 生成随机数
  const rdm_name = Math.random().toString(36).slice(2);
  const params = {
    username: rdm_name,
    password: "123456",
  };
  const res = await api_user.create_user(params);
  console.log("---logs--res-", res);
  init_table();
};

/**
 * 删除
 * @param {*} rowData
 */
const deleteData = async (rowData) => {
  await api_user.delete_user({ id: rowData.id });
  init_table();
};

/**
 * 初始化
 */
const init_table = async () => {
  const params = {
    page: 1,
    size: 1000,
  };
  const res = await api_user.find_list(params);
  console.log("---logs--result-", res);
  table_data.value = res.result.docs;
};

onMounted(() => {
  init_table();
});
</script>

<style scoped lang="scss">
</style>
