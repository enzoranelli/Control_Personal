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

function agregar(tabla, data){
    return new Promise((resolve,reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,[data,data], (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });
}

function agregarUsuario(data){
    return new Promise((resolve,reject)=>{
        conexion.query(`INSERT INTO usuario SET ? `,[data], (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
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

function buscarId(dni){
    return  new Promise((resolve, reject)=>{
        conexion.query(`SELECT id FROM personal WHERE DNI=${dni}`, (error, result)=>{
            if(error){
                console.log('Error en consulta',error);
                return reject(error);
            }

            console.log('query');
            console.log(result);
            return result.length === 0 ? reject(error) : resolve(result);
            
        });
    });
}

function buscarXQR(qr){
    return new Promise((resolve,reject)=>{
        conexion.query(`SELECT Persona FROM usuario WHERE qr = '${qr}'`,(error,result)=>{
            if(error){
                return reject(error);
            }

            return result.length === 0 ? reject(error) : resolve(result);
        })
    });
}

function existe(tabla, correo){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE correo = '${correo}'`, (error,result)=>{
            if(error){
                
                return reject(error);
            }
            
            return result.length === 0 ? reject(error) : resolve(result);
        })
    })
}



module.exports = {
    todos,
    uno,
    existe,
    agregar,
    agregarUsuario,
    buscarId,
    buscarXQR,
}