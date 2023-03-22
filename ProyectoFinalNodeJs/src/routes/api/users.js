import { Router } from "express";
import * as usersController from '../../controllers/users.controller.js'
import {isAdmin} from "../../middleware/validations.middlewaremiddleware.js"

const router = Router()

router.get("/",isAdmin,usersController.getUsers)
router.put("/:id",isAdmin ,usersController.putUser)
router.delete("/:id",isAdmin,usersController.deleteUser)
router.get("/:id",isAdmin,usersController.getUserById)
router.post("/",isAdmin,usersController.postUser)

export default router
