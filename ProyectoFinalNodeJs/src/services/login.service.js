
import { UserManager } from "../dbOperations/index.js"
import jwt from "jsonwebtoken"
import { options } from "../config/options.js"
import bcrypt from 'bcrypt'
export const loginUser = async(user)=>{
    try {
        const founduser = await UserManager.getbyEmail(user.email)
        
        if(founduser){
            if(await bcrypt.compare(user.password,founduser.password)){
                
                const token = generateToken({email : user.email,
                                             admin: founduser.admin})
                
                return({Response:"login successfully",
                        token:token})
            } else{
                throw  new Error("La contraseña es incorrecta")
            }
            }else{
                throw  new Error("email not registered")  
            }   
    } catch (error) {
        throw new Error(error)
    }

}
export const sinupUser = async(user)=>{
    try {
        const foundUser = await UserManager.getbyEmail(user.email)
 
        if(foundUser){
            throw  new Error("this email is already registered") 
        }else{
            user.password = await bcrypt.hash(user.password,5)
            await UserManager.save(user)
            return("user created successfully")
        }
    } catch (error) {
        throw new Error(error)
    }


}


const generateToken = (user)=>{
    const key = options.key
    return jwt.sign(user,key)


}