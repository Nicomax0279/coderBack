import {MessagesManager} from "../dbOperations/dao/index.dao.js"

export const getAllMenssages = async()=>{
    try {
        return await MessagesManager.getAll();
    } catch (error) {
        throw new Error(error)
    }
    
}

export const postMessage = async(menssage)=>{
    try {
       await MessagesManager.save(menssage)
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteMensagge = async(id)=>{
    let res =  await MessagesManager.deleteByid(id);
    if(res){
    return ({success : "menssage deleted" })
    }else{
    throw new Error("id not found")    
    }

}