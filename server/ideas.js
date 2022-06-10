const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideaRouter = express.Router();


const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideaRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next)=> {
    // model type is passed into the addToDatabase function as the first argument
    const modelType = 'ideas';

    // get the request body which should contain data from 
    let newIdea = req.body;

    // checks if values exist in req.body and that salary is a number
    if (newIdea) {
        res.status(201).send(addToDatabase(modelType, newIdea));
    }
    else {
        res.status(404).send('Request body is missing information or is incorrect');
    }
})

ideaRouter.get('/:ideaId', (req, res, next) => {
    // model type is passed into the getFromDatabaseById function as the first argument
    const modelType = 'ideas';

    const idea = getFromDatabaseById(modelType, req.params.ideaId);

    if (idea) { 
        res.send(idea);
    }

    else {
        res.status(404).send('Invalid id');
    }    
})

ideaRouter.put('/:ideaId', (req, res, next) => {
    // model type is passed into the getFromDatabaseById function as the first argument
    const modelType = 'ideas';
    // get the request body which should contain data from 
    let updatedIdea = req.body;

    // destructure the minion object from above
    let numWeeks = updatedIdea.numWeeks;
    let weeklyRevenue = updatedIdea.weeklyRevenue;

    // initialize boolean flag variables to false
    let hasAllInputs = false;
    let weeksAndRevenueIsNum = false;

    // checks if all the request body has all the required input
    if (updatedIdea.hasOwnProperty('name') &&
        updatedIdea.hasOwnProperty('description') &&
        updatedIdea.hasOwnProperty('numWeeks') &&
        updatedIdea.hasOwnProperty('weeklyRevenue')) {
            hasAllInputs = true;
        }

    // checks if salary is a number
    if (!isNaN(numWeeks) && !isNaN(weeklyRevenue)) {
        weeksAndRevenueIsNum = true;
        updatedIdea.numWeeks = Number(numWeeks);
        updatedIdea.weeklyRevenue = Number(weeklyRevenue);
    }

    updatedIdea.id = req.params.ideaId;

    let idea;

    if (hasAllInputs && weeksAndRevenueIsNum) {
        idea = updateInstanceInDatabase(modelType, updatedIdea);
    }
    
    if (idea) { 
        res.send(idea);
    }

    else {
        res.status(404).send('Request body is missing information or is incorrect or Invalid id');
    }    
})

ideaRouter.delete('/:ideaId', (req, res, next) => {
    // model type is passed into the getFromDatabaseById function as the first argument
    const modelType = 'ideas';

    const idea = deleteFromDatabasebyId(modelType, req.params.ideaId);

    if (idea) { 
        res.status(204).send();
    }

    else {
        res.status(404).send('Idea not found');
    }    
})

module.exports = ideaRouter;