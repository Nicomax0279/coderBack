import nodemailer from 'nodemailer'
import { logger } from '../logs/logger.js';
import twilio from "twilio";
import {UserModel} from '../mongo/userModel.js'
const accountId = 'AC80befb17466db59f2c4c0c4becf8e59a'
const token = 'faccb6fe3a8b2afa777c9f667e68e9fa'
const client = twilio(accountId,token);



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'karina.dibbert2@ethereal.email',
        pass: 'EEz699xX8r1ACTEM3g'
    },
    secure : false,
    tls : {
        rejecUnauthorized : false
    }

});

const TEST_EMAIL = 'karina.dibbert2@ethereal.email'
const TEST_PASSWORD = "EEz699xX8r1ACTEM3g"








export const newUSerMessage =(user)=>{
    const emailTemplate = `<div><h1>se a unido un nuevo usuario !!</h1>
    email : ${user.email}<br>
    password: ${user.password}<br>
    name :${user.name}<br>
    address :${user.address}<br>
    age :${user.age}<br>
    phoneNunber :${user.phoneNunber}<br>
    avatar :${user.avatar}<br>
    
    
    </div>`
const mailOptions={
    from:"Servidor de NodeJs",
    to:TEST_EMAIL,
    subject:"nuevo registro",
    html:emailTemplate
}

    try {
        transporter.sendMail(mailOptions)     
    } catch (error) {
        logger.error(error)
    }
}

export const pedidoMessage =async(pedido,usuario)=>{
   // console.log(pedido.products)
   let user = await getUser(usuario)
    let productsHtml = ''
    pedido.products.forEach(element => {
        productsHtml += `title : ${element.title} price: ${element.price} img: <img src=${element.thumbnail}> <br>`
    });
    const emailTemplate = `<div><h1>se a realizado un pedido  !!</h1>
    productos : ${productsHtml}
    email : ${pedido.user}<br>
    
    
    
    </div>`
const mailOptions={
    from:"Servidor de NodeJs",
    to:TEST_EMAIL,
    subject:`nuevo pedido de ${user.email}`,
    html:emailTemplate
}

    try {
        transporter.sendMail(mailOptions)     
    } catch (error) {
        logger.error(error)
    }
}

const whatappNumber = ''
export const pedidowhatapp =async (pedido,usuario)=>{
    let user = await getUser(usuario)
    let products = ''
    pedido.products.forEach(element => {
         products += `title : ${element.title} price: ${element.price} `
    });
    try {
        const response  = await client.messages.create({
            body : `nuevo pedido de  ${user.email} su es ${products}`,
            from : 'whatsApp : +14155238886',
            to : `whatsApp : +5432471012`
        })
        return("mensaje enviado" + response)
    
    
    
    
    } catch (error) {
        return(error)
    }
    




}
const getUser = async(email)=>{
    
    const user = await UserModel.findOne({'email':email},{password :0 , __v:0})
    return user
}
getUser()

export const confirmacionDelPedido = async(pedido,usuario)=>{
    let user = await getUser(usuario)
    let products = ''
    pedido.products.forEach(element => {
         products += `title : ${element.title} price: ${element.price} `
    });
    try {
        const response  = await client.messages.create({
            body : `hola ${usuario} su pedido ya esta comfirmado ${products}`,
            from : '+16672206099',
            to : `${user.phoneNunber}`
        })
        return("mensaje enviado" + response)
    
    
    
    
    } catch (error) {
        return(error)
    }
    




}

