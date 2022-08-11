const { ok } = require('assert');
const express = require('express');
const { Router } = express;
const fs = require('fs')
const contenedor = require('../src/files.js')
const productos = Router();


//////// INSTANCIANDO CONTENEDOR ///////////
const prodfile = new contenedor('./data/productos.json')
///////////// METODOS ////////////////////////

productos.get('/', async (req, res)=>{
    const index = parseInt(req.query.id);
    if(!index){
        prodfile.getAll()
        .then(data=>{
            res.send(data)
        })
    }else{ 
        prodfile.getById(index)
        .then(data=>{
            if(!data){
                res.status(404).json({
                    error: "El producto no existe"
                })
            }
            res.json(data)
        })
}})

productos.get('/:id', async (req, res)=>{
    const index = parseInt(req.params.id);
    // const getbyid= await prodfile.getById(index)
    // console.log(getbyid)
    prodfile.getById(index)
    .then(data=>{
        if(!data){
            res.status(404).json({
                error: "El producto no existe"
            })
        }
        res.json(data)
    })
})

productos.post('/', (req, res)=>{
    try{
        prodfile.save({...req.body})
        res.status(201).redirect(req.originalUrl) 
    } catch(err){
        console.log(`Error,no se puede leer el archivo: ${err.message}`);
    }
})

productos.put('/:id',async (req, res)=>{
    const index = parseInt(req.params.id)-1;
    try{
        prodfile.getAll()
        .then(data=>{
            let obj = data.find(item => item.id == req.params.id)
            if(!obj){
                res.status(404).json({
                    error: "El producto no existe"
                })
            }

            data[index].nombre=req.body.nombre
            data[index].descripcion=req.body.descripcion
            data[index].codigo=req.body.codigo
            data[index].foto=req.body.foto
            data[index].precio=req.body.precio
            data[index].stock=req.body.stock
                        
            fs.promises.writeFile('./data/productos.json', JSON.stringify(data, null, 2), (err) => { });
            res.status(201).json({
                status: "OK, producto mofigicado",
                producto: req.body
            })
            // console.log(obj)
        })
    }catch(err){
        console.log(`Error: ${err}`)
    }
})

productos.delete('/:id', (req, res)=>{
    index = parseInt(req.params.id)
    try{
    prodfile.deleteById(index)
    res.json({
        status: "producto eliminado"
    })
}catch(err){
    console.log(`Error: ${err}`)
}
})
module.exports = productos