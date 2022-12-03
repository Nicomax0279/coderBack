
import  express  from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'

import {engine} from 'express-handlebars'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express()
app.listen(8080,()=>{console.log("server listening on port:8080")})
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"));
app.use(cookieParser())

app.engine('hbs', engine({extname:'hbs'}))
app.set("view engine",'hbs')
app.set('views',__dirname+'views')

//retryWrites=true&w=majority
//O03MJX1izzXMRkCk
app.use(session({
    store : MongoStore.create({
        mongoUrl : "mongodb+srv://sena:O03MJX1izzXMRkCk@backend.xun4hgo.mongodb.net/sessionsDB?retryWrites=true&w=majority",

    }),
    secret : "clave",
    resave : false,
    saveUninitialized : false,
    cookie:{
        maxAge : 10000       
    }

}))
const checkUserLogged = (req,res,next)=>{
    if(req.session.user){
        
        next();
    } else{
        res.redirect("/login");
    }
}

 app.get("/login",(req,res)=>{

     res.render("login")
 })
// app.get("/",(req,res)=>{

//     res.render("login")
// })

app.post("/login",(req,res)=>{
    console.log("cs")
    const {user} = req.body
    console.log(req.body)
     if(req.session.user){
         res.redirect("/")
     }else{
     req.session.user = user
     res.redirect("/")
     }

 })
 app.get("/",checkUserLogged,(req,res)=>{
    res.render('mainPage',{user:req.session.user})
    console.log(req.session)
 })

app.get("/logout",checkUserLogged,(req,res)=>{
    res.render("logout",{user:req.session.user})  
    req.session.destroy()
      
    

})


