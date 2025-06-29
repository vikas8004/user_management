import { Router } from 'express';
import { addUser, getAllUsers, updateUser } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.js';
import { registerValidation } from '../validators/registerValidator.js';
import { validate } from '../middlewares/validation.js';
import { validateUpdateUser } from '../validators/updateUserValidator.js';

const userRouter = Router();
userRouter.use(verifyJwt);
userRouter.get('/', getAllUsers);
userRouter.post('/', registerValidation, validate, addUser);
userRouter.put('/:id', validateUpdateUser, validate, updateUser);

export default userRouter;
