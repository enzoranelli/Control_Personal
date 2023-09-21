const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const config = require('./config.js');
const app =express();
const personal = require('./modules/personal/rutas.js');
const login = require('./modules/login/rutas.js');
const entrada_salida = require('./modules/entrada_salida/rutas.js');


app.use(express.static(path.join(__dirname, 'public')));
app.set('port', config.app.port);

app.set('views', path.join(__dirname,'public','views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Middlewares-------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//Rutas---------------------------------------

app.get('/',(req, res) =>{
    res.render('Escaner/index');
});

app.use('/api/personal', personal);
app.use('/api/login', login);
app.use('/api/entrada_salida', entrada_salida);

module.exports = app;