import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5, // Số lượng kết nối tối đa trong pool.
      min: 0, // Số lượng kết nối tối thiểu trong pool.
      acquire: 30000, // Thời gian tối đa (tính bằng mili giây) mà pool sẽ cố gắng kết nối trước khi ném ra lỗi.
      idle: 100, // Thời gian tối đa (tính bằng mili giây) mà một kết nối có thể ở trạng thái nhàn rỗi trước khi bị đóng.
    },
  }
);
export default sequelize;
