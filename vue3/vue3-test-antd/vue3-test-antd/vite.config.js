const { resolve } = require("path");

console.log("====import==333==", import.meta);
console.log("====process===", process.cwd());


let devpro = "local-test";   // 开发环境
devpro = "local-pro";     // 生产环境

let devtest = {
  "local-test": "http://localhost:8000",  // 开发环境域名
  "local-pro": "http://localhost:8000",   // 生产环境域名
}

export default {
  define:{
    // 挂载到window对象上
    BASE_URL: JSON.stringify(devtest[devpro]),  // 设置请求url, 在.js中直接使用 BASE_URL
  },
  // 设置代理
  server: {
    host: "0.0.0.0", // 默认是 localhost
    port: 4000, //启动端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    proxy: {
      "/api": {
        target: "http://v.juhe.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace("^/api/", ""),
      },
      "/r": {
        target: "http://ofres.truebelieve.cn/", //代理网址
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/r/, ""),
      },
    },
  },

  //   base: "/test/", //打包路径
  build: {
    outDir: "test", // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    // minify: false, // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    // manifest: false, // 是否产出maifest.json
    // sourcemap: false, // 是否产出soucemap.json
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //设置别名
    },
  },
};
