import EmployeeSalary from "../models/employee_salary.model.js";

/* Desc: get all employee salaries
Route: GET /api/employee_salaries
Access: Protected */
const getAllEmployeeSalaries = async (req, res) => {
  try {
    const employeeSalaries = await EmployeeSalary.findAll({
      where: { is_deleted: 0 },
    });
    res.json(employeeSalaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get employee salary by id
Route: GET /api/employee_salary/:id
Access: Protected */
const getEmployeeSalaryById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeSalary = await EmployeeSalary.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!employeeSalary) {
      return res.status(404).json({ message: "Employee salary not found" });
    }
    res.json(employeeSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new employee salary
Route: POST /api/employee_salary
Access: Protected */
const createEmployeeSalary = async (req, res) => {
  try {
    const {
      employee_id,
      month,
      base_salary,
      bonus,
      deductions,
      payment_status,
    } = req.body;
    const newEmployeeSalary = await EmployeeSalary.create({
      employee_id,
      month,
      base_salary,
      bonus,
      deductions,
      payment_status,
    });
    res.status(201).json(newEmployeeSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update an employee salary
Route: PUT /api/employee_salary/:id
Access: Protected */
const updateEmployeeSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employee_id,
      month,
      base_salary,
      bonus,
      deductions,
      payment_status,
    } = req.body;
    const [updatedRows] = await EmployeeSalary.update(
      { employee_id, month, base_salary, bonus, deductions, payment_status },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee salary not found" });
    }
    const updatedEmployeeSalary = await EmployeeSalary.findOne({
      where: { id },
    });
    res.json(updatedEmployeeSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete an employee salary
Route: DELETE /api/employee_salary/:id
Access: Protected */
const deleteEmployeeSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await EmployeeSalary.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee salary not found" });
    }
    res.json({ message: "Employee salary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllEmployeeSalaries,
  getEmployeeSalaryById,
  createEmployeeSalary,
  updateEmployeeSalary,
  deleteEmployeeSalary,
};
