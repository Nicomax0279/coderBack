import nodemailer from 'nodemailer'
import { logger } from '../logs/logger.js';


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

export const pedidoMessage =(pedido)=>{
   // console.log(pedido.products)
    let productsHtml = ''
    pedido.products.forEach(element => {
        productsHtml += `title : ${element.title} price: ${element.price} img: <img src=${element.thumbnail}> <br>`
    });
    const emailTemplate = `<div><h1>se a realizado un pedido !!</h1>
    productos : ${productsHtml}
    email : ${pedido.user}<br>
    
    
    
    </div>`
const mailOptions={
    from:"Servidor de NodeJs",
    to:TEST_EMAIL,
    subject:"nuevo pedido",
    html:emailTemplate
}

    try {
        transporter.sendMail(mailOptions)     
    } catch (error) {
        logger.error(error)
    }
}



