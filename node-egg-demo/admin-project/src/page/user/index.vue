<!--
 * @Description: 用户管理
 * @Date: 2024-01-15 22:17:57
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\user\index.vue
-->
<template>
  <div class="user-wrap">
    <q-card>
      <q-card-section>
        <q-input @click="upload_img($event)" label="上传图片"></q-input>
        <q-input v-model="from.username" label="用户名" placeholder="请输入用户名..." outlined></q-input>
        <q-input v-model="from.password" class="q-mt-md" label="密码" placeholder="请输入密码..." outlined></q-input>
        <q-card-actions vertical align="right">
          <div>
            <q-btn @click="chang_create" class="" label="创建用户" color="primary" dense></q-btn>
            <q-btn @click="random_pwd" class="q-ml-md" label="随机密码" color="purple" dense></q-btn>
          </div>
        </q-card-actions>
        <div class="">
          <div class="q-my-md text-red">用户数量:{{ table_data.total }}</div>
          <div v-for="(item, idx) in table_data.list" :key="idx" class="row q-gutter-md">
            <div class="">{{ item.username }}</div>
            <div>{{ item.password }}</div>
            <img :src="img_url + item.avatar" alt="" width="100" />
            <div>{{ item.gender }}</div>
            <q-btn @click="deleteData(item)" label="删除" dense color="primary"></q-btn>
          </div>
        </div>
        <q-btn @click="from.page++" v-model="from.page" label="下一页"></q-btn>
        <span>当前页:{{ from.page }}</span>
        <q-btn @click="() => (from.page > 1 && from.page--)" v-model="from.page" label="上一页"></q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { api_user } from "src/api/index.js";
import { use_upload_img } from "src/hooks/upload.js"
import md5 from "js-md5"
const img_url = BASE_URL;
const table_data = ref([]);

const from = ref({ page: 1 })

/**
 * 创建
 */
const chang_create = async () => {

  const params = {
    username: from.value.username,
    password: md5(from.value.password),
  };
  const res = await api_user.create_user(params);
  console.log("---logs--res-", res);
  init_table();
};

/**
 * 随机密码
 */
const random_pwd = () => {
  // 生成随机数
  const rdm_name = Math.random().toString(36).slice(2);
  from.value.password = rdm_name
}

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
    page: from.value.page,
    size: 10,
  };
  const res = await api_user.find_list(params);
  console.log("---logs--result-", res);
  table_data.value = res.data;
};

// 上传图片
const upload_img = async (event) =>{
  const res = await use_upload_img(event);
  console.log('--222-logs--res-',res);
}

watch(() => from.value.page, () => {
  init_table();
})

onMounted(() => {
  init_table();
});
</script>

<style scoped lang="scss"></style>
