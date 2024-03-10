const path = require('path')
//gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const development = process.env.NODE_ENV === 'development';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const date = new Date();
const resolve = dir => path.join(__dirname, dir);
const VERSION = [(date.getMonth() + 1), date.getDate(), date.getHours(), date.getMinutes()].join('.')

module.exports = {
  // 生产模式 和  开发模式 日志形式
  // publicPath: development ? '/sporth5' : './',
  publicPath: development ? '/' : './',
  // 输出配置
  outputDir: 'sport',
  // 选项...
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: true,
    modules: false
  },

  // 配置别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('%', resolve('src/common'))
      .set('$api', resolve('src/axios'))
      .set('&', resolve('src/components'))
      .set('~', resolve('src/assets'))


    /** 删除懒加载模块的 prefetch preload，降低带宽压力(使用在移动端) */
    config.plugins.delete("prefetch").delete("preload")
    config.optimization.minimize(true)

    /** 添加分析工具*/
    // if (process.env.NODE_ENV === 'production') {
    //     config
    //         .plugin('webpack-bundle-analyzer')
    //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //         .end();
    //     config.plugins.delete('prefetch')
    // }
    /**解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559*/
    config.resolve.symlinks(true)
  },

  configureWebpack: {
    plugins: [
      development ? false :  new CompressionWebpackPlugin({
        // asset: '[path].gz[query]', // 目标文件名
        algorithm: 'gzip', // 使用gzip压缩
        // 压缩 js 与 css
        test: new RegExp('\\.(js|css)$'),
        threshold: 1024 * 10, // 资源文件大于1024B*10kB时会被压缩
        minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
      }),
    ].filter(Boolean),

    optimization: {
      minimizer: [
        development ? false :  new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: development
            },
            // 删除console debugger 删除警告
            compress: {
              // warnings: development,
              drop_console: development,//console
              drop_debugger: development,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      ].filter(Boolean)
    },
    externals: {
      vue: 'Vue',
      vant: 'vant'
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      // 'axios': 'axios',
      // 'better-scroll': 'BScroll'
    },

    output: {
      filename: development ? `js/[name].[hash:8].js?v=${VERSION}` : `js/[chunkhash:8].js?v=${VERSION}`,
      chunkFilename: development ? `js/[name].[hash:8].js?v=${VERSION}` : `js/[chunkhash:8].js?v=${VERSION}`
    }
  },

  // 打包时不生成.map文件
  productionSourceMap: false,
  runtimeCompiler: true,

  devServer: {
    host: '0.0.0.0',
    port: '18888',
    hot: true,
    // hotOnly: true,
    // open: true,
    disableHostCheck: true,
    // historyApiFallback: true,
    compress: true,
    proxy: {
      '/api': {
        // target: 'http://demo4.ug.cc',
        // target: 'http://test19.6yc.com',
        // target: 'http://test58f.fhptdev.com', // fly
        target: 'http://t061f.fhptdev.com', // fly
        // target: 'https://www.90b.net',
        // target: 'http://dtclygc002bmohcw.playhappy123.com',
        // target: 'http://test36a.6yc.com',
        // target: 'http://t005f.fhptcdn.com',
        // target: 'http://t060ff.fhptdev.com',
        // target: 'http://test10.fhptdev.com',
        // target: 'http://test31.fhptdev.com', // waly
        // target: 'http://test127f.fhptdev.com',
        // target: 'http://test07f.fhptdev.com',
        // target: 'http://tmutmktv015igvc.lkzhapo23165akj.com',
        // target: 'http://test58f.fhptdev.com',
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
