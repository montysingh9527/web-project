import { useReactive, useDOM } from "../vue3";

function App() {
  const state = useReactive({
    count: 0,
    name: "mark",
  });

  const add = (num) => {
    state.count += num;
  };

  const minus = (num) => {
    state.count -= num;
  };

  const changeName = (name) => {
    state.name = name + parseInt(Math.random() * 100);
  };

  return {
    template: `
        <h1>{{ count }}</h1>
        <h2>{{ name }}</h2>
        <button onClick="add(2)">+</button>
        <button onClick="minus(1)">-</button>
        <button onClick="changeName('wes')">修改Name</button>
        `,
    state,
    methods: {
      add,
      minus,
      changeName,
    },
  };
}

useDOM(App(), document.querySelector("#app"));
