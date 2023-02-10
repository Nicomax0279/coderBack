import { Router } from "express";
import produstsRouter from './api/products.api.js'
import lsRouter from './api/loginSys.js'
import infoRouter from './api/info.js'
import randomRouter from './api/randoms.js'
import chatRouter from './api/chat.js'
import { logger } from "../logs/logger.js";
const router = Router()


router.get("/",(req,res)=>{
    res.redirect("/profile")
})

router.get("/products",(req,res)=>{
        logger.info(`ruta : ${req.path}, peticion : ${req.method}`)

    res.render("products")
})
router.use('/api/products',produstsRouter)
router.use("/",lsRouter)
router.use("/info",infoRouter)
router.use("/api/randoms",randomRouter)
router.use("/chat",chatRouter)



export  default router