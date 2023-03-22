import { Router } from "express";
import * as loginControllers from '../../controllers/login.controller.js'

 
const loginRouter = Router()



loginRouter.post("/login",loginControllers.login)
loginRouter.post("/sinup",loginControllers.sinup)








export default loginRouter