import { EErrorCode, EHttpStatus } from '~/constants/enum';
import { TResponseApi } from '~/constants/type';

export const exceptionApiResponse = ({ httpStatus, data, errorCode, message }: TExceptionApiResponseParams): TResponseApi => {
  switch (httpStatus) {
    case EHttpStatus.BAD_REQUEST:
      return {
        httpStatus,
        errorCode: errorCode || EErrorCode.BAD_REQUEST,
        message: message || 'Bad request'
      };
    case EHttpStatus.NOT_FOUND:
      return {
        httpStatus,
        errorCode: errorCode || EErrorCode.NOT_FOUND,
        message: message || 'Not found'
      };
    case EHttpStatus.SERVER_ERROR:
      return {
        httpStatus,
        errorCode: errorCode || EErrorCode.SERVER_ERROR,
        message: message || 'Internal server error'
      };

    default:
      return {
        httpStatus,
        errorCode: errorCode || EErrorCode.SUCCESS,
        message: message || 'Success',
        data
      };
  }
};

type TExceptionApiResponseParams = {
  httpStatus: EHttpStatus;
  message?: string;
  errorCode?: EErrorCode;
  data?: any;
};
