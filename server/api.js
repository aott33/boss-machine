const express = require('express');
const app = require('../server');
const minionRouter = require('./minions');
const apiRouter = express.Router();

apiRouter.use('/minions', minionRouter);

module.exports = apiRouter;
