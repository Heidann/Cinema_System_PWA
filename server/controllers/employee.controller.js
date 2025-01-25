import { DataTypes } from "sequelize";
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
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(400).json({ message: "All fields are required" });
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
    // handle error
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await Employee.findOne({ where: { id } });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "Employee not found" });
    }

    // Khóa tài khoản của nhân viên
    const [updatedAccountRows] = await EmployeeAccount.update(
      { is_deleted: true },
      { where: { employee_id: id, is_deleted: false } }
    );
    if (updatedAccountRows === 0) {
      return res.status(404).json({ message: "Employee account not found" });
    }

    res.json({ message: "Employee and account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get all employee accounts
Route: GET /api/employee/accounts
Access: Protected */
const getAllEmployeeAccounts = async (req, res) => {
  try {
    const employeeAccounts = await EmployeeAccount.findAll({
      attributes: ["id", "employee_id", "username", "role"],
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "name", "position"],
        },
      ],
    });
    res.json(employeeAccounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get employee account by id
Route: GET /api/employee_account/:id
Access: Protected */
const getEmployeeAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeAccount = await EmployeeAccount.findOne({
      where: { id },
      attributes: [
        "id",
        "employee_id",
        "username",
        "role",
        "last_login",
        "is_status",
      ],
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "code", "name", "position", "updated_at"],
        },
      ],
    });
    if (!employeeAccount) {
      return res.status(404).json({ message: "Employee account not found" });
    }
    res.json(employeeAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new employee account
Route: POST /api/employee_account
Access: Protected */
const createEmployeeAccount = async (req, res) => {
  try {
    const { employee_id, username, password, role } = req.body;
    const newEmployeeAccount = await EmployeeAccount.create({
      employee_id,
      username,
      password,
      role,
    });
    res.status(201).json(newEmployeeAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update an employee account
Route: PUT /api/employee_accounts/:id
Access: Protected */
const updateEmployeeAccount = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const { username, password, role } = req.body;
    const [updatedRows] = await EmployeeAccount.update(
      { username, password, role },
      { where: { employee_id, is_deleted: false } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee account not found" });
    }
    const updatedEmployeeAccount = await EmployeeAccount.findOne({
      where: { employee_id },
    });
    res.json(updatedEmployeeAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete an employee account
Route: DELETE /api/employee_accounts/:id
Access: Protected */
const deleteEmployeeAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await EmployeeAccount.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee account not found" });
    }
    res.json({ message: "Employee account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  createEmployeeWithAccount,
  updateEmployee,
  deleteEmployee,
  getAllEmployeeAccounts,
  getEmployeeAccountById,
  createEmployeeAccount,
  updateEmployeeAccount,
  deleteEmployeeAccount,
};
