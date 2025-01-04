import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
// CREATE TABLE rooms (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     cinema_id INT NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     is_deleted TINYINT(1) DEFAULT 0,
//     FOREIGN KEY (cinema_id) REFERENCES cinemas(id),
//     UNIQUE (cinema_id, name)
// );
// ALTER TABLE rooms
// ADD COLUMN capacity INT NOT NULL CHECK (capacity > 0);

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
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "room",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Room;
