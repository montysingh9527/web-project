import { createApp } from "./modules/index.js";

import TestA from "./components/testA";
import TestB from "./components/testB";

console.log("---logs---", TestA);

const app = createApp({
  components: [TestA, TestB],
});

app.mount("#app");
