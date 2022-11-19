import { Contenedor } from "../../class/contenedor.js";
 export class ProductsDaoFiles extends Contenedor{
    constructor(fileName){
        super(fileName)
    }

    async putById(id,product){
        
        let originProduct = await super.getById(id)
        this.CompleteProduct(product,originProduct)
        product.price = Number.parseFloat(product.price).toFixed(2)
        product.price = Number.parseFloat(product.price)
        super.putById(id,product)
        



        
    }
    CompleteProduct(putProduct,Product){
        if(putProduct.title == undefined){putProduct.title = Product.title}
        if(putProduct.price == undefined){putProduct.price = Product.price}
        if(putProduct.thumbnail == undefined){putProduct.thumbnail = Product.thumbnail}
        return putProduct;
    
    }



}

