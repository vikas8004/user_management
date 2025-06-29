import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new CustomError('Unauthorized: No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(
      error.name === 'TokenExpiredError'
        ? new CustomError('Token expired', 401)
        : new CustomError(error)
    );
  }
};
