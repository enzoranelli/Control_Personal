const express = require('express');
const personal = express.Router();

//Devuelve todos los registros de la tabla personal
personal.get('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM personal;',(err, rows)=>{
            if(err) return res.send(err)


            res.json(rows)
        });
    });
});

// Devuelve un registro de personal especifico segun el id por parametro
personal.get('/:id',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM personal WHERE idPersonal = ?;',[req.params.id],(err, rows)=>{
            if(err) return res.send(err)


            res.json(rows)
        });
    });
});

//Inserta un nuevo registro en la tabla personal
personal.post('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body);
        conn.query('INSERT INTO personal set ?',[req.body],(err, rows)=>{
            if(err) return res.send(err)

           res.send('Personal insertado');
            
        });
    });
});


//Borra un registro especificado por id de la tabla personal

personal.delete('/:id',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body);
        conn.query('DELETE FROM personal WHERE idPersonal = ?',[req.params.id],(err, rows)=>{
            if(err) return res.send(err)

           res.send('Personal borrado');
            
        });
    });
});

//Actualizar datos de personal

personal.put('/:id',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body);
        conn.query('UPDATE personal set ? WHERE idPersonal = ?',[req.body,req.params.id],(err, rows)=>{
            if(err) return res.send(err)

           res.send('Personal actualizado');
            
        });
    });
});

module.exports = personal;
