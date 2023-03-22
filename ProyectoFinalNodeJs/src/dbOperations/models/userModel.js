import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password :  {
        type : String,
        required : true,
    },
    name :{
        type : String,
        required : false,
    },
    address :{
        type : String,
        required : false,
    },
    age :{
        type : Number,
        required : false,
    },
    phoneNunber :{
        type : String,
        required : false,
    },
    avatar :{
        type : String,
        required : false,
    },
    admin :{
        type : Boolean,
        require : false
    }
    
},
{ timestamps: true }
)

export const UserModel = mongoose.model(userCollection,userSchema)