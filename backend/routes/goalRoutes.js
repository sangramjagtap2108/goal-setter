const express = require('express');
const router = express.Router();
// 1.const getGoals = require('../controller/goalController');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalController');

// 1.router.get('/', getGoals.getGoals );
router.get('/', getGoals );

router.post('/', setGoal );

router.put('/:id', updateGoal );

router.delete('/:id', deleteGoal );

module.exports = router;