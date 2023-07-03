const express = require('express');
const entryExit = express.Router();


entryExit.get('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM ingreso_salida;',(err, rows)=>{
            if(err) return res.send(err)


            res.json(rows)
        });
    });
});


module.exports = entryExit;