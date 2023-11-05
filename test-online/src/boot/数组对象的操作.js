/**
 * 数组对象去重
 */
export const uniqueArray = array.reduce((prev, cur) => {
  // 根据id去重
  if (!prev.some((item) => item.id === cur.id)) {
    prev.push(cur);
  }
  return prev;
}, []);

/**
 * 模糊搜索
 * @param {*} dataList 查询列表
 * @param {*} searchText 查询的文字
 * @returns
 */
export const filter_list = (dataList, searchText) => {
  // 有查询文字
  if (searchText) {
    return dataList.filter((data) => {
      return Object.keys(data).some((key) => {
        return String(data[key]).toLowerCase().indexOf(searchText) > -1;
      });
    });
  }
  return dataList;
};
