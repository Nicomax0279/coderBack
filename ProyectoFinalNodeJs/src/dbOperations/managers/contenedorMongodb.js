import mongoose from "mongoose";


class Contenedor{
    
        constructor(model){
            this.model = model;
        }
    
    
    async save(object){
        
      
       //console.log(object);
       

       try {
            
               
               
            let res = await this.model.create(object)
            let id = res._id    
            return id;
    
       
        } catch (error) {
            throw new Error(error)
       }

    }
        
    
    async getAll(){
        try {
            

            let objects = await this.model.find({},{__v:0})

            return objects;
            
            
            
            
        } catch (error) {
            return error
        }
       
    }
    async getById(id){
    try {
        
        const valid = mongoose.isValidObjectId(id)
        if(!valid){
            return {error : "Formato de Id no valido"}
        }
        let objectByid = await this.model.findOne({_id:id},{__v:0})
        //console.log(objectByid)

        
        return objectByid;
        
        
        } catch (error) {
            return error
    }
    }
    async deleteByid(id){
        try {
            
        
            let exist = await this.exist(id)
            if(exist){
                await this.model.deleteOne({_id:id})

            //delete
            return true
            }else{
            return false
            }
        } catch (error) {
            return error
        }
       

    
    }
    async deleteAll(){
        await this.model.delete()

    }
    
    async putById(id,object){
        try {
            const valid = mongoose.isValidObjectId(id)
            if(!valid){
                return {error : "Formato de Id no valido"}
            }
           
             await this.model.updateOne({_id:id},{$set:object})



            



        } catch (error) {
            throw new Error(error);
        }





    }
    async exist(id){

        try {
    
            const valid = mongoose.isValidObjectId(id)
           
    if(valid){

    const result = await this.model.findOne({ _id: id }).select("_id").lean();
    if (!(result==null)) {

    return true;
    }else{
    return false
    }}else{
        return false}
    } catch (error) {
        return error;
    }


    }
}
    

//module.exports = Contenedor;
export {Contenedor};