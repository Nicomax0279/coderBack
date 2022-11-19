import { Router } from "express";
import productsManager from "../managers/productsManager.js";
const productsRouter = Router();
//////////////////////
//////////////////////
 const admin = true;
/////////////////////
////////////////////

const validation = (req,res,next)=>{
    if(admin){
        next();
    }else{
        //console.log(req.route.stack)
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
        
    
    res.send(responsess)
    

    
})
productsRouter.put("/:id",async(req,res)=>{
    let id = req.params.id
    let product = req.body
    let responsess = await productsManager.put(id,product)
    res.send(responsess)
    

    
})
productsRouter.delete("/:id",async(req,res)=>{
    let id = req.params.id
    
    let responsess = await productsManager.delete(id)
    res.send(responsess)
    

    
})





export {productsRouter}