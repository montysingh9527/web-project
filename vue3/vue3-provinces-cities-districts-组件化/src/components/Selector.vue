<template>
  <select v-if="isShow" @change="handleChange">
    <option value="">{{ defaultTitle }}</option>
    <option
      v-for="(info, name) in data"
      :value="`${info[codeKey]}:${name}`"
      :key="name"
    >
      {{ name }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  // 数据
  data: {
    type: Object,
    default: () => ({}),
  },
  // 是否显示
  isShow: {
    type: Boolean,
    default: false,
  },
  // 标题
  defaultTitle: {
    type: String,
    default: "Default",
  },
  codeKey: String,
});

const emit = defineEmits(["handleChange"]);

const handleChange = (e) => {
  emit("handleChange", e.target.value);
};
</script>

