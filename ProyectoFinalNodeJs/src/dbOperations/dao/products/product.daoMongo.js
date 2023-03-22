import {Contenedor} from "../../managers/contenedorMongodb.js"
import {productsModel} from "../../models/productsModel.js"
class mongoProducts extends Contenedor{
    constructor(model){
        super(model)
    }
    getbyCategory = async(category)=>{
        let products =  await productsModel.find({category:category})
        return products     

         
    }







}
export {mongoProducts}