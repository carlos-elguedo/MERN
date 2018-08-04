const mongoose = require('mongoose');

const url_mongo = 'mongodb://localhost/tareas-mern';

mongoose.connect(url_mongo)
    .then(db => console.log("Conectado a mongo"))
    .catch(err => console.error(err));

module.exports = mongoose;
