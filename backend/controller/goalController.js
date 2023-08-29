const asyncHandler = require('express-async-handler');

// while working with mongoose functions will return promise,for that we need to use async
const getGoals = asyncHandler(async(req,res) => res.status(200).json({ messgae: 'Get goals' }));

const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ messgae: 'Set goal' })
});

const updateGoal = asyncHandler(async(req,res) => res.status(200).json({ messgae: `Update goal ${req.params.id}` }));

const deleteGoal = asyncHandler(async(req,res) => res.status(200).json({ messgae: `Delete goal ${req.params.id}` }));

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
};