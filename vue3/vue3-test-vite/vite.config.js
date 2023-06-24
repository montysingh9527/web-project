import path from 'path'
// import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

// import type { UserConfig, ConfigEnv } from 'vite';

// console.log("====import==333==", import.meta);
// console.log(process)
// console.log("====process===", process.cwd());

const CWD = process.cwd()

const prefix = `monaco-editor/esm/vs`

let devpro = 'local-test' // 开发环境
devpro = 'local-pro' // 生产环境

let devtest = {
	'local-test': 'http://localhost:8000', // 开发环境域名
	'local-pro': 'http://localhost:8000' // 生产环境域名
}

// 环境变量
// const BASE_ENV_CONFIG = loadEnv('', CWD);
// const DEV_ENV_CONFIG = loadEnv('development', CWD);
// const PROD_ENV_CONFIG = loadEnv('production', CWD);

const __APP_INFO__ = {
	pkg,
	lastBuildTime: new Date().getTime()
}

// https://vitejs.dev/config/
// export default ({ command, mode }: ConfigEnv): UserConfig => {
export default defineConfig(({ mode, command }) => {
	console.log('====mode, command====', mode, command)

	// 环境变量  读取.env.development 中配置
	const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD)

	const isBuild = command === 'build'
	return {
		base: VITE_BASE_URL,
		root: mode === 'development' ? '' : '',
		// 挂载到Window对象上
		define: {
			BASE_URL: JSON.stringify(devtest[devpro]), // 设置请求url, 在.js中直接使用 BASE_URL
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
		plugins: [
			vue(),
			// viteSvgIcons({
			//   // 指定需要缓存的图标文件夹
			//   iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
			//   // 指定symbolId格式
			//   symbolId: 'icon-[name]',
			// }),
			createHtmlPlugin({
				minify: true,
				/**
				 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
				 * @default src/main.ts
				 */
				// entry: 'src/main.ts',
				/**
				 * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
				 * @default index.html
				 */
				// template: 'public/index.html',
				/**
				 * 需要注入 index.html ejs 模版的数据
				 */
				inject: {
				  data: {
					title: 'index',
					// injectScript: `<script src="./inject.js"></script>`,
					initDate: new Date().toLocaleString(),
					title_mate: "后台管理-系统"
				  },
				},
			  }),
		],
		resolve: {
			alias: [
				// {
				//   find: 'vue-i18n',
				//   replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
				// },
				{
					find: '@',
					replacement: path.resolve(__dirname, './src')
				}
			]
		},
		//   base: "/test/", //打包路径
		build: {
			outDir: 'test', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
			// minify: false, // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
			// manifest: false, // 是否产出maifest.json
			// sourcemap: false, // 是否产出soucemap.json
			// cssTarget: 'chrome79',
			cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
			sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
			target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016' 'es2017'等
			chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
			assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
			minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大, 使用esbuild将使用esbuild里面的配置。
			terserOptions: {
				compress: {
					// drop_console: true, //移除所有console相关代码, 与 pure_funcs[]配置一个即可
					drop_debugger: true, // 生产环境去除debugger
					pure_funcs: ['console.log', 'console.info'] //配置移除指定的指令，如console.log,alert等
				},
				format: {
					comments: false //删除注释
				}
			},
			// extractComments: false,//是否将注释剥离到单独的文件中
			rollupOptions: {
				input: {
					main: path.resolve(__dirname, 'index.html'),
					preview: path.resolve(__dirname, 'preview/index.html')
				},
				output: {
					manualChunks: {
						jsonWorker: [`${prefix}/language/json/json.worker`],
						cssWorker: [`${prefix}/language/css/css.worker`],
						htmlWorker: [`${prefix}/language/html/html.worker`],
						tsWorker: [`${prefix}/language/typescript/ts.worker`],
						editorWorker: [`${prefix}/editor/editor.worker`]
					}
				}
			}
		},
		// esbuild: {
		// 	pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		// 	supported: {
		// 		// https://github.com/vitejs/vite/pull/8665
		// 		'top-level-await': true
		// 	}
		// },

		// 设置代理
		server: {
			host: '0.0.0.0', // 默认是 localhost
			port: 4000, //启动端口
			open: true, // 浏览器自动打开
			https: false, // 是否开启 https
			proxy: {
				'/api': {
					target: 'http://v.juhe.cn',
					changeOrigin: true, // 是否允许跨域
					rewrite: (path) => path.replace('^/api/', '') // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
				},
				'/r': {
					target: 'http://ofres.truebelieve.cn/', //代理网址
					changeOrigin: true,
					ws: true,
					rewrite: (path) => path.replace(/^\/r/, '')
				}
			}
		}
	}
})
