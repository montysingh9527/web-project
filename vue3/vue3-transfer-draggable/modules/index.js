import Transfer from "./sensen-ui/Transfer.vue";

export { 
    Transfer
}

const components = {
  Transfer,
};

export default {
  install(app) {
    // 组件注册
    for (let comp in components) {
      app.component(comp, components[comp]);
    }
  },
};
