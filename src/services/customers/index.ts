import CustomersRepository from '~/repository/customers.repo';
import { TCustomerAttributes, TCustomerCreateRequest } from './types';
import { EHttpStatus } from '~/constants/enum';

export const createCustomerService = (body: TCustomerCreateRequest) => {
  return new Promise<TCustomerAttributes>(async (resolve, reject) => {
    try {
      const user = await CustomersRepository.create(body);
      resolve(user);
    } catch (error) {
      reject({ httpStatus: EHttpStatus.SERVER_ERROR, error });
    }
  });
};
