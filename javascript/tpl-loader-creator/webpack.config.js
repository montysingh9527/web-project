/**
 * mode         development 开发     production 生产
 * entry        入口文件
 * output       path    filename   打包输出路径
 * devtool      source-map     开发调试
 * module       rules   loader
 * plugins      插件
 * devServer    开发服务器
 */

const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("----__dirname--", __dirname),
  (module.exports = {
    mode: "development",
    entry: resolve(__dirname, "src/app.js"),
    output: {
      path: resolve(__dirname, "build"),
      filename: "app.js",
    },
    devtool: "source-map",
    resolveLoader: {
      modules: ["node_modules", resolve(__dirname, "loaders")],
    },
    module: {
      // loader处理从下到上从右到左
      rules: [
        {
          test: /\.tpl$/, // 以.tpl结尾的文件
          use: [
            "babel-loader",
            {
              loader: "tpl-loader", // 使用自己编写的loader。
              options: {
                log: true,  // 输出conslog false  const { log } = getOptions(this);
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "index.html"),
      }),
    ],
    devServer: {
      port: 3333,
    },
  });
