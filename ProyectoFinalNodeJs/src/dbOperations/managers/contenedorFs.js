//const fs = require('fs');
import fs from 'fs'

//let arrayObject = [];
class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }
    
    async save(object){
        
      
       //console.log(object);
       

       try {
            
               
                let objectsString = await fs.promises.readFile(this.archivo,'utf-8');     
               // console.log(objectsString);   
                let objects =  JSON.parse(objectsString);
                let length =   objects.length;
                let id;

               
               
                if(length==0){ id=1}else{
                    id =  objects[length - 1].id +1; 
                }
                   
      
     
                object.id = id;
                 objects.push(object);
                await fs.promises.writeFile(this.archivo,JSON.stringify(objects));
                
                return id;
    
       
        } catch (error) {
            return error
       }

    }
        
    
    async getAll(){
        try {
            let objectsString = await fs.promises.readFile(this.archivo,'utf-8');
            let objects =  JSON.parse(objectsString);
            return objects;
            
            
            
            
        } catch (error) {
            return error;
        }
       
    }
    async getById(id){
    try {
        let objectsString = await fs.promises.readFile(this.archivo,'utf-8');
        let objects =  JSON.parse(objectsString);
        let objectByid =  objects.find(Element=> Element.id == id);
            
        
        
        
        if(objectByid != undefined){
        return objectByid;
        }else{
            throw new Error(`object with id ${id} noy exits `)
        }
        
        } catch (error) {
            return error
    }
    }
    async deleteByid(id){
        let objectsString = await fs.promises.readFile(this.archivo,'utf-8');
        let objects =  JSON.parse(objectsString);
        
        let objectByid =  objects.find(Element=> Element.id == id);
        let index =  objects.indexOf(objectByid);    
        
        objects.splice(index,1);
        if(index != -1){
            
        await fs.promises.writeFile(this.archivo,JSON.stringify(objects));
        }else{
            throw new Error(`object with id ${id} noy exits `)
        
        }
        
       

    
    }
    async deleteAll(){
        await  fs.promises.writeFile(this.archivo,JSON.stringify([]))   
         

    }
    
    async putById(id,object){
        try {
            let objectsString = await fs.promises.readFile(this.archivo,'utf-8');
            let objects =  JSON.parse(objectsString);
            let index =  objects.findIndex(Element=> Element.id == id);
            
            objects[index] = object;
            
            objects[index].id = id;
        
            await fs.promises.writeFile(this.archivo,JSON.stringify(objects));





            






        } catch (error) {
            return error
        }





    }
    async exist(id){
        let objectsString = await fs.promises.readFile(this.archivo,'utf-8');
        let objects =  JSON.parse(objectsString);
        let objectByid =  objects.find(Element=> Element.id == id);
        let index =  objects.indexOf(objectByid);  
        if(index != -1){
            
            return true
            }else{
                return false
            
            }
    }
}
//module.exports = Contenedor;
export {Contenedor};
 // objeto resivido {title: 'titulo', price: 125.24, thumnail: 'foto.png' }
// objeto guardado {title: 'titulo', price: 125.24, thumnail: 'foto.png', id: 1 }

// console.log("inicio");
// const contenedor = new Contenedor("archivo.json");
//     //save
//      contenedor.save({title: 'titulo', price: 125.24, thumnail: 'foto.png', id: null }).then(id=>console.log("new object id=" ,id));
     
   
//     //getAll
//     contenedor.getAll().then(result=>console.log("getAll():",result));
//     //getById
//     contenedor.getById(3).then(objectByid=>console.log("objectByid:",objectByid));
//     //deleteByid
//     contenedor.deleteByid(15);
//     //deleteAll
//    //contenedor.deleteAll();
//  console.log("fin");
// ///colocar dentro de una funcion asyn con await
// const ejecutar = async ()=>{}