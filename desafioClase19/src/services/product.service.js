import  {logger}  from "../logs/logger.js";

import {productsManager}   from "../dbOperations/index.js"

export const getAll = async ()=>{
    return await  productsManager.getAll()
}

export const getById = async (id)=>{
    let exist = await productsManager.exist(id)
        if(!exist){ logger.error("producto no encontrado");return({error : "producto no encontrado" })
        }
        let product = await contenedor.getById(id);
        return product
}

export const postProduct = async(product)=>{
    product = parseProduct(product)
    if(isComplete(product) && typesValidation(product)){
        product.price = Number.parseFloat(product.price)
        await productsManager.save(product)
        return ({success : "producto guardado" })     
   
    }else{
    
    return({error :"el formato no es correcto"})
    }
} 
export  const putProduct = async(id,product)=>{
    let exist = await exist(id)
       
        if(!exist){return({error : "producto no encontrado" })}
        product = parseProduct(product)
        
        productsManager.putById(id,product)
        return ({success : "producto actualizado" })
}
export const deleteProduct = async(id)=>{
    let res =  await productsManager.deleteByid(id);
    //console.log(res)
    if(res){
    return ({success : "producto eliminado" })
    }else{
    return ({error : "producto no encontrado" })    
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
function parseProduct(product){
    let parseProduct = {};
    parseProduct.title = newProduct.title;
    parseProduct.price = newProduct.price;
    parseProduct.thumbnail = newProduct.thumbnail;
    return parseProduct;
}