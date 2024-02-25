<!--
 * @Description: 
 * @Date: 2023-12-27 14:28:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\README.md
-->

## egg 项目

> https://www.eggjs.org/zh-CN/tutorials/sequelize

#### egg3.0 项目创建

```
1 全局范围内安装: npm install egg-init@latest -g
2 项目目录，并运行以下命令：egg-init
```

#### 技术栈

```
MySql数据库: mysql2
MySql数据库的ORM: egg-sequelize  https://github.com/eggjs/egg-sequelize?tab=readme-ov-file#usage--configuration
解决跨域安全威胁csrf的防范: egg-cors
管理数据结构的变更: sequelize-cli   https://www.eggjs.org/zh-CN/tutorials/sequelize#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8C-migrations
```

###### 数据迁移
```
User.sync({alter: true}) // （慎用） 在程序运行时调用，把model跟数据表同步
https://sequelize.org/docs/v6/other-topics/migrations/
https://www.eggjs.org/zh-CN/tutorials/sequelize#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8C-migrations



第一次创建user表
npx sequelize migration:generate --name=init-users

up 中是更新的操作，down 是回退的操作。

npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all

```

##### 数据库查询
```
数据迁移: https://www.cnblogs.com/xiebenyin-/p/15520978.html
数据库查询: https://www.cnblogs.com/xiebenyin-/p/15490927.html
```

###### 数据类型

```
STRING: 字符串类型，用于存储文本数据。
INTEGER: 整数类型。
DATE: 日期类型。
BOOLEAN: 布尔类型。
ARRAY: 数组类型，用于存储数组。 DataTypes.ARRAY(DataTypes.STRING)
ENUM: 枚举类型，用于定义可能的值集合。  DataTypes.ENUM('value1', 'value2', ...)

UUID: UUID 类型。
UUIDV4: 生成基于随机数的 UUIDv4。
GEOMETRY: 存储几何数据。
CHAR: 固定长度的字符串类型。
TEXT: 用于存储较长的文本数据。
BIGINT: 大整数类型。
FLOAT: 浮点数类型。
DOUBLE: 双精度浮点数类型。
DECIMAL: 固定点数类型，用于存储精确的小数。
TIME: 时间类型。
DATEONLY: 仅日期类型，不包含时间。
JSONB: 存储二进制 JSON 数据，通常用于存储大型 JSON 数据。
JSON: 存储 JSON 数据。
```

###### 字段属性值

```
type: 指定字段的数据类型。例如： // type: DataTypes.STRING
allowNull: 指定字段是否允许为空。默认为 true。// allowNull: false
defaultValue: 指定字段的默认值。 // defaultValue: 'default value'
primaryKey: 指定字段是否是主键。 // primaryKey: true
autoIncrement: 如果字段是整数类型，指定是否自动增长。// autoIncrement: true
unique: 指定字段的值是否必须是唯一的。// unique: true
validate: 用于指定验证规则，例如长度、格式等。 // validate: { len: [2, 10] // 字符串长度必须在 2 到 10 之间 }
comment: 添加注释，描述字段的用途。 // comment: 'This is a comment for the field'
references 和 referencesKey: 用于定义外键关系。 // references: { model: 'OtherModel', key: 'id'}
onDelete 和 onUpdate: 在设置外键时，用于指定删除和更新关联行的动作。// onDelete: 'CASCADE', onUpdate: 'CASCADE'
field: 指定字段在数据库中的实际名称，可以用于自定义字段名。  // field: 'custom_field_name'

```
