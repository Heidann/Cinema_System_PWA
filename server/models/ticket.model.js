import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cinema_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "ticket",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Ticket;
