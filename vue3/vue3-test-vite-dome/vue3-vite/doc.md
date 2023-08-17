#### 说明文档

##### 脚本
```
vite-ddd： 启动项目（完整）
vite-build：项目打包
html-inject：复写index.html内容,配置项替换。 启用createHtmlPlugin插件
vite-dev：启动项目（不包含 html-inject脚本）
```


##### 文件
```
config：配置文件
job：脚本
    index-html.js       // 复写index.html替换变量。插入script脚本
    test.js             // 无用文件（用于插入script脚本测试）
vue3-vite：项目
```
