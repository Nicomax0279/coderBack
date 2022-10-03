const express = require('express');
const produtsRouter = require('./routes/products');
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen("8080",()=>console.log("server listening on port 8080"));

app.use("/api/products",produtsRouter);