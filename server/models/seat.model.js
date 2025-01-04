import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Seat = sequelize.define(
  "seat",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_status: {
      type: DataTypes.ENUM("available", "booked", "unavailable"),
      defaultValue: "available",
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "seat",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Seat;
