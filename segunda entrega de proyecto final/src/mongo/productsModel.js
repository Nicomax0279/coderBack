import mongoose from "mongoose";

const productsCollection = "products"
 const productsSchema = new mongoose.Schema(
{
    title :{
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    thumbnail: {
        type : String,
        required : true
    }
}

)

 export const productsModel = mongoose.model(productsCollection,productsSchema)
