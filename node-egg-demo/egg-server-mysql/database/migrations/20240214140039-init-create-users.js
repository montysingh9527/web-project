"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("--111---queryInterface--logs---");
    const { STRING } = Sequelize;
    // 新增字段
    await queryInterface.addColumn("users", "avatar", {
      allowNull: true,
      type: STRING,
      defaultValue: "../public/img/user.jpg",
      comment: "头像",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
