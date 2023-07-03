const express = require('express');
const huella = express.Router();


huella.get('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM huella;',(err, rows)=>{
            if(err) return res.send(err)


            res.json(rows)
        });
    });
});


module.exports = huella;
