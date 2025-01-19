import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Employee = sequelize.define(
  "employee",
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
    adress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(13),
    },
    sex: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    cccd: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    position: {
      type: DataTypes.ENUM(
        "manager",
        "cashier",
        "staff",
        "cleaner",
        "technician"
      ),
      allowNull: false,
      defaultValue: "staff",
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "employees",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Employee;
