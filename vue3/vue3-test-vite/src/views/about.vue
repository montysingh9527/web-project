<template>
  <div class="container">
    <div class="text-red">
      <a-button @click="$router.push({name:'home'})">跳转home</a-button>
    </div>
    <a-button type="primary" size="small" @click="changeBtn">按钮</a-button>
    <a-checkbox class="ml-10" v-model="checked">勾选</a-checkbox>

    <a-row>
      <a-col class="bg-back text-with" :span="12">
        <div>col-1</div>
        <div>col-2</div>
      </a-col>
      <a-col class="bg-pr text-with" :span="12">col-12</a-col>
    </a-row>
    <a-button @click="clickBtn">confirm提示</a-button>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
export default defineComponent({
  name: "Index",
  components: {},
  props: {},
  methods: {
    changeBtn() {
      this.$message.info("info提示..");
      this.$message.success("success提示..")
      this.$message.error("error提示....")
      this.$message.warning("warning提示...")
      this.$message.warn("warn提示...")
      
    },
    clickBtn() {
      this.$confirm({
        title: "Confirm",
        // icon: createVNode(ExclamationCircleOutlined),
        content: "Bla bla ...",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          console.log("确认......");
        },

        onCancel() {
          console.log("取消......");
          // this.$message.error("取消confirm...")
        },
      });
    },
  },
  setup(props) {
    const states = reactive({
      checked: false,
    });
    return { ...toRefs(states) };
  },
});
</script>

<style scoped lang="less">
</style>
