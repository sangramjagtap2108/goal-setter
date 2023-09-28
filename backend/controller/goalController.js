const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel')

// while working with mongoose functions will return promise,for that we need to use async
const getGoals = asyncHandler(async(req,res) => {
    // res.status(200).json({ messgae: 'Get goals' });
    // const goals = await Goal.find();
    // req.user - from protect middleware
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        // req.user - protect middleware
        user: req.user.id
    });
    // res.status(200).json({ messgae: 'Set goal' });
    res.status(200).json(goal);
});

const updateGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    };

    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    };

    // Make sure the logged in user matches with the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    };

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true});

    // res.status(200).json({ messgae: `Update goal ${req.params.id}` });
    res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    };

    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    };

    // Make sure the logged in user matches with the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    };

    await Goal.deleteOne({ _id: req.params.id });

    // res.status(200).json({ messgae: `Delete goal ${req.params.id}` });
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
};