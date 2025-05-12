/*
 * @Description: 用户
 * @Date: 2024-03-07 22:06:41
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\database\migrations\init-users.js
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 创建表
  async up (queryInterface, Sequelize) {
    console.log("--Sequelize-users-");
    const { INTEGER, STRING, DATE, DataTypes } = Sequelize;
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
      username: {
        type: STRING(30), // 字符串
        allowNull: false,
        unique: true,
        comment: "用户名",
        validate: {
          len: [6, 30], // 验证器 字符串长度必须在 6 到 30 之间
        },
      },
      nickname: {
        type: STRING,
        defaultValue: null,
        comment: "昵称",
      },
      avatar: {
        allowNull: true,
        type: STRING,
        defaultValue: "/public/image/user.png",
        comment: "头像",
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
      email: {
        allowNull: true,
        type: STRING,
        comment: "邮箱",
      },
      mobile: {
        allowNull: true,
        type: STRING,
        comment: "手机号",
      },
      isDelete: {
        type: STRING,
        defaultValue: "0",
        comment: "删除标志（0代表存在 1代表删除）",
      },
      status: {
        type: STRING,
        defaultValue: "1",
        comment: "帐号状态（1正常 0停用）",
      },
      remark: {
        type: STRING,
        comment: "备注",
      },
      createdAt: {
        allowNull: true,
        type: DATE,
        comment: "创建时间",
        defaultValue: DataTypes.NOW,
      },
      createdBy: {
        allowNull: true,
        type: STRING,
        comment: "创建者",
      },
      updatedAt: {
        allowNull: true,
        type: DATE,
        comment: "更新时间",
        defaultValue: DataTypes.NOW,
      },
      updatedBy: {
        allowNull: true,
        type: STRING,
        comment: "更新者",
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
    // await queryInterface.addColumn(
    //   "users",
    //   "isDelete",
    //   {
    //     type: STRING,
    //     defaultValue: "0",
    //     comment: "删除标志（0代表存在 1代表删除）",
    //   }
    //   // { transaction: t }
    // );
  },

  // 删除表
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
