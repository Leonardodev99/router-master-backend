import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';
import User from '../models/User';
import Photo from "../models/Photo";

const models = [User, Photo];


  this.connection = new Sequelize(databaseConfig);
  models.forEach((model) => model.init(this.connection));
  models.forEach((model) => {
    if (model.associate) {
      model.associate(this.connection.models);
    }
  });



