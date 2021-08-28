const landController  = require('../controllers/land')
const express = require('express');
const app = express();


// Crear land
app.post('/newLand', landController.postLand);
// Obtengo todas los lands
app.get('/lands', landController.getLands);
// Encuentro land por ID
app.get('/land/:id', landController.getLandById);
// Actualizo a una land
app.put('/land/:id', landController.updateLand);
// Obtengo las lands de la BD
app.get('/landsCount', landController.getLandsCount);
// Elimino una land
app.delete('/deleteLand/:id', landController.deleteLand);

module.exports = app;