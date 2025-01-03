import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
import movieRoutes from "./routes/movie.routes.js";
import cinemaRoutes from "./routes/cinema.routes.js";
import roomRoutes from "./routes/room.routes.js";

app.use("/api/movies", movieRoutes);
app.use("/api/cinemas", cinemaRoutes);
app.use("/api/rooms", roomRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
