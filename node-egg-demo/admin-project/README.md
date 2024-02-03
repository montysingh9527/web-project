# Vue 3 + Vite + Quasar

#### 说明文档

##### job脚本

```
vite-dd：启动项目（完整）
vite-bd：项目打包 (完整)
inner-html：复写index.html内容,配置项替换。 替代createHtmlPlugin插件
vite-dev：启动项目（不包含 inner_html.js 脚本）
vite-build: 项目打包（不包含 inner_html.js 脚本）
```

##### 文件

```
config：配置文件
job：脚本
    inner_html.js       // 复写index.html替换变量。插入script脚本
    test.js             // 无用文件（用于插入script脚本测试）

```
