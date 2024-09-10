import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

import { EHttpStatus } from '~/constants/enum';
import { exceptionApiResponse } from '~/exceptions';
import { countUsers } from '~/services/users';

export const generateToken = (payload: any, secretSignature: string, tokenLife: string) => {
  try {
    return jwt.sign(
      {
        payload
      },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife
      }
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};

export const decodeToken = (token: string, secretKey: string, ignoreExp?: boolean): any => {
  try {
    return jwt.verify(token, secretKey, { ignoreExpiration: ignoreExp });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};

export const isAuth = async (req: Request, res: Response, next: any) => {
  const accessTokenFromHeader = req.headers.authorization?.split(' ')?.[1];
  if (!accessTokenFromHeader) {
    return res.status(EHttpStatus.UNAUTHORIZED).send(exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED }));
  }
  const atkSecret = process.env.ACCESS_TOKEN_SECRET || '';
  const tokenVerified = decodeToken(accessTokenFromHeader, atkSecret);
  if (!tokenVerified) {
    return res.status(EHttpStatus.UNAUTHORIZED).send(exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED }));
  }
  const userExisted = await countUsers(tokenVerified.payload.username);
  if (!userExisted) {
    return res.status(EHttpStatus.UNAUTHORIZED).send(exceptionApiResponse({ httpStatus: EHttpStatus.UNAUTHORIZED }));
  }
  return next();
};
