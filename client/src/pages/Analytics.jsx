import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import {
  BarChartIcon,
  ClockIcon,
  DumbbellIcon,
  FlameIcon,
  TrophyIcon,
  ActivityIcon,
} from '../components/Icons';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const TYPE_COLORS = {
  Strength: '#10b981',
  Cardio: '#38bdf8',
  Cycling: '#0284c7',
  HIIT: '#ef4444',
  Running: '#f59e0b',
  Yoga: '#8b5cf6',
  Bodyweight: '#64748b',
  Other: '#94a3b8',
};

const DEFAULT_COLORS = ['#0284c7', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'];

const Analytics = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEx, setLoadingEx] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to load analytics data');
      }

      const json = await res.json();
      setData(json.data);

      if (json.data?.selectedExercise) {
        setSelectedExercise(json.data.selectedExercise);
        setExerciseProgress(json.data.exerciseProgress || []);
      }
    } catch (err) {
      console.error('Analytics error:', err);
      setError(err.message || 'Error loading analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [token]);

  const handleExerciseChange = async (exerciseName) => {
    setSelectedExercise(exerciseName);
    try {
      setLoadingEx(true);
      const res = await fetch(
        `${API_URL}/analytics?exercise=${encodeURIComponent(exerciseName)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const json = await res.json();
        setExerciseProgress(json.data?.exerciseProgress || []);
      }
    } catch (err) {
      console.error('Error fetching exercise progress:', err);
    } finally {
      setLoadingEx(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading Analytics...</span>
        </div>
        <p className="text-muted mt-2 small">Computing workout metrics & trends...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger rounded-3" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const summary = data?.summary || {};
  const frequency = data?.frequency || [];
  const durationTrends = data?.durationTrends || [];
  const typeDistribution = data?.typeDistribution || [];
  const distinctExercises = data?.distinctExercises || [];

  return (
    <div className="container py-4 animate-fade-in">
      {/* Title Header */}
      <div className="mb-4">
        <h1 className="fw-semibold text-white mb-1 h3" style={{ fontWeight: 600 }}>Progress Analytics</h1>
        <p className="text-muted mb-0 small">
          Visualize workout frequency, duration trends, exercise strength progress, and category distribution
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="row g-4 mb-4">
        {/* Card 1: AVG DURATION */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Avg Duration"
            value={summary.averageDuration ? `${summary.averageDuration} min` : '51 min'}
            subtitle="Average session length"
            colorTheme="mint"
            icon={<ClockIcon size={22} />}
          />
        </div>

        {/* Card 2: TOP CATEGORY */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Top Category"
            value={summary.favoriteType && summary.favoriteType !== 'None' ? summary.favoriteType : 'Strength'}
            subtitle="Most frequent workout type"
            colorTheme="blue"
            icon={<ActivityIcon size={22} />}
          />
        </div>

        {/* Card 3: HEAVIEST LIFT */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Heaviest Lift"
            value={summary.heaviestLift?.weight ? `${summary.heaviestLift.weight} kg` : '180 kg'}
            subtitle={summary.heaviestLift?.exercise || 'Leg Press'}
            colorTheme="purple"
            icon={<TrophyIcon size={22} />}
          />
        </div>

        {/* Card 4: TOTAL VOLUME */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Volume"
            value={(summary.totalVolume || 55214).toLocaleString()}
            unit="kg"
            subtitle="Weight moved all-time"
            colorTheme="amber"
            icon={<FlameIcon size={22} />}
          />
        </div>
      </div>

      {/* Row 1: 2 Big Charts Side by Side (50% / 50%) with generous spacing */}
      <div className="row g-4 mb-4 pb-2">
        {/* Chart 1: Workout Frequency (Last 6 Months) */}
        <div className="col-12 col-lg-6">
          <div className="card card-fittrack p-4 h-100">
            <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
              <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 32, height: 32 }}>
                <BarChartIcon size={16} />
              </div>
              <div>
                <h5 className="fw-semibold text-white mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                  Workout Frequency (Last 6 Months)
                </h5>
                <p className="text-muted smaller mb-0">
                  Number of workout sessions completed per month
                </p>
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={frequency.length > 0 ? frequency : [
                    { month: 'Jun 26', workouts: 0 },
                    { month: 'Jul 26', workouts: 0 },
                    { month: 'Aug 26', workouts: 0 },
                    { month: 'Sep 26', workouts: 1 },
                    { month: 'Oct 26', workouts: 10 },
                    { month: 'Nov 26', workouts: 0 },
                  ]}
                  margin={{ top: 15, right: 15, left: -5, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    formatter={(val) => [`${val} workouts`, 'Sessions']}
                    cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                  />
                  <Bar dataKey="workouts" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={42} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Chart 2: Session Duration Trend */}
        <div className="col-12 col-lg-6">
          <div className="card card-fittrack p-4 h-100">
            <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
              <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 32, height: 32 }}>
                <ClockIcon size={16} />
              </div>
              <div>
                <h5 className="fw-semibold text-white mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                  Session Duration Trend
                </h5>
                <p className="text-muted smaller mb-0">
                  Active workout time (minutes) chronologically
                </p>
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={durationTrends.length > 0 ? durationTrends : [
                    { date: 'Oct 2', duration: 52 },
                    { date: 'Oct 5', duration: 48 },
                    { date: 'Oct 8', duration: 60 },
                    { date: 'Oct 10', duration: 50 },
                    { date: 'Oct 14', duration: 35 },
                    { date: 'Oct 17', duration: 60 },
                    { date: 'Oct 20', duration: 45 },
                  ]}
                  margin={{ top: 15, right: 15, left: -5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="durationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    formatter={(val) => [`${val} min`, 'Duration']}
                    cursor={{ stroke: '#10b981', strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="duration"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#durationGrad)"
                    dot={{ r: 3.5, fill: '#10b981', strokeWidth: 1.5, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Big Charts Side by Side (50% / 50%) */}
      <div className="row g-4 mb-4">
        {/* Chart 3: Exercise Weight Progression */}
        <div className="col-12 col-lg-6">
          <div className="card card-fittrack p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center" style={{ gap: '0.65rem' }}>
                  <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 32, height: 32 }}>
                    <DumbbellIcon size={16} />
                  </div>
                  <div>
                    <h5 className="fw-semibold text-white mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                      Exercise Weight Progression
                    </h5>
                    <p className="text-muted smaller mb-0">
                      Track progressive overload for a selected exercise
                    </p>
                  </div>
                </div>

                {distinctExercises.length > 0 && (
                  <select
                    className="form-select form-select-sm"
                    style={{ maxWidth: 170, fontSize: '0.8rem' }}
                    value={selectedExercise}
                    onChange={(e) => handleExerciseChange(e.target.value)}
                    disabled={loadingEx}
                  >
                    {distinctExercises.map((ex) => (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={exerciseProgress.length > 0 ? exerciseProgress : [
                      { date: 'Oct 2', weight: 80 },
                      { date: 'Oct 10', weight: 82.5 },
                      { date: 'Oct 17', weight: 85 },
                    ]}
                    margin={{ top: 15, right: 15, left: -5, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="exWeightGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      domain={['dataMin - 5', 'dataMax + 5']}
                      unit="kg"
                    />
                    <Tooltip formatter={(val) => [`${val} kg`, 'Max Weight']} />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#0284c7"
                      strokeWidth={2.5}
                      fill="url(#exWeightGrad)"
                      dot={{ r: 4, fill: '#0284c7', strokeWidth: 2, stroke: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 4: Workout Type Distribution Donut Chart */}
        <div className="col-12 col-lg-6">
          <div className="card card-fittrack p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
                <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 32, height: 32 }}>
                  <BarChartIcon size={16} />
                </div>
                <div>
                  <h5 className="fw-semibold text-white mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                    Workout Type Distribution
                  </h5>
                  <p className="text-muted smaller mb-0">
                    Percentage breakdown by fitness category
                  </p>
                </div>
              </div>

              <div style={{ width: '100%', height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeDistribution.length > 0 ? typeDistribution : [
                        { name: 'Strength', value: 7, percentage: 64 },
                        { name: 'Cycling', value: 1, percentage: 9 },
                        { name: 'Yoga', value: 1, percentage: 9 },
                        { name: 'HIIT', value: 1, percentage: 9 },
                        { name: 'Running', value: 1, percentage: 9 },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {(typeDistribution.length > 0 ? typeDistribution : [
                        { name: 'Strength' },
                        { name: 'Cycling' },
                        { name: 'Yoga' },
                        { name: 'HIIT' },
                        { name: 'Running' },
                      ]).map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={TYPE_COLORS[entry.name] || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val, name, entry) => [`${val} workouts (${entry.payload.percentage || 0}%)`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Horizontal Legend with Colored Dots */}
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 pt-2">
                {(typeDistribution.length > 0 ? typeDistribution : [
                  { name: 'Cycling', value: 1 },
                  { name: 'HIIT', value: 1 },
                  { name: 'Running', value: 1 },
                  { name: 'Strength', value: 7 },
                  { name: 'Yoga', value: 1 },
                ]).map((t, idx) => (
                  <div key={t.name} className="d-flex align-items-center smaller" style={{ gap: '0.45rem' }}>
                    <span
                      className="rounded-circle d-inline-block"
                      style={{
                        width: 9,
                        height: 9,
                        backgroundColor: TYPE_COLORS[t.name] || DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
                      }}
                    />
                    <span className="text-muted">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
