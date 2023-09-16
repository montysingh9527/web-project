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
  };
});
