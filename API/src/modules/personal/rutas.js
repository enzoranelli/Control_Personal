const express = require('express');
const router = express.Router();
const controlador = require('./index.js');

router.get('/',todos);
router.get('/:id',uno);

async function todos(req,res,next){
    try {
        const items = await controlador.todos();
        res.send(items);
    }catch(err){
        next(err);
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