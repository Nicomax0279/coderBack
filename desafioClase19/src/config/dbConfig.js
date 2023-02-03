import mongoose from "mongoose";
import { options } from "./options.js";

export const connectDB = ()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.BASE_DE_DATOS,(error)=>{
        if(error) return console.log(`Hubo un error al conectar la base de datos ${error}`);
        console.log("conexion exitosa!")
    });
}