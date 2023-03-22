
import * as dotenv from 'dotenv';
dotenv.config({
    path : ".env"
})
import path from 'path';
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let filenames = path.join(__dirname,"../dbOperations/sqlite/db.sqlite")


export const options = {
 PORT:process.env.PORT || 8080,
 mongoDB:process.env.BASE_DE_DATOS,
 MODE: process.env.MODE,
 persistence : process.env.PERSISTENCE,
 sqlite: {client : "sqlite",
 connection:{
     filename: filenames
 }},
 key: process.env.KEY
}



