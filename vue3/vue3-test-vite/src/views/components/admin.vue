<template>
  <div>
    <a-select
      v-model:value="selvalue"
      style="width: 120px"
      @change="handleChange"
    >
      <a-select-option value="test">测试环境</a-select-option>
      <a-select-option value="lspre">隔离环境</a-select-option>
      <a-select-option value="online">生产环境</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: "Admin",
  data() {
    return {
        selectedKeys: "1",
        collapsed: false,
        selvalue: "test"
    };
  },
  methods: {
    handleChange(value){
      localStorage.setItem("title", value)
      console.log("======handleChange===",value);
    }
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>