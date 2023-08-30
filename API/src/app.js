const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config.js');
const app =express();
const personal = require('./modules/personal/rutas.js');

app.set('port', config.app.port);


//Middlewares-------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//Rutas---------------------------------------

app.get('/',(req, res) =>{
    res.send('Bienvenido a mi api');
});

app.use('/api/personal', personal);





module.exports = app;