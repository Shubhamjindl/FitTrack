const User = require('../models/User');
const Workout = require('../models/Workout');

// @desc    Get user profile along with fitness statistics
// @route   GET /api/profile
// @access  Private
const getProfileStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const workouts = await Workout.find({ user: user._id });

    let totalDuration = 0;
    let totalExercises = 0;
    let totalVolume = 0;
    const typeCountMap = {};

    workouts.forEach((w) => {
      totalDuration += w.duration || 0;
      typeCountMap[w.type] = (typeCountMap[w.type] || 0) + 1;
      if (Array.isArray(w.exercises)) {
        totalExercises += w.exercises.length;
        w.exercises.forEach((ex) => {
          totalVolume += (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
        });
      }
    });

    let favoriteType = 'N/A';
    let maxCount = 0;
    Object.entries(typeCountMap).forEach(([t, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteType = t;
      }
    });

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      stats: {
        totalWorkouts: workouts.length,
        totalDurationMinutes: totalDuration,
        totalDurationHours: (totalDuration / 60).toFixed(1),
        totalExercises,
        totalVolumeKg: Math.round(totalVolume),
        favoriteType,
      },
    });
  } catch (error) {
    console.error('[Profile Stats Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error loading profile stats',
    });
  }
};

module.exports = {
  getProfileStats,
};
