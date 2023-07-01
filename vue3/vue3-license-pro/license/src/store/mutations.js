export default {
  setSubjectId(state, id) {
    state.subjectId = id;
  },
  setModelType(state, type) {
    state.modelType = type;
  },
  setErrorCode(state, code) {
    state.errorCode = code;
  },
  setData(state, data) {
    state.data = data;
  },
  setHeaderTitle(state, routerName) {
    switch (routerName) {
      case "index":
        state.headerTitle = "驾照题库";
        break;
      case "test":
        state.headerTitle = "开始做题";
        break;
      case "result":
        state.headerTitle = "答题结果";
        break;
      default:
        state.headerTitle = "驾照题库";
        break;
    }
  },
};
