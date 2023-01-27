
    let table = document.getElementById("tablebody");
    table.hidden = true
    let grobalId 

const cartID = document.getElementById("cartID")
const pid = document.getElementById("pid")

function rellenarTabla(datos) {

let products;
let html = "";
html= '';
products = datos;

products.forEach((product)=>{
    //<td scope="row">${product.id}</th>
    html +=`
    <tr>
    <td scope="row">${product._id}</th>
    <td>${product.title}</td>
    <td>${product.price}</td>
    
    <td><img src=${product.thumbnail} alt="img" width="50"></td>
    </tr>`

})

table.innerHTML = html;

}

    function buscarCarrito(){
        
       const id = cartID.value
       grobalId = id
        fetch(`/api/carts/${id}/products`).then(response => response.json())
.then(data => rellenarTabla(data)).then(e=>table.hidden = false).then(e=>pid.innerHTML = "id :" + grobalId);
}

function agregarProducto(){
   let productID = document.getElementById("productID")

   fetch(`/api/carts/${grobalId}/products`,{
    method : "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productID : productID.value})
    });


   }

   function eliminarProducto(){
    let productID = document.getElementById("productID")
    fetch(`/api/carts/${grobalId}/products/${productID.value}`,{method : "DELETE"})
    
 
    }
    function eliminarCarrito(){
        const id = cartID.value
       grobalId = id
       if(!confirm("esta seguro de que quiere eliminar")){
        
       }else{
        fetch(`/api/carts/${grobalId}`,{
            method : "DELETE"
           }).then(e=>{alert("producto eliminado")}).catch(e=>console.log(e))
        
    }}
    function nuevoCarrito(){
        
        if(productID.value == ""){
            alert("ingrese el id de algun producto")
        }else{
        fetch(`/api/carts`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({productID : productID.value})
            }).then(e=>e.json()).then(e=>alert("id del nuevo carrito " + e.id))


    }}

    function finalizarPedido(){
     fetch(`pedido/${grobalId}`,{method : "POST"}).then(e=>alert("pedidoEmitido")).catch(err=>{console.log(err)})
    }


    
