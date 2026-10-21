const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Workout = require('./models/Workout');

async function seedData() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing.');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[FitTrack Seeder] Connected to MongoDB Atlas');

    // Check if demo user already exists
    const demoEmail = 'alex.fit@example.com';
    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      user = await User.create({
        name: 'Alex Morgan',
        email: demoEmail,
        password: 'password123',
      });
      console.log('[FitTrack Seeder] Created demo user:', demoEmail);
    } else {
      console.log('[FitTrack Seeder] Demo user already exists:', demoEmail);
    }

    // Clear existing workouts for demo user to avoid duplicates if re-run
    await Workout.deleteMany({ user: user._id });

    const now = new Date();
    const daysAgo = (days) => {
      const d = new Date(now);
      d.setDate(d.getDate() - days);
      return d;
    };

    const demoWorkouts = [
      {
        user: user._id,
        name: 'Heavy Leg Day Blitz',
        date: daysAgo(1),
        type: 'Strength',
        duration: 65,
        notes: 'Crushed lower body PRs! Great quad pump and solid hamstring control.',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: 8, weight: 110 },
          { name: 'Romanian Deadlift', sets: 4, reps: 10, weight: 90 },
          { name: 'Leg Press', sets: 3, reps: 12, weight: 180 },
          { name: 'Standing Calf Raise', sets: 4, reps: 15, weight: 60 },
        ],
      },
      {
        user: user._id,
        name: 'Morning Riverfront Run',
        date: daysAgo(2),
        type: 'Running',
        duration: 45,
        notes: 'Steady 7.5km run along the waterfront. Avg pace 5:45 min/km.',
        exercises: [
          { name: 'Outdoor Running', sets: 1, reps: 1, weight: 0 },
        ],
      },
      {
        user: user._id,
        name: 'Chest & Triceps Power',
        date: daysAgo(4),
        type: 'Strength',
        duration: 55,
        notes: 'Felt strong on bench press. Triceps burn on rope pushdowns.',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: 85 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 28 },
          { name: 'Cable Chest Flyes', sets: 3, reps: 12, weight: 15 },
          { name: 'Triceps Rope Pushdown', sets: 4, reps: 12, weight: 25 },
        ],
      },
      {
        user: user._id,
        name: 'High Intensity Core & Conditioning',
        date: daysAgo(5),
        type: 'HIIT',
        duration: 35,
        notes: 'Tabata interval session. Heart rate averaged 155 bpm.',
        exercises: [
          { name: 'Kettlebell Swings', sets: 4, reps: 20, weight: 20 },
          { name: 'Burpees', sets: 4, reps: 15, weight: 0 },
          { name: 'Mountain Climbers', sets: 4, reps: 30, weight: 0 },
          { name: 'Hanging Leg Raises', sets: 3, reps: 12, weight: 0 },
        ],
      },
      {
        user: user._id,
        name: 'Back & Biceps Hypertrophy',
        date: daysAgo(7),
        type: 'Strength',
        duration: 60,
        notes: 'Focused on mind-muscle connection with slow eccentric movement.',
        exercises: [
          { name: 'Conventional Deadlift', sets: 4, reps: 6, weight: 135 },
          { name: 'Lat Pulldown', sets: 4, reps: 10, weight: 65 },
          { name: 'Barbell Bent Over Row', sets: 4, reps: 8, weight: 70 },
          { name: 'Incline Dumbbell Curl', sets: 3, reps: 10, weight: 14 },
        ],
      },
      {
        user: user._id,
        name: 'Vinyasa Flow & Deep Stretch',
        date: daysAgo(8),
        type: 'Yoga',
        duration: 40,
        notes: 'Full body restorative session. Hip openers and spinal mobility.',
        exercises: [
          { name: 'Sun Salutations', sets: 5, reps: 1, weight: 0 },
          { name: 'Pigeon Pose', sets: 2, reps: 1, weight: 0 },
        ],
      },
      {
        user: user._id,
        name: 'Chest & Shoulders Hypertrophy',
        date: daysAgo(11),
        type: 'Strength',
        duration: 50,
        notes: 'Progression session for overhead press and flat bench.',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: 82.5 },
          { name: 'Overhead Barbell Press', sets: 4, reps: 8, weight: 52.5 },
          { name: 'Lateral Dumbbell Raise', sets: 4, reps: 15, weight: 10 },
        ],
      },
      {
        user: user._id,
        name: 'Tempo Cycling Hills',
        date: daysAgo(13),
        type: 'Cycling',
        duration: 50,
        notes: 'Hill climb cadence training. 18km total distance.',
        exercises: [
          { name: 'Stationary / Road Cycling', sets: 1, reps: 1, weight: 0 },
        ],
      },
      {
        user: user._id,
        name: 'Lower Body Strength & Power',
        date: daysAgo(16),
        type: 'Strength',
        duration: 60,
        notes: 'Previous week squat session.',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: 8, weight: 105 },
          { name: 'Romanian Deadlift', sets: 4, reps: 10, weight: 85 },
          { name: 'Walking Lunges', sets: 3, reps: 12, weight: 20 },
        ],
      },
      {
        user: user._id,
        name: 'Chest & Triceps Foundation',
        date: daysAgo(19),
        type: 'Strength',
        duration: 50,
        notes: 'Earlier baseline benchmark bench press session.',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: 10, weight: 80 },
          { name: 'Dumbbell Flyes', sets: 3, reps: 12, weight: 14 },
          { name: 'Triceps Rope Pushdown', sets: 3, reps: 12, weight: 22.5 },
        ],
      },
      {
        user: user._id,
        name: 'Deadlift & Pull Day',
        date: daysAgo(23),
        type: 'Strength',
        duration: 55,
        notes: 'Baseline deadlift session for progressive overload tracking.',
        exercises: [
          { name: 'Conventional Deadlift', sets: 4, reps: 6, weight: 125 },
          { name: 'Lat Pulldown', sets: 3, reps: 10, weight: 60 },
          { name: 'Barbell Bicep Curl', sets: 3, reps: 10, weight: 30 },
        ],
      },
    ];

    await Workout.insertMany(demoWorkouts);
    console.log(`[FitTrack Seeder] Seeded ${demoWorkouts.length} workouts for demo user.`);
    console.log('[FitTrack Seeder] Demo Login:');
    console.log('  Email:    alex.fit@example.com');
    console.log('  Password: password123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[FitTrack Seeder Error]', error);
    process.exit(1);
  }
}

seedData();
