import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const FoodDrinkOrder = sequelize.define(
  "food_drink_order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    food_drink_id: {
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
    timestamps: true,
    tableName: "food_drink_order",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default FoodDrinkOrder;
