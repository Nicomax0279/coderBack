import * as cartSevice from '../services/cart.service.js'



export const postCart = async(req,res)=>{
   
    try {
      
        const email = req.user.email
        const {productId} = req.body;

        const newCartId = await cartSevice.postCart(productId,email)
        res.status(200).json(newCartId);
    } catch (error) {
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}

export const getCartById = async(req,res)=>{
    const  id = req.params.id; 
 
    try {
        const cart = await cartSevice.getCartById(id)
        cart.products = await cartSevice.getProductsById(id)
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}

export const addProduct = async(req,res)=>{
    const  id = req.params.id;
    const {productId} = req.body 
    try {
        const response = await cartSevice.addProduct(id,productId) 
       
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:`Hubo un error ${error}`})
    }
}
export const deleteProduct = async(req,res)=>{
    const  id = req.params.id;
    const {productId} = req.body 
    try {
        const response = await cartSevice.deleteProduct(id,productId) 
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:`Hubo un error ${error}`})
    }
}
export const deleteCart = async(req,res)=>{
    const  id = req.params.id;
    try {
        const res = cartSevice.deleteCart(id) 
        res.status(200).json(res)
    } catch (error) {
        
        res.status(400).json({message:`Hubo un error ${error}`})
    }
}

