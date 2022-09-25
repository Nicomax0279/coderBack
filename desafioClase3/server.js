const express = require("express");
const Contenedor = require("./contenedor.js");
const productos = new Contenedor("productos.json");
const app = express();
//productos.getAll().then(r=>console.log(r));
app.listen(8080,()=>console.log("listen 8080"));
app.get("/productos", async (req,res)=>{
    const lista = await productos.getAll();
    res.send(lista);

})
app.get("/productoRamdom", async (req,res)=>{
    const lista = await productos.getAll();
    const index = parseInt(Math.random()*lista.length)  ;
    producto = lista[index];
    //console.log(index);
    res.send(producto);


})