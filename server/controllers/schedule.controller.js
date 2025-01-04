import Schedule from "../models/schedule.model.js";

/* Desc: get all schedules
Route: GET /api/schedules
Access: Protected */
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({ where: { is_deleted: 0 } });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get schedule by id
Route: GET /api/schedule/:id
Access: Protected */
const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findOne({ where: { id, is_deleted: 0 } });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new schedule
Route: POST /api/schedule
Access: Protected */
const createSchedule = async (req, res) => {
  try {
    const { movie_id, room_id, start_time, end_time, ticket_price } = req.body;
    const newSchedule = await Schedule.create({
      movie_id,
      room_id,
      start_time,
      end_time,
      ticket_price,
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a schedule
Route: PUT /api/schedule/:id
Access: Protected */
const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_id, room_id, start_time, end_time, ticket_price } = req.body;
    const [updatedRows] = await Schedule.update(
      { movie_id, room_id, start_time, end_time, ticket_price },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    const updatedSchedule = await Schedule.findOne({ where: { id } });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a schedule
Route: DELETE /api/schedule/:id
Access: Protected */
const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Schedule.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
