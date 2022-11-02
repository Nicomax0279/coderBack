import path from 'path';
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let filenames = path.join(__dirname , "../db/messagesdb.sqlite")

export const liteOptions ={
   
        client : "sqlite",
        connection:{
            filename: filenames
        }
}

