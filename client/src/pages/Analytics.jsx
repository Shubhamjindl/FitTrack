import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { EXERCISE_DATABASE } from '../data/exercises';
import {
  BarChartIcon,
  ClockIcon,
  DumbbellIcon,
  FlameIcon,
  TrophyIcon,
  ActivityIcon,
} from '../components/Icons';

const formatChartDate = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const API_URL = import.meta.env.VITE_API_URL || '/api';

const TYPE_COLORS = {
  Strength: '#10b981',
  Bodyweight: '#0ea5e9',
  Cardio: '#f59e0b',
  Yoga: '#8b5cf6',
  'Hybrid & Sports': '#06b6d4',
  Hybrid: '#06b6d4',
  Other: '#06b6d4',
  // Legacy mappings
  Running: '#f59e0b',
  Cycling: '#0284c7',
  HIIT: '#ef4444',
};

const DEFAULT_COLORS = ['#0284c7', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'];

const Analytics = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [exDropdownOpen, setExDropdownOpen] = useState(false);
  const exDropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingEx, setLoadingEx] = useState(false);
  const [error, setError] = useState(null);

  const rawDurationTrends = data?.durationTrends || [];

  const durationTrends = useMemo(() => {
    return rawDurationTrends.map((item) => ({
      ...item,
      date: formatChartDate(item.rawDate || item.date),
    }));
  }, [rawDurationTrends]);

  const formattedExerciseProgress = useMemo(() => {
    return (exerciseProgress || []).map((item) => ({
      ...item,
      date: formatChartDate(item.rawDate || item.date),
    }));
  }, [exerciseProgress]);

  // Click outside to dismiss exercise dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exDropdownRef.current && !exDropdownRef.current.contains(e.target)) {
        setExDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
  const typeDistribution = data?.typeDistribution || [];
  const distinctExercises = data?.distinctExercises || [];

  return (
    <div className="container py-4 animate-fade-in">
      {/* Title Header */}
      <div className="mb-4">
        <h1 className="fw-semibold text-primary-custom mb-1 h3" style={{ fontWeight: 600 }}>Progress Analytics</h1>
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
            value={summary.totalWorkouts > 0 ? `${summary.averageDuration || 0} min` : '0 min'}
            subtitle={summary.totalWorkouts > 0 ? 'Average session length' : 'No workouts logged yet'}
            colorTheme="mint"
            icon={<ClockIcon size={22} />}
          />
        </div>

        {/* Card 2: TOP CATEGORY */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Top Category"
            value={summary.favoriteType && summary.favoriteType !== 'None' ? summary.favoriteType : 'None'}
            subtitle={summary.favoriteType && summary.favoriteType !== 'None' ? 'Most frequent workout type' : 'No workouts logged yet'}
            colorTheme="blue"
            icon={<ActivityIcon size={22} />}
          />
        </div>

        {/* Card 3: HEAVIEST LIFT */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Heaviest Lift"
            value={summary.heaviestLift?.weight ? `${summary.heaviestLift.weight} kg` : '0 kg'}
            subtitle={summary.heaviestLift?.exercise || 'No lifts recorded yet'}
            colorTheme="purple"
            icon={<TrophyIcon size={22} />}
          />
        </div>

        {/* Card 4: TOTAL VOLUME */}
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Volume"
            value={`${(summary.totalVolume || 0).toLocaleString()} kg`}
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
                <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
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
                  data={frequency}
                  margin={{ top: 15, right: 15, left: -5, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
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
                <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                  Session Duration Trend
                </h5>
                <p className="text-muted smaller mb-0">
                  Active workout time (minutes) chronologically
                </p>
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              {durationTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={durationTrends}
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
              ) : (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-3">
                  <div className="p-3 rounded-circle bg-secondary-subtle text-muted mb-2">
                    <ClockIcon size={24} />
                  </div>
                  <span className="fw-semibold text-primary-custom small mb-1">No duration trends yet</span>
                  <span className="text-muted smaller">Log workout sessions with active duration to visualize trends</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Big Charts Side by Side (50% / 50%) */}
      <div className="row g-4 mb-4">
        {/* Chart 3: Adaptive Exercise Progression (Weight / Reps / Hold Time) */}
        {(() => {
          const hasWeight = exerciseProgress.some((p) => (Number(p.weight) || 0) > 0);
          const matchedPreset = selectedExercise
            ? EXERCISE_DATABASE.find(
                (e) => e.name.toLowerCase() === selectedExercise.toLowerCase()
              )
            : null;

          const isHoldExercise =
            !hasWeight &&
            (matchedPreset?.mode === 'hold' ||
              matchedPreset?.category === 'Yoga' ||
              (Array.isArray(matchedPreset?.category) && matchedPreset.category.includes('Yoga')) ||
              (selectedExercise && /(plank|hold|yoga|asana|stretch|surya)/i.test(selectedExercise)));

          let chartTitle = 'Exercise Progression';
          let chartSubtitle = 'Track progressive overload & max weight over time';
          let chartUnit = 'kg';
          let chartColor = '#0284c7';
          let dataKey = 'weight';
          let tooltipLabel = 'Max Weight';
          let domain = ['dataMin - 5', 'dataMax + 5'];

          if (hasWeight) {
            chartTitle = 'Exercise Progression';
            chartSubtitle = 'Track progressive overload & max weight over time';
            chartUnit = 'kg';
            chartColor = '#0284c7';
            dataKey = 'weight';
            tooltipLabel = 'Max Weight';
            domain = ['dataMin - 5', 'dataMax + 5'];
          } else if (isHoldExercise) {
            chartTitle = 'Exercise Progression';
            chartSubtitle = 'Track pose hold duration and stamina progression';
            chartUnit = 's';
            chartColor = '#8b5cf6';
            dataKey = 'reps';
            tooltipLabel = 'Hold Duration';
            domain = [0, 'dataMax + 10'];
          } else {
            chartTitle = 'Exercise Progression';
            chartSubtitle = 'Track endurance and repetition progress over time';
            chartUnit = ' reps';
            chartColor = '#10b981';
            dataKey = 'reps';
            tooltipLabel = 'Max Reps';
            domain = [0, 'dataMax + 5'];
          }

          // Filter out 0-weight entries when tracking weight progression so empty sets do not drag down the curve
          const displayProgress = hasWeight
            ? formattedExerciseProgress.filter((p) => (Number(p.weight) || 0) > 0)
            : formattedExerciseProgress;

          return (
            <div className="col-12 col-lg-6">
              <div className="card card-fittrack p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center" style={{ gap: '0.65rem' }}>
                      <div
                        className="p-1.5 rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: 32, height: 32, backgroundColor: `${chartColor}20`, color: chartColor }}
                      >
                        {hasWeight ? (
                          <DumbbellIcon size={16} />
                        ) : isHoldExercise ? (
                          <ClockIcon size={16} />
                        ) : (
                          <ActivityIcon size={16} />
                        )}
                      </div>
                      <div>
                        <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                          {chartTitle}
                        </h5>
                        <p className="text-muted smaller mb-0">
                          {chartSubtitle}
                        </p>
                      </div>
                    </div>

                    {distinctExercises.length > 0 && (
                      <div className="position-relative" ref={exDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setExDropdownOpen((prev) => !prev)}
                          className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-between gap-2 px-3 py-1.5 rounded-3 text-truncate"
                          style={{ maxWidth: 200, fontSize: '0.85rem', minHeight: 34 }}
                          disabled={loadingEx}
                          title={selectedExercise}
                        >
                          <span className="text-truncate fw-medium">{selectedExercise || 'Select Exercise'}</span>
                          <span className="smaller text-muted">▾</span>
                        </button>

                        {exDropdownOpen && (
                          <div
                            className="analytics-exercise-dropdown shadow-lg animate-fade-in"
                            style={{
                              position: 'absolute',
                              top: 'calc(100% + 4px)',
                              right: 0,
                              width: 235,
                              maxHeight: 200,
                              overflowY: 'auto',
                              overflowX: 'hidden',
                              backgroundColor: 'var(--bg-card)',
                              border: '1px solid var(--border-color)',
                              borderRadius: 12,
                              zIndex: 1050,
                              padding: '6px',
                              boxShadow: '0 12px 30px -5px rgba(0,0,0,0.25)',
                            }}
                          >
                            {distinctExercises.map((ex) => (
                              <div
                                key={ex}
                                onClick={() => {
                                  handleExerciseChange(ex);
                                  setExDropdownOpen(false);
                                }}
                                className={`px-3 py-2 d-flex align-items-center justify-content-between rounded-2 mb-0.5 ${
                                  selectedExercise === ex
                                    ? 'bg-emerald-subtle text-emerald fw-semibold'
                                    : 'text-primary-custom hover-bg-subtle'
                                }`}
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '0.86rem',
                                  lineHeight: '1.35',
                                  transition: 'background-color 0.15s ease',
                                }}
                              >
                                <span className="text-truncate">{ex}</span>
                                {selectedExercise === ex && <span className="ms-2 flex-shrink-0">✓</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ width: '100%', height: 260 }}>
                    {displayProgress.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={displayProgress}
                          margin={{ top: 15, right: 15, left: -5, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="exProgGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                          <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                          <YAxis
                            stroke="#94a3b8"
                            fontSize={11}
                            tickLine={false}
                            domain={domain}
                            unit={chartUnit}
                          />
                          <Tooltip formatter={(val) => [`${val} ${chartUnit}`, tooltipLabel]} />
                          <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={chartColor}
                            strokeWidth={2.5}
                            fill="url(#exProgGrad)"
                            dot={{ r: 4, fill: chartColor, strokeWidth: 2, stroke: '#fff' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-3">
                        <div className="p-3 rounded-circle bg-secondary-subtle text-muted mb-2">
                          {hasWeight ? (
                            <DumbbellIcon size={24} />
                          ) : isHoldExercise ? (
                            <ClockIcon size={24} />
                          ) : (
                            <ActivityIcon size={24} />
                          )}
                        </div>
                        <span className="fw-semibold text-primary-custom small mb-1">No progression data</span>
                        <span className="text-muted smaller">Record sessions with this movement to visualize progress</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Chart 4: Workout Type Distribution Donut Chart */}
        <div className="col-12 col-lg-6">
          <div className="card card-fittrack p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
                <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 32, height: 32 }}>
                  <BarChartIcon size={16} />
                </div>
                <div>
                  <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '0.98rem', fontWeight: 600 }}>
                    Workout Type Distribution
                  </h5>
                  <p className="text-muted smaller mb-0">
                    Percentage breakdown by fitness category
                  </p>
                </div>
              </div>

              <div style={{ width: '100%', height: 210 }}>
                {typeDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {typeDistribution.map((entry, idx) => (
                          <Cell
                            key={`cell-${idx}`}
                            fill={TYPE_COLORS[entry.name] || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val, name, entry) => [`${val} workouts (${entry.payload.percentage || 0}%)`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-3">
                    <div className="p-3 rounded-circle bg-secondary-subtle text-muted mb-2">
                      <BarChartIcon size={24} />
                    </div>
                    <span className="fw-semibold text-primary-custom small mb-1">No workout categories yet</span>
                    <span className="text-muted smaller">Log different workout types to view category breakdown</span>
                  </div>
                )}
              </div>

              {/* Bottom Horizontal Legend with Colored Dots */}
              {typeDistribution.length > 0 && (
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 pt-2">
                  {typeDistribution.map((t, idx) => (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
