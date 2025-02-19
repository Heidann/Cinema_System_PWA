import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
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
      type: DataTypes.ENUM("Active", "Locked"),
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
    hooks: {
      beforeCreate: async (employeeAccount) => {
        if (employeeAccount.password) {
          const salt = await bcrypt.genSalt(10);
          employeeAccount.password = await bcrypt.hash(
            employeeAccount.password,
            salt
          );
        }
      },
      beforeUpdate: async (employeeAccount) => {
        if (employeeAccount.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          employeeAccount.password = await bcrypt.hash(
            employeeAccount.password,
            salt
          );
        }
      },
    },
  }
);

// Method comparePassword
EmployeeAccount.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default EmployeeAccount;
