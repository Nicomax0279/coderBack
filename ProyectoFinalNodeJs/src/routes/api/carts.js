import { Router } from "express";
import * as cartsController from '../../controllers/carts.controller.js'

const router = Router()

router.post("/",cartsController.postCart)
router.get("/:id",cartsController.getCartById)
router.post("/:id",cartsController.addProduct)
router.delete("/:id",cartsController.deleteProduct)
router.delete("/:id/delete",cartsController.deleteCart)







export {router as cartsRouter}