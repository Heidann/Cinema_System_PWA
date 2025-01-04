import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_type: {
      type: DataTypes.ENUM("ticket", "food_drink"),
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_item",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default OrderItem;
