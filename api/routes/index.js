const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const addressRouter = require('./address.router');
const cartRouter = require('./cart.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/address', addressRouter);
  router.use('/cart', cartRouter);
}

module.exports = routerApi;
