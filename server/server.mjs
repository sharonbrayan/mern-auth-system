import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/mongodb.mjs";


const app=express();

connectDb()

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));

app.get("/",(req,res) => {
    res.send("Api is working very fine")
})

app.listen(300,()=>{
    console.log("server is running on port 3000")
})