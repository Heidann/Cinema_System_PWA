import pool from "../config/db.config.js";
import Cinemas from "../models/cinemas.model.js";

/* Desc: get all cinemas
Route: GET /api/cinemas
Access: Public */
const getAllCinemas = async (req, res) => {
  try {
    const cinemasList = await Cinemas.findAll({
      where: { is_deleted: 0 },
    });
    res.json(cinemasList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get cinema by id
Route: GET /api/cinemas/:id
Access: Public */
const getCinemaById = async (req, res) => {
  try {
    const { id } = req.params;
    const cinema = await Cinemas.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }
    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new cinema
Route: POST /api/cinemas
Access: Proteced */
const createCinema = async (req, res) => {
  try {
    const { name, city, address } = req.body;
    const newCinema = await Cinemas.create({
      name,
      city,
      address,
    });
    res.status(201).json(newCinema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a cinema
Route: PUT /api/cinemas/:id
Access: Proteced */
const updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, address } = req.body;
    const [updatedRows] = await Cinemas.update(
      { name, city, address },
      {
        where: { id },
      }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Cinema not found" });
    }
    const updatedCinema = await Cinemas.findOne({ where: { id } });
    res.json(updatedCinema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a cinema
Route: DELETE /api/cinemas/:id
Access: Proteced */
const deleteCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const [deleted] = await Cinemas.update(
      { is_deleted: 1 },
      {
        where: { id, is_deleted: 0 },
      }
    );
    if (deleted === 0) {
      return res.status(404).json({ message: "Cinema not found" });
    }
    res.json({ message: "Cinema deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllCinemas,
  getCinemaById,
  createCinema,
  updateCinema,
  deleteCinema,
};
