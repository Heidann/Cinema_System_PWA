import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "./models/index.model.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger.config.js";

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
import seatRoutes from "./routes/seat.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

app.use("/api/movie", movieRoutes);
app.use("/api/cinema", cinemaRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/seat", seatRoutes);
app.use("/api/employee", employeeRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/order-item", orderItemRoutes);
// app.use("/api/food-drink", foodDrinkRoutes);
// app.use("/api/food-drink-order", foodDrinkOrderRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/ticket", ticketRoutes);
// app.use("/api/user", userRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to Movie Booking API" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`:::::::  SERVER STARTED ON http://localhost:${PORT}/api-docs/`);
});
