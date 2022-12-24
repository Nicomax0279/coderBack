import  {  Router } from "express";
import {fork} from "child_process"
import {fileURLToPath} from "url";
import path, { dirname } from "path";





const randomRouter = Router();

const __dirname = dirname(fileURLToPath(import.meta.url)); 
let ready = false
 let childFile = path.join(__dirname,"../child/child.js")
randomRouter.get("/",(req,res)=>{
    let cant = req.query.cant
    //let numeros = generarNumeros(cant)
   
    let child = fork(childFile);
  
    child.on("message",(childMessage)=>{
        if(childMessage == "listo"){
            child.send(["generarNumeros",cant])
            ready = true;
        }else{
            res.send(childMessage)
           // const num = childMessage
        }
       // console.log(childMessage)

    })
    
    
    //res.send(numeros)
})

// function generarNumeros(cant){
//     let obj = {}
//     let numeros = []
//     for (let i = 0; i < cant; i++) {
//         numeros.push(parseInt(Math.random()*1000+1))        
//     }
//     numeros.sort()
//     numeros.forEach(e=>{
//         if(obj.e){
//             console.log(e)
//             obj.e++
//         }else{
//             obj.e = 1
//         }


//     })
//     return obj
// }

export default randomRouter