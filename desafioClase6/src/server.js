import express from 'express';
import {Server} from 'socket.io';
import * as url from 'url'
import { productsRouter } from './routes/products.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import {engine} from 'express-handlebars'
const app = express();


app.engine('hbs', engine({extname:'hbs'}))
app.set("view engine",'hbs')


const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))
    app.use(express.static(__dirname+"/public"));
    app.set('views',__dirname+'views')
    const server = app.listen(PORT,()=>console.log(`listening on PORT: ${PORT}`))
//io: wedsocket Servers

const io = new Server(server);
app.use("/api/products",productsRouter);


app.get("/",async(req,res)=>{
    
    

    res.render('home')

})

import {Contenedor} from "./class/contenedor.js";

let menssages = new Contenedor(__dirname+"/jsons/menssages.json");
let contenedor = new Contenedor(__dirname+"/jsons/productos.json");

io.on("connection",async(socket)=>{
    let chat = await menssages.getAll();
    let list = await contenedor.getAll()
    console.log(socket.id)
    socket.broadcast.emit("newUser",socket.id)
    socket.emit("menssages",chat)
    socket.emit("newProduct", list)
    
    
    socket.on("message",async(message)=>{
       const date = new Date()

       message.date = date.toLocaleString();
        await menssages.save(message);
         chat = await menssages.getAll();
         
         //console.log(chat)  
        io.sockets.emit("menssages",chat)
    })
    //table
    socket.on("newProduct",async(data)=>{
        await contenedor.save(data);
         list = await contenedor.getAll()
         //console.log("data",data)

        io.sockets.emit("newProduct", list)

    })
    
    

})

