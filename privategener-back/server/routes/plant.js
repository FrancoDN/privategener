const plantController  = require('../controllers/plant')
const express = require('express');
const app = express();


// Obtengo todas las cuentas de la BD
app.get('/plants', plantController.getPlants);
// Encuentro account/s por user id
app.get('/accounts/:id', plantController.getPlantById);
// Actualizo a una cuenta o la creo si no existe
app.put('/account/:id', plantController.updatePlant);
// Obtengo cantidad de plantas en la BD
app.get('/plantCount/:id', plantController.getPlantsCount)
// Elimino a una planta
app.delete('/deletePlant/:id', plantController.deletePlant)

module.exports = app;