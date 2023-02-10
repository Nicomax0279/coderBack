import * as productSevice from '../services/product.service.js'
import { logger } from '../logs/logger.js';

export const getProducts =  async (req,res)=>{
    let products = await productSevice.getAll();
    res.send(products);

}

export const getProductById = async(req,res)=>{
       
    const  id = parseInt(req.params.id); 
    const product = await productSevice.getById(id)
    if(product.error){
        logger.error(product.error)
        res.send(product);
    }else{
    res.send(product);
    }
}

export const postProduct = async(req,res)=>{
   
    const newProduct = req.body;
    
    productSevice.postProduct(newProduct)
  
    res.redirect('/products')
  
}

export const putProduct = async(req,res)=>{
   
    const putProduct = req.body;
    const  id = parseInt(req.params.id);
        productSevice.putProduct(id,putProduct)
        res.send("producto actualizado");

}

export const deleteProduct = async(req,res)=>{
   

    const  id = parseInt(req.params.id);
    const product = await productSevice.getById(id);
    
    if(product[0] == undefined){res.send({ error : 'producto no encontrado' })  
    logger.error(`error en api Products ruta : ${req.path}, peticion : ${req.method}`)    
}else{
        productSevice.deleteProduct(id)
        res.send("producto eliminado");
    }

}
