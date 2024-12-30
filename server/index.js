import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import db from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
import movieRoutes from "./routes/movie.routes.js";

app.use("/api/movies", movieRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
