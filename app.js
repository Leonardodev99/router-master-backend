import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import photoRoutes from './src/routes/photoRoutes';
import walkRoutes from './src/routes/walkRoutes';
import contactRoutes from './src/routes/contactRoutes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // Servindo a pasta "uploads" como pública
    this.app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/photos/', photoRoutes);
    this.app.use('/walks/', walkRoutes);
    this.app.use('/contacts/', contactRoutes);

  }
}

export default new App().app;
