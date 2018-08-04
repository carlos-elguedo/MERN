const express = require('express');
const morgan = require('morgan');
const path = require('path');

const {mongoose} = require('./basedatos')
const app = express();


//Confiiguraciones
//Le decimos a la app que se congigure para usar el puerto proporcionado por el sistema operativo
app.set('port', process.env.PORT || 3000);



//Funciones middlewares
//Definimos esto para obtener informacion sobre las solicitudes
app.use(morgan('dev'));
app.use(express.json());



//Rutas

//app.use(require('./rutas/rutas.js'));-->Normal
app.use('/api/tareas', require('./rutas/rutas.js'));




//Archivos estaticos
console.log(path.join( __dirname, 'puclic'));
app.use(express.static(path.join(__dirname, 'public')))


//servidor

app.listen(app.get('port'), ()=>{
    console.log(`Servidor en el puerto ${app.get('port')}`);
});