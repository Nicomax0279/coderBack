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
    name : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    phoneNunber: {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        required : true,
    },

})

export const UserModel = mongoose.model(userCollection,userSchema)