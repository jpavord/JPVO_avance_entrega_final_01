const express = require('express');
const { Router } = express;
const productos = require('./productos.js')
const carrito = require('./carrito.js')

const index = Router();


index.use('/productos', productos)
index.use('/carrito', carrito)

module.exports = index;