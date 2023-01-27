import express from 'express';
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import * as dotenv from 'dotenv';
import  parsedArgs  from "minimist";
import { dirname } from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url)); 
import cartsManager from './managers/cartsManager.js';
import  {logger}  from "./logs/logger.js";
import passport from "./passport/passport.js";

import lsRouter from "./routes/loginSys.js";
import { productsRouter } from "./routes/products.js";
import { cartsRouter } from "./routes/carts.js";

import cluster from "cluster";
import os from 'os';

dotenv.config({
    path : ".env"
})
const options = { 
    default : {p: 8080 , m: "FORK"},
    alias : { p : "port" , m : "mode"}
}
const argvs = parsedArgs(process.argv.slice(2),options)
const PORT = argvs.port
const MODE = argvs.mode
const mongoUrl = process.env.BASE_DE_DATOS;


mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
},(error)=>{
    if(error) return console.log(`Hubo un error conectandose a la base ${error}`);
    //console.log("conexion a la base de datos de manera exitosa")
});


//const PORT = process.env.PORT || 8080
const app = express()



const infologger = (req,res,next)=>{
    logger.info(`ruta : ${req.path}, peticion : ${req.method}`)
        next();
    
}


app.use(infologger)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"));
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
app.set("views", __dirname+"/views");
app.set("view engine", ".hbs");








if(MODE === "CLUSTER" && cluster.isPrimary ){
    const cpus = os.cpus().length - 6
    for (let index = 0; index < cpus; index++) {
        cluster.fork()       
    }

    cluster.on('exit',(worker)=>{
        console.log(`El proceso ${worker.id} FALLO`)
        cluster.fork()
    })
}else{
    app.listen(PORT, ()=>logger.info(`Server listening on port ${PORT} processID: ${process.pid}`));
}

app.use(session({
    secret:"clave", 
    store : MongoStore.create({
        mongoUrl : mongoUrl
    }),
    cookie:{
        maxAge : 6000000
    },
    resave:false,
    saveUninitialized:false,
    
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/",lsRouter)
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)

app.get("/products",(req,res)=>{
    if(req.session.user){
        res.render("products")
    }else{
        res.redirect('/login')
    }
    
})
app.get("/cart",(req,res)=>{
    if(req.session.user){
        res.render("cart")
    }else{
        res.redirect('/login')
    }
    

})


app.get("/",(req,res)=>{
    res.redirect("/profile")
})
import { pedidoMessage,confirmacionDelPedido,pedidowhatapp } from './class/mensages.js';
app.post("/pedido/:id",async (req,res)=>{
    const id = req.params.id
    const products = await cartsManager.getProductsById(id)
    const pedido = {
        products : products,
        user : req.session.user.email

    }
    pedidoMessage(pedido,req.user.email)
    //confirmacionDelPedido(pedido,req.user.email)
    pedidowhatapp(pedido,req.user.email)
    
    

    
})






app.use(function(req,res){
    logger.warn(` error : -2, descripcion: ruta ${req.path} método ${req.method} no implementada`)
    res.status(404).send({ error : `-2, descripcion: ruta ${req.path} método ${req.method} no implementada`}
    )


})

