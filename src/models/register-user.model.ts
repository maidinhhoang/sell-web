import { DataTypes } from 'sequelize';
import { sequelize } from '.';

const RegisterUserModel = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
});

export default RegisterUserModel;
