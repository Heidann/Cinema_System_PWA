import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import db from "./config/db.config.js";
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

// Routes
import movieRoutes from "./routes/movie.routes.js";
import cinemaRoutes from "./routes/cinema.routes.js";

app.use("/api/movies", movieRoutes);
app.use("/api/cinemas", cinemaRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
