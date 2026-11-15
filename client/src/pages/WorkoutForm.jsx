
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
} from '../components/Icons';
import {
  getExercisesByCategory,
  searchExercises,
} from '../data/exercises';

// API base URL: local Vite proxy or deployed Render backend
const API_URL = import.meta.env.VITE_API_URL || '/api';

const WORKOUT_TYPES = [
  { value: 'Strength', label: 'Strength & Weights' },
  { value: 'Bodyweight', label: 'Bodyweight & Calisthenics' },
  { value: 'Cardio', label: 'Cardio & Conditioning (Running, Cycling, HIIT)' },
  { value: 'Yoga', label: 'Yoga & Flexibility' },
  { value: 'Other', label: 'Other / Sports' },
];

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
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('Strength');
  const [duration, setDuration] = useState(45);
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([
    { name: '', sets: 3, reps: 10, weight: 0 },
  ]);

  // Active autocomplete dropdown index
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
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
        setDate(w.date ? new Date(w.date).toISOString().split('T')[0] : '');
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

  // Add exercise row
  const handleAddExercise = () => {
    setExercises((prev) => [
      ...prev,
      { name: '', sets: 3, reps: 10, weight: 0 },
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

  // Select an exercise from Smart Search Autocomplete
  const handleSelectExercise = (index, selected) => {
    setExercises((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: selected.name,
        sets: selected.defaultSets,
        reps: selected.defaultReps,
        weight: selected.defaultWeight,
      };
      return next;
    });
    setActiveDropdownIndex(null);
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
        placeholder: 'e.g. Running, Burpees, Jump Rope, Mountain Climbers',
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
    if (type === 'Other') {
      return {
        sectionDesc: 'Track sports drills, laps, or cross-training movements (optional)',
        sets: 'Sets / Rounds',
        reps: 'Reps / Duration',
        weight: 'Weight (kg, optional)',
        placeholder: 'e.g. Badminton Rally, Football Drills, Swimming Laps, Boxing',
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
      .map((ex) => ({
        name: ex.name.trim(),
        sets: Number(ex.sets) > 0 ? Number(ex.sets) : 1,
        reps: Number(ex.reps) > 0 ? Number(ex.reps) : 1,
        weight: Number(ex.weight) >= 0 ? Number(ex.weight) : 0,
      }));

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
                onChange={(e) => setType(e.target.value)}
              >
                {WORKOUT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
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
                  const suggestions = query.trim()
                    ? searchExercises(query, type)
                    : getExercisesByCategory(type);

                  return (
                    <div key={index} className="exercise-row-card position-relative">
                      <div className="row g-2 align-items-end">
                        {/* Exercise Name (Smart Search for Strength, Bodyweight, Cardio, Yoga; Freeform for Other) */}
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
                              onFocus={() => {
                                if (type !== 'Other') setActiveDropdownIndex(index);
                              }}
                              onChange={(e) => {
                                handleExerciseChange(index, 'name', e.target.value);
                                if (type !== 'Other') setActiveDropdownIndex(index);
                              }}
                              autoComplete="off"
                            />

                            {/* Smart Search Dropdown Menu (Direct list without header, height ~3 items) */}
                            {isDropdownOpen && type !== 'Other' && (
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
                                      <div className="d-flex align-items-center gap-2.5 min-w-0">
                                        <div
                                          className="exercise-posture-thumb"
                                          dangerouslySetInnerHTML={{ __html: item.svg }}
                                        />
                                        <div className="min-w-0 text-start">
                                          <div className="text-primary-custom fw-semibold small text-truncate">
                                            {item.name}
                                          </div>
                                          <div className="text-muted smaller text-truncate">
                                            <span className="badge bg-light-section text-muted me-1">{item.categoryLabel}</span>
                                            <span>{item.muscles}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        className="btn btn-outline-green btn-sm py-0.5 px-2 smaller rounded-pill flex-shrink-0"
                                      >
                                        + Select
                                      </button>
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
    </div>
  );
};

export default WorkoutForm;
