
import {cartManager,productsManager} from '../dbOperations/index.js'


export const postCart = async (productId,email)=>{  
    try {
        
        if(await productsManager.exist(productId)){
        const cart = {
            email : email,
            products : [productId]
        }
        
        const parseCart = parseNewCart(cart) 
        const id = await cartManager.save(parseCart)
        return id
    }else{
        throw new Error("product not found")
    }
    } catch (error) {
        throw new Error(error)
    }    
       
      
}

export const getCartById = async (id)=>{
    try {
        const cart = await cartManager.getById(id)
        return cart
    } catch (error) {
        return error
    }
}
export const getProductsById = async(id)=>{
    const exist =  await cartManager.exist(id);

    if(!exist){
        throw new Error("Cart not found ")
    }
    let cart = await cartManager.getById(id);
   
    
    
    let productsid = cart.products
    
    
    let products = [];
    
    
    for (let productid of productsid){
       let product = await productsManager.getById(productid)
       products.push(product)
        

    }
    return products




}
export const addProduct = async (cartId, productId)=>{
    try {
        const exist =  await cartManager.exist(cartId)
        if(!exist){
            throw new Error("Cart not found ")
         }
        if( !await productsManager.exist(productId)){
            
            throw new Error("product id not exist")
          
        }
        let cart = await cartManager.getById(cartId)
        cart.products.push(productId)
        await cartManager.putById(cartId,cart)
        return "product added successfully"

    } catch (error) {
        throw new Error(error)
    }




}
export const deleteProduct = async (cartId, productId)=>{
    try {
        const exist =  await cartManager.exist(cartId);
        if(!exist){
            throw new Error("Cart not found ")
         }
        if( !await productsManager.exist(productId)){
            
            throw new Error("product id not exist")
          
        }

        let cart = await cartManager.getById(cartId)
        
        
        let index = cart.products.indexOf(productId);
        if(index == -1){
            deleteCart(cart)         
            throw new Error("product not found in cart")
        }
        cart.products.splice(index,1)

        await cartManager.putById(cartId, cart)
        return "product deleted successfully"

    } catch (error) {
        throw new Error(error)
    }




}

export const deleteCart = async(id)=>{
    try {
        const res = await cartManager.deleteByid(id)
        if(res){
            return  "cart deleted successfully"
        }else{
            throw new Error("cart delete error")
        }

    } catch (error) {
        throw new Error(error)
    }


}

function parseNewCart(cart){
    let parseCart = {}
    try {
        parseCart.products = cart.products
        parseCart.email = cart.email
        return parseCart

    } catch (error) {
        return error
    }
}

