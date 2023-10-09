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
