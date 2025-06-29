import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorFirstMiddleware.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const corsOptions = {
  origin: ['http://localhost:5173', "https://user-management-ms4f.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', authRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

export default app;
