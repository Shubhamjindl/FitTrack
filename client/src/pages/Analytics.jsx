import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import {
  BarChartIcon,
  TrendingUpIcon,
  ClockIcon,
  TrophyIcon,
  DumbbellIcon,
} from '../components/Icons';

// Pastel & vibrant palette for Pie Chart
const TYPE_COLORS = {
  Strength: '#10b981', // emerald
  Cardio: '#3b82f6',   // sky blue
  HIIT: '#f43f5e',     // rose
  Yoga: '#8b5cf6',     // violet
  Running: '#f97316',  // orange
  Cycling: '#14b8a6',  // teal
  Bodyweight: '#64748b',// slate
  Other: '#94a3b8',
};

const DEFAULT_COLORS = ['#10b981', '#3b82f6', '#f43f5e', '#8b5cf6', '#f97316', '#14b8a6', '#64748b'];

const Analytics = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEx, setLoadingEx] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial analytics
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/analytics', {
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

  // When user selects a different exercise in dropdown
  const handleExerciseChange = async (exerciseName) => {
    setSelectedExercise(exerciseName);
    try {
      setLoadingEx(true);
      const res = await fetch(`/api/analytics?exercise=${encodeURIComponent(exerciseName)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  // Custom tooltips
  const DurationTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="card-fittrack p-3 shadow-md small rounded-3" style={{ minWidth: 160 }}>
          <div className="fw-bold text-primary-custom">{item.name}</div>
          <div className="text-muted mb-1">{item.date} ({item.type})</div>
          <div className="text-emerald fw-semibold">Duration: {item.duration} mins</div>
        </div>
      );
    }
    return null;
  };

  const ExerciseTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="card-fittrack p-3 shadow-md small rounded-3" style={{ minWidth: 170 }}>
          <div className="fw-bold text-primary-custom">{item.workoutName}</div>
          <div className="text-muted mb-1">{item.date}</div>
          <div className="text-emerald fw-bold">Weight: {item.weight} kg</div>
          <div className="text-secondary">{item.sets} sets × {item.reps} reps</div>
          {item.totalVolume > 0 && (
            <div className="text-muted mt-1 font-monospace" style={{ fontSize: '0.78rem' }}>
              Volume: {item.totalVolume.toLocaleString()} kg
            </div>
          )}
        </div>
      );
    }
    return null;
  };




  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading Analytics...</span>
        </div>
        <p className="text-muted mt-2">Computing workout analytics and trends...</p>
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
  const hasWorkouts = summary.totalWorkouts > 0;

  return (
    <div className="container py-4 animate-fade-in">
      {/* Header */}
      <div className="mb-4 pb-2 border-bottom">
        <h1 className="fw-bold text-dark mb-1 h2">Progress Analytics</h1>
        <p className="text-muted mb-0 small">
          Visualize workout frequency, duration trends, exercise strength progress, and category distribution
        </p>
      </div>

      {!hasWorkouts ? (
        <div className="card card-fittrack p-5 text-center">
          <div className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-3">
            <BarChartIcon size={32} />
          </div>
          <h4 className="fw-bold text-dark">No Analytics Data Available Yet</h4>
          <p className="text-muted small mb-0">
            Log a few workouts with exercises to unlock progression graphs and distribution charts.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Metric Cards */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card-pastel-mint p-3 h-100 shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-uppercase fw-bold opacity-75">Avg Duration</span>
                  <div className="stat-icon-badge" style={{ width: 36, height: 36 }}>
                    <ClockIcon size={18} />
                  </div>
                </div>
                <div className="h3 fw-bold mb-0">{summary.averageDuration} <span className="small fw-normal">min</span></div>
                <div className="small opacity-75">Average session length</div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card-pastel-blue p-3 h-100 shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-uppercase fw-bold opacity-75">Top Category</span>
                  <div className="stat-icon-badge" style={{ width: 36, height: 36 }}>
                    <BarChartIcon size={18} />
                  </div>
                </div>
                <div className="h3 fw-bold mb-0 text-truncate">{summary.favoriteType}</div>
                <div className="small opacity-75">Most frequent workout type</div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card-pastel-purple p-3 h-100 shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-uppercase fw-bold opacity-75">Heaviest Lift</span>
                  <div className="stat-icon-badge" style={{ width: 36, height: 36 }}>
                    <TrophyIcon size={18} />
                  </div>
                </div>
                <div className="h3 fw-bold mb-0">
                  {summary.heaviestLift ? `${summary.heaviestLift.weight} kg` : 'N/A'}
                </div>
                <div className="small opacity-75 text-truncate">
                  {summary.heaviestLift ? summary.heaviestLift.exercise : 'No weights logged'}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card-pastel-amber p-3 h-100 shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-uppercase fw-bold opacity-75">Total Volume</span>
                  <div className="stat-icon-badge" style={{ width: 36, height: 36 }}>
                    <DumbbellIcon size={18} />
                  </div>
                </div>
                <div className="h3 fw-bold mb-0">
                  {summary.totalVolume ? summary.totalVolume.toLocaleString() : 0} <span className="small fw-normal">kg</span>
                </div>
                <div className="small opacity-75">Weight moved all-time</div>
              </div>
            </div>
          </div>

          {/* Row 1 Charts: Frequency & Duration */}
          <div className="row g-4 mb-4">
            {/* Chart 1: Workout Frequency */}
            <div className="col-12 col-lg-6">
              <div className="card card-fittrack p-4 h-100">
                <div className="mb-3">
                  <h5 className="fw-bold text-dark mb-1">Workout Frequency (Last 6 Months)</h5>
                  <p className="text-muted small mb-0">Number of workout sessions completed per month</p>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data?.frequency || []}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        formatter={(val) => [`${val} workouts`, 'Workouts']}
                        isAnimationActive={false}
                        animationDuration={0}
                        wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                      />
                      <Bar dataKey="workouts" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Chart 2: Duration Trends */}
            <div className="col-12 col-lg-6">
              <div className="card card-fittrack p-4 h-100">
                <div className="mb-3">
                  <h5 className="fw-bold text-dark mb-1">Session Duration Trend</h5>
                  <p className="text-muted small mb-0">Active workout time (minutes) chronologically</p>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data?.durationTrends || []}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="durationGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                      <Tooltip
                        content={<DurationTooltip />}
                        isAnimationActive={false}
                        animationDuration={0}
                        wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="duration"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#durationGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 Charts: Exercise Weight Progression & Type Distribution */}
          <div className="row g-4">
            {/* Chart 3: Exercise Weight Progress */}
            <div className="col-12 col-lg-7">
              <div className="card card-fittrack p-4 h-100">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">Exercise Weight Progression</h5>
                    <p className="text-muted small mb-0">Track progressive overload for a selected exercise</p>
                  </div>
                  {data?.distinctExercises && data.distinctExercises.length > 0 && (
                    <div style={{ minWidth: 200 }}>
                      <select
                        className="form-select form-select-sm"
                        value={selectedExercise}
                        onChange={(e) => handleExerciseChange(e.target.value)}
                        aria-label="Select exercise to view progression"
                      >
                        {data.distinctExercises.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {loadingEx ? (
                  <div className="py-5 text-center text-muted">
                    <div className="spinner-border spinner-border-sm text-success me-2" role="status" />
                    Updating progression data...
                  </div>
                ) : exerciseProgress.length > 0 ? (
                  <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={exerciseProgress}
                        margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                        <YAxis
                          stroke="#94a3b8"
                          fontSize={12}
                          tickLine={false}
                          unit="kg"
                          domain={['auto', 'auto']}
                        />
                        <Tooltip
                          content={<ExerciseTooltip />}
                          isAnimationActive={false}
                          animationDuration={0}
                          wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="#0284c7"
                          strokeWidth={3}
                          dot={{ r: 5, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="p-4 bg-light text-center rounded-3 text-muted">
                    No weight progression recorded for this exercise yet.
                  </div>
                )}
              </div>
            </div>

            {/* Chart 4: Workout Type Distribution */}
            <div className="col-12 col-lg-5">
              <div className="card card-fittrack p-4 h-100">
                <div className="mb-3">
                  <h5 className="fw-bold text-dark mb-1">Workout Type Distribution</h5>
                  <p className="text-muted small mb-0">Percentage breakdown by fitness category</p>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data?.typeDistribution || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                      >
                        {(data?.typeDistribution || []).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={TYPE_COLORS[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name, item) => [
                          `${value} workouts (${item.payload.percentage}%)`,
                          name,
                        ]}
                        isAnimationActive={false}
                        animationDuration={0}
                        wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                      />



                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ fontSize: '0.85rem' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
