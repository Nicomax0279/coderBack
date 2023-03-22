

import {Contenedor} from "../../managers/contenerdorMysql.js"

class sqlUsers extends Contenedor{
    constructor(options,tableName){
        super(options,tableName)
    }
    getbyEmail = async(email)=>{
        let user = await super.getby("email",email)
    
        return user[0]

        
     }  


}
export {sqlUsers}