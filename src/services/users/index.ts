import bcrypt from 'bcryptjs';
import { Transaction } from 'sequelize';

import UserRepository from '~/repository/users.repo';
import { TUserCreateRequest, TUsersAttributes } from './types';

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

export const createUserService = (body: TUserCreateRequest, trans?: Transaction): Promise<TUsersAttributes> => {
  return new Promise<TUsersAttributes>(async (resolve, reject) => {
    try {
      const newBody: TUserCreateRequest = { ...body, password: hashPasswordUser(body.password) };
      const user = await UserRepository.create(newBody, trans);
      delete user.password;
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserService = (userName: string): Promise<TUsersAttributes> => {
  return new Promise<TUsersAttributes>(async (resolve, reject) => {
    try {
      const user = await UserRepository.findOne({ where: { userName } });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserById = (id: string): Promise<TUsersAttributes> => {
  return new Promise<TUsersAttributes>(async (resolve, reject) => {
    try {
      const user = await UserRepository.findOne({ where: { id } });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
