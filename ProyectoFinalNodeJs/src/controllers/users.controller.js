import * as userSevice from '../services/user.service.js'
import { logger } from '../logs/logger.js';

export const getUsers =  async (req,res)=>{
    try{
    let users = await userSevice.getAll();
    res.status(200).json(users);
} catch (error) {
    logger.error(error)
    res.status(400).json({message:`Hubo un error ${error}`});
}   
}

export const getUserById = async(req,res)=>{
    try {
        

    const  id = req.params.id; 

    const user = await userSevice.getUserById(id)
    res.status(200).json(user);
    
} catch (error) {
    logger.error(`error en api users ruta : ${req.path}, peticion : ${req.method}`)  

    res.status(400).json({message:`Hubo un error ${error}`});
}   
}

export const putUser = async(req,res)=>{
   
    const putUser = req.body;
    const  id = req.params.id;
    try {
        let response = await userSevice.putUser(id,putUser)
        
        res.status(200).json(response);
    } catch (error) {
        logger.error(`error en api users ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({message:`Hubo un error ${error}`})
    }
       

}

export const deleteUser = async(req,res)=>{
   

    const  id = req.params.id;
    try{
       let response = await userSevice.deleteUser(id)
        res.send(response);
    } catch (error) {
        logger.error(`error en api users ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}
export const postUser = async(req,res)=>{
   
    try{

       let response = await userSevice.postUser(req.body)
        res.send(response);


    } catch (error) {
        logger.error(`error en api users ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}
