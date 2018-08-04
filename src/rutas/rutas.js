/**
 * En este archivo ruta es donde se define que acciones debe tomar la aplicacion, deacuerdo a lo solicitadi por el cliente
 */
const express = require('express');

const router = express.Router();

//Esta variable Tarea, almacena el modelo del acceso a la base de datos
const Tarea = require('../models/tarea.js');


/*
router.get('/', (req, res)=>{
    //res.send("Hola Mern");
  
    Tarea.find(function(err, datos){
        console.log(datos);
    });

    res.json({
        estado: 'API trabajando'
    });
});
*/

/**
 * Esta ruta el para cuando desde el frontend se solicite la API, sin ningun parametro
 * Este metodo retornara todos los elementos almacenados en la base de datos
 * Usando el metodo find() 
 * Devuelve un json con todos los datos de la consulta
 */
router.get('/', async (req, res)=>{
  
    const consulta_tareas = await Tarea.find();
    //console.log(consulta_tareas);
    res.json(consulta_tareas);
    
});

/**
 * Esta ruta el para cuando desde el frontend se solicite la API, enviando datos por post
 * se reciben los datos del cliente y se crea una nueva tarea, para almacenarla en la base de datos
 * Este metodo retornara un estatus
 * Usando el metodo save() para guardar lo recibido
 */
router.post('/', async (req, res)=>{
    //console.log(req.body);

    const {titulo, descripcion} = req.body;

    const tarea = new Tarea({titulo, descripcion});

    //console.log(tarea);

    await tarea.save();

    //res.json("Recibido post");
    res.json({status: "Tarea guardada"});

});


//Para actualizar
router.put('/:id', async (req, res)=>{

    const {titulo, descripcion} = req.body;

    const actualizar_tarea = {titulo, descripcion};

    //console.log(req.params.id);

    await Tarea.findByIdAndUpdate(req.params.id, actualizar_tarea);

    res.json({status: "Tarea actualizada"});

});


router.delete('/:id', async (req, res)=>{
    await Tarea.findByIdAndRemove(req.params.id);
    res.json({status: "Tarea eliminada"});
});


//Devolver una unica tarea, dada en el id
router.get('/:id', async (req, res)=>{
    const tarea_encontrada = await Tarea.findById(req.params.id);
    res.json(tarea_encontrada);

}); 
module.exports = router;