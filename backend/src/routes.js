const express = require('express');
const ongsController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ongs', ongsController.index);
routes.post('/ongs', ongsController.create);

routes.get('/profile', profileController.index)

routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;