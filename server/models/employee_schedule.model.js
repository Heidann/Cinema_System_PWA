import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const EmployeeSchedule = sequelize.define(
  "employee_schedule",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_status: {
      type: DataTypes.ENUM("scheduled", "completed", "missed"),
      defaultValue: "scheduled",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "employee_schedules", timestamps: true }
);

export default EmployeeSchedule;
