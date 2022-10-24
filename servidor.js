//console.log("Hola mundo desde Nodejs")
const { Router } = require('express');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conexion a bases de datos
mongoose.connect("mongodb+srv://proweb:proweb@clusterproweb.nl89l2f.mongodb.net/ActividadesBD?retryWrites=true&w=majority"); //creacion de constante/ cadena de conexion/ Conexion a atlas
const TareaSchema = require("./modelos/Tarea.js") //Inicia la importacion de esquema

router.get('/', (req, res) => {
    res.send("El inicio de API");
});
router.post('/tarea', (req, res) => {
    let nuevaTarea = new TareaSchea({
        idTarea: req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle
    });
    nuevaTarea.save(function(err, datos) {
        if (err) {
            console.log(err);
        }
        res.send("Tarea Almacenada correctamente")
    })
});
//Funcionalidad  del verbo get
router.get('/tarea', (req, res) => {
    TareaSchema.find(function(err, datos) {
        if (err) {
            console.log("error leyendo las tareas");
        } else {
            res.send(datos)
        }
    });
});

router.post('/tarea/remove', (req, res) => {
    TareaSchema.remove({ idTarea: req.body.valorId }, (err, doc) => {
        res.json(doc);
    });
});
app.use(router);
//fin del proceso CRUD



//Operaciones CRUD
app.listen(3000, () => {
    console.log("Servidor correindo desdeel puerto 3000")
})