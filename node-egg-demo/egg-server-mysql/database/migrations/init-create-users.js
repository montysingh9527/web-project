/*
 * @Description:
 * @Date: 2024-02-14 00:58:17
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\database\migrations\init-create-users.js
 */
"use strict";
/** @type {import('sequelize-cli').Migration} */
console.log("-Migration--logs---");

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  async up(queryInterface, Sequelize) {
    console.log("-222--logs-Sequelize--");
    const { INTEGER, STRING} = Sequelize;
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        type: INTEGER, // 类型
        allowNull: false, // 不允许为空 null
        autoIncrement: true, // 如果主键是自增的话
        primaryKey: true, // 指定它是主键
        comment: "唯一值id", // 添加注释，描述字段的用途
      },
      userName: {
        type: STRING, // 字符串
        allowNull: false,
        unique: true,
        comment: "用户名",
        validate: {
          len: [6, 30], // 验证器 字符串长度必须在 6 到 30 之间
        },
      },
      nickName: {
        type: STRING,
        defaultValue: null,
        comment: "昵称",
      },
      sex: {
        type: STRING,
        defaultValue: "1",
        comment: "性别（0代表女 1代表男）",
      },
      password: {
        allowNull: false,
        type: STRING,
        comment: "密码",
      },
    });
    // 修改字段属性
    // queryInterface.changeColumn('users', 'user_id', {
    //     type: 'FOREIGN KEY',
    //     references: {
    //         model: 'users',
    //         field: 'id'
    //     }
    // });
    // 新增字段
    await queryInterface.addColumn(
      "users",
      "isDelete",
      {
        type: STRING,
        defaultValue: "0",
        comment: "删除标志（0代表存在 1代表删除）",
      }
      // { transaction: t }
    );
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  async down(queryInterface, Sequelize) {
    console.log("---logs-queryInterface--", queryInterface);
    await queryInterface.dropTable("users");
  },
};
