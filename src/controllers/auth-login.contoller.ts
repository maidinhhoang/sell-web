import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
require('dotenv').config();

import { EHttpStatus } from '~/constants/enum';
import { TResponseApi } from '~/constants/type';
import { exceptionApiResponse } from '~/exceptions';
import { getUserService } from '~/services/users';
import { generateToken } from '~/utils/authMethod';

export const loginController = async (req: Request, res: Response) => {
  const body = req.body;
  let response: TResponseApi;
  const fieldRequired = ['password', 'username'];

  try {
    if (body.password && body.username) {
      const user = await getUserService(body.username);

      if (!!user) {
        const isPasswordValid = bcryptjs.compareSync(body.password, user.password);
        if (!isPasswordValid) {
          response = exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED, message: 'Incorrect password' });
        } else {
          const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '';
          const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';
          const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '';
          const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';
          const dataForAccessToken = {
            username: user.username,
            id: user.id
          };
          const atk = generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
          const rtk = generateToken(dataForAccessToken, refreshTokenSecret, refreshTokenLife);
          if (!atk || !rtk) {
            response = exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED, message: 'Login failed. Please try again.' });
          } else {
            response = exceptionApiResponse({ httpStatus: EHttpStatus.SUCCESS, data: { user: dataForAccessToken, atk, rtk } });
          }
        }
      } else {
        response = exceptionApiResponse({ httpStatus: EHttpStatus.NOT_FOUND, message: 'username does not exist' });
      }
    } else {
      const keyEmptyValue = fieldRequired.filter(
        (item) => !Object.keys(Object.fromEntries(Object.entries(body).filter(([_key, value]) => !!value))).includes(item)
      );
      response = exceptionApiResponse({ httpStatus: EHttpStatus.BAD_REQUEST, message: `Bad reques: ${keyEmptyValue.join(', ')}` });
    }
  } catch (error: any) {
    response = exceptionApiResponse({ httpStatus: EHttpStatus.SERVER_ERROR });
  }
  return res.status(response?.httpStatus).json(response);
};
