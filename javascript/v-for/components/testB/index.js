import { createReactive } from "../../modules/index";

const template = `
    <ul class="list">
    <h5>{{ title }}</h5>
    {{dateTime}}
    <for data="list" tag="li" class="item">
    <span>老师姓名：{ name }</span>
    <span>老师年龄：{ age }</span>
    </for>
    </ul>
`;

function TestB() {
  const state = createReactive({
    title: "老师信息列表",
    dateTime: "2022-08-03 10:23",
    list: [
      {
        id: 5,
        name: "张麻子",
        age: 63,
      },
      {
        id: 6,
        name: "Mark",
        age: 17,
      },
      {
        id: 7,
        name: "Peter",
        age: 34,
      },
    ],
  });

  return [template, state];
}

export default TestB;
