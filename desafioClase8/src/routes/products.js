import Contenedor from "../class/contenerdorMysql.js";
import { Router  } from "express";
import { mysqloption } from "../options/mysqlconfig.js";
const productsRouter = Router();
import * as url from 'url'



const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const contenedor = new Contenedor(mysqloption,"products");

productsRouter.get("/",async(req,res)=>{
    let products = await contenedor.getAll();
    res.send(products);

})
productsRouter.get("/:id",async(req,res)=>{
    
    //const products =  await contenedor.getAll();

    const  id = parseInt(req.params.id);
    
//     const index = products.findIndex(e=>e.id==id);
//    if(index==-1){
//     res.send({ error : 'producto no encontrado' })
//    }else{
    const product = await contenedor.getById(id)
    res.send(product[0]);
    
})
productsRouter.post("/",async(req,res)=>{
    const newProduct = req.body;
    
    let newProductParse = parseProduct(newProduct);

    if(isComplete(newProductParse)){

    //console.log(newProductParse);
    newProductParse.price = parseFloat( newProductParse.price)
    const id = await contenedor.save(newProductParse);
    //console.log(product);
    //res.send(product);
    res.redirect('/')
  
}else{res.send({ error : 'La estructura del producto no es correcta' })}

})
productsRouter.put("/:id",async(req,res)=>{
    const putProduct = req.body;
    const  id = parseInt(req.params.id);
    let putProductParse = parseProduct(putProduct);
    const product = await contenedor.getById(id);
    if(product[0] == undefined){res.send({ error : 'producto no encontrado' })
    }else{
        
        //let CompletePutProduct = CompleteProduct(putProductParse,product);
        contenedor.putById(id,putProductParse);
        res.send("producto actualizado");


    }})
productsRouter.delete("/:id",async(req,res)=>{

    const  id = parseInt(req.params.id);
    const product = await contenedor.getById(id);
    console.log(product);
    if(product[0] == undefined){res.send({ error : 'producto no encontrado' })
    }else{
        contenedor.deleteById(id);
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




export { productsRouter }