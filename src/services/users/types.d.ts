import { TAttributesDefault } from '~/constants/type';

export type TUsersAttributes = TAttributesDefault & TUserBodyRequest;

export type TSearchAllUsersParams = any;

export type TUserCreateRequest = TUserUpdateBody & { password: string };

export type TUserUpdateBody = { email: string; fullName: string; username: string };
