import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
//middlewares
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map