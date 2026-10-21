import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  PlusIcon,
  TrashIcon,
  DumbbellIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
} from '../components/Icons';

const WORKOUT_TYPES = [
  'Strength',
  'Cardio',
  'HIIT',
  'Yoga',
  'Running',
  'Cycling',
  'Bodyweight',
  'Other',
];

const WorkoutForm = () => {
  const { id } = useParams(); // If present, edit mode
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

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

  // Load existing workout if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchWorkout = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/workouts/${id}`, {
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
      const url = isEditMode ? `/api/workouts/${id}` : '/api/workouts';
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
          <h1 className="fw-bold text-dark mb-1 h2">
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

      {error && (
        <div className="alert alert-danger rounded-3 mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card card-fittrack p-4 p-md-5 mb-4">
          <h5 className="fw-bold text-dark mb-3">General Details</h5>

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
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
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

            {/* Notes */}
            <div className="col-12">
              <label className="form-label" htmlFor="workoutNotes">
                Notes & Reflections (optional)
              </label>
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

          {/* Exercises Section */}
          <div className="pt-3 border-top">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
              <div>
                <h5 className="fw-bold text-dark mb-0">Exercises & Sets</h5>
                <span className="text-muted small">
                  Track individual exercises with sets, repetitions, and weights
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                {calculatedTotalVolume > 0 && (
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
                No exercises added yet. Click <strong>"Add Exercise"</strong> to log sets and weights, or leave empty for pure cardio sessions.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3 mb-3">
                {exercises.map((ex, index) => {
                  const subVolume = (Number(ex.sets) || 0) * (Number(ex.reps) || 0) * (Number(ex.weight) || 0);

                  return (
                    <div key={index} className="exercise-row-card">
                      <div className="row g-2 align-items-end">
                        {/* Exercise Name */}
                        <div className="col-12 col-md-5">
                          <label className="form-label small mb-1">
                            Exercise #{index + 1} Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Barbell Squat, Push-ups"
                            value={ex.name}
                            onChange={(e) =>
                              handleExerciseChange(index, 'name', e.target.value)
                            }
                          />
                        </div>

                        {/* Sets */}
                        <div className="col-4 col-md-2">
                          <label className="form-label small mb-1">Sets</label>
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

                        {/* Reps */}
                        <div className="col-4 col-md-2">
                          <label className="form-label small mb-1">Reps</label>
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

                        {/* Weight */}
                        <div className="col-4 col-md-2">
                          <label className="form-label small mb-1">Weight (kg)</label>
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

                        {/* Delete Row Action */}
                        <div className="col-12 col-md-1 d-flex justify-content-end align-items-center">
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

                      {/* Subtotal volume indicator */}
                      {subVolume > 0 && (
                        <div className="mt-2 text-end small text-muted font-monospace">
                          Subtotal Volume: <span className="fw-semibold text-dark">{subVolume.toLocaleString()} kg</span>
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
        </div>

        {/* Action Controls */}
        <div className="d-flex justify-content-end gap-2">
          <Link to="/workouts" className="btn btn-light border px-4">
            Cancel
          </Link>
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
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
