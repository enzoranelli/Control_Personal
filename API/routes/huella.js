const express = require('express');
const huella = express.Router();

//Devuelve todos los registros de huellas
huella.get('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM huella;',(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        });
    });
});

// Devuelve un registro de huella especifico segun el id por parametro
huella.get('/:id',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM huella WHERE idHuella = ?;',[req.params.id],(err, rows)=>{
            if(err) return res.send(err)


            res.json(rows)
        });
    });
});

//Inserta un nuevo registro en la tabla huella
huella.post('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body);
        conn.query('INSERT INTO huella set ?',[req.body],(err, rows)=>{
            if(err) return res.send(err)

           res.send('Huella insertada');
            
        });
    });
});

//Borra un registro especificado por id de la tabla huella

huella.delete('/:id',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body);
        conn.query('DELETE FROM huella WHERE idHuella = ?',[req.params.id],(err, rows)=>{
            if(err) return res.send(err)

           res.send('Huella borrada');
            
        });
    });
});

module.exports = huella;
