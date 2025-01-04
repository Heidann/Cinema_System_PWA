import Ticket from "../models/ticket.model.js";

/* Desc: get all tickets
Route: GET /api/tickets
Access: Protected */
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ where: { is_deleted: 0 } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get ticket by id
Route: GET /api/tickets/:id
Access: Protected */
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findOne({ where: { id, is_deleted: 0 } });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new ticket
Route: POST /api/tickets
Access: Protected */
const createTicket = async (req, res) => {
  try {
    const { cinema_id, schedule_id, seat_id, price } = req.body;
    const newTicket = await Ticket.create({
      cinema_id,
      schedule_id,
      seat_id,
      price,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a ticket
Route: PUT /api/tickets/:id
Access: Protected */
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { cinema_id, schedule_id, seat_id, price } = req.body;
    const [updatedRows] = await Ticket.update(
      { cinema_id, schedule_id, seat_id, price },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    const updatedTicket = await Ticket.findOne({ where: { id } });
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a ticket
Route: DELETE /api/tickets/:id
Access: Protected */
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Ticket.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
