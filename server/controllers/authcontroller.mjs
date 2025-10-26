import bcrypt from "bcryptjs"
import { userModel } from "../models/usermodel.mjs";
import jwt from "jsonwebtoken"
import "dotenv/config";
import { transport } from "../config/nodemailer.mjs";


//USER REGISTER CONTROLLER
export const register = async (req, res) => {
    const { uname, password, email } = req.body;
    console.log(uname,password,email);
    if (!uname || !password || !email) {
        return res.json({ success: false, message: "missingg credentials" });
    }
    try {
        const existingUser = await userModel.findOne({ uname });
        if (existingUser) {
            return res.json({ success: false, message: "user already exits in db" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name: uname, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })

        //SENDING WELCOME EMAIL
        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome To Our Application",
            text: `Your account has been created successfully with email ${email}`
        }
        await transport.sendMail(mailoptions);


        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


//USER LOGIN CONTROLLER
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "enter all credentials" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        } else {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.json({ success: false, message: "invalid or incorrect password" })
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            return res.json({ success: true })

        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


//USER LOGOUT CONTROLLER
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })
        return res.json({ success: true, message: "logged out successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


//USER EMAIL CONFIRMATION OTP SENDER CONTROLLER

export const sendOtp = async (req, res) => {
    try {
        const { id } = req;
        const user = await userModel.findById(id);
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "user email already verified" })
        }
        const otp = String(Math.floor(Math.random() * 900000));
        user.verifyotp = otp;
        user.verifyotpExpiryAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify email",
            text: `Your otp to verify your email is ${otp}`
        }
        await transport.sendMail(mailoptions);
        return res.json({ success: true, message: "otp send successfully" })
    } catch (error) {
        console.log(error)

        return res.json({ success: false, message: error.message, from: "trycatchcont" });
    }
}



//USER OTP VERIFYING CONTROLLER

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    const { id } = req;
    if (!otp || !id) {
        return res.json({ success: false, message: "missing credentials" })
    }
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        if (user.verifyotp === '' || otp !== user.verifyotp) {
            return res.json({ success: false, message: "incorrect otp" })
        }
        if (user.verifyotpExpiryAt < Date.now()) {
            return res.json({ success: false, message: "otp expired" })
        }
        user.isAccountVerified = true;
        user.verifyotp = '';
        user.verifyotpExpiryAt = 0;
        await user.save();
        return res.json({ success: true, message: "email verified successfuly" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


//CHECKING IF USER IS AUTHENTICATED

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ sucuess: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


//RESET PASSWORD USING OTP

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is not defined" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        const otp = String(Math.floor(Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpiryAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset OTP",
            text: `Your otp to reset your password is ${otp}`
        }
        await transport.sendMail(mailoptions);
        return res.json({ success: true, message: "otp send successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


//RESET USER PASSWORD

export const resertPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword){
        return res.json({success:false,message:"Missing credentials"})
    }
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        if (user.resetOtp === '' || otp !== user.resetOtp) {
            return res.json({ success: false, message: "incorrect otp" })
        }
        if (user.resetOtpExpiryAt < Date.now()) {
            return res.json({ success: false, message: "otp expired" })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpiryAt=0;
        await user.save();
        return res.json({ success: true, message: "password changed successfully" })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}