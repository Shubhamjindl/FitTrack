const Workout = require('../models/Workout');

// @desc    Get all workouts for the authenticated user with search, filter, and sorting
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    const { q, type, startDate, endDate, sortBy = 'date', order = 'desc' } = req.query;

    const query = { user: req.user._id };

    // Search query by workout name, notes, or exercise name
    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { notes: searchRegex },
        { 'exercises.name': searchRegex },
      ];
    }

    // Filter by type
    if (type && type !== 'All') {
      query.type = type;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    // Build sort object
    const sortField = ['date', 'duration', 'name', 'createdAt'].includes(sortBy)
      ? sortBy
      : 'date';
    const sortDirection = order === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortDirection };

    const workouts = await Workout.find(query).sort(sort);

    return res.json({
      success: true,
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    console.error('[Get Workouts Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving workouts',
    });
  }
};

// @desc    Get single workout by ID
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found or you do not have permission to view it',
      });
    }

    return res.json({
      success: true,
      data: workout,
    });
  } catch (error) {
    console.error('[Get Workout By ID Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving workout',
    });
  }
};

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
  try {
    const { name, date, type, duration, notes, exercises } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Workout name is required',
      });
    }

    if (!duration || Number(duration) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be greater than 0 minutes',
      });
    }

    // Sanitize exercises if provided
    const sanitizedExercises = Array.isArray(exercises)
      ? exercises
          .filter((ex) => ex.name && ex.name.trim() !== '')
          .map((ex) => ({
            name: ex.name.trim(),
            sets: Number(ex.sets) > 0 ? Number(ex.sets) : 1,
            reps: Number(ex.reps) > 0 ? Number(ex.reps) : 1,
            weight: Number(ex.weight) >= 0 ? Number(ex.weight) : 0,
          }))
      : [];

    const workout = await Workout.create({
      user: req.user._id,
      name: name.trim(),
      date: date ? new Date(date) : new Date(),
      type: type || 'Strength',
      duration: Number(duration),
      notes: notes ? notes.trim() : '',
      exercises: sanitizedExercises,
    });

    return res.status(201).json({
      success: true,
      message: 'Workout logged successfully',
      data: workout,
    });
  } catch (error) {
    console.error('[Create Workout Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating workout',
    });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found or you do not have permission to edit it',
      });
    }

    const { name, date, type, duration, notes, exercises } = req.body;

    if (name !== undefined) workout.name = name.trim();
    if (date !== undefined) workout.date = new Date(date);
    if (type !== undefined) workout.type = type;
    if (duration !== undefined) workout.duration = Number(duration);
    if (notes !== undefined) workout.notes = notes.trim();

    if (Array.isArray(exercises)) {
      workout.exercises = exercises
        .filter((ex) => ex.name && ex.name.trim() !== '')
        .map((ex) => ({
          name: ex.name.trim(),
          sets: Number(ex.sets) > 0 ? Number(ex.sets) : 1,
          reps: Number(ex.reps) > 0 ? Number(ex.reps) : 1,
          weight: Number(ex.weight) >= 0 ? Number(ex.weight) : 0,
        }));
    }

    const updatedWorkout = await workout.save();

    return res.json({
      success: true,
      message: 'Workout updated successfully',
      data: updatedWorkout,
    });
  } catch (error) {
    console.error('[Update Workout Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating workout',
    });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found or you do not have permission to delete it',
      });
    }

    return res.json({
      success: true,
      message: 'Workout deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    console.error('[Delete Workout Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting workout',
    });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
