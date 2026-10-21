const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
  },
  sets: {
    type: Number,
    required: [true, 'Sets count is required'],
    min: [1, 'Sets must be at least 1'],
    default: 3,
  },
  reps: {
    type: Number,
    required: [true, 'Reps count is required'],
    min: [1, 'Reps must be at least 1'],
    default: 10,
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative'],
    default: 0,
  },
});

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Workout name is required'],
      trim: true,
      maxlength: [100, 'Workout name cannot exceed 100 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Workout date is required'],
      default: Date.now,
      index: true,
    },
    type: {
      type: String,
      required: [true, 'Workout type is required'],
      enum: [
        'Strength',
        'Cardio',
        'HIIT',
        'Yoga',
        'Running',
        'Cycling',
        'Bodyweight',
        'Other',
      ],
      default: 'Strength',
      index: true,
    },
    duration: {
      type: Number,
      required: [true, 'Duration in minutes is required'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: '',
    },
    exercises: {
      type: [exerciseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for total volume lifted in the workout
workoutSchema.virtual('totalVolume').get(function () {
  if (!this.exercises || this.exercises.length === 0) return 0;
  return this.exercises.reduce((total, ex) => {
    return total + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
  }, 0);
});

// Configure JSON serialization to include virtuals
workoutSchema.set('toJSON', { virtuals: true });
workoutSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Workout', workoutSchema);
