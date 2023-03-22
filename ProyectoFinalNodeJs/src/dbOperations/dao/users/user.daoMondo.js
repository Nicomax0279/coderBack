import {Contenedor} from "../../managers/contenedorMongodb.js"
import { UserModel } from "../../models/userModel.js"


class mongoUsers extends Contenedor{
    constructor(model){
        super(model)
    }
    getbyEmail = async(email)=>{
        try {
            let user =  await UserModel.findOne({email:email})
            return user
        } catch (error) {
            throw new Error(error)
        }
          

         
    }
    
        
  
        




}
export {mongoUsers}