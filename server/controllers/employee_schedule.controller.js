import boom from "boom";
import { body, param } from "express-validator";
import EmployeeSchedule from "../models/employee_schedule.model.js";
import handleError from "../utils/errorHandler.util.js";

/* Desc: get all employee schedules 
Route: GET /api/employee/schedules
Access: Protected */
const getEmployeeSchedules = async (req, res) => {
  try {
    const employeeSchedule = await EmployeeSchedule.findAll({});
    res.json(employeeSchedule);
  } catch (error) {
    handleError(error, res);
  }
};

/* Desc: get employee schedule by id
Route: GET /api/employee/schedule/:id
Access: Protected */
const getEmployeeScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeSchedule = await EmployeeSchedule.findOne({
      where: { employee_id: id, is_deleted: false },
    });
    if (!employeeSchedule) {
      throw boom.notFound("Employee schedule not found");
    }
    res.json(employeeSchedule);
  } catch (error) {
    handleError(error, res);
  }
};

/* Desc: update an employee schedule
Route: PUT /api/employee/schedule/:id
Access: Protected */
const updateEmployeeSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { work_date, start_time, end_time, notes, is_status } = req.body;

    const [updatedRows] = await EmployeeSchedule.update(
      { work_date, start_time, end_time, notes, is_status },
      { where: { id, is_deleted: false } }
    );

    if (updatedRows === 0) {
      throw boom.notFound("Employee schedule not found");
    }

    const updatedSchedule = await EmployeeSchedule.findOne({ where: { id } });
    res.json(updatedSchedule);
  } catch (error) {
    handleError(error, res);
  }
};

/* Desc: create an employee schedule
Route: POST /api/employee/schedule
Access: Protected */
const createEmployeeSchedule = async (req, res) => {
  try {
    const { employee_id, work_date, start_time, end_time, notes } = req.body;

    const newSchedule = await EmployeeSchedule.create({
      employee_id,
      work_date,
      start_time,
      end_time,
      notes,
      is_status: "scheduled",
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    handleError(error, res);
  }
};

/* Desc: delete an employee schedule
Route: DELETE /api/employee/schedule/:id
Access: Protected */
const deleteEmployeeSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const [updatedRows] = await EmployeeSchedule.update(
      { is_deleted: true },
      { where: { id, is_deleted: false } }
    );

    if (updatedRows === 0) {
      throw boom.notFound("Employee schedule not found");
    }

    res.json({ message: "Employee schedule deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

// Validation middleware
const validateEmployeeSchedule = [
  body("employee_id").isInt().withMessage("Employee ID must be an integer"),
  body("work_date").isDate().withMessage("Work date must be a valid date"),
  body("start_time").isString().withMessage("Start time must be a valid time"),
  body("end_time").isString().withMessage("End time must be a valid time"),
  body("notes").isString().withMessage("Notes must be a string"),
];

export {
  getEmployeeSchedules,
  getEmployeeScheduleById,
  updateEmployeeSchedule,
  createEmployeeSchedule,
  deleteEmployeeSchedule,
  validateEmployeeSchedule,
};
