import Sequelize, { Model } from "sequelize";

export default class User extends Model {
  static init(sequelize) {
    super.init({
      username: Sequelize.STRING,
      phone: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING
    }, {
      sequelize,
    });
    return this;
  }
}
