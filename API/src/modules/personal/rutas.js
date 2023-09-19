const express = require('express');
const router = express.Router();
const controlador = require('./index.js');
const respuestas = require('../../red/respuestas.js');
router.get('/',todos);
router.get('/:id',uno);

async function todos(req,res,next){
    try {
        const items = await controlador.todos();
        respuestas.success(req,res, items,200)
    }catch(err){
       respuestas.error(req, res,'error al conectar a base de datos',500);
    }
}

async function uno(req,res,next){
    try {
        const items = await controlador.uno(req.params.id);
        res.send(items);
    }catch(err){
        next(err);
    }
}

module.exports = router;