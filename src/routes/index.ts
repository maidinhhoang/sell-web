import express, { Express } from 'express';
import authRoutes from './auth-routes';
import usersRoutes from './users-routes';

const router = express.Router();

const initRoutes = (app: Express) => {
  authRoutes(router);
  usersRoutes(router);
  return app.use('/api', router);
};

export default initRoutes;
