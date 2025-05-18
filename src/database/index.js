import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';
import User from '../models/User';
import Photo from "../models/Photo";
import Walk from "../models/Walk";
import Contact from "../models/Contact";
import Message from "../models/Message"

const models = [User, Photo, Walk, Contact, Message];


  this.connection = new Sequelize(databaseConfig);
  models.forEach((model) => model.init(this.connection));
  models.forEach((model) => {
    if (model.associate) {
      model.associate(this.connection.models);
    }
  });



