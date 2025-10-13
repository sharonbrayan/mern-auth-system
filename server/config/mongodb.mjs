import mongoose from "mongoose";
export const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("cnnected to the db");
        });
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(`${error}`)
    } 
}