import mongoose from "mongoose";
 const cartsCollection = "carts"
 const cartsSchema = new mongoose.Schema(
{
    products :{
        type : [
            { type : String }
        ]
        
    },
    timestamp: {
        type : String,
        required : true
    },
    
}

)

 export const cartModel = mongoose.model(cartsCollection,cartsSchema)
