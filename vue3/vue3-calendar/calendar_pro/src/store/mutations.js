export default {
  /**
   * 设置顶部title
   * @param {*} state
   * @param {*} routerName 路由名称
   */
  setHeaderTitle(state, routerName) {
    switch (routerName) {
      case "day":
        state.headerTitle = "当天信息";
        break;
      case "month":
        state.headerTitle = "近期假期";
        break;
      case "year":
        state.headerTitle = "当年假期";
        break;
      default:
        state.headerTitle = "当前信息";
        break;
    }
  },

  /**
   * 搜索框提示文字
   * @param {*} state
   * @param {*} routerName 路由
   */
  setPlaceholder(state, routerName) {
    const date = new Date();
    let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    switch (routerName) {
      case "day":
        state.placeholder = `格式:${year}${month}${day} (${year}年${month}月${day}日)`;
        break;
      case "month":
        state.placeholder = `格式:${year}${month} (${year}年${month}月)`;
        break;
      case "year":
        state.placeholder = `格式:${year} (${year}年)`;
        break;
      default:
        state.placeholder = `格式:${year}${month}${day} (${year}年${month}月${day}日)`;
        break;
    }
  },

  /**
   * 设置搜索框
   * @param {*} state
   * @param {*} routerName  路由名称
   */
  setMaxLength(state, routerName) {
    switch (routerName) {
      case "day":
        state.maxlength = 8;
        break;
      case "month":
        state.maxlength = 6;
        break;
      case "year":
        state.maxlength = 4;
        break;
      default:
        state.maxlength = 8;
        break;
    }
  },

  /**
   * 设置错误码
   * @param {*} state
   * @param {*} errorCode
   */
  setErrorCode(state, errorCode) {
    state.errorCode = errorCode;
  },

  /**
   * 设置数据
   * @param {*} state
   * @param {*} payload
   */
  setData(state, payload) {
    const { field, data } = payload;
    switch (field) {
      case "day":
        state.dayData = data;
        break;
      case "month":
        state.monthData = data;
        break;
      case "year":
        state.yearData = data;
        break;
      default:
        break;
    }
  },
};
