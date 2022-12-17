import  {  Router } from "express";
import {fork} from "child_process"
const randomRouter = Router();


let ready = false
randomRouter.get("/",(req,res)=>{
    let cant = req.query.cant
    //let numeros = generarNumeros(cant)
   
    let child = fork("./child");
  
    child.on("message",(childMessage)=>{
        if(childMessage == "listo"){
            child.send(["generarNumeros",cant])
            ready = true;
        }else{
            res.send(childMessage)
           // const num = childMessage
        }
        console.log(childMessage)

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