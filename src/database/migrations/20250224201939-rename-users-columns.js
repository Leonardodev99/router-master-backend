'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    await queryInterface.renameColumn('users', 'password', 'password_hash');

  },

  async down (queryInterface) {

      await queryInterface.renameColumn('users', 'password_hash', 'password');

  }
};
