'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 创建表
  async up (queryInterface, Sequelize) {
    console.log("--Sequelize-admin-");
    const { STRING, INTEGER, ARRAY, DATE, BOOLEAN, TEXT, DataTypes } = Sequelize;
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("admin", {
      id: {
        type: INTEGER, // 类型
        allowNull: false, // 不允许为空 null
        autoIncrement: true, // 如果主键是自增的话
        primaryKey: true, // 指定它是主键
        comment: "唯一值id", // 添加注释，描述字段的用途
      },
      username: {
        allowNull: false,
        unique: true,
        type: STRING(30),
        comment: "用户名",
        validate: {
          len: [6, 30], // 验证器 字符串长度必须在 6 到 30 之间
        },
      },
      password: {
        allowNull: false,
        type: STRING,
        comment: "密码",
      },
      isSuper: {
        type: STRING,
        defaultValue: "1",
        comment: "超级管理员(1超级管理员 2普通会员)",
      },
      roleId: {
        type: STRING,
        // defaultValue: [],
        comment: "角色ID",
      },
      email: {
        type: STRING,
        comment: "邮箱",
      },
      avatar: {
        type: STRING,
        defaultValue: "/public/image/user.png",
        comment: "头像",
      },
      mobile: {
        type: STRING,
        comment: "手机号",
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
        type: DATE,
        comment: "创建时间",
        defaultValue: DataTypes.NOW,
      },
      createdBy: {
        type: STRING,
        comment: "创建者",
      },
      updatedAt: {
        type: DATE,
        comment: "更新时间",
        defaultValue: DataTypes.NOW,
      },
      updatedBy: {
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
    await queryInterface.dropTable('admin');
  }
};
