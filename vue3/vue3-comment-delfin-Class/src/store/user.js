import { createStore } from "delfin";

export default createStore({
  state: {
    userInfo: {
      id: 1,
      username: "zhangsan",
    },
  },
  actions: {
    setUserInfo(store, userInfo) {
      store.userInfo = userInfo;
    },
  },
});
