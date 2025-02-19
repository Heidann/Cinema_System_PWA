import EmployeeAccount from "../models/employee_account.model.js";

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
Route: POST /api/employee/account/create-account
Access: Protected */
const createEmployeeAccount = async (req, res) => {
  try {
    const { employee_id, username, password, role } = req.body;

    // Validate input fields
    if (!employee_id || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username already exists
    const existingAccount = await EmployeeAccount.findOne({
      where: { username },
    });
    if (existingAccount) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new employee account
    const newEmployeeAccount = await EmployeeAccount.create({
      employee_id,
      username,
      password: hashedPassword, // Store hashed password
      role,
    });

    res.status(201).json({
      message: "Employee account created successfully",
      employeeAccount: {
        id: newEmployeeAccount.id,
        employee_id: newEmployeeAccount.employee_id,
        username: newEmployeeAccount.username,
        role: newEmployeeAccount.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update an employee account password
Route: PUT /api/employee/account/change-password
Access: Protected */
const updateEmployeePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // check input fields
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check old password vs new password
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from old password" });
    }

    // check exist employee account
    const employeeAccount = await EmployeeAccount.findOne({
      where: { username, is_deleted: false },
    });
    if (!employeeAccount) {
      return res.status(404).json({ message: "Employee account not found" });
    }
    // Kiểm tra mật khẩu cũ
    // const isMatch = await employeeAccount.comparePassword(oldPassword);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Incorrect old password" });
    // }

    // Cập nhật mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    employeeAccount.password = await bcrypt.hash(newPassword, salt);
    await employeeAccount.save();

    res.json({ message: "Password changed successfully" });
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

/* Desc: login employee account
Route: POST /api/employee/account/login
Access: Public */
const loginEmployeeAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    // Check input fields
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check exist employee account
    const employeeAccount = await EmployeeAccount.findOne({
      attributes: ["id", "username", "password", "role", "is_status"],
      where: { username, is_status: "Active" },
    });
    console.log(employeeAccount.dataValues);

    if (!employeeAccount) {
      return res.status(404).json({ message: "Employee account not found" });
    }

    // Check password
    const isMatch = await employeeAccount.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: employeeAccount.id, username: employeeAccount.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: lock employee account by id
Route: PUT /api/employee/account/lock-account/:id
Access: Protected */
const lockEmployeeAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Update employee account status
    const [updatedRows] = await EmployeeAccount.update(
      { is_status: "Locked" },
      { where: { id, is_deleted: false } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Employee account not found" });
    }

    res.json({ message: "Employee account locked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  loginEmployeeAccount,
  getAllEmployeeAccounts,
  getEmployeeAccountById,
  createEmployeeAccount,
  updateEmployeePassword,
  deleteEmployeeAccount,
  lockEmployeeAccount,
};
