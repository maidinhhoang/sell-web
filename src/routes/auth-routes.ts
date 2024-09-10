import { Router } from 'express';

import { loginController } from '~/controllers/auth-login.contoller';
import { refreshTokenController } from '~/controllers/refresh-token.controller';
import { registerUser } from '~/controllers/register-user.controller';

const genPathname = (path: string) => `/auth/${path}`;

const authRoutes = (router: Router) => {
  router.post(genPathname('register'), registerUser);
  router.post(genPathname('login'), loginController);
  router.post(genPathname('refresh-token'), refreshTokenController);
};

export default authRoutes;
