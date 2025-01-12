import Employee from "../models/employee.model.js";
import EmployeeAccount from "../models/employee_account.model.js";
import EmployeeSalary from "../models/employee_salary.model.js";
import EmployeeSchedule from "../models/employee_schedule.model.js";

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
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !name ||
      !email ||
      !position ||
      !salary ||
      !hire_date ||
      !username ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo mới Employee
    const newEmployee = await Employee.create({
      name,
      email,
      phone_number,
      position,
      salary,
      hire_date,
    });

    // Tạo mới EmployeeAccount
    const newEmployeeAccount = await EmployeeAccount.create({
      employee_id: newEmployee.id,
      username,
      password,
      role: position,
    });

    res.status(201).json({ employeeAccount: newEmployeeAccount });
  } catch (error) {
    // Xử lý lỗi chi tiết hơn
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: error.message });
    }
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
Route: DELETE /api/employees/:id
Access: Protected */
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Employee.update(
      { is_deleted: true },
      { where: { id, is_deleted: false } }
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
  createEmployeeWithAccount,
  updateEmployee,
  deleteEmployee,
};
