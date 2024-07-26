import CustomersRepository from '~/repository/customers.repo';
import { TCustomerAttributes, TCustomerCreateRequest } from './types';
import { Transaction } from 'sequelize';

export const createCustomerService = (body: TCustomerCreateRequest, trans?: Transaction) => {
  return new Promise<TCustomerAttributes>(async (resolve, reject) => {
    try {
      const user = await CustomersRepository.create(body, trans);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
