import { Router } from "express";
import produstsRouter from './api/products.api.js'
import infoRouter from './api/info.js'
import chatRouter from './api/chat.js'
import loginRouter from "./api/login.js";
import { logger } from "../logs/logger.js";
import { cartsRouter } from "./api/carts.js";
import userRouter from './api/users.js'
import { validateToken } from "../middleware/validations.middlewaremiddleware.js";
const router = Router()


router.get("/",(req,res)=>{
    res.redirect("/profile")
})

router.get("/products",(req,res)=>{
        logger.info(`ruta : ${req.path}, peticion : ${req.method}`)

    res.render("products")
})
router.use("/api/carts",validateToken,cartsRouter)
router.use('/api/products',validateToken,produstsRouter)
router.use('/api/users',validateToken,userRouter)
router.use("/info",infoRouter)
router.use("/api/chat",validateToken,chatRouter)
router.use("/",loginRouter)



export  default router