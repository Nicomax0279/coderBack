import { options } from "../config/options.js"
import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next)=>{
    
    let token = req.header['x-access-token'] || req.headers['authorization']
    if(!token){
        res.status(400).json({error:"expected token"})
        return
    }

    if(token.startsWith("Bearer ")){
        token = token.slice(7,token.length)
        //console.log(token)
    }
    if(token){
        jwt.verify(token,options.key,(error,user)=>{
            if(error){
                res.status(400).json({error:"validation token error"})
                return
            }else{
                req.user = user
                next()
            }
        })
    }
}

export const isAdmin = (req, res, next)=>{
    //console.log(req.user)
    if(req.user.admin == true){
        next()
    }else{
        res.status(400).json({error:'admin status is necessary'})
        return
    }


}
