import { ECodeUserTypes, EHttpStatus } from '~/constants/enum';
import { countUsers, createUserService } from '../users';
import { TRegisterUserAttributes, TRegisterUserBodyRequest } from './types';
import { createCustomerService } from '../customers';

export const registerUserService = (body: TRegisterUserBodyRequest) => {
  return new Promise<TRegisterUserAttributes>(async (resolve, reject) => {
    const bodyUser = { fullName: body.fullName, username: body.userName, password: body.password };
    let user;
    try {
      const userCount = await countUsers(body.userName);
      if (!userCount) {
        user = await createUserService(bodyUser);
        const bodyUserDetail = {
          fullName: body.fullName,
          userId: user.id,
          phoneNumber: body.phoneNumber,
          address: body.address,
          createdBy: user.id,
          updatedBy: user.id
        };
        if (body.userType === ECodeUserTypes.GUEST) {
          const guest = await createCustomerService(bodyUserDetail);
          resolve(guest);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
