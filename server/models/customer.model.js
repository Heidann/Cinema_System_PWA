import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Customer = sequelize.define(
  "customer",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(10), allowNull: false, unique: true },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
    },
    sex: { type: DataTypes.STRING(5), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "customers",
    timestamps: true,
  }
);

// User.associate = (models) => {
//   User.hasMany(models.Order, { foreignKey: "user_id" });
// };
export default Customer;
