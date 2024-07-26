import bcrypt from 'bcryptjs';

import UserRepository from '~/repository/users.repo';
import { TUserCreateRequest, TUsersAttributes } from './types';
import { Transaction } from 'sequelize';

const saltPassword = bcrypt.genSaltSync();

const hashPasswordUser = (password: string) => {
  const hashPassword = bcrypt.hashSync(password, saltPassword);
  return hashPassword;
};

export const countUsers = (userName: string) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      const userCount = await UserRepository.count({ where: { userName } });
      resolve(userCount);
    } catch (error) {
      reject(error);
    }
  });
};

export const createUserService = (body: TUserCreateRequest, trans?: Transaction) => {
  return new Promise<TUsersAttributes>(async (resolve, reject) => {
    try {
      const newBody: TUserCreateRequest = { ...body, password: hashPasswordUser(body.password) };
      const user = await UserRepository.create(newBody, trans);
      const newUser = user.get({ plain: true });
      delete newUser.password;
      resolve(newUser);
    } catch (error) {
      reject(error);
    }
  });
};
