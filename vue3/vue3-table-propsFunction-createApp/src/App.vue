<template>
  <div>
    <my-table :data="tableData" @submit="editData"></my-table>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
      editable: false,
    },
    {
      key: "name",
      text: "姓名",
      editable: false,
    },
    {
      key: "age",
      text: "年龄",
      editable: false,
    },
    {
      key: "chinese",
      text: "语文",
      editable: true,
    },
    {
      key: "math",
      text: "数学",
      editable: true,
    },
    {
      key: "english",
      text: "英语",
      editable: true,
    },
  ],
  tBody: [
    {
      id: 1,
      name: "张三",
      age: 16,
      chinese: 121,
      math: 98,
      english: 138,
    },
    {
      id: 2,
      name: "李四",
      age: 17,
      chinese: 71,
      math: 147,
      english: 118,
    },
    {
      id: 3,
      name: "王五",
      age: 18,
      chinese: 129,
      math: 139,
      english: 141,
    },
  ],
});

// 编辑table数据   removeInput回调函数removeEditInputApp()
const editData = ({ index, key, value, text }, removeInput) => {
  console.log("==={ index, key, value, text }====", {index, key, value, text});
  if (tableData.value.tBody[index][key] != value) {
    const cfm = window.confirm(`
            你要确定将数据下表为[${index}]项
            [${text}] 字段的内容修改为[${value}]吗?
        `);
    if (cfm) {
      tableData.value.tBody = tableData.value.tBody.map((item, idx) => {
        index === idx && (item[key] = value);
        return item;
      });
    } else {
      removeInput();
    }
  }
};
</script>
  
  <style scoped lang="scss">
</style>