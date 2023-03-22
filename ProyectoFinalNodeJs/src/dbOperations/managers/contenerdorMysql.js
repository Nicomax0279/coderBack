import knex from "knex"

class Contenedor{
    constructor(options,tableName){
        this.tableName = tableName
        this.database = knex(options);
    }
    async save(object){
        try {
            await this.database.from(this.tableName).insert(object)

        } catch (error) {
            return error
        }
    }
    async getAll(){
        try {
            const result = await this.database.from(this.tableName).select("*")                
            const parseResult = result.map(elm=>({...elm}));
            return parseResult

        } catch (error) {
            return (error)
        }
    }
    async getById(id){
        try {
            const result =  await this.database.from(this.tableName).select("*").where("id",id)
            
            return result
        } catch (error) {
            return (error)
        }
    }
    async deleteById(id){
        try {
            await this.database.from(this.tableName).del().where("id",id)
        } catch (error) {
            return(error)
        }
        
    }
    async deleteAll(){
        await this.database.from(this.tableName).del()
    }
    async putById(id,object){
         await this.database.from(this.tableName).update(object).where("id",id)
    }
    async getby(by,value){
        try {
            const result =  await this.database.from(this.tableName).select("*").where(`${by}`,value)
            
            return result
        } catch (error) {
            return error
        }

    }

}

export { Contenedor}
