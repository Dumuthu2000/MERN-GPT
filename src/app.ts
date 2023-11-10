import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';

const app = express();

//middlewares
app.use(express.json());

//should remove in production
app.use(morgan("dev"));
export default app;