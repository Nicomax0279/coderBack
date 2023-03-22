import { logger } from '../logs/logger.js';
import * as loginService from '../services/login.service.js'

export const login = async(req,res)=>{
   
    try{

       let response = await loginService.loginUser(req.body)
        res.send(response);


    } catch (error) {
        logger.error(`error en api users ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}

export const sinup = async(req,res)=>{
   
    try{

       let response = await loginService.sinupUser(req.body)
        res.send(response);


    } catch (error) {
        logger.error(`error en api users ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({message:`Hubo un error ${error}`})
    }

}


