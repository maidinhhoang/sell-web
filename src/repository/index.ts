import { CountOptions, FindOptions, Model, ModelCtor, Op, Transaction } from 'sequelize';

export const BaseRepository = (model: ModelCtor<Model>) => {
  const getAll = (options: FindOptions): Promise<any[]> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await model.findAll(options);
        resolve(data);
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  };

  const count = (options: CountOptions): Promise<number> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await model.count(options);
        resolve(data);
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  };

  const create = (body: any, transaction?: Transaction): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await model.create(body, { transaction });
        resolve(data.get({ plain: true }));
      } catch (error) {
        reject(error);
      }
    });
  };

  const findOne = (options: FindOptions): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await model.findOne(options);
        resolve(data);
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  };

  return {
    getAll,
    count,
    create,
    findOne
  };
};
