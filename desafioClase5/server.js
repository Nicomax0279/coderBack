import express from 'express'
import { router } from './routes/products.js'

const app = express();
app.set('views','./views')
app.use(express.static('public'))



//handlebars config
// import {engine} from 'express-handlebars'
// app.engine('hbs', engine({extname:'hbs'}))
// app.set("view engine",'hbs')




//pug config
//app.set("view engine", "pug");
//ejs config



app.set("view engine", "ejs");

app.set('views','./views')
app.use(express.static('public'))



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen("8080",()=>console.log("server listening on port 8080"));
app.get("/",async(req,res)=>{
    
    
    //console.log(products);
    //res.send("Ss");
    res.render('home')

})
app.use("/api/products",router);