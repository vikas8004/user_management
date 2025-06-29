import User from '../models/user.model.js';
import CustomError from '../utils/customError.js';
import { generateToken } from '../utils/generateToken.js';
import Response from '../utils/Response.js';

// Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('User already exists.', 409);
    }
    const user = await User.create({ name, email, password });
    const { password: _pass, ...dataWithoutPass } = user._doc;
    Response.success(res, dataWithoutPass, 'User registered successfully', 201);
  } catch (err) {
    // console.error(err);
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('User not found.', 404);
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new CustomError('Invalid credentials.', 400);
    }

    // Generate token
    const token = generateToken(user._id);

    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    const { password: _pass, ...userWithoutPass } = user._doc;
    Response.success(res, { ...userWithoutPass, token }, 'User logged in successfully', 200);
  } catch (err) {
    // console.error(err);
    next(err);
  }
};

// Auto login
export const autoLogin = async (req, res, next) => {
  try {
    const { userId } = req;
    const loggedInUser = await User.findOne({ _id: userId });
    if (!loggedInUser) {
      throw new CustomError('Invalid user id', 401);
    }
    const { password: _pass, ...userWithoutPass } = loggedInUser._doc;
    Response.success(
      res,
      { ...userWithoutPass, token: req.cookies.token },
      'Auto login success',
      200
    );
  } catch (err) {
    next(err);
  }
};

// logout

export const logout = async (req, res, next) => {
  try {
    const userId = req.userId;
    const loggedInUser = await User.findOne({ _id: userId });
    if (!loggedInUser) {
      throw new CustomError('Invalid id logout failed');
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
    });
    Response.success(res, {}, 'User logged out successfully', 200);
  } catch (err) {
    next(err);
  }
};
