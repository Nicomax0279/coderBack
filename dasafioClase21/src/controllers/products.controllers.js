import * as productSevice from '../services/product.service.js'
import { logger } from '../logs/logger.js';

export const getProducts =  async (req,res)=>{
    try{
    let products = await productSevice.getAll();
    res.status(200).json(products);
} catch (error) {
    logger.error(product.error)
    res.status(400).json(product);
}   
}

export const getProductById = async(req,res)=>{
    try {
        
    
    const  id = req.params.id; 
    const product = await productSevice.getById(id)
    res.status(200).json(product);
    
} catch (error) {
    logger.error(product.error)
    res.status(400).json(product);
}   
}

export const postProduct = async(req,res)=>{
   
    const newProduct = req.body;
    try {
        const product = await productSevice.postProduct(newProduct)
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message:`Hubo un error ${error}`})
    }
    
  
    
  
}

export const putProduct = async(req,res)=>{
   
    const putProduct = req.body;
    const  id = req.params.id;
    try {
        let response = await productSevice.putProduct(id,putProduct)
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message:`Hubo un error ${error}`})
    }
       

}

export const deleteProduct = async(req,res)=>{
   

    const  id = req.params.id;
    try{
       let response = await productSevice.deleteProduct(id)
        res.send(response);
    } catch (error) {
        logger.error(`error en api Products ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}
