import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutModal from '../components/WorkoutModal';
import ConfirmModal from '../components/ConfirmModal';
import {
  SearchIcon,
  FilterIcon,
  ArrowUpDownIcon,
  PlusIcon,
  CloseIcon,
  DumbbellIcon,
} from '../components/Icons';

const WORKOUT_TYPES = [
  'All',
  'Strength',
  'Cardio',
  'HIIT',
  'Yoga',
  'Running',
  'Cycling',
  'Bodyweight',
  'Other',
];

const Workouts = () => {
  const { token } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [timeRange, setTimeRange] = useState('all');

  // Modals state
  const [activeModalWorkout, setActiveModalWorkout] = useState(null);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query string
      let sortField = 'date';
      let sortOrder = 'desc';
      if (sortBy === 'date-asc') {
        sortField = 'date';
        sortOrder = 'asc';
      } else if (sortBy === 'duration-desc') {
        sortField = 'duration';
        sortOrder = 'desc';
      } else if (sortBy === 'duration-asc') {
        sortField = 'duration';
        sortOrder = 'asc';
      } else if (sortBy === 'name-asc') {
        sortField = 'name';
        sortOrder = 'asc';
      }

      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append('q', searchTerm.trim());
      if (selectedType !== 'All') params.append('type', selectedType);
      params.append('sortBy', sortField);
      params.append('order', sortOrder);

      if (timeRange === 'week') {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        params.append('startDate', d.toISOString());
      } else if (timeRange === 'month') {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        params.append('startDate', d.toISOString());
      } else if (timeRange === 'year') {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        params.append('startDate', d.toISOString());
      }

      const res = await fetch(`/api/workouts?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve workouts');
      }

      const json = await res.json();
      setWorkouts(json.data || []);
    } catch (err) {
      console.error('Workouts fetch error:', err);
      setError(err.message || 'Error fetching workouts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [token, selectedType, sortBy, timeRange]);

  // Debounced/instant search trigger
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchWorkouts();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    // Will fetch again after clearing
    setTimeout(() => {
      fetchWorkouts();
    }, 50);
  };

  const handleResetAllFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSortBy('date-desc');
    setTimeRange('all');
  };

  const handleDeleteWorkout = async () => {
    if (!workoutToDelete) return;
    try {
      const res = await fetch(`/api/workouts/${workoutToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setWorkoutToDelete(null);
        fetchWorkouts();
      } else {
        const data = await res.json();
        alert(data.message || 'Error deleting workout');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Could not delete workout');
    }
  };

  const hasActiveFilters = searchTerm !== '' || selectedType !== 'All' || timeRange !== 'all' || sortBy !== 'date-desc';

  return (
    <div className="container py-4 animate-fade-in">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-2 border-bottom">
        <div>
          <h1 className="fw-bold text-dark mb-1 h2">Workout History</h1>
          <p className="text-muted mb-0 small">
            Browse, search, filter, and review all your logged workout sessions
          </p>
        </div>
        <div>
          <Link to="/workouts/new" className="btn btn-primary-green">
            <PlusIcon size={18} />
            <span>Add New Workout</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="card card-fittrack p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-center">
          {/* Search Input */}
          <div className="col-12 col-md-5">
            <form onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <SearchIcon size={18} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search workouts or exercise names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="btn btn-light border border-start-0 text-muted"
                    onClick={handleClearSearch}
                  >
                    <CloseIcon size={16} />
                  </button>
                )}
                <button type="submit" className="btn btn-subtle-green">
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Type Filter */}
          <div className="col-6 col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted d-none d-sm-flex">
                <FilterIcon size={16} />
              </span>
              <select
                className="form-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by workout type"
              >
                {WORKOUT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Types' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="col-6 col-md-2">
            <select
              className="form-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              aria-label="Filter by time range"
            >
              <option value="all">All Time</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
              <option value="year">Past Year</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="col-12 col-md-2">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted d-none d-sm-flex">
                <ArrowUpDownIcon size={16} />
              </span>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort workouts"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="duration-desc">Duration (High-Low)</option>
                <option value="duration-asc">Duration (Low-High)</option>
                <option value="name-asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top small">
            <span className="text-muted fw-semibold">Active filters:</span>
            {searchTerm && (
              <span className="badge bg-light text-dark border py-1 px-2">
                Query: "{searchTerm}"
              </span>
            )}
            {selectedType !== 'All' && (
              <span className="badge bg-light text-dark border py-1 px-2">
                Type: {selectedType}
              </span>
            )}
            {timeRange !== 'all' && (
              <span className="badge bg-light text-dark border py-1 px-2">
                Range: {timeRange}
              </span>
            )}
            <button
              onClick={handleResetAllFilters}
              className="btn btn-sm btn-link text-success p-0 ms-2 text-decoration-none fw-semibold"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Results Header Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-semibold text-secondary small">
          Showing {workouts.length} {workouts.length === 1 ? 'workout' : 'workouts'}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-5 text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading workouts...</span>
          </div>
          <p className="text-muted mt-2">Loading workout sessions...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger rounded-3" role="alert">
          {error}
        </div>
      ) : workouts.length === 0 ? (
        /* Empty State */
        <div className="card card-fittrack p-5 text-center">
          <div
            className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-3"
            style={{ width: 64, height: 64, alignItems: 'center', justifyContent: 'center' }}
          >
            <DumbbellIcon size={32} />
          </div>
          <h5 className="fw-bold text-dark">No workouts found</h5>
          <p className="text-muted small mb-4">
            {hasActiveFilters
              ? 'No sessions match your search or filter criteria. Try adjusting your filters.'
              : 'You have not recorded any workouts yet. Create your first session today!'}
          </p>
          <div className="d-flex justify-content-center gap-2">
            {hasActiveFilters && (
              <button onClick={handleResetAllFilters} className="btn btn-outline-secondary">
                Reset Filters
              </button>
            )}
            <Link to="/workouts/new" className="btn btn-primary-green">
              <PlusIcon size={18} />
              <span>Log New Workout</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Workouts Grid */
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-12 col-md-6 col-lg-4">
              <WorkoutCard
                workout={workout}
                onView={(w) => setActiveModalWorkout(w)}
                onDelete={(w) => setWorkoutToDelete(w)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Workout Detail Modal */}
      {activeModalWorkout && (
        <WorkoutModal
          workout={activeModalWorkout}
          onClose={() => setActiveModalWorkout(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!workoutToDelete}
        title="Delete Workout"
        message={`Are you sure you want to permanently delete "${workoutToDelete?.name}"?`}
        confirmText="Yes, Delete"
        onConfirm={handleDeleteWorkout}
        onCancel={() => setWorkoutToDelete(null)}
      />
    </div>
  );
};

export default Workouts;
