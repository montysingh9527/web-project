/*
 * @Description: 测试方法
 * @Date: 2023-09-29 18:14:01
 * @FilePath: \web-project\test.js
 */


function removeDuplicates(data) {
  const obj = {};
  data.forEach(item => {
      obj[item.id] = item;
  });
  return Object.values(obj);
}

const data = [
  { id: "111", sort: 23, zh: "中文" },
  { id: "333", sort: 176,zh: "中文" },
];

const data1 = [
  { id: "111", sort: 23,en: "zhongwen" },
  { id: "333", sort: 176,en: "zhongwen" },
];

const uniqueData = removeDuplicates(data);
console.log(uniqueData);
