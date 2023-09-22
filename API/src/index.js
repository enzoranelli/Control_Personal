const app = require('./app.js');


//Servidor Corriendo--------------------------
app.listen(app.get('port'),()=>{
   
    console.log('Listen on port',app.get('port'));
});