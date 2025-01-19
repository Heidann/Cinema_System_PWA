import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const EmployeeSalary = sequelize.define(
  "employee_salary",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    base_salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bonus: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    deductions: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    total_salary: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.base_salary + this.bonus - this.deductions;
      },
    },
    actual_salary: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    payment_status: {
      type: DataTypes.ENUM("unpaid", "paid"),
      defaultValue: "unpaid",
    },
  },
  { tableName: "employee_salaries", timestamps: true }
);

export default EmployeeSalary;
