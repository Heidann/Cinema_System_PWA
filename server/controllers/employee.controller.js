import Employee from "../models/employee.model.js";
import EmployeeAccount from "../models/employee_account.model.js";

/* Desc: get all employees
Route: GET /api/employees
Access: Protected */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ where: { is_deleted: 0 } });
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
    const employee = await Employee.findOne({ where: { id, is_deleted: 0 } });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new employee
Route: POST /api/employee
Access: Protected */
const createEmployee = async (req, res) => {
  try {
    const { name, email, phone_number, position, salary, hire_date } = req.body;
    const newEmployee = await Employee.create({
      name,
      email,
      phone_number,
      position,
      salary,
      hire_date,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new employee and employee account
Route: POST /api/employees
Access: Protected */
const createEmployeeWithAccount = async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      position,
      salary,
      hire_date,
      username,
      password,
      role,
    } = req.body;

    const newEmployee = await Employee.create({
      name,
      email,
      phone_number,
      position,
      salary,
      hire_date,
    });

    const newEmployeeAccount = await EmployeeAccount.create({
      employee_id: newEmployee.id,
      username,
      password,
      role,
    });

    res.status(201).json({ employeeAccount: newEmployeeAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update an employee
Route: PUT /api/employees/:id
Access: Protected */
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_number, position, salary, hire_date } = req.body;
    const [updatedRows] = await Employee.update(
      { name, email, phone_number, position, salary, hire_date },
      { where: { id, is_deleted: 0 } }
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
Route: DELETE /api/employees/:id
Access: Protected */
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Employee.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  createEmployeeWithAccount,
  updateEmployee,
  deleteEmployee,
};
