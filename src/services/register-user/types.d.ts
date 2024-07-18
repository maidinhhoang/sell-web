import { TAttributesDefault } from '~/constants/type';

export type TRegisterUserAttributes = TRegisterUserBodyRequest & TAttributesDefault;

export type TRegisterUserBodyRequest = {
  fullName: string;
  userName: string;
  password: string;
  phoneNumber: string;
  address: string;
  userType: ECodeUserTypes;
};
