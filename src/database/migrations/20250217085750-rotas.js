'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('caminhadas', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
         },
        origin: {
          type: Sequelize.STRING,
          allowNull: false
        },
        destination: {
          type: Sequelize.STRING,
          allowNull: false
        },
        transport_way: {
          type: Sequelize.ENUM('byFoot', 'car', 'motobike', 'bike'),
          defaultValue: 'byFoot'
        },
        distance: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
      });

  },

  async down (queryInterface) {

      await queryInterface.dropTable('caminhadas');

  }
};
