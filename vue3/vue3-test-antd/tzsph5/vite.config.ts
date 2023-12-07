import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/", //打包路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //设置别名
    },
  },
  server: {
    host: "0.0.0.0", // 默认是 localhost
    port: 4000, //启动端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    proxy: {
      // 选项写法
      "/hangup/8000": {
        target: "http://qlapi.mocqo.com/", //代理网址
        changeOrigin: true,
        ws: true,
        // rewrite: (path) => path.replace('^/api', '/'),
      },
    },
    cors: true,
  },
  build: {
    outDir: "dist", // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    // minify: false, // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    // manifest: false, // 是否产出maifest.json
    // sourcemap: false, // 是否产出soucemap.json
  },
});
