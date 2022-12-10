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
import { profile } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url)); 
const mongoUrl = "mongodb+srv://sena:O03MJX1izzXMRkCk@backend.xun4hgo.mongodb.net/sessionsDB?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
},(error)=>{
    if(error) return console.log(`Hubo un error conectandose a la base ${error}`);
    console.log("conexion a la base de datos de manera exitosa")
});
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));

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
// app.post("/login",async(req,res)=>{
//     const user = req.body;
//     //console.log(user)
//     const userExists = await UserModel.findOne({email:user.email})
//    // console.log(userExists)
//     if(userExists){
//         //console.log(userExists.password )
//         if(userExists.password === user.password){
//             req.session.user = user;
//             res.redirect("/profile")
//         } else{
//             res.redirect("/login")
//         }
//     } else{
//         res.redirect("/signup");
//     }
// })

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