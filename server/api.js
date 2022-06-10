const express = require('express');
const app = require('../server');
const minionRouter = require('./minions');
const ideaRouter = require('./ideas');
const meetingRouter = require('./meetings');
const apiRouter = express.Router();

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;