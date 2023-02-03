import express from 'express'
import {connectDB} from './config/dbConfig.js'
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { options } from './config/options.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export {__dirname} 
import session from "express-session";
import handlebars from "express-handlebars";
import passport from "./passport/passport.js";
import MongoStore from "connect-mongo";
import  {logger}  from "./logs/logger.js";


import Mainrouter from './routes/index.js'
dotenv.config({
    path : ".env"
})


const app = express()
const port = options.PORT
connectDB()


const MODE = options.MODE
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
    app.listen(port, () => console.log(`listening on port ${port}`))
}





const mongoUrl = process.env.BASE_DE_DATOS

app.use(session({
    secret:"clave", 
    store : MongoStore.create({
        mongoUrl : mongoUrl
    }),
    cookie:{
        maxAge : 600000
    },
    resave:false,
    saveUninitialized:false,
    
}));
const infologger = (req,res,next)=>{
    logger.info(`ruta : ${req.path}, peticion : ${req.method}`)
        next();
    
}


app.use(infologger)
app.use(express.static(__dirname+"/public"));
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
app.set("views", __dirname+"/views");
app.set("view engine", ".hbs");
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

app.use(passport.initialize());
app.use(passport.session());

app.use("/",Mainrouter)


 app.get("*",(req,res)=>{
    logger.warn(`RUTA inexistentes  ruta : ${req.path}, peticion : ${req.method}`)
 })