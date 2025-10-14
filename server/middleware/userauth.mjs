import jwt from "jsonwebtoken";

export const userAuth=async (req,res,next)=> {
    const {token}=req.cookies;
    try {
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        if(decodeToken.id){
            req.id=decodeToken.id;
        }else{
            return res.json({ sucess: false, message: "Unautherised" })
        }
        next() 
    } catch (error) {
        console.log(error);
        
        return res.json({ sucess: false, message: error.message,from:"trycatchuser" })
    }
    
}