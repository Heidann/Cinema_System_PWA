import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

// id INT AUTO_INCREMENT PRIMARY KEY,
// title VARCHAR(255) NOT NULL,
// description TEXT,
// duration INT NOT NULL,
// image_url TEXT,
// trailer_url TEXT,
// created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
// updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// is_deleted TINYINT(1) DEFAULT 0
const Movies = sequelize.define(
  "movies",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Movies;
