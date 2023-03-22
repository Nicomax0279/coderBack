import { Router } from "express";
import * as productController from '../../controllers/products.controller.js'
import {isAdmin} from '../../middleware/validations.middlewaremiddleware.js'

const router = Router()

router.get("/",productController.getProducts)



router.post("/",isAdmin,productController.postProduct)

router.put("/:id",isAdmin,productController.putProduct)

router.delete("/:id",isAdmin,productController.deleteProduct)


///router.get("/:id",productController.getProductById)
//router.get("/:category",productController.getProductsByCategory)

router.get("/:id",productController.getBy)



export default router
