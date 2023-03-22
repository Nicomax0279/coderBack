import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { logger } from "../../logs/logger.js"
import { options } from '../../config/options.js';
let persistence = options.persistence

let MessagesManager;
let UserManager;
let productsManager;
let cartManager;
switch (persistence) {
    
    case "MONGODB":
        logger.info("persistense MODE = MONGODB")
        const { productsModel } = await import("./../models/productsModel.js")
        const  { UserModel } = await import("./../models/userModel.js")
        const {MenssageModel} = await import("./../models/messagesModel.js")
        const {cartModel} = await import("./../models/cartsModel.js")
        const {connectDB} = await import('./../../config/dbConfig.js')
        connectDB()

        const {mongoProducts} = await import("./products/product.daoMongo.js")
        const {mongoUsers} = await import("./users/user.daoMondo.js")
        const {mongoMessages} =  await import("./menssages/message.daoMongo.js")
        const {mongoCarts} =  await import("./carts/cart.daoMongo.js")
        cartManager = new mongoCarts(cartModel);
        UserManager = new mongoUsers(UserModel);   
        productsManager = new mongoProducts(productsModel); 
        MessagesManager = new mongoMessages(MenssageModel);

        break;
    case "SQLITE":
            logger.info("persistense MODE = SQLITE")
            const {sqlProducts} = await import("./products/product.daoSql.js")
            const {sqlUsers} = await import("./users/user.daoSql.js")
            const {sqlMessages} = await import("./menssages/message.daoSql.js")
            const {sqlCarts}  = await import("./carts/cart.daoSql.js")

            cartManager = new sqlCarts(options.sqlite, "carts")
            UserManager = new sqlUsers(options.sqlite, "users");   
            productsManager = new sqlProducts(options.sqlite, "products") 
            MessagesManager = new sqlMessages(options.sqlite, "menssages")
        break;

    case "FS":
            logger.info("persistense MODE = FS")
        const {FsProducts} = await import ("./products/product.daoFs.js")
        const {FsUSers} = await import ("./users/user.daoFs.js")
        const {FsMessages} = await import("./menssages/message.daoFs.js")
        const {FsCarts} = await import("./carts/cart.daofs.js")
        

        cartManager = new FsCarts(__dirname+"./../jsons/carts.json")
        UserManager = new FsUSers(__dirname+"./../jsons/users.json")
        productsManager = new FsProducts(__dirname+"./../jsons/products.json")
        MessagesManager = new  FsMessages(__dirname+"./../jsons/menssages.json")
        break;

    default:
        logger.info("persistense MODE = no pesistece MODE")
        break;
}


export { UserManager, productsManager , MessagesManager, cartManager }