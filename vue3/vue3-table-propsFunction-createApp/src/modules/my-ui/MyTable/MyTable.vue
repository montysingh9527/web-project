<template>
  <table border="1" class="my-table">
    <thead>
      <tr>
        <th v-for="info of tHead" :key="info.key">
          {{ info.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) of tBody" :key="item.id">
        <td
          v-for="(value, key) in item"
          :key="key"
          @click.stop="showEditInput($event, key, index)"
        >
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { createApp, reactive, toRefs } from "vue";
import EditInput from "./EditInput.vue";

let editInputApp = null;

const state = reactive({
  key: "",
  value: "",
  index: -1,
  text: "",
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      tHead: [],
      tBody: [],
    }),
  },
});

const emit = defineEmits(["submit"]);
const { tHead, tBody } = toRefs(props.data);

// 展示编辑输入框
function showEditInput(event, key, index) {
  editInputApp && removeEditInputApp(editInputApp);
  if (!checkEditable(key)) return;
  const target = event.target;
  const oFrag = document.createDocumentFragment();

  // 将 EditInput 组件创建注册  setValue: EditInput组件
  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue,
  });

  if (editInputApp) {
    editInputApp.mount(oFrag);
    target.appendChild(oFrag);
    target.querySelector(".edit-input").select();
  }
  setData({ index, key, text: findText(key) });
}

// 设置值
function setData({ index, key, text, value = "" }) {
  state.key = key;
  state.index = index;
  state.value = value;
  state.text = text;
}

// 提交自定义事件设置值
function setValue(value) {
  state.value = value;
  // 提交自定义事件  及回调函数
  emit("submit", { ...state }, removeEditInputApp);
}

function findText(key) {
  const { text } = tHead.value.find((item) => item.key === key);
  return text;
}

// 删除组件 重置数据
function removeEditInputApp() {
  editInputApp && editInputApp.unmount();
  setData({
    index: -1,
    key: "",
    value: "",
    text: "",
  });
}

// 判断是否可编辑
function checkEditable(key) {
  const { editable } = tHead.value.find((item) => item.key === key);
  return editable;
}

window.addEventListener("click", removeEditInputApp, false);
</script>

<style scoped lang="scss">
.my-table {
  width: 100%;
  border-collapse: collapse;
  tr {
    height: 44px;
    td {
      text-align: center;
      cursor: pointer;
      //   height: 20px;
      //   width: 20px;
      position: relative;
    }
  }
}
</style>
