import {UserManager} from "../dbOperations/dao/index.dao.js" 
import { logger } from "../logs/logger.js"
import bcrypt from 'bcrypt'



export const getAll = async()=>{
    try {
        const users = await UserManager.getAll()
        return users
    } catch (error) {
        throw new Error(error)
    }
}
export const getUserById = async(id)=>{
    try {
        let exist = await UserManager.exist(id)
        if(!exist){ logger.error("user not found");throw new Error("user not found" )
        }
        let user = await UserManager.getById(id);
        return user 
    } catch (error) {
        throw new Error(error)
    }
   
}
export const putUser = async (id,user)=>{
    try{
    let exist = await UserManager.exist(id)
        
    
        if(!exist){ throw new Error("user not found" )}

        if(user.password){
            user.password = await bcrypt.hash(user.password,5)
        }
        await UserManager.putById(id,user)
        return ({success : "updated user" })
    }catch(error){
        throw new Error(error)
    }
}
export const deleteUser = async(id)=>{
    let res =  await UserManager.deleteByid(id);
    //console.log(res)
    if(res){
    return ({success : "User Deleted" })
    }else{
    throw new Error("user not found")    
    }

}
export const postUser = async(user)=>{
    try {
        const foundUser = await UserManager.getbyEmail(user.email)
        console.log(foundUser)
        if(foundUser){
            throw  new Error("this email is already registered") 
        }else{
            user.password = await bcrypt.hash(user.password,5)
            await UserManager.save(user)
            return({success:"user created successfully"})
        }
    } catch (error) {
        throw new Error(error)
    }

}

