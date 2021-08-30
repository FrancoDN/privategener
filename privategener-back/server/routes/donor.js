const donorController  = require('../controllers/donor')
const express = require('express');
const app = express();


// Crear donador
app.post('/newDonor', donorController.postDonor);
// Obtengo todos los donadores
app.get('/donors', donorController.getDonors);
// Encuentro donador por ID
app.get('/donor/:id', donorController.getDonorById);

app.get('/license/:id', donorController.getDonorLincese);
// Actualizo a un donador
app.put('/donor/:id', donorController.updateDonor);
// Obtengo los donadores de la BD
app.get('/donorsCount', donorController.getDonorsCount)
// Elimino a un donador
app.delete('/deleteDonor/:id', donorController.deleteDonor)

module.exports = app;