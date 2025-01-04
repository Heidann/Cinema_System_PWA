import pool from "../config/db.config.js";
import Room from "../models/room.model.js";

/* Desc: get all rooms by cinema id
Route: GET /api/rooms
Access: Proteced */
const getAllRoomByCinemaId = async (req, res) => {
  try {
    const { cinemaId } = req.body;
    const roomsList = await Room.findAll(
      { attributes: ["id", "name", "capacity"] },
      {
        where: { cinema_id: cinemaId, is_deleted: 0 },
      }
    );
    res.json(roomsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get room by id
Route: GET /api/rooms/:id
Access: Proteced */
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new room
Route: POST /api/rooms
Access: Proteced */
const createRoom = async (req, res) => {
  try {
    const { cinema_id, name, capacity } = req.body;
    const newRoom = await Room.create({
      name,
      cinema_id,
      capacity,
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a room
Route: PUT /api/rooms/:id
Access: Proteced */
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity } = req.body;
    const [updatedRows] = await Room.update(
      { name, capacity },
      {
        where: { id, is_deleted: 0 },
      }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    const updatedRoom = await Room.findOne({ where: { id } });
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a room
Route: DELETE /api/rooms/:id
Access: Proteced */
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Room.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllRoomByCinemaId,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
