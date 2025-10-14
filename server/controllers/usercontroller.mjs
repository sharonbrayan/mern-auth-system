import { userModel } from "../models/usermodel.mjs";

export const getUsers = async (req, res) => {
    const { id } = req;
    try {
        const user = await userModel.findById(id);
        console.log(id);
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}