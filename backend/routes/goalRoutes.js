const express = require('express');
const router = express.Router();
// 1.const getGoals = require('../controller/goalController');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalController');
const { protect } = require('../middleware/authMiddleware');

// 1.router.get('/', getGoals.getGoals );
router.get('/', protect, getGoals );

router.post('/', protect, setGoal );

router.put('/:id', protect, updateGoal );

router.delete('/:id', protect, deleteGoal );

module.exports = router;