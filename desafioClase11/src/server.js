import  express from "express";
import { productsRouter } from './routes/products.js'
import {engine} from 'express-handlebars'
import { productsTestRouter } from './routes/productsTest.js';
import * as url from 'url'
import {Server} from 'socket.io';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import {normalize,denormalize,schema} from 'normalizr'


const app = express()
app.engine('hbs', engine({extname:'hbs'}))
app.set("view engine",'hbs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
    app.use(express.static(__dirname+"/public"));
    app.set('views',__dirname+'views')
const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=>console.log(`listening on PORT: ${PORT}`))

app.use("/api/products",productsRouter)
app.use("/api/products-test",productsTestRouter)
app.get("/",async(req,res)=>{
    
    

    res.render('home')

})
import {Contenedor} from './class/contenedor.js'
const  menssages = new Contenedor("mensaje.json")
const io = new Server(server);


app.delete("/",(req,res)=>{menssages.deleteAll()})
io.on("connection",async(socket)=>{
    let chat =  await getChatComp()


    console.log(socket.id)
    socket.broadcast.emit("newUser",socket.id)
    socket.emit("menssages",chat)

    
    
    socket.on("message",async(message)=>{
       const date = new Date()

       message.date = date.toLocaleString();
        await menssages.save(message);
        chat = await getChatComp()
         
         //console.log(chat)  
        io.sockets.emit("menssages",chat)
    })
})
const getChatComp = async ()=>{
    let chat =  await menssages.getAll()
    chat = comprecion(chat)
    
    return chat
}

const authorSchema = new schema.Entity("authors",{},{idAttribute:"mail"});
const messageSchema = new schema.Entity("messages", {author: authorSchema});
const chatSchema = new schema.Entity("chat", {
    messages:[messageSchema]}
    , {idAttribute:"id"});
function comprecion(chat){
    

    const normalizerChat = normalize({id:"chatHistory", messages:chat}, chatSchema);
    // console.log(JSON.stringify(normalizerChat,null,"\t"));
    // let  lot = denormalize(normalizerChat.result,chatSchema,authorSchema)
    return normalizerChat



}