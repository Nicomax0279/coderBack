 let ProductsDaoContainer;
 let CartsDaoContainer;
import {cartModel} from "../mongo/cartsModel.js"
import {productsModel} from "../mongo/productsModel.js"

import { mongoConfig } from "../config/dbConfig.js";

let databaseType = "mongo"

switch (databaseType) {
    case "archivos":
        const {ProductsDaoFiles} = await import("./products/productsFiles.js");
        const {CartsDaoFiles} = await import("./carts/cartsFilres.js");
        ProductsDaoContainer = new ProductsDaoFiles("productos.json")
        CartsDaoContainer = new CartsDaoFiles("carritos.json")
        break;
    case "mongo":
        const {ProductsDaoMongo} = await import("./products/productsMongo.js");
        const {CartsDaoMongo} = await import("./carts/cartsMongo.js");
        ProductsDaoContainer = new ProductsDaoMongo(mongoConfig,productsModel)
        CartsDaoContainer = new CartsDaoMongo(mongoConfig,cartModel)


        break;
    case "sql":



    break;    
    default:
        break;
}
export {CartsDaoContainer,ProductsDaoContainer}