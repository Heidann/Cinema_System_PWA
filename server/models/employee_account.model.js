import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const EmployeeAccount = sequelize.define(
  "employee_account",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "staff"),
      defaultValue: "staff",
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "employee_account",
    timestamps: false,
  }
);

export default EmployeeAccount;
