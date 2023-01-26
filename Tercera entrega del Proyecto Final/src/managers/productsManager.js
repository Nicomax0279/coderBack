import  {logger}  from "../logs/logger.js";


import {ProductsDaoContainer} from '../daos/index.js'
const contenedor = ProductsDaoContainer
const productsManager = {

     getAll : async()=>{
        let products = await contenedor.getAll();
        return products
    },
    getByid : async(id)=>{
        let exist = await productsManager.exist(id)
        if(!exist){return({error : "producto no encontrado" })
        logger.error("producto no encontrado")}
        let product = await contenedor.getById(id);
        return product


    },
    postProduct : async(product)=>{
         product = productsManager.parseProduct(product)
        if(productsManager.isComplete(product) && productsManager.typesValidation(product)){
            product.price = Number.parseFloat(product.price)
            await contenedor.save(product)
            return ({success : "producto guardado" })     
       
        }else{
        
        return({error :"el formato no es correcto"})
        }

    },
    put : async(id,product)=>{
        let exist = await productsManager.exist(id)
       
        if(!exist){return({error : "producto no encontrado" })}
        product = productsManager.parseProduct(product)
        
        contenedor.putById(id,product)
        return ({success : "producto actualizado" })


      
        // let exist = await productsManager.exist(id)
        // if(!exist){return({error : "producto no encontrado" })}
        // product = productsManager.parseProduct(product)
        // let originProduct = await contenedor.getById(id)
        // productsManager.CompleteProduct(product,originProduct)
        // product.price = Number.parseFloat(product.price).toFixed(2)
        // contenedor.putById(id,product)
        // product.price = Number.parseFloat(product.price)
       
        // return ({success : "producto actualizado" })

    },
    delete : async(id)=>{
        let res =  await contenedor.deleteByid(id);
        //console.log(res)
        if(res){
        return ({success : "producto eliminado" })
        }else{
        return ({error : "producto no encontrado" })    
        }
    },
    parseProduct : (newProduct)=>{
        let parseProduct = {};
        parseProduct.title = newProduct.title;
        parseProduct.price = newProduct.price;
        parseProduct.thumbnail = newProduct.thumbnail;
        return parseProduct;
    },
    isComplete : (product)=>{
        if(product.title == undefined){return false}
        if(product.price == undefined){return false}
        if(product.thumbnail == undefined){return false}
        return true;
    
    },
    typesValidation : (product)=>{
        if(product.title == ""){return false}
       let price =   Number.parseFloat(product.price)
        if(isNaN(price)){return false}else{product.price = price.toFixed(2)} 
        if(product.thumbnail == ""){return false}
        return true;


    },
    
    exist : async(id)=>{
        
        let exist = await contenedor.exist(id);
        return exist


    }
    
    
    









}

export default productsManager