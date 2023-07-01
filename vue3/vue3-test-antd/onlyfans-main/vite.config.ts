import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/m/", //打包路径
  css: {
    postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
    },
},
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
      "/n": {
        // target: "http://ofapi.cszunmei.cn/", //代理网址
        target: "http://ofapi.dgqihangseo.com/", //代理网址
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/n/,''),
      },
      "/r": {
        target: "http://ofres.truebelieve.cn/", //代理网址
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/r/,''),
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
