import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { dirname } from "path";
import {fileURLToPath} from "url";
import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import {UserModel} from './model/userModel.js'
import * as dotenv from 'dotenv';
import  parsedArgs  from "minimist";
import infoRouter from "./routes/info.js";
import randomRouter from "./routes/randoms.js";
import cluster from "cluster";
import os from 'os';
dotenv.config({
    path : ".env"
})
const options = { 
    default : {p: 8080 , m: "FORK"},
    alias : { p : "port" , m : "mode"}
}
const argvs = parsedArgs(process.argv.slice(2),options)
const PORT = argvs.port
const MODE = argvs.mode



const mongoUrl = process.env.BASE_DE_DATOS;
const __dirname = dirname(fileURLToPath(import.meta.url)); 
//const mongoUrl = "mongodb+srv://sena:O03MJX1izzXMRkCk@backend.xun4hgo.mongodb.net/sessionsDB?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
},(error)=>{
    if(error) return console.log(`Hubo un error conectandose a la base ${error}`);
    //console.log("conexion a la base de datos de manera exitosa")
});
const app = express();
//const PORT = process.env.PORT || 8080;


//console.log("MODE =" , MODE)
if(MODE === "CLUSTER" && cluster.isPrimary ){
    const cpus = os.cpus().length - 6
    for (let index = 0; index < cpus; index++) {
        cluster.fork()       
    }

    cluster.on('exit',(worker)=>{
        console.log(`El proceso ${worker.id} FALLO`)
        cluster.fork()
    })
}else{
    app.listen(PORT, ()=>console.log(`Server listening on port ${PORT} processID: ${process.pid}`));
}


app.use(express.static(__dirname+"/public"));
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
app.set("views", __dirname+"/views");
app.set("view engine", ".hbs");
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

app.use(session({
    secret:"clave", 
    store : MongoStore.create({
        mongoUrl : mongoUrl
    }),
    cookie:{
        maxAge : 600000
    },
    resave:false,
    saveUninitialized:false,
    
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{

    UserModel.findById(id,(err,userFound)=>{
        if(err) return done(err)
        return done(null,userFound)
    })
})

passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField: "email"
    },
    (req,email,password,done)=>{
        
        UserModel.findOne({email:email},async(error,userFound)=>{
            if(error) return done(error,null,{message:"Hubo un error"});
            if(userFound) return done(null,null,{message:"El usuario ya existe"});       
            const newUser={               
                email:email,
                password: await bcrypt.hash(password,5)
            };
            UserModel.create(newUser,(error,userCreated)=>{
                if(error) return done(error,null, {message:"Hubo un error al registrar el usuario"})
                return done(null,userCreated);
            })
        })
    }
));
passport.use("loginStrategy", new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField: "email"
    },
    (req,email,password,done)=>{
        
      
        UserModel.findOne({email:email},async(error,userFound)=>{
            if(error) return done(error,null,{message:"Hubo un error"});
            if(userFound){ //return done(null,null,{message:"El usuario ya existe"});       
            //if(userFound.password === password){                   
            if(await bcrypt.compare(password,userFound.password)){                    return done(null,userFound);
                            } else{
                                return done(null,null,{message:"La contraseña es incorrecta"})
                            }
            }else{
                return done(null,null,{message:"el usuario es incorrecto"})
                
            }
        })
    }
));

const checkSession = (req,res,next)=>{
    if(req.session.user){
        res.redirect("/profile");
    } else{
        next();
    }
}
app.get("/",(req,res)=>{
    res.redirect("/profile")
})


app.get("/login",checkSession,(req,res)=>{
    const errorMessage = req.session.messages ? req.session.messages[0]: ''
    res.render("login",{error:errorMessage})
    req.session.messages = []
})

app.post("/login",passport.authenticate("loginStrategy",{
                      
    failureRedirect : "/login",
    failureMessage : true,

}),(req,res)=>{
    req.session.user = {email : req.body.email};      
    res.redirect("/profile")
});
app.get("/signup",checkSession,(req,res)=>{    
const errorMessage = req.session.messages ? req.session.messages[0]: ''    
res.render("signup",{error:errorMessage})
req.session.messages = []

})
app.post("/signup",passport.authenticate("signupStrategy",{
    failureRedirect : "/signup",
    failureMessage : true,

}),(req,res)=>{
    req.session.user = {email : req.body.email};   
    res.redirect("/profile")
});

app.get("/profile",(req,res)=>{
    if(req.session.user){
            console.log(req.session)
             res.render("profile",{user:req.session.user.email});
             console.log(req.session.user)
         } else{
           res.redirect("/login")
         }
})
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login")
});

app.use("/info",infoRouter)
app.use("/api/randoms",randomRouter)