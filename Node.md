<!--
 * @Description: 
 * @Date: 2023-09-07 20:45:23
 * @FilePath: \web-project\Node.md
-->
##### Node工具

```
nodemon: 是一个命令行工具,用以辅助项目开发,每次修改文件都会重新执行该文件。
npm install nodemon -g
```

##### 一. nvm 之Node 版本管理工具
                
1. [win下载链接](https://github.com/coreybutler/nvm-windows/releases/tag/1.1.11)  下载: nvm-setup.zip **安装完成后配置环境变量**
2. 查看安装成功: nvm -v
3. 查看当前使用版本: nvm list  / nvm ls
4. 安装node版本: nvm install 14
5. 切换node版本: nvm use 14
6. 卸载node版本: nvm uninstall 14


##### 二. Node bug处理
1. [npm install常见报错以及问题详解](https://www.jb51.net/article/274144.htm)

```
清除npm 的缓存: npm cache clean --force
清除npm 的缓存:npm cache verify

查看npm信息: npm config list

安装cnpm: npm install -g cnpm --registry=http://registry.npmmirror.com

查看cnpm安装: cnpm -v
cnpm安装包: cnpm install XXX
```



##### 三. Node后端
1. MongoDB数据库: 
    1.1 [mongoose官方文档](https://mongoosejs.com/docs/queries.html) / [中文文档1](https://mongodb.net.cn/manual/crud/) / [中文文档2](https://docs.mongoing.com/mongodb-crud-operations/insert-documents)
    1.2 可视化工具:  ([MongoDB Compass](https://www.mongodb.com/try/download/compass) / [NoSQLBooster](https://nosqlbooster.com/downloads?spm=a2c6h.12873639.article-detail.11.17cb125aIgDSvr))
    1.3 [mongoose分页插件](https://www.npmjs.com/package/mongoose-paginate-v2): mongoose-paginate
2. MySQL数据库:
    2.1 mysql插件: [sequelize](https://github.com/demopark/sequelize-docs-Zh-CN)  

3. Egg框架:
    3.1 egg文档: [官方文档](https://www.eggjs.org/zh-CN/intro/quickstart#%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96)  / [egg团队文档](https://www.yuque.com/egg/nodejs/gkk3r9)
