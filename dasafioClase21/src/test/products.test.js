import {app} from './../server.js'
import supertest from 'supertest'
import {expect} from 'chai'
import mocha from 'mocha'
let post_id 
const request = supertest(app)
const URL = "/api/products"
//pruebas de lo enpoin de usuarios
describe("api products test",()=>{
    it("get products",async()=>{
       const response = await request.get(URL)
       expect(response.status).equal(200)
    })
    it("get product",async()=>{
        const id = '63ef87d0e7b8f27891f0c4e7'
        let  response = await request.get(`${URL}/${id}`)
        //console.log(response)
        let body = await response._body
        console.log("get product response:" + body)
        expect(body.id).equal(id)
    })
    it("post product",async()=>{
       
        let  response = await request.post(URL).send({
    
            title: "goma",
            price : 100.232,
            thumbnail : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tony.com.mx%2Fgoma-de-borrar-migajon-grande-m-20-caja-con-20-piezas-pelikan-06150200%2Fp&psig=AOvVaw3-27HqE_7B76zhEqMjb89G&ust=1676723765071000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCMDLvf7InP0CFQAAAAAdAAAAABAI"
            
            })
        //console.log(response)
      
        expect(response.body).to.have.own.property("id")
        post_id = response.body.id
        
        expect(response.status).equal(200)
 
    })
    it("post product no body",async()=>{
       
        let  response = await request.post(URL)
        //console.log(response)
        let body = await response._body
        console.log(response.status)
        expect(response.status).equal(400)
    
    })
    it("put product",async()=>{
        const id = "63ef87d0e7b8f27891f0c4e7"  
        let  response = await request.put(`${URL}/${id}`).send({
    
            title: "lapiz Marca",
            price : 120.232
           
            
            })
        //console.log(response)
        let body = await response.body
        console.log(body)
        console.log(response.status)
        expect(response.status).equal(200)
 
    })
    it("put product no exits id",async()=>{
        const id = "6a3ef87d0es7b8327891f0c4e7" 
        let  response = await request.put(`${URL}/${id}`).send({
    
            title: "lapiz Marca",
            price : 120.232
           
            
            })
        //console.log(response)
        let body = await response._body
        console.log(response.body)
        expect(response.status).equal(400)
 
    })
    it("delete product no exist id",async()=>{
        const id = "63d15159asd4131dasd6a03f0da5"  
        let  response = await request.delete(`${URL}/${id}`)
    
        console.log(response.body)
        expect(response.status).equal(400)
 
    })
    it("delete post product ",async()=>{
        
        let  response = await request.delete(`${URL}/${post_id}`)
    
        console.log(response.body)
        expect(response.status).equal(200)
 
    })
    


})