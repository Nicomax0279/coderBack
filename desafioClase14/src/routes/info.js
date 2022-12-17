import { Router } from "express";


const infoRouter = Router();


infoRouter.get("/",(req,res)=>{

const info = {
    arg : process.argv.slice(2),
    SO : process.platform,
    nodeVersion : process.versions.node,
    rss :process.memoryUsage.rss(),
    path :process.cwd(),
    processId: process.pid,
    carpeta: ""

}
res.render('info',info)


}) 


export default infoRouter






