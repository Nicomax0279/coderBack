import express from 'express';
import { productsRouter } from "./routes/products.js";
import { cartsRouter } from "./routes/carts.js";


const PORT = process.env.PORT || 8080
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/productos",productsRouter)
app.use("/api/carrito",cartsRouter)

app.use(function(req,res){
    res.status(404).send({ error : `-2, descripcion: ruta ${req.path} método ${req.method} no implementada`}
    )


})

app.listen(PORT,()=>{console.log(`listening on PORT ${PORT}`)})