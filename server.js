const express = require('express');
// const productos = require('./routers/productos.js')
// const carrito = require('./routers/carrito.js')
const index = require('./routers/index.js')
const PORT = process.env.PORT || 8080;

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api', index)
// app.use('/api', productos);
// app.use('/api', carrito);

app.listen(PORT, () =>{
    console.log("Servidor escuchando en el puerto 8080")
})

app.on("error", (error)=>{console.log(`error ${error}`)});

