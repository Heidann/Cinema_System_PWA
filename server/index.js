import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "./models/index.model.js";
import db from "./config/db.config.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger.config.js";
import sequelize from "./config/db.config.js";

// Sync Database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to create tables, shutting down...", err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
// swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import Routes
import cinemaRoutes from "./routes/cinema.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import roomRoutes from "./routes/room.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderItemRoutes from "./routes/order_item.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import employeeAccountRoutes from "./routes/employee_account.routes.js";
import employeeSalaryRoutes from "./routes/employee_salary.routes.js";
import employeeScheduleRoutes from "./routes/employee_schedule.routes.js";
import foodDrinkRoutes from "./routes/food_drink.routes.js";
import foodDrinkOrderRoutes from "./routes/food_drink_order.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import seatRoutes from "./routes/seat.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/movie", movieRoutes);
app.use("/api/cinema", cinemaRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/employee-account", employeeAccountRoutes);
app.use("/api/employee-salary", employeeSalaryRoutes);
app.use("/api/employee-schedule", employeeScheduleRoutes);
app.use("/api/employee", employeeRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/order-item", orderItemRoutes);
// app.use("/api/food-drink", foodDrinkRoutes);
// app.use("/api/food-drink-order", foodDrinkOrderRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/seat", seatRoutes);
// app.use("/api/ticket", ticketRoutes);
// app.use("/api/user", userRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to Movie Booking API" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Server is running on http://localhost:${PORT}/api-docs/`);
});
