module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('walks', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Nome da tabela referenciada
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('walks', 'user_id');
  },
};
