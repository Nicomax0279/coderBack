import knex from "knex";
import { liteOptions } from "../options/sqliteconfig.js";
const database = knex(liteOptions)

const  op = async()=>{

await database.schema.createTable("messages",table=>{
    table.increments('id')
    table.string("menssage",40).nullable(false)
    table.string("date",30).nullable(false)
    table.string("username",20).nullable(false)

})
database.destroy()
}
op()
