<template>
  <div class="about">
    <q-btn @click="change_file">请求</q-btn>
  </div>
</template>

<script setup>
import qth from "app/config/qth.json";
import axios from "axios";

const change_file = async () => {
  // 创建一个虚拟的 File 对象并构建 FormData 对象，然后使用 axios 发送 POST 请求来上传文件。
  //  const file = new File(['file content'], 'filename.txt', { type: 'text/plain' });

  // const formData = new FormData();
  // formData.append('file', file);

  const file = new File([JSON.stringify(qth)], 'filename.txt', { type: 'text/plain' });

  console.log('---logs-file--',file);
  
  const fromData = new FormData();
  console.log("---logs--fromData--", fromData);
  fromData.append("file", file);
  // ["1111","2222"].forEach(item=>{
  //   fromData.append("file", item)
  // })

  // 使用FileReader读取文件内容
  // const reader = new FileReader();
  // reader.onload = (event) => {
  //   const fileData = event.target.result; // 文件的二进制数据
  //   console.log("---logs-fileData--", fileData);
  // };

  const res = await axios({
    url: "./updata",
    method: "POST",
    data: fromData,
  });

  console.log("----res--", res);
};
</script>

<style scoped lang="scss">
</style>
