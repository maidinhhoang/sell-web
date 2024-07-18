import express, { Express } from 'express';
import { registerUser } from '~/controllers/register-user.controller';

const router = express.Router();

const initRoutes = (app: Express) => {
  router.post('/register', registerUser);

  return app.use('/api', router);
};

export default initRoutes;
