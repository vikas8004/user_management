import { Router } from 'express';
import { loginValidation } from '../validators/loginValidator.js';
import { registerValidation } from '../validators/registerValidator.js';
import { validate } from '../middlewares/validation.js';
import { autoLogin, login, logout, register } from '../controllers/auth.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.js';

const authRouter = Router();

authRouter.post('/register', registerValidation, validate, register);
authRouter.post('/login', loginValidation, validate, login);
authRouter.get('/auto-login', verifyJwt, autoLogin);
authRouter.get('/logout', verifyJwt, logout);

export default authRouter;
