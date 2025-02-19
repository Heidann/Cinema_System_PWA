import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import boom from "boom";
import Employee from "../models/employee.model.js";
import EmployeeAccount from "../models/employee_account.model.js";
import EmployeeSalary from "../models/employee_salary.model.js";
import EmployeeSchedule from "../models/employee_schedule.model.js";
import generateEmployeeCode from "../utils/employeeCode.util.js";

/* Desc: get all employees
Route: GET /api/employees
Access: Protected */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ where: { is_deleted: false } });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get employee by id
Route: GET /api/employee/:id
Access: Protected */
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { id, is_deleted: false },
    });
    if (!employee) {
      throw boom.notFound("Employee not found");
    }
    res.json(employee);
  } catch (error) {
    if (error.isBoom) {
      res.status(error.output.statusCode).json(error.output.payload);
    } else {
      const boomError = boom.internal("Failed to get employee", error);
      res.status(boomError.output.statusCode).json(boomError.output.payload);
    }
  }
};

/* Desc: create a new employee and employee account
Route: POST /api/employee
Access: Protected */
const createEmployeeWithAccount = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      cccd,
      phone_number,
      position,
      salary,
      username,
      password,
      role,
      cinema_id,
      sex,
      city_cinema,
    } = req.body;

    // check input fields
    if (
      !name ||
      !email ||
      !address ||
      !cccd ||
      !position ||
      !salary ||
      !username ||
      !password ||
      !cinema_id ||
      !sex ||
      !city_cinema
    ) {
      throw boom.badRequest("All fields are required");
    }

    // Generate employee code
    const employeeCode = await generateEmployeeCode(
      city_cinema,
      cinema_id,
      sex
    );

    // create new employee
    const newEmployee = await Employee.create({
      name,
      email,
      phone_number,
      address,
      cccd,
      position,
      salary,
      sex,
      code: employeeCode,
    });

    // create new employee account
    const newEmployeeAccount = await EmployeeAccount.create({
      employee_id: newEmployee.id,
      username,
      password,
      role,
    });

    res.status(201).json({ employeeAccount: newEmployeeAccount });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const boomError = boom.badRequest("Username or email already exists");
      res.status(boomError.output.statusCode).json(boomError.output.payload);
    } else if (error.isBoom) {
      res.status(error.output.statusCode).json(error.output.payload);
    } else {
      const boomError = boom.internal("Failed to create employee", error);
      res.status(boomError.output.statusCode).json(boomError.output.payload);
    }
  }
};

/* Desc: update an employee
Route: PUT /api/employee/:id
Access: Protected */
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, sex, cccd } = req.body;
    const [updatedRows] = await Employee.update(
      {
        name,
        address,
        sex,
        cccd,
        updated_at: DataTypes.NOW,
      },
      { where: { id, is_deleted: false } }
    );
    if (updatedRows === 0) {
      throw boom.notFound("Employee not found");
    }
    const updatedEmployee = await Employee.findOne({ where: { id } });
    res.json(updatedEmployee);
  } catch (error) {
    if (error.isBoom) {
      res.status(error.output.statusCode).json(error.output.payload);
    } else {
      const boomError = boom.internal("Failed to update employee", error);
      res.status(boomError.output.statusCode).json(boomError.output.payload);
    }
  }
};

/* Desc: delete an employee
Route: DELETE /api/employee/:id
Access: Protected */
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Employee.update(
      { is_deleted: true },
      { where: { id, is_deleted: false }, individualHooks: true }
    );
    if (updatedRows === 0) {
      throw boom.notFound("Employee not found");
    }

    // Khóa tài khoản của nhân viên
    const [updatedAccountRows] = await EmployeeAccount.update(
      { is_deleted: true },
      { where: { employee_id: id, is_deleted: false } }
    );
    if (updatedAccountRows === 0) {
      throw boom.notFound("Employee account not found");
    }

    res.json({ message: "Employee and account deleted successfully" });
  } catch (error) {
    if (error.isBoom) {
      res.status(error.output.statusCode).json(error.output.payload);
    } else {
      const boomError = boom.internal("Failed to delete employee", error);
      res.status(boomError.output.statusCode).json(boomError.output.payload);
    }
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  createEmployeeWithAccount,
  updateEmployee,
  deleteEmployee,
};
