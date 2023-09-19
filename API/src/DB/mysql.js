const mysql = require('mysql');
const config = require('../config.js');

const dbconfig = {
    host : config.mysql.host,
    port: config.mysql.port,
    user : config.mysql.user,
    password : config.mysql.password,
    database :config.mysql.database
}

let conexion;

function conexionMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) =>{
        if(err){
            console.log('db error',err);
            setTimeout(conMysql,200);
        }else{
            console.log('DB conectada');
        }
    });

    conexion.on('error', err =>{
        console.log('db error',err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    });
}

conexionMysql();

function todos(tabla){
    return new Promise((resolve, reject)=>{
      conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
          return error ? reject(error) : resolve(result);
      });
    });
}

function uno(tabla, id){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result)=>{
            if(error){
                return reject(error);
            }
            return result.length === 0 ? reject(error) : resolve(result);
            
        });
    });
}

module.exports = {
    todos,
    uno,
}