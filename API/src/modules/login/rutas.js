const express = require('express');
const router = express.Router();
const controlador = require('./index.js');
const respuestas = require('../../red/respuestas.js');
const bcrypt = require('bcrypt');


router.post('/',auth);

async function todos(req,res,next){
    try {
        const items = await controlador.todos();
        respuestas.success(req,res, items,200)
    }catch(err){
       respuestas.error(req, res,'error al conectar a base de datos',500);
    }
}

async function auth(req,res,next){
    const {correo,password} = req.body;
    
    if(!correo || !password){
        respuestas.error(req, res,'Campos incompletos',500);
    }
    try {
        //Buscar en la base de datos el correo
        const userExists = await controlador.existe(correo);

        console.log('ESTOY EN LOGIN');
        console.log(userExists)
        if(userExists){
             //Verificar si la contraseña es correcta 
            const match = await comparePassword(password,userExists[0].contrasena);

            
            if(match){
                let usuario = {
                    correo: userExists[0].correo,
                    qr: userExists[0].qr,
                    Persona: userExists[0].Persona,
                    rh: userExists[0].rh,
                }

                respuestas.success(req,res,usuario,200);
            }else{
                respuestas.error(req, res,'Correo o contraseña incorrecta',500);
            }
        }
        //Devolver error si no es asi
    }catch(err){
        respuestas.error(req, res,'Correo o contraseña incorrecta',500);
    }
}

comparePassword = async function( password, hash){
    try {

        console.log('Contraseña ingresada:', password);
        console.log('Hash:',hash);
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        console.error(error);
        return false;
    }
    
};


module.exports = router;