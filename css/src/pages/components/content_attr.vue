<!--
 * @Description: 伪元素传值 :after content: attr()   样式局部变量--attrC
 * @Date: 2023-10-19 16:08:53
 * @FilePath: \web-project\css\src\pages\components\content_attr.vue
-->
<template>
  <div class="content-attr" :data-content="contentText"   :style="[computStyle, {'--attrC': 'red'}]">
    <button @click="changeMin">按钮-{{ ismin ? "min" : "max" }}</button>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
const ismin = ref(true);
const contentText = computed(() => {
  if (ismin.value) {
    return "min";
  } else {
    return "max";
  }
});

const computStyle = computed(()=>{
    if(ismin.value){
        return { "--attrB": "#0000ff"}
    }else {
        return { "--attrB": "#ff0000"}
    }
})

const changeMin = () => {
  ismin.value = !ismin.value;
};
</script>

<style scoped lang="scss">
.content-attr {
  position: relative;
  margin-top: 10px;
  button {
    color: var(--attrC);
  }
  &::after {
    content: attr(data-content);
    position: absolute;
    top: -15px;
    left: 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--attrB);
  }
}
</style>
