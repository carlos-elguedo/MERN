const mongoose = require('mongoose');
const {Schema} = mongoose;

const esquema_tareas = new Schema({
    titulo:         {type:String, required: true},
    descripcion:    {type:String, required: true}
});


module.exports = mongoose.model('Tarea', esquema_tareas);