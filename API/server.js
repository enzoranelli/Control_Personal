const express = require('express');
const cors = require('cors');

const app =express();
app.use(cors());
app.set('port', process.env.PORT || 9000);
app.listen(9000, ()=>{
    console.log('server on port 9000');
})

app.get('/',(req, res) =>{
    const datos = {
        nombre: 'Enzo ranelli',
        edad: 20,
        ocupacion: 'Programador'
    }
    res.json(datos);
})