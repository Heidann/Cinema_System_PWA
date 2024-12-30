import pool from "../config/db.config.js";
import Movies from "../models/movie.model.js";
// sequelize

const getAllMovies = async (req, res) => {
  try {
    const moviesList = await Movies.findAll();
    res.json(moviesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllMovies };
