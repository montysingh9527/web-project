// module.exports = {
//   transpileDependencies: true,
//  devServer: {
//     // 设置代理
//   proxy:{
//     "/api": {
//       target: "http://v.juhe.cn",
//       changeOrigin: true,  // 同源策略
//       ws: true,   // 开启WebSocket
//       secure: false,   // https 检查关闭
//       pathRewrite: {    // 重写路径
//         "^/api": ""
//       }
//     }
//   },
//   // 去除eslint警告
//   overlay: {
//     warnings: false,
//     errors: false
//   }
//  },
//  // 去除eslint检查
//  lintOnSave: false,
// }
