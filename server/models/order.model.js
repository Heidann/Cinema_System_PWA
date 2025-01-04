import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Order = sequelize.define(
  "order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    promotion_code: {
      type: DataTypes.STRING(50),
    },
    payment_method: {
      type: DataTypes.ENUM("credit_card", "cash", "e_wallet"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "order",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Order;
