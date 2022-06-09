const express = require('express');
const minionRouter = express.Router();


const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db');

minionRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
})

minionRouter.post('/', (req, res, next)=> {
    // model type is passed into the addToDatabase function as the first argument
    const modelType = 'minions';

    // get the request body which should contain data from 
    let newMinion = req.body;

    // destructure the minion object from above
    let salary = newMinion.salary;

    let hasAllInputs = false;
    let salaryIsNumber = false;

    // checks if all the request body has all the required input
    if (newMinion.hasOwnProperty('name') &&
        newMinion.hasOwnProperty('title') &&
        newMinion.hasOwnProperty('salary') &&
        newMinion.hasOwnProperty('weaknesses')) {
            hasAllInputs = true;
        }

    // checks if salary is a number
    if (!isNaN(salary)) {
        salaryIsNumber = true;
        newMinion.salary = Number(salary);
    }

    // checks if values exist in req.body and that salary is a number
    if (hasAllInputs && salaryIsNumber) {
        res.status(201).send(addToDatabase(modelType, newMinion));
    }
    else {
        res.status(404).send('Request body is missing information or is incorrect');
    }
})

module.exports = minionRouter;