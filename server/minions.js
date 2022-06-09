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

    // initialize boolean flag variables to false
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

minionRouter.get('/:minionId', (req, res, next) => {
    // model type is passed into the getFromDatabaseById function as the first argument
    const modelType = 'minions';

    const minion = getFromDatabaseById(modelType, req.params.minionId);

    if (minion) { 
        res.send(minion);
    }

    else {
        res.status(404).send('Invalid id');
    }    
})

minionRouter.put('/:minionId', (req, res, next) => {
    // model type is passed into the getFromDatabaseById function as the first argument
    const modelType = 'minions';
    // get the request body which should contain data from 
    let updatedMinion = req.body;

    // destructure the minion object from above
    let salary = updatedMinion.salary;

    // initialize boolean flag variables to false
    let hasAllInputs = false;
    let salaryIsNumber = false;

    // checks if all the request body has all the required input
    if (updatedMinion.hasOwnProperty('name') &&
        updatedMinion.hasOwnProperty('title') &&
        updatedMinion.hasOwnProperty('salary') &&
        updatedMinion.hasOwnProperty('weaknesses')) {
            hasAllInputs = true;
        }

    // checks if salary is a number
    if (!isNaN(salary)) {
        salaryIsNumber = true;
        updatedMinion.salary = Number(salary);
    }
    
    updatedMinion.id = req.params.minionId;

    let minion;

    if (hasAllInputs && salaryIsNumber) {
        minion = updateInstanceInDatabase(modelType, updatedMinion);
    }
    
    if (minion) { 
        res.send(minion);
    }

    else {
        res.status(404).send('Request body is missing information or is incorrect or Invalid id');
    }    
})

module.exports = minionRouter;