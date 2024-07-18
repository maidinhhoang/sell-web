import { DataTypes } from 'sequelize';
import { sequelize } from '.';

const CustomersModel = sequelize.define('customers', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  userId: { type: DataTypes.UUID, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.UUID, allowNull: false },
  updatedBy: { type: DataTypes.UUID, allowNull: false }
});

export default CustomersModel;
