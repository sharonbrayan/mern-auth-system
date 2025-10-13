import bcrypt from "bcryptjs"
import { userModel } from "../models/usermodel.mjs";
import jwt from "jsonwebtoken"
import "dotenv/config";



export const register = async (req, res) => {
    const { uname, password, email } = req.body;
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
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

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
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })
        return res.json({success:true,message:"logged out successfully"})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}