const Workout = require('../models/Workout');

// @desc    Get detailed progress analytics (frequency, duration trends, type distribution, exercise weight progression)
// @route   GET /api/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exercise } = req.query;

    const workouts = await Workout.find({ user: userId }).sort({ date: 1 }); // chronological

    if (workouts.length === 0) {
      return res.json({
        success: true,
        data: {
          frequency: [],
          durationTrends: [],
          typeDistribution: [],
          distinctExercises: [],
          exerciseProgress: [],
          selectedExercise: '',
          summary: {
            averageDuration: 0,
            favoriteType: 'None',
            totalVolume: 0,
            heaviestLift: null,
            totalWorkouts: 0,
          },
        },
      });
    }

    // 1. Duration Trends (chronological list)
    const durationTrends = workouts.map((w) => ({
      date: new Date(w.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      fullDate: new Date(w.date).toISOString().split('T')[0],
      duration: w.duration,
      name: w.name,
      type: w.type,
    }));

    // 2. Workout Type Distribution
    const typeCountMap = {};
    let totalWorkoutsCount = workouts.length;
    let totalDurationSum = 0;
    let totalVolumeSum = 0;
    let heaviestLift = { exercise: '', weight: 0, reps: 0, date: null };

    // Set of distinct exercises
    const exerciseSet = new Set();
    const exerciseFrequency = {};

    workouts.forEach((w) => {
      totalDurationSum += w.duration || 0;
      typeCountMap[w.type] = (typeCountMap[w.type] || 0) + 1;

      if (Array.isArray(w.exercises)) {
        w.exercises.forEach((ex) => {
          if (ex.name && ex.name.trim()) {
            const cleanName = ex.name.trim();
            exerciseSet.add(cleanName);
            exerciseFrequency[cleanName] = (exerciseFrequency[cleanName] || 0) + 1;

            const volume = (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
            totalVolumeSum += volume;

            if (Number(ex.weight) > heaviestLift.weight) {
              heaviestLift = {
                exercise: cleanName,
                weight: Number(ex.weight),
                reps: Number(ex.reps),
                date: w.date,
              };
            }
          }
        });
      }
    });

    const typeDistribution = Object.keys(typeCountMap).map((type) => ({
      name: type,
      value: typeCountMap[type],
      percentage: Math.round((typeCountMap[type] / totalWorkoutsCount) * 100),
    }));

    // Favorite workout type
    let favoriteType = 'None';
    let maxTypeCount = 0;
    Object.entries(typeCountMap).forEach(([t, count]) => {
      if (count > maxTypeCount) {
        maxTypeCount = count;
        favoriteType = t;
      }
    });

    // 3. Frequency by Month / Week (last 6 months)
    const monthMap = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize past 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const key = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
      monthMap[key] = { month: key, workouts: 0, totalDuration: 0 };
    }

    workouts.forEach((w) => {
      const wDate = new Date(w.date);
      const key = `${months[wDate.getMonth()]} ${wDate.getFullYear().toString().slice(2)}`;
      if (monthMap[key]) {
        monthMap[key].workouts += 1;
        monthMap[key].totalDuration += w.duration || 0;
      }
    });

    const frequency = Object.values(monthMap);

    // 4. Distinct exercises sorted alphabetically
    const distinctExercises = Array.from(exerciseSet).sort();

    // 5. Exercise Progress
    // If no exercise specified in query, pick the most performed exercise
    let targetExercise = exercise;
    if (!targetExercise && distinctExercises.length > 0) {
      let mostFreqEx = distinctExercises[0];
      let maxExCount = 0;
      Object.entries(exerciseFrequency).forEach(([name, count]) => {
        if (count > maxExCount) {
          maxExCount = count;
          mostFreqEx = name;
        }
      });
      targetExercise = mostFreqEx;
    }

    const exerciseProgress = [];
    if (targetExercise) {
      workouts.forEach((w) => {
        if (Array.isArray(w.exercises)) {
          const match = w.exercises.find(
            (ex) => ex.name.toLowerCase().trim() === targetExercise.toLowerCase().trim()
          );
          if (match) {
            exerciseProgress.push({
              date: new Date(w.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              }),
              fullDate: new Date(w.date).toISOString().split('T')[0],
              weight: Number(match.weight) || 0,
              reps: Number(match.reps) || 0,
              sets: Number(match.sets) || 0,
              totalVolume: (match.sets || 0) * (match.reps || 0) * (match.weight || 0),
              workoutName: w.name,
            });
          }
        }
      });
    }

    const averageDuration = Math.round(totalDurationSum / totalWorkoutsCount);

    return res.json({
      success: true,
      data: {
        frequency,
        durationTrends: durationTrends.slice(-20), // Last 20 workouts for clean line chart
        typeDistribution,
        distinctExercises,
        selectedExercise: targetExercise || '',
        exerciseProgress,
        summary: {
          averageDuration,
          favoriteType,
          totalVolume: Math.round(totalVolumeSum),
          heaviestLift: heaviestLift.weight > 0 ? heaviestLift : null,
          totalWorkouts: totalWorkoutsCount,
        },
      },
    });
  } catch (error) {
    console.error('[Analytics Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error calculating analytics',
    });
  }
};

module.exports = {
  getAnalytics,
};
