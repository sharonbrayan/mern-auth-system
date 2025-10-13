import {Router} from "express";
import { login, logout, register } from "../controllers/authcontroller.mjs";
export const authRouter=Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
    