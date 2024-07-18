import bcrypt from 'bcrypt';

import UserRepository from '~/repository/users.repo';
import { TSearchAllUsersParams, TUserCreateRequest, TUserUpdateBody, TUsersAttributes } from './types';
import { EHttpStatus } from '~/constants/enum';

const saltPassword = bcrypt.genSaltSync();

const hashPasswordUser = (password: string) => {
  const hashPassword = bcrypt.hashSync(password, saltPassword);
  return hashPassword;
};

export const createUserService = (body: TUserCreateRequest) => {
  return new Promise<TUsersAttributes>(async (resolve, reject) => {
    try {
      const newBody: TUserCreateRequest = { ...body, password: hashPasswordUser(body.password) };
      const user = await UserRepository.create(newBody);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUsersService = (params?: TSearchAllUsersParams) => {
  return new Promise<TUsersAttributes[]>(async (resolve, reject) => {
    try {
      const users = await UserRepository.getAll(params);
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserByIdService = (userId: string) => {
  return new Promise<TUsersAttributes | null>(async (resolve, reject) => {
    try {
      // const user = await UsersModel.findByPk(userId);
      // resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateUserService = (userId: string, body: TUserUpdateBody) => {
  return new Promise<TUsersAttributes | null>(async (resolve, reject) => {
    try {
      // const userIds = await UsersModel.update(body, { where: { id: userId } });
      // if (userIds?.some((item) => item.toString() === userId)) {
      //   const user = await UsersModel.findByPk(userId);
      //   resolve(user);
      // } else {
      //   resolve(null);
      // }
    } catch (error) {
      reject(error);
    }
  });
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
