import bcrypt from "bcryptjs"
export const register=async (req,res) => {
    const {uname, password,email}=req.body;
    if(!uname||!password||!email){
        return res.json({success:false,message:"missing credentials"});
    }
    try {
        const hashedPassword=bcrypt.hash(password,10)
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}