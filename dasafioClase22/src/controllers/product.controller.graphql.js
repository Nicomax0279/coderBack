import {buildSchema} from "graphql"
import {graphqlHTTP} from "express-graphql"
import { root } from "../services/product..service.Graphql.js"

const graphqlSchema = buildSchema(`
    type Product{
        id:String,
        title:String,
        price:Float,
        thumbnail:String
    }
    input productInput{
        title:String,
        price:Float,
        thumbnail:String
    }

    type Query{
        getProducts:[Product]
        getProductById(id:String):Product
    }

    type Mutation{
        addProduct(product:productInput):Product
        deleteProductById(id:String):String
        putProductById(id:String,product:productInput):Product
    }

`)

export const productGraphqlController =  graphqlHTTP({
        schema:graphqlSchema,
        rootValue:root,
        graphiql:true
})