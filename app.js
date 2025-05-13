import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import './src/database';

import express from 'express';
import cors from 'cors';


import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import photoRoutes from './src/routes/photoRoutes';
import walkRoutes from './src/routes/walkRoutes';
import contactRoutes from './src/routes/contactRoutes';
import passwordRecoveryRoutes from './src/routes/passwordRecoveryRoutes';


class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    const corsOptions = {
      origin: ['http://localhost:3002'],
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    this.app.use(cors(corsOptions));
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
    this.app.use('/password-recovery/', passwordRecoveryRoutes);

  }
}

export default new App().app;
