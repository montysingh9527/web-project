import { createApp } from "vue";
import Index from "./index.vue"
import "./src/css/home.scss";

const app = createApp(Index)

app.mount("#vite-box")
console.log('---logs---',app);



