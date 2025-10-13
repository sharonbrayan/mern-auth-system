import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter the name"],
        },
        password:{
            type:String,
            required:[true,"please enter the password"],
        },
        email:{
            type:String,
            required:[true,"please enter the email"],
            unique:[true,"email already exists in database"]
        },
        verifyotp:{
            type:String,
            default:""
        },
        verifyotpExpiryAt:{
            type:Number,
            default:0
        },
        isAccountVerified:{
            type:Boolean,
            default:false
        },
         restOtp:{
            type:String,
            default:''
        },
        restOtpExpiryAt:{
            type:Number,
            default:0
        },
    }
)

export const userModel=mongoose.models.user || mongoose.model('User',userSchema,'user');