
=========插件======
```
设置编辑器语言：  Chinese(Simplified)(简体中文)
以localhost打开单文件： Live Server
自动重命名配对的HTML标记：Auto Rename Tag
npm Intellisense - 用于在 import 语句中自动填充 npm 模块
Path Intellisense - 自动填充文件名
Prettier - 格式化您的 JavaScript / TypeScript / CSS
代码格式化：ESlint
vue单文件提示： Vetur
文件管理插件: project-manager
Markdown： Markdown Preview Enhanced
git操作： GitLens
vue格式化：Vue Language Features (Volar)
CSS格式化：Prettier - Code formatter
文件夹颜色：Output Colorizer
CSS格式化：Color Highlight

```

##### vsCode 中 settings.json
```
{
  "eslint.enable": true,
  "eslint.run": "onType",
  "eslint.options": {
    "extensions": [".js", ".vue", ".jsx", ".tsx"]
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "workbench.colorTheme": "Monokai",
  "editor.fontSize": 18,
  "volar.codeLens.references": false,
  "editor.rename.enablePreview": false,
  "workbench.editor.enablePreview": false,
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "window.zoomLevel": -1,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "vscode.debug-auto-launch"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "editor.inlayHints.enabled": false,
  "workbench.editor.untitled.hint": "hidden",
  // "editor.fontLigatures": true,
  // "open-in-browser.default": "chrome",
  // "view-in-browser.customBrowser": "chrome",
  // "workbench.sideBar.location": "left",
  // "workbench.editor.enablePreview": false,
  // "explorer.confirmDelete": false,
  // "git.ignoreMissingGitWarning": true,
  // "security.workspace.trust.startupPrompt": "never",
  // "editor.defaultFormatter": "esbenp.prettier-vscode", // 保存的时候使用prettier进行格式化
  // "editor.formatOnSave": true, // 保存代码自动格式化
  // "prettier.semi": false, // 格式化去除分号(;)
  // "prettier.singleQuote": true, // 格式化使用单引号
  // 当按tab键的时候，会自动提示
  // "emmet.triggerExpansionOnTab": true,
  // "emmet.showAbbreviationSuggestions": true,
  // jsx提示
  // "emmet.includeLanguages": {
  //   "javascript": "javascriptreact"
  // },
  // "javascript.updateImportsOnFileMove.enabled": "always"
}


================配置二========================
{
  "workbench.startupEditor": "newUntitledFile",
  "workbench.iconTheme": "vscode-icons",
  //创建文件的用户名
  "fileheader.Author": "Sun Rising",
  //更新文件的用户名
  "fileheader.LastModifiedBy": "Sun Rising",
  //文件头注释模板
  "fileheader.tpl": "/**\r\n * @Author: {author} \r\n * @Date: {createTime} \r\n * @Last Modified by: {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n * @Description: \r\n */\r\n",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  //html属性排序
  "attrsSorter.order": ["data-.+", "aria-.+", "class"],
  //使用js-beautify-html格式化vue
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  //格式化参数
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      //属性不换行
      "wrap_attributes": "auto"
    },
    "prettyhtml": {
      "printWidth": 500,
      "singleQuote": false,
      "wrapAttributes": true,
      "sortAttributes": false
    }
  },
  // 启用保存时自动修复
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "extensions": [".js", ".vue", ".jsx"]
  },
  //一组语言标识符指定要验证的文件
  "eslint.validate": ["javascript", "javascriptreact", "vue", "vue-html"],
  //高亮注释关键字
  "todohighlight.keywords": [
    {
      "text": "@Author",
      "color": "#000",
      "backgroundColor": "#808695"
    },
    {
      "text": "@Date",
      "color": "#000",
      "backgroundColor": "#c5c8ce"
    },
    {
      "text": "@Last Modified by",
      "color": "#000",
      "backgroundColor": "#dcdee2"
    },
    {
      "text": "@Last Modified time",
      "color": "#000",
      "backgroundColor": "#e8eaec"
    },
    {
      "text": "@Description",
      "color": "#000",
      "backgroundColor": "#f8f8f9"
    }
  ],
  //注释高亮默认注释
  "todohighlight.defaultStyle": {
    "fontWeight": "5000",
    "color": "#000",
    "backgroundColor": "#0dbc79",
    "cursor": "pointer",
    "border": "0px solid #eee",
    "borderRadius": "0px",
    "letterSpacing ": "2px",
    "isWholeLine": false
  },
  //是否启用注释高亮
  "todohighlight.isEnable": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true,
    "**/build": true
  },
  "editor.fontSize": 16,
  //markdown样式
  "markdown-preview-enhanced.codeBlockTheme": "atom-dark.css",
  //markdown字体
  "markdown.preview.fontFamily": "\"Microsoft YaHei\",-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
  //提示单词
  "cSpell.allowCompoundWords": true,
  //是否开启单词检查
  "cSpell.enabled": true,
  //添加单词字典
  "cSpell.userWords": ["Vetur", "vuex"],
  // 保存的时候format
  // "editor.formatOnSave": true,
  // tab的空格
  "editor.tabSize": 2,
  // vetur格式化的时候tab距离
  "vetur.format.options.tabSize": 2
}
```

##### vsCode 设置代码片段
```
===============temp3========
{
	"Vue3—基础模板": {
		"prefix": "temp3",
		"body": [
			"<template>",
			"<div class=\"container\">主页</div>",
			"</template>\n",
			"<script>",
			"import { defineComponent, reactive, toRefs, ref, onMounted } from \"vue\";",
			"export default defineComponent({",
			"name:'PageIndex',",
			"components:{},",
			"props:{},",
			"setup(props) {",
			"const states = reactive({ \n",
			"})",
			"    return { ...toRefs(states), }",
			"}",
			"});",
			"</script>\n",
			"<style scoped lang=\"less\">\n",
			"</style>",
		],
		"description": "Vue3—基础模板"
	}
}

======logss=======
{
	"Print to console": {
		"scope": "javascript,typescript",
		"prefix": "logss",
		"body": [
			"console.log('---logs---',$1);",
			"$2"
		],
		"description": "console快捷键"
	}
}

==============Vue3—基础模板========
{
	"Vue3—基础模板": {
		"prefix": "tempsetup",
		"body": [
			"<template>",
			"<div class=\"container\">主页</div>",
			"</template>\n",
			"<script setup>\n",
			"</script>\n",
			"<style scoped lang=\"scss\">\n",
			"</style>",
			"$0"
		],
		"description": "Vue3—setup——基础模板"
	}
}
```

