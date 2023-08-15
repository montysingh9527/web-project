import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
console.log('---logs---',path.resolve(__dirname, "./src"));


export default defineConfig(({ mode, command }) => {
  console.log("====mode, command====", mode, command);
  return {
    // base: "./",
    // root: "/",
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: "src",
          replacement: path.resolve(__dirname, "./src"),
        },
      ],
    },
    build: {
      outDir: "test",
      rollupOptions: {
        input: {
        //   main: "src/main.js", // 这里指定的是入口 JavaScript 文件路径
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },

    server: {
      host: "0.0.0.0", // 默认是 localhost
      port: 37600, //启动端口
      open: "vue3-vite/index.html",
      // open: true, // 浏览器自动打开
      hrm: true,
    },
  };
});
