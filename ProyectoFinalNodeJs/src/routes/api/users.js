import { Router } from "express";
import * as usersController from '../../controllers/users.controller.js'


const router = Router()

router.get("/",usersController.getUsers)

router.put("/:id",usersController.putUser)
router.delete("/:id",usersController.deleteUser)
router.get("/:id",usersController.getUserById)
router.post("/",usersController.postUser)

export default router
