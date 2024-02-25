/*
 * @Description: 
 * @Date: 2024-02-14 22:14:47
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\database\migrations\20240214141447-init-create-users.js
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        // 新增字段
        await queryInterface.addColumn(
          "users",
          "isDelete",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "0",
            comment: "删除标志（0代表存在 1代表删除）",
          }
          // { transaction: t }
        );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
