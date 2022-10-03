const express = require('express');
const Contenedor = require('../contenedor');
const router = express.Router();
const contenedor = new Contenedor("productos.json");



router.get("/",async(req,res)=>{
    
    const products =  await contenedor.getAll();
    //console.log(products);
    res.send(products);
})
router.get("/:id",async(req,res)=>{
    
    const products =  await contenedor.getAll();

    const  id = parseInt(req.params.id);
    
    const index = products.findIndex(e=>e.id==id);
   if(index==-1){
    res.send({ error : 'producto no encontrado' })
   }else{

    res.send(products[index]);
    }
})
router.post("/",async(req,res)=>{
    newProduct = req.body;
    console.log(newProduct);
    const id = await contenedor.save(newProduct);
    const product  = await contenedor.getById(id);
    console.log(product);
    res.send(product);
})
router.put("/:id",async(req,res)=>{
    const putProduct = req.body;
    const  id = parseInt(req.params.id);

    const product = await contenedor.getById(id);
    if(product == undefined){res.send({ error : 'producto no encontrado' })
    }else{
        contenedor.putById(id,putProduct);
        res.send("producto actualizado");


    }})
router.delete("/:id",async(req,res)=>{

    const  id = parseInt(req.params.id);
    const product = await contenedor.getById(id);
    console.log(product);
    if(product == undefined){res.send({ error : 'producto no encontrado' })
    }else{
        contenedor.deleteByid(id);
        res.send("producto eliminado");
    }

    
    



})






module.exports = router;