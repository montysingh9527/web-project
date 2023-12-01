/*
 * @Description: 
 * @Date: 2023-09-14 15:42:53
 * @FilePath: \web-project\css\vite.config.js
 */
import { defineConfig, loadEnv } from "vite";
import path from "path"
import vue from "@vitejs/plugin-vue";
export default defineConfig(({ mode, command }) => {
  console.log('---logs--vue-', mode, command);
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: 'src',
          replacement: path.resolve(__dirname, './src')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 在这里添加需要的全局变量
          additionalData: `@import "src/css/base.scss";`,
        },
      },
    },
  };
});
