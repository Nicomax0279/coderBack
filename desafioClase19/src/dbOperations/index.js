import {Contenedor} from "./managers/contenedorMongodb.js";
import { UserModel } from "./models/userModel.js";
import { productsModel } from "./models/productsModel.js";


export const UserManager = new Contenedor(UserModel);
export const productsManager = new Contenedor(productsModel) 

