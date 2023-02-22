import {Contenedor} from "../../managers/contenedorMongodb.js"
import { UserModel } from "../../models/userModel.js"


class mongoUsers extends Contenedor{
    constructor(model){
        super(model)
    }
    getbyEmail = async(email,callback)=>{
        let user =  await UserModel.findOne({email:email})
        callback(null, user);     

         
    }
    newUser = async(newuser,callback)=>{
        
        let userCreated = await super.save(newuser)
        
         callback(null,userCreated)
 
      }
      passportId = async(id,callback)=>{
         
         let user = await super.getById(id)
         console.log(user)
          callback(null,user)
  
       }
        




}
export {mongoUsers}