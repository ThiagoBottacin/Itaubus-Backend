const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const authMiddleware = require('./middlewares/AuthMiddleware');

const AuthController = require('./controllers/AuthController');
const LineController = require('./controllers/LineController');
const CheckInController = require('./controllers/CheckInController');

const routes = new express.Router();

routes.post('/auth/register', AuthController.register);
routes.post('/auth/authenticate', AuthController.authenticate);

routes.get('/lines', authMiddleware, LineController.index);
routes.post('/lines', authMiddleware, LineController.store);
routes.post('/lines/:id/checkin', authMiddleware, CheckInController.store);

module.exports = routes;
