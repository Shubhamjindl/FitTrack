
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  PlusIcon,
  TrashIcon,
  DumbbellIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  LockIcon,
  EyeIcon,
  CloseIcon,
  TargetIcon,
  ZapIcon,
} from '../components/Icons';
import {
  EXERCISE_DATABASE,
  getExercisesByCategory,
  searchExercises,
  findPresetExercise,
  getPrimaryMuscleGroup,
} from '../data/exercises';

// API base URL: local Vite proxy or deployed Render backend
const API_URL = import.meta.env.VITE_API_URL || '/api';

const WORKOUT_TYPES = [
  { value: 'Strength', label: 'Strength & Weights' },
  { value: 'Bodyweight', label: 'Bodyweight & Calisthenics' },
  { value: 'Cardio', label: 'Cardio & Conditioning (Running, Cycling, HIIT)' },
  { value: 'Yoga', label: 'Yoga & Flexibility' },
  { value: 'Sports', label: 'Sports & Athletics (Football, Cricket, Badminton)' },
  { value: 'Hybrid', label: 'Hybrid & Mixed Training' },
];

const TARGET_MUSCLE_TAGS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatLocalDateForInput = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const WorkoutForm = () => {
  const { id } = useParams(); // If present, edit mode
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { token, user, isDemo: authDemo } = useAuth();
  const isDemo = authDemo || user?.email?.toLowerCase() === 'alex.fit@example.com' || Boolean(user?.isDemo);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => getTodayDateString());
  const [type, setType] = useState('Strength');
  const [duration, setDuration] = useState(45);
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([
    { name: '', sets: 3, reps: 10, weight: 0, muscleGroup: '' },
  ]);
  const [customExercises, setCustomExercises] = useState([]);

  // Active autocomplete dropdown index & enlarged posture guide modal
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [selectedGuideExercise, setSelectedGuideExercise] = useState(null);
  const dropdownRef = useRef(null);

  // Click outside listener to dismiss smart dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdownIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch previous workouts to remember user's custom exercises
  useEffect(() => {
    if (!token) return;
    const fetchUserCustomExercises = async () => {
      try {
        const res = await fetch(`${API_URL}/workouts?limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const json = await res.json();
          const workoutsList = json.data || [];
          const customMap = new Map();

          workoutsList.forEach((w) => {
            (w.exercises || []).forEach((e) => {
              if (e.name) {
                const trimmed = e.name.trim();
                const isPreset = Boolean(findPresetExercise(trimmed));
                if (!isPreset && !customMap.has(trimmed.toLowerCase())) {
                  customMap.set(trimmed.toLowerCase(), {
                    id: `custom-${trimmed.toLowerCase()}`,
                    name: trimmed,
                    category: w.type || 'Strength',
                    categoryLabel: 'Custom',
                    muscles: e.muscleGroup || '',
                    muscleGroup: e.muscleGroup || '',
                    isCustom: true,
                    defaultSets: e.sets || 3,
                    defaultReps: e.reps || 10,
                    defaultWeight: e.weight || 0,
                    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="32" r="14" stroke="#10b981" stroke-dasharray="4 2"/><path d="M32 24v16M24 32h16" stroke="#10b981" stroke-width="3"/></svg>`,
                  });
                }
              }
            });
          });

          setCustomExercises(Array.from(customMap.values()));
        }
      } catch (err) {
        console.error('Failed to load user custom exercises:', err);
      }
    };
    fetchUserCustomExercises();
  }, [token]);

  // Load existing workout if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchWorkout = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/workouts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to load workout details');
        }

        const json = await res.json();
        const w = json.data;
        setName(w.name || '');
        setDate(w.date ? formatLocalDateForInput(w.date) : '');
        setType(w.type || 'Strength');
        setDuration(w.duration || 45);
        setNotes(w.notes || '');

        if (w.exercises && w.exercises.length > 0) {
          setExercises(
            w.exercises.map((e) => ({
              name: e.name,
              sets: e.sets,
              reps: e.reps,
              weight: e.weight,
              muscleGroup: e.muscleGroup || '',
            }))
          );
        } else {
          setExercises([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Error loading workout');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id, isEditMode, token]);

  // Handle Category Change (Instant reset to clean default template)
  const handleTypeChange = (newType) => {
    setType(newType);
    if (!isEditMode) {
      setExercises([
        {
          name: '',
          sets: 3,
          reps: newType === 'Yoga' ? 45 : 10,
          weight: 0,
          muscleGroup: '',
        },
      ]);
      setActiveDropdownIndex(null);
    }
  };

  // Add exercise row
  const handleAddExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        name: '',
        sets: 3,
        reps: type === 'Yoga' ? 45 : 10,
        weight: 0,
        muscleGroup: '',
      },
    ]);
  };

  // Remove exercise row
  const handleRemoveExercise = (index) => {
    setExercises((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Change exercise field
  const handleExerciseChange = (index, field, value) => {
    setExercises((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Check if an exercise is preset in the library
  const isPresetExercise = (exerciseName) => {
    return Boolean(findPresetExercise(exerciseName));
  };

  // Dynamic Autocomplete suggestions (Presets + Saved Custom Exercises)
  // When search query is empty: Curated presets with postures on top.
  // When user is typing a query: Matched custom exercises on top for fast 1-tap select.
  const getSuggestions = (query, currentType) => {
    const q = (query || '').trim().toLowerCase();
    const presets = q
      ? searchExercises(q, currentType)
      : getExercisesByCategory(currentType);

    const matchedCustom = customExercises.filter((ce) => {
      if (currentType !== 'Other' && currentType !== 'Hybrid') {
        const ceCat = (ce.category || 'Strength').toLowerCase();
        let targetNorm = currentType.toLowerCase();
        if (['running', 'cycling', 'hiit'].includes(targetNorm)) targetNorm = 'cardio';
        if (ceCat !== targetNorm && ceCat !== currentType.toLowerCase()) return false;
      }
      if (!q) return true;
      return (
        ce.name.toLowerCase().includes(q) ||
        (ce.muscleGroup || '').toLowerCase().includes(q)
      );
    });

    return q ? [...matchedCustom, ...presets] : [...presets, ...matchedCustom];
  };

  // Select an exercise from Autocomplete (Presets or Custom)
  const handleSelectExercise = (index, selected) => {
    const primaryTag = selected.muscleGroup || (selected.muscles && !selected.isCustom ? selected.muscles.split(',')[0].trim() : '');
    setExercises((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: selected.name,
        sets: selected.defaultSets || 3,
        reps: selected.defaultReps || (type === 'Yoga' ? 45 : 10),
        weight: selected.defaultWeight || 0,
        muscleGroup: primaryTag,
      };
      return next;
    });
    setActiveDropdownIndex(null);
  };

  // Curated form cues for exercises & postures
  const getExerciseFormCues = (exercise) => {
    if (!exercise) return [];
    const n = (exercise.name || '').toLowerCase();
    const cat = exercise.category || '';

    if (n.includes('bench press')) {
      return [
        'Maintain 5 points of contact: head, shoulders, glutes on bench, and feet planted flat.',
        'Tuck elbows at ~45°–70° from torso to protect rotator cuffs.',
        'Control the descent to lower chest, then exhale and drive smoothly upward.',
      ];
    }
    if (n.includes('squat')) {
      return [
        'Keep chest elevated, core braced tightly, and knees tracking in line with toes.',
        'Descend until thighs reach parallel or below while keeping spine completely neutral.',
        'Drive forcefully through midfoot and heels back to full standing extension.',
      ];
    }
    if (n.includes('deadlift')) {
      return [
        'Hinge hips back with bar grazing shins; engage lats and lock spine in neutral.',
        'Push the floor away through feet before driving hips forward to stand tall.',
        'Avoid hyperextending lower back at the lockout; lower under full control.',
      ];
    }
    if (n.includes('shoulder') || n.includes('overhead')) {
      return [
        'Squeeze glutes and brace core tightly to avoid excessive lumbar arching.',
        'Press directly vertical, tilting head back slightly as the bar/weight passes.',
        'Lock out overhead with bicep aligned directly next to ears.',
      ];
    }
    if (n.includes('curl')) {
      return [
        'Pin elbows firmly at sides without swinging arms forward for momentum.',
        'Squeeze biceps hard for 1 second at the peak of contraction.',
        'Lower weight under a 2-3 second controlled eccentric tempo.',
      ];
    }
    if (n.includes('row') || n.includes('pulldown') || n.includes('pull-up')) {
      return [
        'Initiate the pull by retracting and depressing scapulae (shoulder blades).',
        'Drive elbows down and back toward your hip pockets; avoid shrugging.',
        'Control the negative stretch without letting shoulders roll forward.',
      ];
    }
    if (cat === 'Yoga') {
      return [
        'Coordinate movement with calm diaphragmatic breath (inhale expand, exhale deepen).',
        'Elongate spine from tailbone through crown; avoid compressing cervical vertebrae.',
        'Honor your natural joint range of motion; never force into sharp strain.',
      ];
    }
    if (cat === 'Cardio' || cat === 'Sports') {
      return [
        'Maintain upright posture with engaged core, relaxed neck, and light shoulders.',
        'Maintain steady breathing cadence synchronized with footwork or movement pace.',
        'Stay hydrated and track pacing inside your target aerobic heart rate zone.',
      ];
    }
    return [
      'Maintain solid core bracing and neutral spine throughout every repetition.',
      'Control the eccentric (lowering) phase for 2 seconds to maximize time under tension.',
      'Drive through target muscles smoothly without relying on body momentum.',
    ];
  };

  // Curated movement demonstration GIFs from CDN
  const getExerciseGifUrl = (exercise) => {
    if (!exercise) return null;
    const name = (exercise.name || '').toLowerCase();

    if (name.includes('bench press')) {
      if (name.includes('incline')) return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-incline-bench-press.gif';
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif';
    }
    if (name.includes('squat')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-full-squat.gif';
    }
    if (name.includes('deadlift')) {
      if (name.includes('romanian')) return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-romanian-deadlift.gif';
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-deadlift.gif';
    }
    if (name.includes('shoulder press') || name.includes('overhead')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/barbell-seated-overhead-press.gif';
    }
    if (name.includes('bicep curl') || name.includes('curl')) {
      if (name.includes('incline')) return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/dumbbell-incline-biceps-curl.gif';
      if (name.includes('leg curl')) return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/hamstrings/lever-lying-leg-curl.gif';
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif';
    }
    if (name.includes('lat pulldown') || name.includes('pulldown')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/cable-lat-pulldown-full-range-of-motion.gif';
    }
    if (name.includes('fly')) {
      if (name.includes('cable')) return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/cable-standing-fly.gif';
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-fly.gif';
    }
    if (name.includes('row')) {
      if (name.includes('bent over')) return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/barbell-bent-over-row.gif';
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/cable-seated-row.gif';
    }
    if (name.includes('lateral raise')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-lateral-raise.gif';
    }
    if (name.includes('pushdown') || name.includes('triceps')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-pushdown-with-rope-attachment.gif';
    }
    if (name.includes('leg press')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/sled-45-leg-press.gif';
    }
    if (name.includes('calf raise')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/calves/barbell-standing-calf-raise.gif';
    }
    if (name.includes('lunge')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/walking-lunge.gif';
    }
    if (name.includes('push-up')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/push-up.gif';
    }
    if (name.includes('pull-up')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/pull-up.gif';
    }
    if (name.includes('dip')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/chest-dip.gif';
    }
    if (name.includes('leg raise')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/hanging-leg-raise.gif';
    }
    if (name.includes('plank')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/weighted-front-plank.gif';
    }
    if (name.includes('burpee')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/burpee.gif';
    }
    if (name.includes('jump rope') || name.includes('rope')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/jump-rope.gif';
    }
    if (name.includes('mountain climber')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/mountain-climber.gif';
    }
    if (name.includes('treadmill') || name.includes('running')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/run-equipment.gif';
    }
    if (name.includes('cycling')) {
      return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/cycle-cross-trainer.gif';
    }

    return exercise.gifUrl || null;
  };

  // Determine if weight is hidden based on workout category
  const isWeightHidden = ['Yoga', 'Cardio', 'Running', 'Cycling', 'HIIT'].includes(type);

  // Dynamic field labels & placeholders based on workout category
  const getFieldLabels = () => {
    if (type === 'Yoga') {
      return {
        sectionDesc: 'Track yoga asanas with rounds and hold duration (seconds)',
        sets: 'Rounds / Sets',
        reps: 'Hold Duration (sec)',
        weight: 'N/A',
        placeholder: 'e.g. Surya Namaskar, Downward Dog, Cobra Pose',
      };
    }
    if (['Cardio', 'Running', 'Cycling', 'HIIT'].includes(type)) {
      return {
        sectionDesc: 'Track cardio movements, intervals, or steady session drills',
        sets: 'Rounds / Intervals',
        reps: 'Duration (sec) / Reps',
        weight: 'N/A',
        placeholder: 'e.g. Treadmill, Cycling, Jump Rope, Burpees',
      };
    }
    if (type === 'Bodyweight') {
      return {
        sectionDesc: 'Track bodyweight movements, calisthenics, and core holds',
        sets: 'Sets',
        reps: 'Reps / Hold (sec)',
        weight: 'Added Wt (kg, optional)',
        placeholder: 'e.g. Standard Push-ups, Pull-ups, Forearm Plank',
      };
    }
    if (type === 'Sports') {
      return {
        sectionDesc: 'Track sports rounds, game drills, matches, or swim intervals',
        sets: 'Rounds / Sets',
        reps: 'Duration (min) / Reps',
        weight: 'Added Wt (kg, optional)',
        placeholder: 'e.g. Football, Cricket, Badminton, Swimming Laps, Boxing',
      };
    }
    if (type === 'Hybrid' || type === 'Other') {
      return {
        sectionDesc: 'Track workouts that combine weights, bodyweight, and cardio in one session',
        sets: 'Sets / Rounds',
        reps: 'Reps / Duration',
        weight: 'Weight (kg, optional)',
        placeholder: 'e.g. Barbell Bench Press, Treadmill, Push-ups, Cycling',
      };
    }
    return {
      sectionDesc: 'Track individual exercises with sets, repetitions, and weights',
      sets: 'Sets',
      reps: 'Reps',
      weight: 'Weight (kg)',
      placeholder: 'e.g. Barbell Bench Press, Barbell Squat, Deadlift',
    };
  };

  const fieldLabels = getFieldLabels();

  // Calculate total volume live
  const calculatedTotalVolume = exercises.reduce((sum, ex) => {
    const s = Number(ex.sets) || 0;
    const r = Number(ex.reps) || 0;
    const w = Number(ex.weight) || 0;
    return sum + s * r * w;
  }, 0);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isDemo) {
      setError('Demo account is view-only. You cannot add or edit workouts on this account.');
      return;
    }

    if (!name.trim()) {
      setError('Please provide a workout title/name.');
      return;
    }

    if (!duration || Number(duration) <= 0) {
      setError('Duration must be greater than 0 minutes.');
      return;
    }

    // Filter exercises that have names filled in
    const validExercises = exercises
      .filter((ex) => ex.name && ex.name.trim() !== '')
      .map((ex) => {
        const primaryMuscle = getPrimaryMuscleGroup(ex) || (ex.muscleGroup ? ex.muscleGroup.trim() : '');
        return {
          name: ex.name.trim(),
          sets: Number(ex.sets) > 0 ? Number(ex.sets) : 1,
          reps: Number(ex.reps) > 0 ? Number(ex.reps) : 1,
          weight: Number(ex.weight) >= 0 ? Number(ex.weight) : 0,
          muscleGroup: primaryMuscle,
        };
      });

    const payload = {
      name: name.trim(),
      date,
      type,
      duration: Number(duration),
      notes: notes.trim(),
      exercises: validExercises,
    };

    try {
      setSubmitting(true);
      const url = isEditMode
        ? `${API_URL}/workouts/${id}`
        : `${API_URL}/workouts`;
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Error saving workout');
      }

      navigate('/workouts');
    } catch (err) {
      console.error('Save workout error:', err);
      setError(err.message || 'Failed to save workout');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading workout...</span>
        </div>
        <p className="text-muted mt-2">Loading workout data...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 animate-fade-in max-w-4xl">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="fw-bold text-primary-custom mb-1 h2">
            {isEditMode ? 'Edit Workout Session' : 'Log New Workout'}
          </h1>
          <p className="text-muted mb-0 small">
            {isEditMode
              ? 'Update details, duration, notes, or exercise sets'
              : 'Record your exercises, sets, weights, and session notes'}
          </p>
        </div>
        <Link to="/workouts" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          Back to Workouts
        </Link>
      </div>

      {isDemo && (
        <div className="demo-banner mb-4 d-flex align-items-center gap-3">
          <div className="demo-banner-icon">
            <LockIcon size={20} />
          </div>
          <div>
            <div className="fw-semibold text-primary-custom mb-0.5">Demo Account (View Only)</div>
            <div className="small text-muted">You are logged in as Alex Morgan. Adding or updating workouts is disabled on this demo account. Register your own personal account to record workouts!</div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger rounded-3 mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card card-fittrack p-4 p-md-5 mb-4">
          <h5 className="fw-bold text-primary-custom mb-3">General Details</h5>

          <div className="row g-3 mb-4">
            {/* Workout Name */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="workoutName">
                Workout Title <span className="text-danger">*</span>
              </label>
              <input
                id="workoutName"
                type="text"
                className="form-control"
                placeholder="e.g. Upper Body Hypertrophy, 5K Run, Core Blast"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Workout Type */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="workoutType">
                Workout Type <span className="text-danger">*</span>
              </label>
              <select
                id="workoutType"
                className="form-select"
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                {WORKOUT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
                {type === 'Other' && (
                  <option value="Other">Hybrid & Sports (Legacy)</option>
                )}
                {['Running', 'Cycling', 'HIIT'].includes(type) && (
                  <option value={type}>{type} (Legacy)</option>
                )}
              </select>
            </div>

            {/* Date */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="workoutDate">
                Session Date <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <CalendarIcon size={16} />
                </span>
                <input
                  id="workoutDate"
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Duration */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="workoutDuration">
                Duration (minutes) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <ClockIcon size={16} />
                </span>
                <input
                  id="workoutDuration"
                  type="number"
                  min="1"
                  max="1440"
                  className="form-control"
                  placeholder="e.g. 45"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Exercises Section */}
          <div className="pt-3 border-top">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
              <div>
                <h5 className="fw-bold text-primary-custom mb-0">Exercises & Sets</h5>
                <span className="text-muted small">
                  {fieldLabels.sectionDesc}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                {!isWeightHidden && calculatedTotalVolume > 0 && (
                  <span className="badge bg-light text-success border py-2 px-3 fw-semibold">
                    Estimated Volume: {calculatedTotalVolume.toLocaleString()} kg
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleAddExercise}
                  className="btn btn-subtle-green btn-sm"
                >
                  <PlusIcon size={16} />
                  <span>Add Exercise</span>
                </button>
              </div>
            </div>

            {exercises.length === 0 ? (
              <div className="p-4 bg-light rounded-3 text-center text-muted mb-3">
                No exercises added yet. Click <strong>"Add Exercise"</strong> to log sets and movements, or leave empty for pure continuous cardio sessions.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3 mb-3">
                {exercises.map((ex, index) => {
                  const subVolume =
                    (Number(ex.sets) || 0) *
                    (Number(ex.reps) || 0) *
                    (Number(ex.weight) || 0);

                  const isDropdownOpen = activeDropdownIndex === index;
                  const query = ex.name || '';
                  const suggestions = getSuggestions(query, type);

                  return (
                    <div key={index} className="exercise-row-card position-relative">
                      <div className="row g-2 align-items-end">
                        {/* Exercise Name (Autocomplete enabled for all categories with Category-Strict Filtering) */}
                        <div className={`col-12 ${isWeightHidden ? 'col-md-5' : 'col-md-5'} position-relative`}>
                          <label className="form-label small mb-1 fw-semibold text-primary-custom">
                            Exercise #{index + 1} Name
                          </label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={fieldLabels.placeholder}
                              value={ex.name}
                              onFocus={() => setActiveDropdownIndex(index)}
                              onChange={(e) => {
                                handleExerciseChange(index, 'name', e.target.value);
                                setActiveDropdownIndex(index);
                              }}
                              autoComplete="off"
                            />

                            {/* Smart Autocomplete Dropdown Menu */}
                            {isDropdownOpen && (
                              <div
                                ref={dropdownRef}
                                className="smart-exercise-dropdown shadow-lg animate-fade-in"
                              >
                                {suggestions.length === 0 ? (
                                  <div className="p-3 text-center small text-muted">
                                    No preset movements found for "<strong>{query}</strong>". You can continue typing your custom name!
                                  </div>
                                ) : (
                                  suggestions.map((item) => (
                                    <div
                                      key={item.id}
                                      className="smart-exercise-item"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSelectExercise(index, item);
                                      }}
                                    >
                                      <div className="d-flex align-items-center gap-2.5 min-w-0 w-100">
                                        <div
                                          className="exercise-posture-thumb exercise-posture-thumb-clickable flex-shrink-0"
                                          title="Click thumbnail to view full posture & form guide"
                                          onMouseDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setSelectedGuideExercise(item);
                                          }}
                                          dangerouslySetInnerHTML={{ __html: item.svg }}
                                        />
                                        <div className="min-w-0 text-start flex-grow-1">
                                          <div className="text-primary-custom fw-semibold small text-truncate">
                                            {item.name}
                                          </div>
                                          <div className="text-muted smaller text-truncate">
                                            {item.isCustom ? (
                                              <span className="badge bg-emerald-subtle text-emerald me-1 fw-bold">
                                                Custom{item.muscleGroup ? ` · ${item.muscleGroup}` : ''}
                                              </span>
                                            ) : (
                                              <span className="badge bg-light-section text-muted me-1">{item.categoryLabel}</span>
                                            )}
                                            {item.muscles && item.muscles !== 'Custom' && item.muscles !== item.muscleGroup && (
                                              <span>{item.muscles}</span>
                                            )}
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          className="btn btn-sm p-1 text-muted border-0 flex-shrink-0 hover-emerald"
                                          title="View Form & Posture Guide"
                                          style={{ background: 'transparent' }}
                                          onMouseDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setSelectedGuideExercise(item);
                                          }}
                                        >
                                          <EyeIcon size={16} />
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sets / Rounds */}
                        <div className={`col-6 ${isWeightHidden ? 'col-md-3' : 'col-4 col-md-2'}`}>
                          <label className="form-label small mb-1">{fieldLabels.sets}</label>
                          <input
                            type="number"
                            min="1"
                            className="form-control text-center"
                            value={ex.sets}
                            onChange={(e) =>
                              handleExerciseChange(index, 'sets', e.target.value)
                            }
                          />
                        </div>

                        {/* Reps / Hold Time */}
                        <div className={`col-6 ${isWeightHidden ? 'col-md-3' : 'col-4 col-md-2'}`}>
                          <label className="form-label small mb-1">{fieldLabels.reps}</label>
                          <input
                            type="number"
                            min="1"
                            className="form-control text-center"
                            value={ex.reps}
                            onChange={(e) =>
                              handleExerciseChange(index, 'reps', e.target.value)
                            }
                          />
                        </div>

                        {/* Weight (Hidden for Yoga & Cardio) */}
                        {!isWeightHidden && (
                          <div className="col-4 col-md-2">
                            <label className="form-label small mb-1">{fieldLabels.weight}</label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              className="form-control text-center"
                              placeholder="0"
                              value={ex.weight}
                              onChange={(e) =>
                                handleExerciseChange(index, 'weight', e.target.value)
                              }
                            />
                          </div>
                        )}

                        {/* Delete Row Action */}
                        <div className={`col-12 col-md-1 d-flex justify-content-end align-items-center ${isWeightHidden ? 'pt-2 pt-md-0' : ''}`}>
                          <button
                            type="button"
                            onClick={() => handleRemoveExercise(index)}
                            className="btn btn-outline-danger btn-sm border-0 p-2"
                            title="Remove Exercise"
                          >
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Target Muscle Row across ALL Workout Categories */}
                      {ex.name && ex.name.trim() !== '' && (() => {
                        const preset = findPresetExercise(ex.name);
                        if (preset && preset.muscles) {
                          const muscleTags = preset.muscles.split(',').map((m) => m.trim()).filter(Boolean);
                          return (
                            <div
                              className="mt-2.5 pt-2 d-flex align-items-center gap-3 animate-fade-in"
                              style={{ borderTop: '1px dashed var(--border-color)' }}
                            >
                              <div
                                className="exercise-posture-thumb exercise-posture-thumb-clickable flex-shrink-0"
                                style={{ width: '48px', height: '48px' }}
                                title="Click to view large Exercise Form & Posture Guide"
                                onClick={() => setSelectedGuideExercise(preset)}
                                dangerouslySetInnerHTML={{ __html: preset.svg }}
                              />
                              <div className="flex-grow-1 min-w-0">
                                <div className="d-flex flex-wrap align-items-center gap-1.5 mb-1">
                                  <span className="smaller text-muted me-1 fw-medium" style={{ fontSize: '0.76rem' }}>
                                    Target Focus:
                                  </span>
                                  {muscleTags.map((tag, tIdx) => (
                                    <span
                                      key={tag}
                                      className="badge px-2 py-1 rounded-pill fw-semibold"
                                      style={{
                                        fontSize: '0.74rem',
                                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                                        color: 'var(--primary-green)',
                                        border: '1px solid rgba(16, 185, 129, 0.25)',
                                      }}
                                    >
                                      ✓ {tag} {tIdx === 0 && <span className="opacity-75" style={{ fontSize: '0.68rem' }}>(Primary)</span>}
                                    </span>
                                  ))}
                                  {preset.equipment && (
                                    <span
                                      className="badge px-2 py-1 rounded-pill fw-normal text-muted"
                                      style={{
                                        fontSize: '0.74rem',
                                        backgroundColor: 'var(--bg-section)',
                                        border: '1px solid var(--border-color)',
                                      }}
                                    >
                                      {preset.equipment}
                                    </span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-link btn-sm p-0 text-decoration-none d-inline-flex align-items-center gap-1 fw-medium"
                                  style={{ fontSize: '0.75rem', color: 'var(--primary-green)' }}
                                  onClick={() => setSelectedGuideExercise(preset)}
                                >
                                  <EyeIcon size={13} />
                                  <span>View Large Posture & Form Guide</span>
                                </button>
                              </div>
                            </div>
                          );
                        }

                        // Truly Custom Exercise: 1-Tap Single-Select Muscle Pills (Available for Strength, Bodyweight, Yoga, Cardio, Hybrid)
                        return (
                          <div
                            className="mt-2.5 pt-2 d-flex flex-wrap align-items-center gap-1.5 animate-fade-in"
                            style={{ borderTop: '1px dashed var(--border-color)' }}
                          >
                            <span className="smaller text-muted me-1 fw-medium" style={{ fontSize: '0.76rem' }}>
                              Target Focus (optional):
                            </span>
                            {TARGET_MUSCLE_TAGS.map((tag) => {
                              const isSelected = ex.muscleGroup === tag;
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => handleExerciseChange(index, 'muscleGroup', isSelected ? '' : tag)}
                                  className={`target-tag-pill ${isSelected ? 'active' : ''}`}
                                >
                                  {isSelected ? `✓ ${tag}` : tag}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })()}

                      {/* Subtotal volume indicator (only if weight > 0) */}
                      {!isWeightHidden && subVolume > 0 && (
                        <div className="mt-2 text-end small text-muted font-monospace">
                          Subtotal Volume:{' '}
                          <span className="fw-semibold text-primary-custom">
                            {subVolume.toLocaleString()} kg
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={handleAddExercise}
              className="btn btn-outline-secondary btn-sm w-100 py-2 border-dashed rounded-3"
            >
              <PlusIcon size={16} />
              <span>+ Add Another Exercise Row</span>
            </button>
          </div>

          {/* Notes & Reflections Section (placed at the end after exercises) */}
          <div className="pt-4 border-top mt-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-1 mb-2">
              <label className="form-label fw-bold text-primary-custom mb-0" htmlFor="workoutNotes">
                Notes & Reflections <span className="text-muted fw-normal small">(optional)</span>
              </label>
              <span className="text-muted smaller">
                Personal records, session observations, or tactical reflections
              </span>
            </div>
            <textarea
              id="workoutNotes"
              rows="3"
              className="form-control"
              placeholder="How did you feel? Any personal records or areas to improve?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="d-flex justify-content-end gap-2">
          <Link to="/workouts" className="btn btn-light border px-4">
            {isDemo ? 'Back to Workouts' : 'Cancel'}
          </Link>
          {!isDemo && (
            <button
              type="submit"
              className="btn btn-primary-green px-4"
              disabled={submitting}
            >
              {submitting ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              ) : (
                <CheckIcon size={18} />
              )}
              <span>{isEditMode ? 'Update Workout' : 'Save Workout'}</span>
            </button>
          )}
        </div>
      </form>

      {/* Exercise Form & Posture Guide Modal */}
      {selectedGuideExercise && (() => {
        const gifUrl = getExerciseGifUrl(selectedGuideExercise);
        return (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)', zIndex: 1060 }}
            onClick={() => setSelectedGuideExercise(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              style={{ maxWidth: '440px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content border-0 shadow-lg overflow-hidden"
                style={{
                  borderRadius: '20px',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                }}
              >
                {/* Header */}
                <div
                  className="modal-header border-bottom py-3 px-4 position-relative"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="pe-4">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span
                        className="badge px-2 py-0.5 rounded-pill fw-semibold"
                        style={{
                          fontSize: '0.72rem',
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: 'var(--primary-green)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        {selectedGuideExercise.categoryLabel || selectedGuideExercise.category || 'Exercise'}
                      </span>
                      {selectedGuideExercise.equipment && (
                        <span
                          className="badge px-2 py-0.5 rounded-pill text-muted fw-normal"
                          style={{
                            fontSize: '0.72rem',
                            backgroundColor: 'var(--bg-section)',
                            border: '1px solid var(--border-color)',
                          }}
                        >
                          {selectedGuideExercise.equipment}
                        </span>
                      )}
                    </div>
                    <h5 className="modal-title fw-bold text-primary-custom mb-0" style={{ fontSize: '1.22rem' }}>
                      {selectedGuideExercise.name}
                    </h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close-custom"
                    aria-label="Close"
                    onClick={() => setSelectedGuideExercise(null)}
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>

                {/* Body */}
                <div className="modal-body p-4 text-center">
                  {/* Movement Demonstration GIF / Vector Posture Fallback */}
                  <div className="exercise-movement-gif-container mx-auto mb-3">
                    {gifUrl ? (
                      <img
                        src={gifUrl}
                        alt={selectedGuideExercise.name}
                        className="exercise-movement-gif-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fb = e.target.nextElementSibling;
                          if (fb) fb.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="exercise-posture-preview-box mb-0"
                      style={{
                        display: gifUrl ? 'none' : 'flex',
                        width: '100%',
                        height: '100%',
                        borderRadius: '14px',
                      }}
                      dangerouslySetInnerHTML={{ __html: selectedGuideExercise.svg }}
                    />
                  </div>

                  {/* Form & Posture Tips (Only Tips) */}
                  <div
                    className="p-3 rounded-3 text-start"
                    style={{
                      backgroundColor: 'var(--bg-section)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="small fw-bold text-primary-custom mb-2 d-flex align-items-center gap-1.5">
                      <ZapIcon size={16} className="text-emerald" />
                      <span>Form & Posture Tips</span>
                    </div>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2 smaller text-muted" style={{ fontSize: '0.82rem' }}>
                      {getExerciseFormCues(selectedGuideExercise).map((cue, cIdx) => (
                        <li key={cIdx} className="d-flex align-items-start gap-2">
                          <span className="text-emerald fw-bold mt-0.5">✓</span>
                          <span>{cue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default WorkoutForm;
