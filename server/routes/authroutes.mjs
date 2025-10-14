import { Router } from "express";
import { isAuthenticated, login, logout, register, resertPassword, sendOtp, sendResetOtp, verifyOtp } from "../controllers/authcontroller.mjs";
import { userAuth } from "../middleware/userauth.mjs";
export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendOtp);
authRouter.post('/verify-account', userAuth,verifyOtp);
authRouter.post('/is-authenticated', userAuth,isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resertPassword);