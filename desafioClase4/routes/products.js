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
    const newProduct = req.body;
    let newProductParse = parseProduct(newProduct);
    if(isComplete(newProductParse)){

    console.log(newProductParse);
    const id = await contenedor.save(newProductParse);
    const product  = await contenedor.getById(id);
    console.log(product);
    res.send(product);
}else{res.send({ error : 'La estructura del producto no es correcta' })}

})
router.put("/:id",async(req,res)=>{
    const putProduct = req.body;
    const  id = parseInt(req.params.id);
    let putProductParse = parseProduct(putProduct);
    const product = await contenedor.getById(id);
    if(product == undefined){res.send({ error : 'producto no encontrado' })
    }else{
        
        CompletePutProduct = CompleteProduct(putProductParse,product);
        contenedor.putById(id,CompletePutProduct);
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
function parseProduct(newProduct){
    let parseProduct = {};
    parseProduct.title = newProduct.title;
    parseProduct.price = newProduct.price;
    parseProduct.thumbnail = newProduct.thumbnail;
    return parseProduct;
}
function isComplete(product){
    if(product.title == undefined){return false}
    if(product.price == undefined){return false}
    if(product.thumbnail == undefined){return false}
    return true;

}
function CompleteProduct(putProduct,Product){
    if(putProduct.title == undefined){putProduct.title = Product.title}
    if(putProduct.price == undefined){putProduct.price = Product.price}
    if(putProduct.thumbnail == undefined){putProduct.thumbnail = Product.thumbnail}
    return putProduct;

}
/* "title": "goma",
    "price": 222.56,
    "thumbnail": "fotoGoma.png"
     */ 




module.exports = router;