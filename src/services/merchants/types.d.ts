import { TAttributesDefault } from '~/constants/type';

export type TMerchantAttributes = TAttributesDefault & TUserBodyRequest;

export type TMerchantCreateRequest = TMerchantUpdateBody;

export type TMerchantUpdateBody = { userId: string; phoneNumber: string; address: string; createdBy: string; updatedBy: string };
