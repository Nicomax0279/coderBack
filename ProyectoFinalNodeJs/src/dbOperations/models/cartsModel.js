import mongoose from "mongoose";
 const cartsCollection = "carts"
 const cartsSchema = new mongoose.Schema(
{
    products :{
        type : [
            { type : String }
        ]
        
    },
    email :{
        type : String,
        required : true
        
    }
    
    
},
{ timestamps: true }

)

 export const cartModel = mongoose.model(cartsCollection,cartsSchema)
