import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/mongodb.mjs";
import { authRouter } from "./routes/authroutes.mjs";
import { userRouter } from "./routes/userRoutes.mjs";


const app=express();
app.use(express.json())
connectDb()

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']; 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter)
app.get("/",(req,res) => {
    res.send("Api is working very fine")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})