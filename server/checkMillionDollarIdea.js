const e = require("express");

const checkMillionDollarIdea = (req, res, next) => {
    let newIdea = req.body;

    let hasWeeksAndRevenue = false;
    let weeksAndRevenueIsNum = false;
    let total;

    if (newIdea.hasOwnProperty('numWeeks') && newIdea.hasOwnProperty('weeklyRevenue')) {
        hasWeeksAndRevenue = true;

        if (!isNaN(newIdea.numWeeks) && !isNaN(newIdea.weeklyRevenue)) {
            weeksAndRevenueIsNum = true;
            newIdea.numWeeks = Number(newIdea.numWeeks);
            newIdea.weeklyRevenue = Number(newIdea.weeklyRevenue);
            total = newIdea.numWeeks * newIdea.weeklyRevenue;
        }
    }

    if (!hasWeeksAndRevenue || !weeksAndRevenueIsNum) {
        res.status(400).send('Missing information or numWeeks or weeklyRevenue is not a number');
    }

    else if (total >= 1000000) {
        next();
    }

    else {
        res.status(400).send('Not a million dollar idea.');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;


// much simpler implementation from solution, keeping my original code though

// const checkMillionDollarIdea = (req, res, next) => {
//     let {numWeeks, weeklyRevenue} = req.body;

//     let total = Number(numWeeks) * Number(weeklyRevenue);

//     if (!numWeeks || !weeklyRevenue || isNaN(total) || total < 100000) {
//         res.status(400).send();
//     }

//     else {
//         next();
//     }
// };

// // Leave this exports assignment so that the function can be used elsewhere
// module.exports = checkMillionDollarIdea;