'use strict';
require('dotenv').config();

import { Options, Sequelize } from 'sequelize';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config-sequelize.json')[env];

const configOption: Options = {
  ...config,
  query: { raw: true, mapToModel: true },
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field: { type: string; string: () => any }, next: () => any) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    }
  },
  timezone: '+07:00'
};

const sequelize = config.url
  ? new Sequelize(config.url, configOption)
  : new Sequelize(config.database, config.username, config.password, configOption);

export { Sequelize, sequelize };
