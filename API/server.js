const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const personal = require('./routes/personal');
const huella = require('./routes/huella');
const entrada_salida = require('./routes/entrada_salida');

const app =express();

app.set('port', process.env.PORT || 9000);

const dboptions = {
    host:'localhost',
    port:3306,
    user:'root',
    password: '',
    database:'controlpersonal'
}

//Middlewares-------------------------------

app.use(cors());
app.use(myconn(mysql, dboptions, 'single'));
app.use(express.json());

//Rutas---------------------------------------

app.get('/',(req, res) =>{
    res.send('Bienvenido a mi api');
});

app.use('/personal', personal);

app.use('/huella',huella);

app.use('/entradasalida',entrada_salida)

//Servidor Corriendo--------------------------

app.listen(9000, ()=>{
    console.log('server on port',app.get('port'));
});