import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.DB_URL!);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB connected successfully");
        })
        connection.on('error',(err)=>{
            console.log("MongoDB connection failed -> "+ err);
            process.exit();
        })
    }catch(error){
        console.log(error);
    }
}