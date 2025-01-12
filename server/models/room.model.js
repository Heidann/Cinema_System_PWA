import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Room = sequelize.define(
  "room",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cinema_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "rooms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
// Room.associate = (models) => {
//   Room.belongsTo(models.Cinema, { foreignKey: "cinema_id" });
//   Room.hasMany(models.Seat, { foreignKey: "room_id" });
//   Room.hasMany(models.Schedule, { foreignKey: "room_id" });
// };

export default Room;
