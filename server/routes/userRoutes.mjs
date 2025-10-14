import { Router } from "express";
import { userAuth } from "../middleware/userauth.mjs";
import { getUsers } from "../controllers/usercontroller.mjs";

export const userRouter=Router();

userRouter.get('/data',userAuth,getUsers);