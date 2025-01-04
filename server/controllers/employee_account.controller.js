import EmployeeAccount from "../models/employee_account.model.js";
import Employee from "../models/employee.model.js";

/* Desc: get all employee accounts
Route: GET /api/employee_accounts
Access: Protected */
const getAllEmployeeAccounts = async (req, res) => {
  try {
    const employeeAccounts = await EmployeeAccount.findAll({
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: [
            "id",
            "name",
            "email",
            "phone_number",
            "position",
            "salary",
            "hire_date",
          ],
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
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: [
            "id",
            "name",
            "email",
            "phone_number",
            "position",
            "salary",
            "hire_date",
          ],
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
    const { id } = req.params;
    const { employee_id, username, password, role } = req.body;
    const [updatedRows] = await EmployeeAccount.update(
      { employee_id, username, password, role },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee account not found" });
    }
    const updatedEmployeeAccount = await EmployeeAccount.findOne({
      where: { id },
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
  getAllEmployeeAccounts,
  getEmployeeAccountById,
  createEmployeeAccount,
  updateEmployeeAccount,
  deleteEmployeeAccount,
};
