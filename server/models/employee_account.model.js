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
    is_status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "employee_accounts",
    timestamps: false,
  }
);
// EmployeeAccount.associate = (models) => {
//   EmployeeAccount.belongsTo(models.Employee, { foreignKey: "employee_id" });
// };

export default EmployeeAccount;
