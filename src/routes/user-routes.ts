import Router from 'express';
import { getAllUsers, signInUser, signUpUsers } from '../controllers/user-controller.js';
const userRouter = Router();

userRouter.get("/", getAllUsers) //http//localhost:5000/api/v1/user/
userRouter.post("/signup", signUpUsers); //http//localhost:5000/api/v1/user/signup
userRouter.post("/signin", signInUser); //http//localhost:5000/api/v1/user/signin
export default userRouter;