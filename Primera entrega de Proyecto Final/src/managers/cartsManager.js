import e from 'express'
import {Contenedor} from '../class/contenedor.js'
import productsManager from './productsManager.js'
const contenedor = new Contenedor("src/jsons/carritos.json")
const cartsManager = {
    newCart : async(producId)=>{
        const newCart = {}
        newCart.products = [producId]
        newCart.timestamp = Date.now()
        contenedor
        console.log(newCart)
        let id = await contenedor.save(newCart)
        return id  
    },
    delete:async(id)=>{
        let exist = await contenedor.deleteByid(id)
        return exist
    },
    getProductsById : async(id)=>{
        let cart = await contenedor.getById(id);
        if(cart == -1){
            return ({ error : "el carrito no existe"})
        }
        let productsid = cart.products
        //console.log(productsid)
        let products = [];
        for (let productid of productsid){
           let product = await productsManager.getByid(productid)
           products.push(product)
            

        }      
        return products
    },
    postProducts : async(cartId, productId)=>{
       
        //validar si el producto existe
       
        if(! await productsManager.exist(productId)){
            return false
        }
        let cart = await contenedor.getById(cartId)
        cart.products.push(productId)
        //console.log("cart",cart)
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
        let exist = await contenedor.exist(id);
        return exist
    }










}

export default cartsManager;