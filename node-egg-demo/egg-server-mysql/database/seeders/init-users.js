'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      "username": "admin",
      "nickname": "admin",
      "sex": "1",
      "password": "e10adc3949ba59abbe56e057f20f883e", // 123456 加密后的密码
      "avatar": null,
      "email": null,
      "mobile": null,
      "isDelete": "0",
      "status": "1",
      "remark": "",
      "createdBy": 'admin',
      "createdAt": new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
