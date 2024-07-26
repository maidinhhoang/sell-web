import { CountOptions, FindOptions, Model, ModelCtor, Op, Transaction } from 'sequelize';

export const BaseRepository = (model: ModelCtor<Model>) => {
  const getAll = (options: FindOptions): Promise<any[]> => {
    return model.findAll(options);
  };

  const count = (options: CountOptions): Promise<number> => {
    return model.count(options);
  };

  const create = (body: any, transaction?: Transaction): Promise<any> => {
    return model.create(body, { transaction });
  };

  return {
    getAll,
    count,
    create
  };
};
