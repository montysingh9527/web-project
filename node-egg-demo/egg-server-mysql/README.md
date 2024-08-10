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

##### 数据迁移

```
User.sync({alter: true}) // （慎用） 在程序运行时调用，把model跟数据表同步
https://sequelize.org/docs/v6/other-topics/migrations/
https://www.eggjs.org/zh-CN/tutorials/sequelize#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%95%B0%E6%8D%AE%E5%BA%93%E5%92%8C-migrations



第一次创建user表
执行: npx sequelize migration:generate --name=init-users
会在: sequelizemeta 表中创建一条数据

up 中是更新的操作，down 是回退的操作。

npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all

```

##### 生成 Sequelize配置 文件  
> npx sequelize-cli init
- config.json  配置文件
- migrations  迁移文件,可以创建新表、添加或删除列、修改列的属性等
- seeders  向数据库中插入初始数据或测试数据

##### migrations 创建新表、添加或删除列、修改列 
- 生成创建文件: 会在 SequelizeMeta 表中记录这个迁移文件的名称
> npx sequelize-cli migration:generate --name demo-user
- 执行迁移: 运行所有未执行的迁移
> npx sequelize-cli db:migrate
- 回滚迁移
> 撤销最后一次迁移, 会执行 down 方法，撤销最后一个迁移文件中的更改: npx sequelize-cli db:migrate:undo
> 撤销所有的迁移 : npx sequelize-cli db:migrate:undo:all

```
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

##### seeders 创建数据 表中插入一些数据 
- 生成创建文件
> 创建: npx sequelize-cli seed:generate --name demo-user
- 执行创建
> 执行Seeder所有创建脚本: npx sequelize-cli db:seed:all 
> 执行Seeder单个创建脚本: npx sequelize-cli db:seed --seed demo-user.js
- 撤销创建的数据
> 撤销所有: npx sequelize-cli db:seed:undo:all
> 撤销单个: npx sequelize-cli db:seed:undo --seed demo-user.js
```
module.exports = {
  //  up 方法中插入你想要的初始数据
  up: (queryInterface, Sequelize) => {
    // 清空表  将删除 Users 表中的所有记录。第二个参数 null 表示不使用筛选条件，第三个参数 {} 是一个选项对象，通常不需要配置。
    await queryInterface.bulkDelete('Users', null, {});
    // 插入数据
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  // down 方法中，定义如何撤销这些数据（通常是删除这些数据）
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
```


#### 数据库查询

```
数据迁移: https://www.cnblogs.com/xiebenyin-/p/15520978.html
数据库查询: https://www.cnblogs.com/xiebenyin-/p/15490927.html
```

#### 查询语句

```
====== 新增数据
ctx.model.User.create({username: "张三",age: 20});

====== 查询数据  https://www.sequelize.cn/core-concepts/model-querying-finders
1. 查询所有数据
ctx.model.User.findAll();
2.查询指定字段的数据: attributes
ctx.model.User.findAll({attributes: ['id','username'], });
ctx.model.User.findAll({attributes: {
                include: [ [Sequelize.col('Author.label'), 'authorLabel'],],
                exclude: ['Author']   // 不起作用 },});
3.使用where查询
ctx.model.User.findAll({where: {"id": 2}});
4.对数据进行排序
ctx.model.User.findAll({order: [['id', 'ASC']]})

--- findByPk 使用提供的主键从表中仅获得一个条目
await Project.findByPk(123);

--- findOne 方法获得它找到的第一个条目
await Project.findOne({ where: { title: 'My Title' } });

--- findAndCountAll 方法是结合了 findAll 和 count 的便捷方法. 在处理与分页有关的查询时非常有用,在分页中,你想检索带有 limit 和 offset 的数据,但又需要知道与查询匹配的记录总数
const { count, rows } = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
});


=== 示例
async findAll(modelName){
    const option = {
        where:{
            title: {
            $like: `%Vue%`, // 模糊查询：查询文章标题中包含“Vue”的文章
            },
            view: {
            $between: [50, 100], // 查询查看次数在50到100之间的文章
            },
        }
    }
    const { count, rows } = await ctx.model[modelName].findAndCountAll(option);
    return { count, rows };
}

====== 修改数据
根据主键进行修改
const user = await this.ctx.model.User.findByPk(2);
user.update({"username": "秦二世","age": 10});

====== 删除数据
根据主键删除某个数据
const data = await this.ctx.model.User.findByPk(2);
    if (!data) {
      this.ctx.state = 404;
      return;
    }
    data.destroy();
    this.ctx.body = "删除成功";
```

###### 数据类型

```
STRING: 字符串类型，用于存储文本数据。
INTEGER: 整数类型。
DATE: 日期类型。
BOOLEAN: 布尔类型。
ARRAY: 数组类型，用于存储数组。 type: DataTypes.ARRAY(DataTypes.STRING)
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
defaultValue: 指定字段的默认值。 // defaultValue: 'default value', 时间类型:defaultValue: DataTypes.NOW,
primaryKey: 指定字段是否是主键。 // primaryKey: true
autoIncrement: 如果字段是整数类型，指定是否自动增长。// autoIncrement: true
unique: 指定字段的值是否必须是唯一的。// unique: true
validate: 用于指定验证规则，例如长度、格式等。 // validate: { len: [2, 10] // 字符串长度必须在 2 到 10 之间 }
comment: 添加注释，描述字段的用途。 // comment: 'This is a comment for the field'
references 和 referencesKey: 用于定义外键关系。 // references: { model: 'OtherModel', key: 'id'}
onDelete 和 onUpdate: 在设置外键时，用于指定删除和更新关联行的动作。// onDelete: 'CASCADE', onUpdate: 'CASCADE'
field: 指定字段在数据库中的实际名称，可以用于自定义字段名。  // field: 'custom_field_name'

```

###### 操作符
```
$and: {a: 5}           // AND (a = 5)
$or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
$gt: 6,                // > 6
$gte: 6,               // >= 6
$lt: 10,               // < 10
$lte: 10,              // <= 10
$ne: 20,               // != 20
$eq: 3,                // = 3
$not: true,            // IS NOT TRUE
$between: [6, 10],     // 在 6 - 10 之间
$notBetween: [11, 15], // 不再 11 - 15 之间
$in: [1, 2],           // 在数组 [1, 2] 里面
$notIn: [1, 2],        // 不在数组 [1, 2] 里面
$like: '%hat',         // LIKE '%hat'
$notLike: '%hat'       // NOT LIKE '%hat'
$like: { $any: ['cat', 'hat']}


Post.findAll({
  where: {
    authorId: {
        $in: [3,4,5]
    }
  }
});

---- 900 < rank < 1000
rank: {
    $or: {
      $lt: 1000,
      $gt: 900
    }
}

--------- $or
{
  $or: [
    {
      title: {
        $like: 'Boat%'
      }
    },
    {
      description: {
        $like: '%boat%'
      }
    }
  ]
}
```


#### MySql 增删改查
- 增加（Create）
> INSERT INTO users (username, email, created_at, updated_at)
VALUES ('john_doe', 'john@example.com', NOW(), NOW());

- 查询（Read）
```
查询所有: SELECT * FROM users;
查询username, email: SELECT username, email FROM users;
查询数据排序ORDER BY: SELECT * FROM users ORDER BY created_at DESC;

// 查询 users 表中 username 为 'john_doe' 的记录
SELECT * FROM users WHERE username = 'john_doe';

// 查询 users 表中 created_at 在特定日期之后的记录
SELECT * FROM users WHERE created_at > '2024-01-01';
```
- 修改（Update）
```
// 将 username 为 'john_doe' 的用户的电子邮件更新为 'john.doe@example.com'。
UPDATE users 
SET email = 'john.doe@example.com'
WHERE username = 'john_doe';

// 批量更新所有 created_at 在 2024-01-01 之前的记录的 status 为 'inactive'
UPDATE users
SET status = 'inactive'
WHERE created_at < '2024-01-01';
```
- 删除（Delete）
```
// 删除 username 为 'john_doe' 的记录。
DELETE FROM users
WHERE username = 'john_doe';

// 删除 created_at 在特定日期之前的所有记录
DELETE FROM users
WHERE created_at < '2024-01-01';
```
