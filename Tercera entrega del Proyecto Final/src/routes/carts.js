import { Router } from "express";
import cartsManager from "../managers/cartsManager.js";
import { logger } from "../logs/logger.js";
const cartsRouter = Router();

cartsRouter.post("/",async(req,res)=>{
    let productid = req.body.productID; //[idDelProduto]
    let id = await cartsManager.newCart(productid);
    res.send({id: id})
})
cartsRouter.delete("/:id",async(req,res)=>{
    
    let id = req.params.id
    let exist = await cartsManager.delete(id)
    if(exist){res.send({success : "carrito eliminado" })}else{res.send({error : "carrito no encontrado" })}

    
    
})

cartsRouter.get("/:id/products",async(req,res)=>{
    let id = req.params.id
    let exist = cartsManager.exist(id)
    if(!exist){res.send({error : "carrito no encontrado" })}else{
    let products = await cartsManager.getProductsById(id)
    res.send(products)}
})
cartsRouter.post("/:id/products",async(req,res)=>{
    let id = req.params.id
    let productid = req.body.productID; 
    let existCart = await cartsManager.exist(id)
    if(!existCart){res.send({error : "carrito no encontrado" })}else{
    let existProduct = await cartsManager.postProducts(id,productid)
    
    if(existProduct){res.send({success : "carrito actualizado" })}else{res.send({error : "producto no encontrado" })}}

})
cartsRouter.delete("/:id/products/:idProduct",async(req,res)=>{
    let id = req.params.id
    let productid = req.params.idProduct
    let existCart = await cartsManager.exist(id)
    if(!existCart){res.send({error : "carrito no encontrado" })}else{
    let existProduct = await cartsManager.deleteProducts(id,productid)
    
    if(existProduct){res.send({success : "carrito actualizado" })}else{res.send({error : "producto no encontrado" })}}

})





export {cartsRouter}