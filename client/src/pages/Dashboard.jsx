import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutModal from '../components/WorkoutModal';
import ConfirmModal from '../components/ConfirmModal';
import {
  ActivityIcon,
  DumbbellIcon,
  ClockIcon,
  FlameIcon,
  PlusIcon,
  TrendingUpIcon,
  ChevronRightIcon,
} from '../components/Icons';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [activeModalWorkout, setActiveModalWorkout] = useState(null);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to load dashboard metrics');
      }

      const json = await res.json();
      setStats(json.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError(err.message || 'Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

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
        // Refresh dashboard metrics
        fetchDashboardData();
      } else {
        const err = await res.json();
        alert(err.message || 'Could not delete workout');
      }
    } catch (err) {
      console.error('Delete workout error:', err);
      alert('Error deleting workout');
    }
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="card-fittrack p-3 shadow-md small rounded-3" style={{ minWidth: 160 }}>
          <div className="fw-bold text-primary-custom mb-1">{data.day} ({data.date})</div>
          <div className="text-emerald fw-semibold">
            Duration: {data.duration} mins
          </div>
          <div className="text-muted">
            Workouts logged: {data.workouts}
          </div>
        </div>
      );
    }
    return null;
  };




  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading Dashboard...</span>
        </div>
        <p className="text-muted mt-2">Loading your fitness dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger rounded-3" role="alert">
          <h5 className="alert-heading fw-bold">Unable to load dashboard</h5>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );
  }

  const durationHours = stats ? (stats.totalDuration / 60).toFixed(1) : 0;

  return (
    <div className="container py-4 animate-fade-in">
      {/* Welcome Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-2 border-bottom">
        <div>
          <h1 className="fw-bold text-dark mb-1 h2">
            Welcome back, {user?.name?.split(' ')[0] || 'Athlete'}! 💪
          </h1>
          <p className="text-muted mb-0 small">
            Track your daily progress, review weekly performance, and crush your goals.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/workouts" className="btn btn-outline-green">
            Workout History
          </Link>
          <Link to="/workouts/new" className="btn btn-primary-green">
            <PlusIcon size={18} />
            <span>Log Workout</span>
          </Link>
        </div>
      </div>

      {/* 4 Pastel Statistic Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Workouts"
            value={stats?.totalWorkouts || 0}
            unit="sessions"
            subtitle="All-time workouts logged"
            colorTheme="mint"
            icon={<ActivityIcon size={24} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Exercises"
            value={stats?.totalExercises || 0}
            unit="exercises"
            subtitle="Completed across all sets"
            colorTheme="blue"
            icon={<DumbbellIcon size={24} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Active Time"
            value={durationHours}
            unit="hours"
            subtitle={`${stats?.totalDuration || 0} total active minutes`}
            colorTheme="purple"
            icon={<ClockIcon size={24} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="This Week"
            value={stats?.thisWeekWorkouts || 0}
            unit="workouts"
            subtitle={`${stats?.thisWeekDuration || 0} mins logged this week`}
            colorTheme="amber"
            icon={<FlameIcon size={24} />}
          />
        </div>
      </div>

      {/* Main Charts & Activity Section */}
      <div className="row g-4 mb-5">
        {/* Weekly Activity Bar Chart */}
        <div className="col-12 col-lg-8">
          <div className="card card-fittrack p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold text-dark mb-1">Weekly Activity Overview</h5>
                <p className="text-muted small mb-0">Daily workout duration (minutes) for the last 7 days</p>
              </div>
              <div className="badge bg-light text-success border px-2 py-1 small fw-semibold">
                Last 7 Days
              </div>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats?.activityChart || []}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    isAnimationActive={false}
                    animationDuration={0}
                    wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                  />


                  <Bar
                    dataKey="duration"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Highlights / Performance summary card */}
        <div className="col-12 col-lg-4">
          <div className="card card-fittrack p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="p-2 rounded-3 bg-light text-success">
                  <TrendingUpIcon size={20} />
                </div>
                <h5 className="fw-bold text-dark mb-0">Fitness Snapshot</h5>
              </div>

              <div className="p-3 bg-light-section rounded-3 mb-3">
                <div className="text-muted small fw-semibold">Total Volume Moved</div>
                <div className="h4 fw-bold text-dark mb-0 mt-1">
                  {(stats?.totalVolume || 0).toLocaleString()} <span className="small text-muted fw-normal">kg</span>
                </div>
                <div className="small text-muted mt-1">
                  Cumulative strength volume lifted
                </div>
              </div>

              <div className="p-3 bg-light-section rounded-3 mb-3">
                <div className="text-muted small fw-semibold">Average Session</div>
                <div className="h4 fw-bold text-dark mb-0 mt-1">
                  {stats?.totalWorkouts ? Math.round(stats.totalDuration / stats.totalWorkouts) : 0}{' '}
                  <span className="small text-muted fw-normal">mins / workout</span>
                </div>
                <div className="small text-muted mt-1">
                  Consistent pacing builds sustainable habits
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/analytics"
                className="btn btn-subtle-green w-100 justify-content-center"
              >
                <span>View Full Analytics</span>
                <ChevronRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Workouts Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold text-dark mb-1">Recent Workouts</h4>
            <p className="text-muted small mb-0">Your latest logged fitness sessions</p>
          </div>
          <Link to="/workouts" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
            View All History →
          </Link>
        </div>

        {stats?.recentWorkouts && stats.recentWorkouts.length > 0 ? (
          <div className="row g-3">
            {stats.recentWorkouts.map((workout) => (
              <div key={workout._id} className="col-12 col-md-6 col-lg-4">
                <WorkoutCard
                  workout={workout}
                  onView={(w) => setActiveModalWorkout(w)}
                  onDelete={(w) => setWorkoutToDelete(w)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card card-fittrack p-5 text-center">
            <div
              className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-3"
              style={{ width: 64, height: 64, alignItems: 'center', justifyContent: 'center' }}
            >
              <DumbbellIcon size={32} />
            </div>
            <h5 className="fw-bold text-dark">No workouts logged yet</h5>
            <p className="text-muted small mb-3">
              Start your fitness journey by recording your first workout session!
            </p>
            <div>
              <Link to="/workouts/new" className="btn btn-primary-green">
                <PlusIcon size={18} />
                <span>Log Your First Workout</span>
              </Link>
            </div>
          </div>
        )}
      </div>

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
        message={`Are you sure you want to delete "${workoutToDelete?.name}"? This action cannot be reversed.`}
        confirmText="Yes, Delete"
        onConfirm={handleDeleteWorkout}
        onCancel={() => setWorkoutToDelete(null)}
      />
    </div>
  );
};

export default Dashboard;
