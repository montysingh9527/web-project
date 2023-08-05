// 判断当前环境   开发环境：development  生产环境：production
const isDEV = process.env.NODE_ENV == "development";
// process.argv属性返回一个数组，其中包含启动 Node.js 进程时传递的命令行参数
const isH5 = process.argv[2] == "h5";

let projectconfig = {};
if (isDEV) {
  
  projectconfig = {
    htmlVariables: {
      TITLE: isH5 ? "H5/PC项目" : "管理后台",
      VERSION_DATE: new Date().toLocaleString(),
      TAG: process.env.TAG,
      ICON: isH5 ? "./devfavicon.ico" : "./favicon.ico",
    },
    devServer: {
      port: isDEV ? 8899 : 9000, // 设置端口
      open: true, // 启动项目打开浏览器
      // host: 
      API: "http://127.0.0.0:8080"
    },
    // 默认输出文件
    sourceFiles: {
      rootComponent: isH5 ? "src/pc.vue" : "src/ht.vue",
      router: isH5 ? "src/router/h5_pc" : "src/router/ht",
      store: isH5 ? "src/h5_pc/store" : "src/ht/store",
      indexHtmlTemplate: isH5 ? "src/pc.html" : "src/ht.html",
    },
    build: {
      gzip: true,
      distDir: isH5 ? "/dist/h5" : "/dist/ht",
    },
  };
} else {
  projectconfig = {
    htmlVariables: {
      TITLE: isH5 ? "H5/PC项目-prod" : "prod管理后台",
      VERSION_DATE: new Date().toLocaleString(),
      TAG: process.env.TAG,
      ICON: isH5 ? "./devfavicon.ico" : "./favicon.ico",

    },
    devServer: {
      port: isDEV ? 8899 : 9000, // 设置端口
      open: true, // 启动项目打开浏览器
      // host: 
      API: "http://127.0.0.0:8080"
    },
    // 默认输出文件
    sourceFiles: {
      rootComponent: isH5 ? "src/pc.vue" : "src/ht.vue",
      router: isH5 ? "src/router/h5_pc" : "src/router/ht",
      store: isH5 ? "src/h5_pc/store" : "src/ht/store",
      indexHtmlTemplate: isH5 ? "src/pc.html" : "src/ht.html",
    },
    build: {
      gzip: true,
      distDir: isH5 ? "h5" : "ht",
    },
  };
}

console.log(`最终配置输出=${(isDEV, isH5)}==>>>`, projectconfig);

module.exports = function (/* ctx */) {
  return {
    // https://v1.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,
    // html头部内容
    htmlVariables: projectconfig.htmlVariables,
    // 代理
    // devServer: projectconfig.devServer,
    // 默认输出文件
    sourceFiles: projectconfig.sourceFiles,
    // https://v1.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v1.quasar.dev/quasar-cli/boot-files
    boot: ["i18n", "axios"],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      ...projectconfig.build,
      vueRouterMode: "hash", // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://v1.quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v1.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */) {},
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 7788,
      open: true, // opens browser window automatically
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: "material-icons", // Quasar icon set
      lang: "en-us", // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: "auto",

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [],
    },

    // animations: 'all', // --- includes all animations
    // https://v1.quasar.dev/options/animations
    animations: [],

    // https://v1.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://v1.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: `Quasar App`,
        short_name: `Quasar App`,
        description: `xiaoye-project`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "xiaoye-project",
      },

      // More info: https://v1.quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  };
};
