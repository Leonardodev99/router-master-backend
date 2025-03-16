import Sequelize, { Model } from 'sequelize';

class Walk extends Model {
  static init(sequelize) {
    super.init(
      {
        origin: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        destination: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        transport_way: {
          type: Sequelize.ENUM('byFoot', 'car', 'motobike', 'bike'),
          defaultValue: 'byFoot',
        },
        distance: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'walks',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Walk;
