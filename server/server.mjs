import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/mongodb.mjs";
import { authRouter } from "./routes/authroutes.mjs";


const app=express();
app.use(express.json())
connectDb()

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));
app.use('/api/auth',authRouter)
app.get("/",(req,res) => {
    res.send("Api is working very fine")
})

app.listen(300,()=>{
    console.log("server is running on port 3000")
})