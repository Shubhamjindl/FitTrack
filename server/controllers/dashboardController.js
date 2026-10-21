const Workout = require('../models/Workout');

// @desc    Get dashboard metrics, statistics, weekly activity, and recent workouts
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all workouts of this user for aggregations
    const allWorkouts = await Workout.find({ user: userId }).sort({ date: -1 });

    const totalWorkouts = allWorkouts.length;

    let totalExercises = 0;
    let totalDuration = 0;
    let totalVolume = 0;

    allWorkouts.forEach((w) => {
      totalDuration += w.duration || 0;
      if (Array.isArray(w.exercises)) {
        totalExercises += w.exercises.length;
        w.exercises.forEach((ex) => {
          totalVolume += (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
        });
      }
    });

    // Start of current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
    const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - distanceToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const weekWorkouts = allWorkouts.filter(
      (w) => new Date(w.date) >= startOfWeek
    );
    const thisWeekCount = weekWorkouts.length;
    const thisWeekDuration = weekWorkouts.reduce(
      (acc, w) => acc + (w.duration || 0),
      0
    );

    // Build last 7 days activity chart data (from 6 days ago up to today)
    const activityChart = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = daysOfWeek[d.getDay()];
      const dateStr = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Target day boundaries in local time
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const dayMatches = allWorkouts.filter((w) => {
        const wDate = new Date(w.date);
        return wDate >= dayStart && wDate <= dayEnd;
      });

      const dayDuration = dayMatches.reduce(
        (acc, w) => acc + (w.duration || 0),
        0
      );

      activityChart.push({
        day: dayStr,
        date: dateStr,
        fullDate: dayStart.toISOString().split('T')[0],
        duration: dayDuration,
        workouts: dayMatches.length,
      });
    }

    // Recent 5 workouts
    const recentWorkouts = allWorkouts.slice(0, 5).map((w) => ({
      _id: w._id,
      name: w.name,
      date: w.date,
      type: w.type,
      duration: w.duration,
      notes: w.notes,
      exerciseCount: w.exercises ? w.exercises.length : 0,
      exercises: w.exercises ? w.exercises.slice(0, 3) : [], // snippet
    }));

    return res.json({
      success: true,
      data: {
        totalWorkouts,
        totalExercises,
        totalDuration, // in minutes
        totalVolume, // in kg/lbs
        thisWeekWorkouts: thisWeekCount,
        thisWeekDuration,
        activityChart,
        recentWorkouts,
      },
    });
  } catch (error) {
    console.error('[Dashboard Stats Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error calculating dashboard statistics',
    });
  }
};

module.exports = {
  getDashboardStats,
};
