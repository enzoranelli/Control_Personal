const TABLA = 'personal';

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

    function agregar(data){
        return db.agregar(TABLA,data);
    }

    function agregarUsuario(data){
        return db.agregarUsuario(data);
    }

    function buscarId(dni){
        return db.buscarId(dni);
    }

    function eliminar(id){
        return db.eliminar(TABLA,id,'id');
    }
    function eliminarUsuario(id){
        return db.eliminar('usuario',id,'Persona');
    }
    function eliminarEntradaSalida(id){
        return db.eliminar('ingreso_salida',id,'Persona');
    }
    return {
        todos,
        uno,
        agregar,
        agregarUsuario,
        buscarId,
        eliminarUsuario,
        eliminar,
        eliminarEntradaSalida,
    }
}