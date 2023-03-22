import { Router } from "express";
import os from "os";
import compression from "compression";
const infoRouter = Router();




infoRouter.get("/",compression(),(req,res)=>{
  
const info = {
    arg : process.argv.slice(2),
    SO : process.platform,
    nodeVersion : process.versions.node,
    rss :process.memoryUsage.rss(),
    path :process.cwd(),
    processId: process.pid,
    cpus : os.cpus().length,
    carpeta: ""

}
res.json({info:info})


}) 

export default infoRouter






