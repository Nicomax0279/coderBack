import mongoose from "mongoose";

const menssage = "menssages";

const menssageSchema = new mongoose.Schema({
    menssage : {
        type : String,
        required : true
    },
    date :  {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true
    }
    
})

export const MenssageModel = mongoose.model(menssage,menssageSchema)