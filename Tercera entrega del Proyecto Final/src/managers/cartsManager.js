

import {CartsDaoContainer} from '../daos/index.js'
import { logger } from '../logs/logger.js'
import productsManager from './productsManager.js'
const contenedor =  CartsDaoContainer
const cartsManager = {
    newCart : async(producId)=>{
        const newCart = {}
        newCart.products = [producId]
        if(! await productsManager.exist(producId)){
            return({error : `no se encontro el producto con id ${producId} `})

        }else{

        newCart.timestamp = Date.now()
        contenedor
        
        let id = await contenedor.save(newCart)
        return id  }
    },
    delete:async(id)=>{
        let exist = await contenedor.deleteByid(id)
        return exist
    },
    getProductsById : async(id)=>{
        const exist =  await contenedor.exist(id.toString());
    
        if(!exist){
            return ({ error : "el carrito no existe"})
        }
        let cart = await contenedor.getById(id);
       
        
        
        let productsid = cart.products
        
        
        let products = [];
        
        
        for (let productid of productsid){
           let product = await productsManager.getByid(productid)
           products.push(product)
            

        }
        return products



    
    },
    postProducts : async(cartId, productId)=>{
       
        //validar si el producto existe
        
        if( !await productsManager.exist(productId)){
            
            return false
          
        }
        let cart = await contenedor.getById(cartId)
        cart.products.push(productId)
        console.log(cart.postProducts)
        console.log("cart",cart)
        await contenedor.putById(cartId,cart)
        return true


    },
    deleteProducts : async(cartId,productId)=>{
        if(! await productsManager.exist(productId)){
          
            return false
        }
    
        let cart = await contenedor.getById(cartId)
        let index = cart.products.indexOf(productId);
        cart.products.splice(index,1)
        contenedor.putById(cartId,cart) 
        return true





    },
    exist : async(id)=>{
        try {
            let exist = await contenedor.exist(id);
            return exist
        } catch (error) {
            logger.error(error)
        
        }
      
    }










}

export default cartsManager;