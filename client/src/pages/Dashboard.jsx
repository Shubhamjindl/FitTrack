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
import RecentWorkoutCard from '../components/RecentWorkoutCard';
import WorkoutModal from '../components/WorkoutModal';
import HeroBannerGraphic from '../components/HeroBannerGraphic';
import {
  DumbbellIcon,
  ClockIcon,
  FlameIcon,
  PlusIcon,
  ChevronRightIcon,
  InfoIcon,
  LayersIcon,
  ClipboardIcon,
  CalendarIcon,
  BarChartIcon,
} from '../components/Icons';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Dashboard = () => {
  const { user, token, isDemo: authDemo } = useAuth();
  const isDemo = authDemo || user?.email?.toLowerCase() === 'alex.fit@example.com' || Boolean(user?.isDemo);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [activeModalWorkout, setActiveModalWorkout] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/dashboard`, {
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

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="card-fittrack p-2.5 shadow-md small rounded-3" style={{ minWidth: 150 }}>
          <div className="fw-bold text-primary-custom mb-1">{data.day} ({data.date})</div>
          <div className="text-emerald fw-semibold">
            Duration: {data.duration} mins
          </div>
          <div className="text-muted smaller">
            Workouts: {data.workouts}
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
  const recentWorkoutsList = stats?.recentWorkouts?.slice(0, 3) || [];

  return (
    <div className="container py-3.5 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-3.5">
        <h1 className="fw-bold text-dark mb-1 h3">
          Welcome back, {user?.name?.split(' ')[0] || 'Athlete'}! 👋
        </h1>
        <p className="text-muted mb-0 small">
          Track workouts, analyze progress, and stay consistent with your fitness goals.
        </p>
      </div>

      {/* Motivational Hero Banner */}
      <div className="hero-card-v2 p-4 p-md-4.5 mb-4">
        <div className="hero-content">
          <h2 className="hero-title fw-bold text-dark mb-2">
            Stay Consistent. <span className="text-emerald">Get Stronger.</span>
          </h2>
          <p className="hero-subtitle mb-3.5">
            Log your workouts, track your progress, and build a healthier, stronger you.
          </p>
          <div className="d-flex flex-wrap align-items-center gap-2.5">
            <Link to="/workouts/new" className="btn-hero-primary d-inline-flex align-items-center gap-2">
              <PlusIcon size={17} />
              <span>+ Log Workout</span>
            </Link>
            <Link to="/workouts" className="btn-hero-outline d-inline-flex align-items-center gap-2">
              <CalendarIcon size={16} />
              <span>View History</span>
            </Link>
          </div>
        </div>
        <div className="hero-graphic-wrap">
          <HeroBannerGraphic />
        </div>
      </div>

      {/* Demo Banner */}
      {isDemo && (
        <div className="demo-banner mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="demo-banner-icon">
              <InfoIcon size={20} />
            </div>
            <div>
              <div className="fw-semibold text-primary-custom mb-0.5">
                Exploring in Demo Mode (Alex Morgan)
              </div>
              <div className="small text-muted">
                All workout history and analytics are shared and read-only. Create your own personal account to track personal workouts!
              </div>
            </div>
          </div>
          <Link to="/register" className="btn btn-outline-green btn-sm px-3 text-nowrap">
            Create Free Account
          </Link>
        </div>
      )}

      {/* 4 Stat Cards - Clean, Flat, Static */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Workouts"
            value={stats?.totalWorkouts || 0}
            subtitle="All-time sessions"
            colorTheme="mint"
            icon={<DumbbellIcon size={22} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Exercises"
            value={stats?.totalExercises || 0}
            subtitle="Across all workouts"
            colorTheme="blue"
            icon={<LayersIcon size={22} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Active Time"
            value={durationHours}
            unit="h"
            subtitle={`${stats?.totalDuration || 0} total active minutes`}
            colorTheme="amber"
            icon={<ClockIcon size={22} />}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Training Volume"
            value={(stats?.totalVolume || 0).toLocaleString()}
            unit="kg"
            subtitle="Total weight moved"
            colorTheme="purple"
            icon={<FlameIcon size={22} />}
          />
        </div>
      </div>

      {/* Weekly Activity Overview - Full Width, Spacious & Clean */}
      <div className="card card-fittrack p-3.5 p-md-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center">
              <BarChartIcon size={18} />
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1rem' }}>
                Weekly Activity Overview
              </h5>
              <p className="text-muted smaller mb-0">
                Daily workout duration (minutes) for the last 7 days
              </p>
            </div>
          </div>
          <div className="badge bg-light text-success border px-2.5 py-1 small fw-semibold">
            Last 7 Days
          </div>
        </div>

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats?.activityChart || []}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(148, 163, 184, 0.2)' }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(148, 163, 184, 0.2)' }}
              />
              <Tooltip
                content={<CustomTooltip />}
                isAnimationActive={false}
                cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
              />

              <Bar
                dataKey="duration"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Workouts Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center">
              <ClipboardIcon size={18} />
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1rem' }}>
                Recent Workouts
              </h5>
              <p className="text-muted smaller mb-0">
                Your latest logged fitness sessions
              </p>
            </div>
          </div>
          <Link
            to="/workouts"
            className="text-decoration-none fw-semibold text-emerald d-inline-flex align-items-center gap-1 smaller"
          >
            <span>View All</span>
            <ChevronRightIcon size={15} />
          </Link>
        </div>

        {recentWorkoutsList.length > 0 ? (
          <div className="row g-3">
            {recentWorkoutsList.map((workout) => (
              <div key={workout._id} className="col-12 col-md-4">
                <RecentWorkoutCard
                  workout={workout}
                  onClick={(w) => setActiveModalWorkout(w)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card card-fittrack p-4 text-center">
            <div
              className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-2.5"
              style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }}
            >
              <DumbbellIcon size={28} />
            </div>
            <h6 className="fw-bold text-dark mb-1">No workouts logged yet</h6>
            <p className="text-muted smaller mb-3">
              Start your fitness journey by recording your first workout session!
            </p>
            {!isDemo && (
              <div>
                <Link to="/workouts/new" className="btn btn-primary-green btn-sm px-3">
                  <PlusIcon size={16} />
                  <span>Log Your First Workout</span>
                </Link>
              </div>
            )}
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
    </div>
  );
};

export default Dashboard;
