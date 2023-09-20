const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const config = require('./config.js');
const app =express();
const personal = require('./modules/personal/rutas.js');
const login = require('./modules/login/rutas.js');


app.set('port', config.app.port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Middlewares-------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//Rutas---------------------------------------

app.get('/',(req, res) =>{
    res.render('index.html');
});

app.use('/api/personal', personal);
app.use('/api/login', login);


module.exports = app;