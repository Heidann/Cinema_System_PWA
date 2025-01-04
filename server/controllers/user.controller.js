import User from "../models/user.model.js";

/* Desc: get all users
Route: GET /api/user
Access: Protected */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { is_deleted: 0 } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: get user by id
Route: GET /api/user/:id
Access: Protected */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id, is_deleted: 0 } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: create a new user
Route: POST /api/user
Access: Protected */
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;
    const newUser = await User.create({ name, email, password, phone_number });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: update a user
Route: PUT /api/user/:id
Access: Protected */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone_number } = req.body;
    const [updatedRows] = await User.update(
      { name, email, password, phone_number },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findOne({ where: { id } });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Desc: delete a user
Route: DELETE /api/user/:id
Access: Protected */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await User.update(
      { is_deleted: 1 },
      { where: { id, is_deleted: 0 } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
