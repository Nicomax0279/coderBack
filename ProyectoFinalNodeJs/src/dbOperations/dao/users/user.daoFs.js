import { Contenedor } from "../../managers/contenedorFs.js";

class FsUSers extends Contenedor{
    constructor(paht){
        super(paht)
    }
    getbyEmail = async(emails)=>{
        let users  =  await super.getAll()
        let user = users.find(Element=> Element.email == email)
         return user

               
         
     }  
     


}

export {FsUSers}