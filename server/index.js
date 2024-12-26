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

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Cinema Booking API");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
