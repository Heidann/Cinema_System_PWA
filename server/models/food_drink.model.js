import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const FoodDrink = sequelize.define(
  "food_drink",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    is_status: {
      type: DataTypes.ENUM("available", "unavailable"),
      defaultValue: "available",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "food_drinks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default FoodDrink;
