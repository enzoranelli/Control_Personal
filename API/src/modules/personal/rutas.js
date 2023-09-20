const express = require('express');
const router = express.Router();
const controlador = require('./index.js');
const respuestas = require('../../red/respuestas.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

router.get('/',todos);
router.get('/:id',uno);
router.post('/',agregar);


async function todos(req,res,next){
    try {
        const items = await controlador.todos();
        respuestas.success(req,res, items,200);
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


async function agregar(req,res,next){
    try {
        let personal = {
            Nombre : req.body.Nombre, 
            DNI: req.body.DNI, 
            puesto: req.body.puesto, 
            telefono: req.body.telefono, 
            direccion: req.body.direccion, 
            seccion: req.body.seccion, 
            horasTrabajoXDia: req.body.horasTrabajoXDia,
        }
        const item = await controlador.agregar(personal);
        console.log(item)
        if(item){
            console.log('Entre al if')
            const id = await controlador.buscarId(personal.DNI);
            const hashed = await bcrypt.hash(req.body.contrasena,10);
            console.log('El id es:',id[0].id);
            console.log('hash', hashed)
            let usuario = {
                contrasena: hashed,
                correo: req.body.correo,
                qr: crypto.randomBytes(20).toString('hex'),
                Persona: id[0].id,
                rh: req.body.rh,
            }

            const insertarUsuario = await controlador.agregarUsuario(usuario);

            respuestas.success(req,res, insertarUsuario,200);
        }else{
            respuestas.error(req, res,'error al insertar datos',500);
        }
    } catch (error) {
        respuestas.error(req, res,error,500);
    }
}

module.exports = router;