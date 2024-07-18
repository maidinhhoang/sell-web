export enum EHttpStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAIABLE = 503
}

export enum EErrorCode {
  SUCCESS = 0,
  BAD_REQUEST = 1,
  SERVER_ERROR = 2,
  NOT_FOUND = 3
}

export enum ECodeUserTypes {
  GUEST = 'GUEST',
  MERCHANT = 'MERCHANT'
}
