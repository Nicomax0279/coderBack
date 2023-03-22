import express from 'express'

import * as dotenv from 'dotenv';
dotenv.config({
    path : ".env"
})

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { options } from './config/options.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export {__dirname} 


import  {logger}  from "./logs/logger.js";


import Mainrouter from './routes/index.js'

const app = express()
const port = options.PORT



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






const infologger = (req,res,next)=>{
    logger.info(`ruta : ${req.path}, peticion : ${req.method}`)
        next();
    
}


app.use(infologger)
app.use(express.static(__dirname+"/public"));
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 


app.use("/",Mainrouter)


app.get("*",(req,res)=>{
    logger.warn(`RUTA inexistentes  ruta : ${req.path}, peticion : ${req.method}`)
})



export {app}