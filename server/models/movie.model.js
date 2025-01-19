import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Movie = sequelize.define(
  "movie",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    trailer_url: {
      type: DataTypes.TEXT,
    },
    is_status: {
      type: DataTypes.ENUM("coming_soon", "now_showing", "end_showing"),
      defaultValue: "coming_soon",
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "movies",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Movie;
