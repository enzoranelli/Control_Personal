const TABLA = 'entrada_salida';

module.exports = function(dbjinyec){
    
    let db = dbjinyec;

    if(!db){
        db = require('../../DB/mysql.js');
    }

    function buscarQr(){
        return db.todos(TABLA);
    }

    
    return {
        todos,
        uno,
        agregar,
        agregarUsuario,
        buscarId,
    }
}