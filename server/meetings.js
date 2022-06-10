const express = require('express');
const meetingRouter = express.Router();


const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
  } = require('./db');

meetingRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
})

meetingRouter.post('/', (req, res, next)=> {
    // model type is passed into the addToDatabase function as the first argument
    const modelType = 'meetings';

    // get the request body which should contain data from 
    let newMeeting = createMeeting();

    res.status(201).send(addToDatabase(modelType, newMeeting));
})


meetingRouter.delete('/', (req, res, next) => {
    // model type is passed into the getFromDatabaseById function as the first argument
    const modelType = 'meetings';

    deleteAllFromDatabase(modelType);

    res.status(204).send();
})

module.exports = meetingRouter;