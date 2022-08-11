const express = require('express');
const { Router } = express;
const fs = require('fs')
const contenedor = require('../src/files.js')
const carrito = Router();

//////// INSTANCIANDO CONTENEDOR ///////////
const carfile = new contenedor('./data/carrito.json')
///////////// METODOS //////////////////////
carrito.post('/', (req, res)=>{
    try{
        carfile.save({...req.body})

        res.status(201).json({
            status: "OK, carrito creado"
        }) 
    } catch(err){
        console.log(`Error,no se guardar en el archivo: ${err.message}`);
    }
})

carrito.delete('/:id', (req,res)=>{
    const index = parseInt(req.params.id)
    try{
        carfile.deleteById(index)
        res.status(201).json("Carrito Eliminado")
        
    }catch(err){
        console.log(`Error,no se puede vaciar el carrito: ${err.message}`);
    }
})

carrito.get('/:id/productos', (req, res) =>{
    const index = parseInt(req.params.id)
    try{
        carfile.getById(index)
        .then(data=>{
            res.status(201).json(data.productos)
        })
    }catch(err){
        console.log(`error al obtener los productos del carrito: ${err}`)
    }
})

carrito.post('/:id/productos', (req, res)=>{
    const index = parseInt(req.params.id)
    try{
        
    }catch(err){
        console.log(`error al obtener los productos del carrito: ${err}`)
    }
})

carrito.delete('/:id/productos/:id_prod', async (req,res)=>{
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)
    try{
        carfile.getAll()
        .then(data=>{
            let obj = data.find(item => item.id == id)
            if(!obj){
                res.status(404).json({
                    error:"Error, producto no encontrado"
                })
            }
            const nuevoCarrito = data[id].productos.filter(item=>item.id!==id_prod)
            data[id].productos= nuevoCarrito
           // fs.promises.writeFile('./data/carrito.json', JSON.stringify(data, null, 2), (err) => { });
            console.log(nuevoCarrito)
        })
        //carfile.deleteById(index)
        res.status(201).json("Carrito Eliminado")
        
    }catch(err){
        console.log(`Error,no se puede vaciar el carrito: ${err.message}`);
    }
})



module.exports = carrito