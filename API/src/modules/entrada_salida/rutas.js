const express = require('express');
const router = express.Router();
const {format} = require('date-fns');
const controlador = require('./index.js');
const respuestas = require('../../red/respuestas.js');

router.post('/',ingresoEgreso);
router.get('/:id', entradaSalida);

async function ingresoEgreso(req,res){
    try {
        //Buscar empleado con QR
        const empleado = await controlador.buscarQr(req.body.qr);
        
        if(empleado[0].Persona){
            //Si existe insertar un registro en ingreso_salida
            console.log('Estoy en el if')
            const fecha = new Date();
            const offset = fecha.getTimezoneOffset();
            fecha.setMinutes(fecha.getMinutes() - offset);

            const fechaHoraActual = fecha.toISOString().slice(0, 19).replace('T', ' ');
        
            

            console.log(fechaHoraActual)
            let data ={
                Persona: empleado[0].Persona,
                Fecha: fechaHoraActual,
            }

            try {
                const insertar = await controlador.agregar(data);

                respuestas.success(req,res,insertar,200)
            } catch (error) {
                respuestas.error(req, res,'error al insertar',500);
            }
        }else{
            respuestas.error(req, res,'error al buscar qr',500);
        }
        

        //Si no se encuentra error

    }catch(err){
       respuestas.error(req, res,'error al buscar qr',500);
    }
}


async function entradaSalida(req,res){
    try {
        
        const entradaSalida = await controlador.entradaSalida(req.params['id']);
        console.log(entradaSalida)
        const datos = entradaSalida.map((row)=>{
            const fecha = new Date(row.Fecha);
            const fechaFormateada = format(fecha, 'dd/MM/yyyy HH:mm:ss');
            return {
                ...row,
                Fecha: fechaFormateada,
            };
        })
        console.log(datos);
        respuestas.success(req,res,datos,200)

    } catch (error) {
        respuestas.error(req, res,'error al conectar a base de datos',500);
    }
}
module.exports = router;