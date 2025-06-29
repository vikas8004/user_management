import User from '../models/user.model.js';
import CustomError from '../utils/customError.js';
import Response from '../utils/Response.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    Response.success(res, users, 'Fetched user successfully.', 200);
  } catch (err) {
    next(err);
  }
};

// Add a new user
export const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new CustomError('User already exists', 409);
    }

    const user = await User.create({ name, email, password });
    const { password: _pass, ...userWithoutPass } = user._doc;

    Response.success(res, userWithoutPass, 'User added successfully', 201);
  } catch (err) {
    next(err);
  }
};

// Update an existing user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = password;
    }

    await user.save();
    const updatedUser = await User.findById(id).select('-password');

    Response.success(res, updatedUser, 'User updated successfully', 200);
  } catch (err) {
    next(err);
  }
};
