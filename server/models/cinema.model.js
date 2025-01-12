import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Cinema = sequelize.define(
  "cinema",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "cinemas",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Cinema.associate = (models) => {
//   Cinema.hasMany(models.Room, { foreignKey: "cinema_id" });
//   Cinema.hasMany(models.Ticket, { foreignKey: "cinema_id" });
// };

export default Cinema;
