// import { reactive } from "@vue/reactivity";
import { reactive } from "./vue3/reactiveity";
// composition API
// reactive -> ES6 Proxy 代理API
const state = reactive({
  name: "微克",
  age: 34,
  info: {
    job: "teacher",
    students: [
      {
        id: 1,
        name: "小张",
      },
      {
        id: 2,
        name: "小王",
      },
    ],
  },
  hobby: ["piano", "travel", "film"],
});

// console.log("--state-111--", state);

// state.name = "马克";
// state.age = 35;
// state.info.job = "FE Teacher";
// state.info.students.push({
//   id: 3,
//   name: "小李",
// });

// state.hobby.push("coding");

// console.log("---state-222--", state);

// console.log(state.name)
state.name;
state.name = "设置马克";

state.info.job = "FB teacher";
state.hobby[0] = "mark";
state.hobby.push("codeing");
state.info.students.push({
  id: 3,
  name: "小李",
});

console.log("----state---", state);
