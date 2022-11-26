



const socketCliente = io();

const MenCon = document.getElementById("MensaggesContainer")
const mail = document.getElementById("mail");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const age = document.getElementById("age");
const alias = document.getElementById("alias");
const urlimg = document.getElementById("urlimg");
const send = document.getElementById("send");
const mensaje = document.getElementById("mensaje");
const users =[{
    mail:"maca@gmail.com",
    name: "mario",
    surname: "casas",
    age: 30,
    alias: "macas",
    urlimg : "fotoUrl",
},
{
    mail:"ferDorr@gmail.com",
    name: "fernaldo",
    surname: "dorrego",
    age: 25,
    alias: "fernalDO",
    urlimg : "fotoUrl",
},
{
    mail:"marigomes32@gmail.com",
    name: "maria",
    surname: "gomes",
    age: 23,
    alias: "mary",
    urlimg : "fotoUrl",
},
{
    mail:"juli_serrano_345@gmail.com",
    name: "julian",
    surname: "serrano",
    age: 30,
    alias: "juser345",
    urlimg : "fotoUrl",
},
]

function rellenarUsuario(i,array){
    
     mail.value = array[i].mail
     name.value = array[i].name
     surname.value = array[i].surname
     age.value = array[i].age
     alias.value = array[i].alias
     urlimg.value = array[i].urlimg
    



}

function getMensage(){
   
    const menssage = {
        author :{
            mail : mail.value,
            nombre: name.value,
            apellido : surname.value,
            edad : age.value,
            alias : alias.value,
            avatar: urlimg.value
            },
        text :  mensaje.value
    }    
    mensaje.value = ""
    return menssage
}

const authorSchema = new normalizr.schema.Entity("authors",{}, {idAttribute:"email"});
const messageSchema = new normalizr.schema.Entity("messages", {author: authorSchema});
const chatSchema = new normalizr.schema.Entity("chat", {
    messages:[messageSchema]
}, {idAttribute:"id"});

send.onclick= function emit() {
    if(mensaje.value == ""){
        alert("debe complatar el campo")
    }else{
        let menssage = getMensage()
        socketCliente.emit("message",menssage)
    }
}
socketCliente.on("menssages",(data)=>{
let elementos = "";
 chat = normalizr.denormalize(data.result,chatSchema,data.entities);
//console.log(chat)
chat.messages.forEach(i => {
    //console.log(i)
    elementos += `<p><strong>${i.author.alias} [${i.date}]</strong>:${i.text}</p>`

    
 });
MenCon.innerHTML = elementos
})  
const select = document.getElementById("select");
select.onchange = function ss(){

   
    const index = users.findIndex(item => item.name === select.value)
    rellenarUsuario(index,users)

}
//table
const deleteAll = document.getElementById('delete')
 
deleteAll.onclick = function deleteMens(){
    if(confirm("desea eliminar todo el chat")){
        fetch("/",{ method: 'delete'})
    }
    

}




//let products = [{"title":"Escuadra","price":123.45,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png","id":1},{"title":"Calculadora","price":234.56,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png","id":2},{"title":"Globo Terráqueo","price":345.67,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png","id":3}]






    

