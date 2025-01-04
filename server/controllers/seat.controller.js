import Seat from "../models/seat.model.js";

/* Desc: get all seats
Route: GET /api/seats
Access: Protected */
const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll({ where: { is_deleted: 0 } });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get seat by id
Route: GET /api/seat/:id
Access: Protected */
const getSeatById = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findOne({ where: { id, is_deleted: 0 } });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new seat
Route: POST /api/seat
Access: Protected */
const createSeat = async (req, res) => {
  try {
    const { room_id, seat_number } = req.body;
    const newSeat = await Seat.create({ room_id, seat_number });
    res.status(201).json(newSeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a seat
Route: PUT /api/seat/:id
Access: Protected */
const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { room_id, seat_number, is_status } = req.body;
    const [updatedRows] = await Seat.update(
      { room_id, seat_number, is_status },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    const updatedSeat = await Seat.findOne({ where: { id } });
    res.json(updatedSeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a seat
Route: DELETE /api/seats/:id
Access: Protected */
const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Seat.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.json({ message: "Seat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllSeats, getSeatById, createSeat, updateSeat, deleteSeat };
