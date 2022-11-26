import { Router  } from "express";
import {generateProducts} from '../faker/productsGenerator.js'
const productsTestRouter = Router();

productsTestRouter.get("/",(req,res)=>{
    res.send(generateProducts(5))
})


export {productsTestRouter}