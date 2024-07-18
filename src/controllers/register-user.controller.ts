import { Request, Response } from 'express';

import { EHttpStatus } from '~/constants/enum';
import { TResponseApi } from '~/constants/type';
import { exceptionApiResponse } from '~/exceptions';
import { registerUserService } from '~/services/register-user';
import { TRegisterUserBodyRequest } from '~/services/register-user/types';

export const registerUser = async (req: Request<{}, {}, TRegisterUserBodyRequest>, res: Response) => {
  const body = req.body;
  let response: TResponseApi;
  try {
    if (body.address && body.fullName && body.password && body.phoneNumber && body.userName && body.userType) {
      const user = await registerUserService(req.body);
      response = exceptionApiResponse({ httpStatus: EHttpStatus.SUCCESS, data: user });
    }
    const keyEmptyValue = Object.keys(Object.fromEntries(Object.entries(body).filter(([_key, value]) => !value)));
    response = exceptionApiResponse({ httpStatus: EHttpStatus.BAD_REQUEST, message: `Bad reques: ${keyEmptyValue.join(', ')}` });
  } catch (error: any) {
    response = exceptionApiResponse({ httpStatus: error?.httpStatus });
  }
  return res.status(response?.httpStatus).json(response);
};
