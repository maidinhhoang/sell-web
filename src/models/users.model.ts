import { DataTypes } from 'sequelize';
import { sequelize } from '.';

const UsersModel = sequelize.define('users', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  fullName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

export default UsersModel;
