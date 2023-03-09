import { Context, helpers , MongoClient , config, ObjectId } from "../depts.ts";
import { UserInput} from '../model/dbModel/user.ts'

const {MONGO_URL} = config()
//coneccion-mongo
const client = new MongoClient()
try {
    await client.connect(MONGO_URL)
    console.log("coneccion exitosa")
} catch (error) {
    console.log(error)
}

const db = client.database("deno")
const userModel = db.collection("users")

export const findUserAll = async (ctx:Context)=>{
    try {
        const users = await userModel.find().toArray();
        ctx.response.status = 200
        ctx.response.body = {data: users}
        
    } catch (error) {
        ctx.response.status = 400
        ctx.response.body = {error:`${error}`}
        
    }}
export const findUserById = async (ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx,{mergeParams:true})
        const user =  await userModel.findOne({_id: new ObjectId(id)})
        ctx.response.status = 200
        ctx.response.body = {data: user}
        
    } catch (error) {
        ctx.response.status = 400
        ctx.response.body = {error:`${error}`}
        
    }}


export const createUser = async (ctx:Context)=>{
    try {
        const body :UserInput= await ctx.request.body().value;
        const newUSer = parseUSer(body)
        await userModel.insertOne(newUSer)

        
        ctx.response.status = 200
        ctx.response.body = {data:"UserCreate"}
        
    } catch (error) {
        ctx.response.status = 400
        ctx.response.body = {error:`${error}`}
        
    }
}
export const putUserById = async (ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx,{mergeParams:true})
        const body :UserInput= await ctx.request.body().value;
        const newUSer = parseUSer(body)
        const user =  await userModel.updateOne({_id:new ObjectId(id)},{$set:newUSer})
        ctx.response.status = 200
        ctx.response.body = {data: {user}}
        
    } catch (error) {
        ctx.response.status = 400
        ctx.response.body = {error:`${error}`}
    }}
    export const deleteUserById = async (ctx:Context)=>{
        try {
            const {id} = helpers.getQuery(ctx,{mergeParams:true})
            
            const user =  await userModel.deleteOne({_id:new ObjectId(id)})
            ctx.response.status = 200
            ctx.response.body = {data: user}
            
        } catch (error) {
            ctx.response.status = 400
            ctx.response.body = {error:`${error}`}
            
        }}
    
    deleteUserById

function parseUSer(body):UserInput{
    const userParser = {}
    
    if(body.name) userParser.name = body.name
    if(body.age) userParser.age = body.age
    return userParser


}