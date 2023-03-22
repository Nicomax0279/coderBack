import { Router } from "express";
import * as menssageController from '../../controllers/chat.controller.js'

 
const chatRouter = Router()


chatRouter.get("/",menssageController.getMessages)
chatRouter.post("/",menssageController.postMessage)
chatRouter.delete("/:id",menssageController.deleteMensagge)








export default chatRouter