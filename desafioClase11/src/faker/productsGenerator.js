import { faker } from "@faker-js/faker";
const {commerce,image, datatype} = faker;
faker.locale = 'es'
  function  generateProducts(cant){
    let products = []
    for (let i = 0; i < cant; i++) {
        products.push({
            id: datatype.uuid(),
            title: commerce.product(),
            price: commerce.price(1,5000),
            thumbnail: image.technics(640,480,true)
        })

        
    }
    console.log(products)
    return products

 }
 export {generateProducts}