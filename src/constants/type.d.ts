import { Request } from 'express';
import { EErrorCode, EHttpStatus } from './enum';

export type TResponseApi = {
  errorCode: EErrorCode;
  message: string;
  httpStatus: EHttpStatus;
  data?: any;
};

export type TAttributesDefault = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
