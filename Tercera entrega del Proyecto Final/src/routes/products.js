import { Router } from "express";
import productsManager from "../managers/productsManager.js";
const productsRouter = Router();
//////////////////////
//////////////////////
 const admin = true;
/////////////////////
////////////////////
import  {logger}  from "../logs/logger.js";

const validation = (req,res,next)=>{
    if(admin){
        next();
    }else{
        //console.log(req.route.stack)
        logger.warn({error  : `-1, descripcion: ruta ${req.route.path} método ${req.method} no autorizada`})
        res.send({error  : `-1, descripcion: ruta ${req.route.path} método ${req.method} no autorizada`})

    }
}
productsRouter.get("/",async(req,res)=>{
    let products = await productsManager.getAll()
    res.send(products)


})
productsRouter.get("/:id",validation,async(req,res)=>{
    let product = await productsManager.getByid(req.params.id)
    res.send(product)


})
productsRouter.post("/",validation,async(req,res)=>{
    let product = req.body
    let responsess = await productsManager.postProduct(product)
    if(responsess.error){
        logger.error(`error en api Products ruta : ${req.path}, peticion : ${req.method}, error ${responsess.error}`)
    }    
    
    res.redirect("/products")
    

    
})
productsRouter.put("/:id",async(req,res)=>{
    let id = req.params.id
    let product = req.body
    let responsess = await productsManager.put(id,product)
    if(responsess.error){
        logger.error(`error en api Products ruta : ${req.path}, peticion : ${req.method}, error ${responsess.error}`)
    }    
    res.send(responsess)
    

    
})
productsRouter.delete("/:id",async(req,res)=>{
    let id = req.params.id
    
    let responsess = await productsManager.delete(id)
    res.send(responsess)
    

    
})





export {productsRouter}