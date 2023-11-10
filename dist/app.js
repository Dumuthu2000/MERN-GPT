import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import appRouter from './routes/index.js';
const app = express();
//middlewares
app.use(express.json());
//should remove in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map