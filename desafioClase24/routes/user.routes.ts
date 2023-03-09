import { Router } from "../depts.ts";
import {findUserAll,createUser,findUserById,putUserById,deleteUserById} from '../controller/user.controller.ts'
export const userRouter = new Router()
    .get("/users",findUserAll)
    .get("/users/:id", findUserById)
    .post("/users", createUser)
    .put("/users/:id",putUserById)
    .delete("/users/:id",deleteUserById)