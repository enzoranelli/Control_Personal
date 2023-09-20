const TABLA = 'usuario';

module.exports = function(dbjinyec){
    
    let db = dbjinyec;

    if(!db){
        db = require('../../DB/mysql.js');
    }

    function todos(){
        return db.todos(TABLA);
    }

    function uno(id){
        return db.uno(TABLA,id);
    }

    function existe(correo){
        return db.existe(TABLA, correo);
    }
    return {
        todos,
        uno,
        existe,
    }
}