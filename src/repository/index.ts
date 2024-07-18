import { CountOptions, FindOptions, Model, ModelCtor, Op } from 'sequelize';

export const BaseRepository = (model: ModelCtor<Model>) => {
  const getAll = (options: FindOptions): Promise<any[]> => {
    return model.findAll(options);
  };

  const count = (options: CountOptions): Promise<number> => {
    return model.count(options);
  };

  const create = (body: any): Promise<any> => {
    return model.create(body);
  };

  return {
    getAll,
    count,
    create
  };
};
