/*
 * @Description:
 * @Date: 2023-12-27 13:37:06
 * @FilePath: \web-project\node-egg-demo\admin-project\vue3-vite-config.js
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from './package.json'
const CWD = process.cwd()
const __APP_INFO__ = {
	// pkg,
	lastBuildTime: new Date().getTime(),
  buildTime: new Date().toLocaleString(),
}
console.log("--config--", path.resolve(__dirname, "./src"), "---", process.cwd());

console.log('---logs-node_mudules--',path.resolve(__dirname, "./node_modules/quasar"));

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD)
  console.log("--config-mode, command---", mode, command);
  const devpro = mode == "development" ? "http://127.0.0.1:7001" : "https://www.baidu.com"
  return {
    // base: VITE_BASE_URL,
		// root: mode === 'development' ? '' : '',
		// 挂载到Window对象上
		define: {
			BASE_URL: JSON.stringify(devpro), // 设置请求url, 在.js中直接使用 BASE_URL
			APP_INFO: JSON.stringify(__APP_INFO__)
		},
    plugins: [vue()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"), //设置别名
        node_modules: path.resolve(__dirname, "./node_modules"),
        base_src: path.resolve(__dirname, "./")
      },
    },
    build: {
      outDir: "dist", // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
      // minify: false, // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      // manifest: false, // 是否产出maifest.json
      // sourcemap: false, // 是否产出soucemap.json
    },
    server: {
      host: "0.0.0.0", // 默认是 localhost
      port: 62600, //启动端口
      // open: "vue3-vite/index.html",
      open: true, // 浏览器自动打开
      hrm: true,
    },
  };
});
