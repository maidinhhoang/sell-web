import { TAttributesDefault } from '~/constants/type';

export type TUsersAttributes = TAttributesDefault & TUserBodyRequest;

export type TSearchAllUsersParams = any;

export type TUserCreateRequest = TUserUpdateBody & { password: string };

export type TUserUpdateBody = { fullName: string; username: string };
