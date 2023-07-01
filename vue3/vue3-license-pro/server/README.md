#### node.js -egg.js 项目

###### 跨域

```
安装跨域插件： npm i egg-cors --save

在config-plugin.js配置
  cors: {
    enable: true,
    package: "egg-cors",
  },
```
###### 修改启动端口
```
在package.json中dev命令后面配置
"dev": "egg-bin dev --port 8080",
```