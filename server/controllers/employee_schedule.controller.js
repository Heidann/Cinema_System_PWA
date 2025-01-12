import EmployeeSchedule from "../models/employee_schedule.model.js";

/* Desc: get all employee schedules
Route: GET /api/employee_schedules
Access: Protected */
const getAllEmployeeSchedules = async (req, res) => {
  try {
    const employeeSchedules = await EmployeeSchedule.findAll({
      where: { is_deleted: 0 },
    });
    res.json(employeeSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get employee schedule by id
Route: GET /api/employee_schedule/:id
Access: Protected */
const getEmployeeScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeSchedule = await EmployeeSchedule.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!employeeSchedule) {
      return res.status(404).json({ message: "Employee schedule not found" });
    }
    res.json(employeeSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getWorkSchedulebyId
/* Desc: get employee schedule by id
Route: GET /api/employee_schedule/work-schedule/:id
Access: Protected */
const getWorkSchedulebyId = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeSchedule = await EmployeeSchedule.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!employeeSchedule) {
      return res.status(404).json({ message: "Employee schedule not found" });
    }
    res.json(employeeSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new employee schedule
Route: POST /api/employee_schedule
Access: Protected */
const createEmployeeSchedule = async (req, res) => {
  try {
    const { employee_id, work_date, start_time, end_time, status, notes } =
      req.body;
    const newEmployeeSchedule = await EmployeeSchedule.create({
      employee_id,
      work_date,
      start_time,
      end_time,
      status,
      notes,
    });
    res.status(201).json(newEmployeeSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update an employee schedule
Route: PUT /api/employee_schedule/:id
Access: Protected */
const updateEmployeeSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, work_date, start_time, end_time, status, notes } =
      req.body;
    const [updatedRows] = await EmployeeSchedule.update(
      { employee_id, work_date, start_time, end_time, status, notes },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee schedule not found" });
    }
    const updatedEmployeeSchedule = await EmployeeSchedule.findOne({
      where: { id },
    });
    res.json(updatedEmployeeSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete an employee schedule
Route: DELETE /api/employee_schedule/:id
Access: Protected */
const deleteEmployeeSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await EmployeeSchedule.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee schedule not found" });
    }
    res.json({ message: "Employee schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllEmployeeSchedules,
  // getEmployeeScheduleById,
  getWorkSchedulebyId,
  createEmployeeSchedule,
  updateEmployeeSchedule,
  deleteEmployeeSchedule,
};
