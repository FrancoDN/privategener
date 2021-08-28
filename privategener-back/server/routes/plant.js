const plantController  = require('../controllers/plant')
const express = require('express');
const app = express();


// Crear donador
app.post('/newPlant', plantController.postPlant);
// Obtengo todas las plantas
app.get('/plants', plantController.getPlants);
// Encuentro planta por ID
app.get('/plant/:id', plantController.getPlantById);

// app.get('/plant2/:id', plantController.getPlantById2);
// Actualizo a una planta
app.put('/plant/:id', plantController.updatePlant);
// Obtengo cantidad de plantas en la BD
app.get('/donorsCount', plantController.getPlantsCount)
// Elimino a una planta
app.delete('/deletePlant/:id', plantController.deletePlant)

module.exports = app;