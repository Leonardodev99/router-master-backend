import Sequelize, { Model } from "sequelize";

export default class Message extends Model {

  static init(sequelize) {
      super.init(
        {
          sender_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          recipient_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          text: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
        },
        {
          sequelize,
          modelName: 'Message',
          tableName: 'messages',
        }
      );
      return this;

};
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
    this.belongsTo(models.User, { foreignKey: 'recipient_id', as: 'recipient' });
  };


}





