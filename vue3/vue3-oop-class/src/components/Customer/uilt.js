/**
 * 树形结构查询
 * @param {*} value 查询值（输入值）
 * @param {*} data  数据源
 * @param {*} field 查询字段 id/name
 */
export function getCustomer(value, data, field) {
  let result = null;
  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    const condition =
      field === "name"
        ? item.name.toLowerCase().includes(value.toLowerCase())
        : item.id === Number(value);

    if (condition) {
      result = item;
      if (result) {
        return result;
      }
    }
    if (item.children && item.children.length > 0) {
      result = getCustomer(value, item.children, field);
      if (result) {
        return result;
      }
    }
  }
}
