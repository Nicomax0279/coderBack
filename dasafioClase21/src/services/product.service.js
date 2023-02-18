import  {logger}  from "../logs/logger.js";

import {productsManager}   from "../dbOperations/index.js"

export const getAll = async ()=>{
    return await  productsManager.getAll()
}

export const getById = async (id)=>{
    let exist = await productsManager.exist(id)
        if(!exist){ logger.error("producto no encontrado");throw new Error("producto no encontrado" )
        }
        let product = await productsManager.getById(id);
        product = parseProductWidtId(product)
        return product 
}

export const postProduct = async(product)=>{
    product = parseProduct(product)
    if(isComplete(product) && typesValidation(product)){
        product.price = Number.parseFloat(product.price)
        let id = await productsManager.save(product)
        return ({success : "producto guardado" , id:id})     
   
    }else{
    throw new Error("el formato no es correcto")
    }
} 
export  const putProduct = async(id,product)=>{
    try{
    let exist = await productsManager.exist(id)
   
    
        if(!exist){ throw new Error("producto no encontrado" )}
        product = parseProduct(product)
        
        await productsManager.putById(id,product)
        return ({success : "producto actualizado" })
    }catch(error){
        throw new Error(error)
    }
}
export const deleteProduct = async(id)=>{
    let res =  await productsManager.deleteByid(id);
    //console.log(res)
    if(res){
    return ({success : "producto eliminado" })
    }else{
    throw new Error("producto no encontrado")    
    }

}











function isComplete(product){
    if(product.title == undefined){return false}
    if(product.price == undefined){return false}
    if(product.thumbnail == undefined){return false}
    return true;
}
function typesValidation(product){
    if(product.title == ""){return false}
    let price =   Number.parseFloat(product.price)
     if(isNaN(price)){return false}else{product.price = price.toFixed(2)} 
     if(product.thumbnail == ""){return false}
     return true;
}
function parseProduct(newProduct){
    let parseProduct = {};
    parseProduct.title = newProduct.title;
    parseProduct.price = newProduct.price;
    parseProduct.thumbnail = newProduct.thumbnail;
    return parseProduct;
}
function parseProductWidtId(newProduct){
    let parseProduct = {};
    if(newProduct._id){
        parseProduct.id = newProduct._id
    }else{
        parseProduct.id = newProduct.id
    } 
    parseProduct.title = newProduct.title;
    parseProduct.price = newProduct.price;
    parseProduct.thumbnail = newProduct.thumbnail;
    return parseProduct;
}