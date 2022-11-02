

const socketCliente = io();
let user ;


const MenCon = document.getElementById("MensaggesContainer")
const campo = document.getElementById("menssageField");
const mail = document.getElementById("mail")

campo.addEventListener("keydown",(evt)=>{
    //console.log(evt.key)
    if(evt.key === "Enter"){
    socketCliente.emit("message",{menssage : campo.value, username : mail.value})
        campo.value = "";
     
}
})
socketCliente.on("menssages",(data)=>{
let elementos = "";
//console.log(data)
data.forEach(i => {
    //console.log(i)
    elementos += `<p><strong>${i.username} [${i.date}]</strong>:${i.menssage}</p>`

    
});
MenCon.innerHTML = elementos
})  
title = document.getElementById("title");
price = document.getElementById("price");
thumbnail = document.getElementById("thumbnail");

//table

 let  newProduct = (product)=>socketCliente.emit("newProduct",product)
 let enviarProducto =  ()=>{
    product = {
     title : title.value,
     price : price.value,
     thumbnail : thumbnail.value  
    }
    //console.log(product);
    newProduct(product)


 }

socketCliente.on("newProduct",(data)=>{
    console.log("Table reaload");
    rellenarTabla(data)

})

//let products = [{"title":"Escuadra","price":123.45,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png","id":1},{"title":"Calculadora","price":234.56,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png","id":2},{"title":"Globo Terráqueo","price":345.67,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png","id":3}]






    function rellenarTabla(datos) {
        let table = document.getElementById("tablebody");
    let products;
    let html = "";
    html= '';
    products = datos;
    
    products.forEach((product)=>{
        html +=`
        <tr>
        <td scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        
        <td><img src=${product.thumbnail} alt="img" width="50"></td>
        </tr>`
    
    })
    
    table.innerHTML = html;
}

