const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const { protect, preventDemoAction } = require('../middleware/auth');

// All workout routes require authentication
router.use(protect);

router.route('/')
  .get(getWorkouts)
  .post(preventDemoAction, createWorkout);

router.route('/:id')
  .get(getWorkoutById)
  .put(preventDemoAction, updateWorkout)
  .delete(preventDemoAction, deleteWorkout);

module.exports = router;
