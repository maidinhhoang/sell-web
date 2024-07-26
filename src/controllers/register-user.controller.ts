import { Request, Response } from 'express';

import { ECodeUserTypes, EHttpStatus } from '~/constants/enum';
import { TResponseApi } from '~/constants/type';
import { exceptionApiResponse } from '~/exceptions';
import { sequelize } from '~/models';
import { createCustomerService } from '~/services/customers';
import { createMerchantService } from '~/services/merchants';
import { countUsers, createUserService } from '~/services/users';

export const registerUser = async (req: Request, res: Response) => {
  const body = req.body;
  let response: TResponseApi;

  const fieldRequired = ['address', 'fullName', 'password', 'phoneNumber', 'userName', 'userType'];
  const trans = await sequelize.transaction();

  try {
    if (
      body.address &&
      body.fullName &&
      body.password &&
      body.phoneNumber &&
      body.userName &&
      (body.userType === ECodeUserTypes.GUEST || body.userType === ECodeUserTypes.GUEST)
    ) {
      const userCount = await countUsers(body.userName);
      if (!userCount) {
        const bodyUser = { fullName: body.fullName, username: body.userName, password: body.password };
        const user = await createUserService(bodyUser, trans);

        const bodyUserDetail = {
          fullName: body.fullName,
          userId: user.id,
          phoneNumber: body.phoneNumber,
          address: body.address,
          createdBy: user.id,
          updatedBy: user.id
        };
        if (body.userType === ECodeUserTypes.GUEST) {
          await createCustomerService(bodyUserDetail, trans);
        } else {
          await createMerchantService(bodyUserDetail, trans);
        }
        await trans.commit();
        response = exceptionApiResponse({ httpStatus: EHttpStatus.SUCCESS, data: user });
      } else {
        response = exceptionApiResponse({ httpStatus: EHttpStatus.BAD_REQUEST, message: 'username is existed' });
      }
    } else {
      const keyEmptyValue = fieldRequired.filter(
        (item) =>
          !Object.keys(
            Object.fromEntries(
              Object.entries(body).filter(([key, value]) =>
                key === 'userType' ? value === ECodeUserTypes.GUEST || value === ECodeUserTypes.GUEST : !!value
              )
            )
          ).includes(item)
      );
      response = exceptionApiResponse({ httpStatus: EHttpStatus.BAD_REQUEST, message: `Bad reques: ${keyEmptyValue.join(', ')}` });
    }
  } catch (error: any) {
    await trans.rollback();
    response = exceptionApiResponse({ httpStatus: EHttpStatus.SERVER_ERROR });
  }
  return res.status(response?.httpStatus).json(response);
};
