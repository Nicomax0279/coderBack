import { logger } from '../logs/logger.js'
import * as menssageService from '../services/menssage.service.js'



export const getMessages = async(req,res)=>{
    try {
  
     const chat = await menssageService.getAllMenssages()
     res.status(200).json({chat:chat})
      
      
    } catch (error) {
     res.status(400).json({error:`${error}`})
    }
     
   }
   
export const postMessage = async(req,res)=>{
    try {
       const menssage = req.body.menssage;
       let date = new Date()
       date = date.toLocaleString();
       const chat ={
        menssage : menssage,
        date: date,
        username : req.user.email
       }
       await menssageService.postMessage(chat);
       res.status(200).json({success:"message added successfully"})
    } catch (error) {
       res.status(400).json({error:`${error}`});
    }   
   }
   export const deleteMensagge = async(req,res)=>{
   

    const  id = req.params.id;
    try{
       let response = await menssageService.deleteMensagge(id)
        res.status(200).send(response);
    } catch (error) {
        logger.error(`error en api Products ruta : ${req.path}, peticion : ${req.method}`)  
        res.status(400).json({error:`${error}`})
    }

}
   