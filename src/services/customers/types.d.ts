import { TAttributesDefault } from '~/constants/type';

export type TCustomerAttributes = TAttributesDefault & TUserBodyRequest;

export type TCustomerCreateRequest = TCustomerUpdateBody;

export type TCustomerUpdateBody = { userId: string; phoneNumber: string; address: string; createdBy: string; updatedBy: string };
