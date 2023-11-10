import { Router } from 'express';
import userRouter from './user-routes.js';
import chatRouter from './chat-router.js';

const appRouter = Router();
appRouter.use("/user", userRouter); //http//localhost:5000/api/v1/user
appRouter.use("/chat", chatRouter); //http//localhost:5000/api/v1/chats

export default appRouter;