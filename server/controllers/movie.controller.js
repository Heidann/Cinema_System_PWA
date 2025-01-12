import pool from "../config/db.config.js";
import Movies from "../models/movie.model.js";

/* Desc: get all movies
Route: GET /api/movies
Access: Public */
const getAllMovies = async (req, res) => {
  try {
    const moviesList = await Movies.findAll({
      where: { is_deleted: false },
    });
    res.json(moviesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get movie by id
Route: GET /api/movies/:id
Access: Public */
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movies.findOne({
      where: { id, is_deleted: false },
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new movie
Route: POST /api/movies
Access: Public */
const createMovie = async (req, res) => {
  try {
    const { title, description, duration, image_url, trailer_url } = req.body;
    const newMovie = await Movies.create({
      title,
      description,
      duration,
      image_url,
      trailer_url,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a movie
Route: PUT /api/movies/:id
Access: Public */
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, image_url, trailer_url } = req.body;
    const [updatedRows] = await Movies.update(
      { title, description, duration, image_url, trailer_url },
      { where: { id, is_deleted: false } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const updatedMovie = await Movies.findByPk(id);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a movie
Route: DELETE /api/movies/:id
Access: Public */
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Movies.update(
      { is_deleted: true },
      { where: { id, is_deleted: false } }
    );
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
