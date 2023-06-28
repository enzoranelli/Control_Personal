const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const myconn = require('express-myconnection');


const app =express();
app.set('port', process.env.PORT || 9000);
const dboptions = {
    host:'localhost',
    port:3306,
    user:'root',
    password: ''
}
//Middlewares-------------------------------

app.use(cors());
app.use(myconn(mysql, dboptions, 'single'));


//Rutas---------------------------------------

app.get('/',(req, res) =>{
    res.send('Bienvenido a mi api');
});

//Servidor Corriendo--------------------------

app.listen(9000, ()=>{
    console.log('server on port',app.get('port'));
});