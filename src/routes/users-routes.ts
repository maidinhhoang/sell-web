import { Router } from 'express';

import { getUserDetail } from '~/controllers/get-user-detail.controller';
import { isAuth } from '~/utils/authMethod';

const genPathname = (path: string) => `/users/${path}`;

const usersRoutes = (router: Router) => {
  router.get(genPathname(':userId'), isAuth, getUserDetail);
};

export default usersRoutes;
