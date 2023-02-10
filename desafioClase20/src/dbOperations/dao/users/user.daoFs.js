import { Contenedor } from "../../managers/contenedorFs.js";

class FsUSers extends Contenedor{
    constructor(paht){
        super(paht)
    }
    getbyEmail = async(email,callback)=>{
        let users  =  await super.getAll()
        let user = users.find(Element=> Element.email == email)
       

        callback(null, user);         
         
     }  
     newUser = async(newuser,callback)=>{
        
        let userCreated = await super.save(newuser)
        
         callback(null,userCreated)
 
      }
      passportId = async(id,callback)=>{
         
         let user = await super.getById(id)
          callback(null,user)
  
       }


}

export {FsUSers}