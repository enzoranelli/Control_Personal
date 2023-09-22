const TABLA = 'ingreso_salida';

module.exports = function(dbjinyec){
    
    let db = dbjinyec;

    if(!db){
        db = require('../../DB/mysql.js');
    }

    function buscarQr(qr){
        return db.buscarXQR(qr);
    }

    function agregar(data){
        return db.agregar(TABLA,data);
    }

    function entradaSalida(id){
        return db.entradaSalida(TABLA, id);
    }
    
    return {
        buscarQr,
        agregar,
        entradaSalida,
        
    }
}