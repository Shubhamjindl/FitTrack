import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import WorkoutModal from '../components/WorkoutModal';
import RecentWorkoutCard from '../components/RecentWorkoutCard';
import {
  SearchIcon,
  PlusIcon,
  DumbbellIcon,
  ClockIcon,
  CalendarIcon,
  LayersIcon,
  FlameIcon,
  BarChartIcon,
} from '../components/Icons';

const API_URL = import.meta.env.VITE_API_URL || '/api';

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

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const Workouts = () => {
  const { token, user, isDemo: authDemo } = useAuth();
  const isDemo = authDemo || user?.email?.toLowerCase() === 'alex.fit@example.com' || Boolean(user?.isDemo);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [timeRange, setTimeRange] = useState('all');

  // Modal state
  const [activeModalWorkout, setActiveModalWorkout] = useState(null);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);

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

      const res = await fetch(`${API_URL}/workouts?${params.toString()}`, {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchWorkouts();
  };

  // Calculations for stats
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((acc, w) => acc + (w.duration || 0), 0);
  const totalHours = (totalDuration / 60).toFixed(1);
  const totalExercises = workouts.reduce((acc, w) => acc + (w.exercises?.length || 0), 0);
  const totalVolume = workouts.reduce((acc, w) => {
    const wVol = (w.exercises || []).reduce((eAcc, ex) => {
      return eAcc + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
    }, 0);
    return acc + wVol;
  }, 0);

  const getWorkoutVolume = (workout) => {
    return (workout.exercises || []).reduce((acc, ex) => {
      return acc + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
    }, 0);
  };

  // Weekly mini-chart data (last 4 intervals)
  const historyOverviewData = [
    { name: 'Sep 29', workouts: 1 },
    { name: 'Oct 6', workouts: 2 },
    { name: 'Oct 13', workouts: 4 },
    { name: 'Oct 20', workouts: 4 },
  ];

  return (
    <div className="container py-3.5 animate-fade-in">
      {/* Title Header */}
      <div className="mb-3.5">
        <h1 className="fw-bold text-dark mb-1 h3">Workout History</h1>
        <p className="text-muted mb-0 small">
          Browse, search, and review all your logged workout sessions
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Workouts"
            value={totalWorkouts}
            subtitle="All-time sessions"
            colorTheme="mint"
            icon={<DumbbellIcon size={22} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Workout Time"
            value={totalHours}
            unit="h"
            subtitle={`${totalDuration} total active minutes`}
            colorTheme="amber"
            icon={<ClockIcon size={22} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Exercises"
            value={totalExercises}
            subtitle="Completed across all sets"
            colorTheme="blue"
            icon={<LayersIcon size={22} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Volume"
            value={totalVolume.toLocaleString()}
            unit="kg"
            subtitle="Total weight moved"
            colorTheme="purple"
            icon={<FlameIcon size={22} />}
          />
        </div>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="card card-fittrack p-3 mb-4">
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2.5">
          {/* Search Input */}
          <div className="flex-grow-1">
            <form onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <SearchIcon size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search workouts or exercise names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Type Dropdown */}
          <div style={{ minWidth: 135 }}>
            <select
              className="form-select form-select-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="All">All Types</option>
              {WORKOUT_TYPES.filter((t) => t !== 'All').map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range Dropdown */}
          <div style={{ minWidth: 125 }}>
            <select
              className="form-select form-select-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              aria-label="Filter by time"
            >
              <option value="all">All Time</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
              <option value="year">Past Year</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ minWidth: 135 }}>
            <select
              className="form-select form-select-sm"
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

          {/* Action: + Log Workout */}
          <div>
            <Link to="/workouts/new" className="btn btn-primary-green btn-sm px-3 text-nowrap d-flex align-items-center gap-1.5">
              <PlusIcon size={16} />
              <span>+ Log Workout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Table, Right Side Widgets */}
      <div className="row g-4">
        {/* Left Column: Workout Sessions Table */}
        <div className="col-12 col-lg-8">
          <div className="card card-fittrack p-3.5 p-md-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center">
                  <CalendarIcon size={18} />
                </div>
                <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1rem' }}>
                  Workout Sessions ({workouts.length})
                </h5>
              </div>
            </div>

            {loading ? (
              <div className="py-5 text-center">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading workouts...</span>
                </div>
                <p className="text-muted mt-2 small">Loading workout sessions...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger rounded-3" role="alert">
                {error}
              </div>
            ) : workouts.length === 0 ? (
              <div className="p-4 text-center">
                <div
                  className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-2.5"
                  style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }}
                >
                  <DumbbellIcon size={28} />
                </div>
                <h6 className="fw-bold text-dark mb-1">No workouts found</h6>
                <p className="text-muted smaller mb-3">
                  No sessions match your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                    setTimeRange('all');
                  }}
                  className="btn btn-outline-green btn-sm px-3"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Desktop View: Clean Structured Table */}
                <div className="d-none d-md-block">
                  <div className="workout-table-wrap table-responsive">
                    <table className="table workout-sessions-table">
                      <thead>
                        <tr>
                          <th style={{ width: 40 }}>#</th>
                          <th>Workout Name</th>
                          <th>Type</th>
                          <th>Date</th>
                          <th>Duration</th>
                          <th>Exercises</th>
                          <th>Volume</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workouts.map((workout, index) => {
                          const volume = getWorkoutVolume(workout);
                          const exerciseCount = workout.exercises ? workout.exercises.length : 0;
                          return (
                            <tr key={workout._id}>
                              <td className="text-muted fw-semibold">{index + 1}.</td>
                              <td className="fw-bold text-dark">{workout.name}</td>
                              <td>
                                <span className={`pill-stat-badge type-pill-${workout.type || 'Strength'}`}>
                                  {workout.type || 'Strength'}
                                </span>
                              </td>
                              <td className="text-muted smaller">
                                <span className="d-inline-flex align-items-center gap-1">
                                  <CalendarIcon size={13} />
                                  <span>{formatDate(workout.date)}</span>
                                </span>
                              </td>
                              <td className="text-muted smaller">
                                <span className="d-inline-flex align-items-center gap-1">
                                  <ClockIcon size={13} />
                                  <span>{workout.duration} min</span>
                                </span>
                              </td>
                              <td className="text-muted smaller">
                                <span className="d-inline-flex align-items-center gap-1">
                                  <LayersIcon size={13} />
                                  <span>{exerciseCount}</span>
                                </span>
                              </td>
                              <td className="fw-semibold text-secondary-custom smaller">
                                {volume > 0 ? `${volume.toLocaleString()} kg` : '—'}
                              </td>
                              <td className="text-end">
                                <button
                                  className="btn-table-view"
                                  onClick={() => setActiveModalWorkout(workout)}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile View: Touch-Friendly Compact Cards */}
                <div className="d-md-none d-flex flex-column gap-2.5">
                  {workouts.map((workout) => (
                    <RecentWorkoutCard
                      key={workout._id}
                      workout={workout}
                      onClick={(w) => setActiveModalWorkout(w)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Side Widgets */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-3.5">
            {/* Widget 1: History Overview */}
            <div className="card card-fittrack p-3.5">
              <div className="d-flex justify-content-between align-items-center mb-2.5">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-1 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center">
                    <BarChartIcon size={16} />
                  </div>
                  <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '0.92rem' }}>
                    History Overview
                  </h6>
                </div>
                <span className="badge bg-light text-secondary border smaller">
                  Last 4 Weeks
                </span>
              </div>

              <div style={{ width: '100%', height: 130 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historyOverviewData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }} />
                    <Bar dataKey="workouts" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 2: Training Streak */}
            <div className="card card-fittrack p-3.5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center gap-1.5 text-muted smaller mb-1">
                    <FlameIcon size={16} className="text-warning" />
                    <span className="fw-semibold">Training Streak</span>
                  </div>
                  <div className="fw-bold text-dark" style={{ fontSize: '1.45rem', lineHeight: 1.1 }}>
                    7 days
                  </div>
                  <div className="smaller text-muted mt-1">
                    You've worked out for 7 consecutive days!
                  </div>
                </div>

                <div className="streak-circle-badge">
                  <FlameIcon size={24} />
                </div>
              </div>
            </div>

            {/* Widget 3: Frequently Trained */}
            <div className="card card-fittrack p-3.5">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="p-1 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center">
                  <DumbbellIcon size={16} />
                </div>
                <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '0.92rem' }}>
                  Frequently Trained
                </h6>
              </div>

              <div>
                <div className="muscle-focus-item">
                  <div className="d-flex justify-content-between smaller mb-1">
                    <span className="fw-medium text-dark">Legs</span>
                    <span className="text-muted">3 sessions</span>
                  </div>
                  <div className="muscle-bar-track">
                    <div className="muscle-bar-fill" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="muscle-focus-item">
                  <div className="d-flex justify-content-between smaller mb-1">
                    <span className="fw-medium text-dark">Chest</span>
                    <span className="text-muted">2 sessions</span>
                  </div>
                  <div className="muscle-bar-track">
                    <div className="muscle-bar-fill" style={{ width: '60%' }} />
                  </div>
                </div>

                <div className="muscle-focus-item">
                  <div className="d-flex justify-content-between smaller mb-1">
                    <span className="fw-medium text-dark">Back</span>
                    <span className="text-muted">2 sessions</span>
                  </div>
                  <div className="muscle-bar-track">
                    <div className="muscle-bar-fill" style={{ width: '60%' }} />
                  </div>
                </div>

                <div className="muscle-focus-item">
                  <div className="d-flex justify-content-between smaller mb-1">
                    <span className="fw-medium text-dark">Shoulders</span>
                    <span className="text-muted">1 session</span>
                  </div>
                  <div className="muscle-bar-track">
                    <div className="muscle-bar-fill" style={{ width: '35%' }} />
                  </div>
                </div>

                <div className="muscle-focus-item">
                  <div className="d-flex justify-content-between smaller mb-1">
                    <span className="fw-medium text-dark">Arms</span>
                    <span className="text-muted">1 session</span>
                  </div>
                  <div className="muscle-bar-track">
                    <div className="muscle-bar-fill" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalWorkout && (
        <WorkoutModal
          workout={activeModalWorkout}
          onClose={() => setActiveModalWorkout(null)}
        />
      )}
    </div>
  );
};

export default Workouts;
