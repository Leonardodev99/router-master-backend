import { Model } from 'sequelize';

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'contacts',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' }); // Quem adicionou o contato
    this.belongsTo(models.User, { foreignKey: 'contact_id', as: 'contact' }); // O contato adicionado
  }
}

export default Contact;
