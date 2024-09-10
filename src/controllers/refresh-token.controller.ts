import { Request, Response } from 'express';
require('dotenv').config();

import { EHttpStatus } from '~/constants/enum';
import { TResponseApi } from '~/constants/type';
import { exceptionApiResponse } from '~/exceptions';
import { getUserService } from '~/services/users';
import { decodeToken, generateToken } from '~/utils/authMethod';

export const refreshTokenController = async (req: Request, res: Response) => {
  const rtkOld = req.body.rtk;
  const atkOld = req.headers.authorization?.split(' ')?.[1];
  let response: TResponseApi;

  try {
    if (!atkOld) {
      response = exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED });
    } else {
      if (!rtkOld) {
        response = exceptionApiResponse({ httpStatus: EHttpStatus.BAD_REQUEST, message: `Bad reques: rtk` });
      } else {
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '';
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '';
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';
        const atkDecoded = decodeToken(atkOld, accessTokenSecret, true);
        const rtkDecoded = decodeToken(rtkOld, refreshTokenSecret, true);

        if (!atkDecoded || !rtkDecoded || (!!rtkDecoded.exp && rtkDecoded.exp * 1000 < new Date().getTime())) {
          response = exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED });
        } else {
          const username = atkDecoded?.payload.username;
          const user = await getUserService(username);
          const dataForAccessToken = {
            username: user.username,
            id: user.id
          };
          if (!user) {
            response = exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED });
          } else {
            const atk = generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
            const rtk = generateToken(dataForAccessToken, refreshTokenSecret, refreshTokenLife);
            if (!atk || !rtk) {
              response = exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED });
            } else {
              response = exceptionApiResponse({ httpStatus: EHttpStatus.SUCCESS, data: { user: dataForAccessToken, atk, rtk } });
            }
          }
        }
      }
    }
  } catch (error) {
    response = exceptionApiResponse({ httpStatus: EHttpStatus.SERVER_ERROR });
  }

  return res.status(response?.httpStatus).json(response);
};
