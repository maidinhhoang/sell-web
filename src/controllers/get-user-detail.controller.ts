import { Request, Response } from 'express';

import { EHttpStatus } from '~/constants/enum';
import { TResponseApi } from '~/constants/type';
import { exceptionApiResponse } from '~/exceptions';
import { getUserById } from '~/services/users';

export const getUserDetail = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  let response: TResponseApi;
  try {
    const user = await getUserById(userId);
    if (!user) {
      response = exceptionApiResponse({ httpStatus: EHttpStatus.SERVER_ERROR, message: 'User not found' });
    } else {
      response = exceptionApiResponse({ httpStatus: EHttpStatus.SUCCESS, data: user });
    }
  } catch (error) {
    response = exceptionApiResponse({ httpStatus: EHttpStatus.SERVER_ERROR });
  }
  return res.status(response?.httpStatus).json(response);
};
