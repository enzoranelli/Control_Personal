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

    return {
        todos,
        uno,
    }
}