"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER, // 类型
        allowNull: false, // 不允许为空 null
        autoIncrement: true, // 如果主键是自增的话
        primaryKey: true, // 指定它是主键
        comment: "唯一值id",  // 添加注释，描述字段的用途
      },
      userName: {
        type: Sequelize.DataTypes.STRING, // 字符串
        allowNull: false,
        unique: true,
        comment: "用户名",
        validate: {
          len: [6, 30],  // 验证器 字符串长度必须在 6 到 30 之间
        },
      },
      nickName: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: null,
        comment: "昵称",
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        comment: "密码",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  },
};
