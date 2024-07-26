import { Transaction } from 'sequelize';

import MerchantsRepository from '~/repository/merchants.repo';
import { TMerchantAttributes, TMerchantCreateRequest } from './types';

export const createMerchantService = (body: TMerchantCreateRequest, trans: Transaction) => {
  return new Promise<TMerchantAttributes>(async (resolve, reject) => {
    try {
      const user = await MerchantsRepository.create(body, trans);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
