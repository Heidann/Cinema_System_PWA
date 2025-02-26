import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
      max: 5, // Số lượng kết nối tối đa trong pool.
      min: 0, // Số lượng kết nối tối thiểu trong pool.
      acquire: 30000, // Thời gian tối đa (tính bằng mili giây) mà pool sẽ cố gắng kết nối trước khi ném ra lỗi.
      idle: 10000, // Thời gian tối đa (tính bằng mili giây) mà một kết nối có thể ở trạng thái nhàn rỗi trước khi bị đóng.
    },
    timezone: "+07:00", // Thiết lập múi giờ UTC
    // logging: (log) => console.log(":::::::  LOG: " + log),
    logging: false,
  }
);

const dcconn = async () => {
  try {
    await sequelize.authenticate();
    console.log(":::::::  DB CONNECTED!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dcconn();

export default sequelize;
