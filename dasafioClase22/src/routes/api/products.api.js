import { Router } from "express";
import * as productController from '../../controllers/products.controllers.js'


const router = Router()

router.get("/",productController.getProducts)



router.post("/",productController.postProduct)

router.put("/:id",productController.putProduct)

router.delete("/:id",productController.deleteProduct)


router.get("/:id",productController.getProductById)




export default router
