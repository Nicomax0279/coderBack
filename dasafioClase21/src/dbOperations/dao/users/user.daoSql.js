

import {Contenedor} from "../../managers/contenerdorMysql.js"

class sqlUsers extends Contenedor{
    constructor(options,tableName){
        super(options,tableName)
    }
    getbyEmail = async(email,callback)=>{
        let user = await super.getby("email",email)
    
     
        console.log(await super.getAll())  
        callback(null,user[0])
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
export {sqlUsers}