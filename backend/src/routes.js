const { Router } = require('express');
const authMiddleware = require('./app/middlewares/auth');
const EstablishmentController = require('./app/controllers/EstablishmentController');
const ProductsController = require('./app/controllers/ProductsController');
const SessionController = require('./app/controllers/SessionController');
const BrazilApiController = require('./app/controllers/BrazilApiController');

const routes = new Router();

routes.post('/signin', SessionController.create);

routes.post('/establishment', EstablishmentController.create);
routes.get('/establishment', authMiddleware, EstablishmentController.read);
routes.patch('/establishment', authMiddleware, EstablishmentController.update);
routes.delete('/establishment', authMiddleware, EstablishmentController.delete);

routes.get('/products', authMiddleware, ProductsController.read);
routes.post('/products', authMiddleware, ProductsController.create);
routes.patch('/products/:productId', authMiddleware, ProductsController.update);
routes.delete('/products/:productId', authMiddleware, ProductsController.delete);

routes.post('/address', BrazilApiController.addresses);

module.exports = routes;
