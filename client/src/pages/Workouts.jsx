import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
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
  CheckIcon,
  ZapIcon,
  TrophyIcon,
  BarChartIcon,
  TargetIcon,
  CrosshairIcon,
  TrendingUpIcon,
  ActivityIcon,
} from '../components/Icons';
import {
  EXERCISE_DATABASE,
  findPresetExercise,
  getPrimaryMuscleGroup,
} from '../data/exercises';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const WORKOUT_TYPES = [
  { value: 'All', label: 'All Types' },
  { value: 'Strength', label: 'Strength & Weights' },
  { value: 'Bodyweight', label: 'Bodyweight & Calisthenics' },
  { value: 'Cardio', label: 'Cardio & Conditioning' },
  { value: 'Yoga', label: 'Yoga & Flexibility' },
  { value: 'Sports', label: 'Sports & Athletics' },
  { value: 'Hybrid', label: 'Hybrid & Mixed Training' },
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
  const { accentColor } = useTheme();
  const isDemo = authDemo || user?.email?.toLowerCase() === 'alex.fit@example.com' || Boolean(user?.isDemo);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [timeRange, setTimeRange] = useState('all');

  // Overview cards interactive timeframe & category filters
  const [historyTimeframe, setHistoryTimeframe] = useState('active'); // 'active' (Last Active Period) | 'recent4' (Last 4 Weeks Live)
  const [focusTimeframe, setFocusTimeframe] = useState('all'); // 'all' (All Time / App Start) | '30days' | '90days'
  const [focusCategory, setFocusCategory] = useState('all'); // 'all' | 'Strength' | 'Bodyweight' | 'Yoga' | 'Cardio' | 'Sports'

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

  // Dynamic Muscle Group Classification Rules
  const MUSCLE_RULES = {
    Legs: [/squat/i, /leg/i, /lunge/i, /deadlift/i, /calf/i, /hamstring/i, /quad/i, /glute/i],
    Chest: [/chest/i, /bench/i, /fly/i, /push[\s-]?up/i, /pec/i, /dip/i],
    Back: [/pull[\s-]?up/i, /lat/i, /row/i, /back/i, /chin[\s-]?up/i],
    Shoulders: [/shoulder/i, /overhead/i, /military/i, /lateral raise/i, /deltoid/i, /arnold/i],
    Arms: [/bicep/i, /tricep/i, /curl/i, /pushdown/i, /skull/i, /arm/i],
    Core: [/core/i, /ab/i, /plank/i, /crunch/i, /climber/i],
  };

  // 1. Frequently Trained Dynamic Category-Aware Focus Areas Calculation
  const muscleFocusStats = useMemo(() => {
    // Configurations for each category
    const CATEGORY_CONFIGS = {
      all: {
        badge: '7 Areas',
        areas: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'],
      },
      Strength: {
        badge: '7 Areas',
        areas: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'],
      },
      Bodyweight: {
        badge: '6 Areas',
        areas: ['Core', 'Arms', 'Chest', 'Back', 'Legs', 'Full Body'],
      },
      Yoga: {
        badge: '5 Focus Areas',
        areas: ['Spine & Mobility', 'Flexibility', 'Balance & Stability', 'Core & Alignment', 'Restoration & Recovery'],
      },
      Cardio: {
        badge: '3 Focus Areas',
        areas: ['Legs & Endurance', 'Core & Stamina', 'Full Body Conditioning'],
      },
      Sports: {
        badge: '5 Focus Areas',
        areas: ['Legs & Speed', 'Shoulders & Power', 'Core & Agility', 'Full Body Conditioning', 'Back & Stamina'],
      },
    };

    const config = CATEGORY_CONFIGS[focusCategory] || CATEGORY_CONFIGS.all;
    const targetAreas = config.areas;

    if (!workouts || workouts.length === 0) {
      return {
        focusList: targetAreas.map((name) => ({ name, sessions: 0, barPercent: 0 })),
        focusAreaCount: targetAreas.length,
        badgeLabel: config.badge,
        primaryFocus: 'None Yet',
        totalSessions: 0,
      };
    }

    // Filter workouts by focus timeframe (all-time / app start, last 30 days, last 90 days)
    let focusWorkouts = workouts;
    if (focusTimeframe !== 'all') {
      const now = new Date();
      const days = focusTimeframe === '30days' ? 30 : 90;
      const cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - days);
      cutoff.setHours(0, 0, 0, 0);
      focusWorkouts = workouts.filter((w) => new Date(w.date) >= cutoff);
    }

    // Initialize area counts
    const areaCounts = {};
    targetAreas.forEach((area) => {
      areaCounts[area] = 0;
    });

    let matchedWorkoutCount = 0;

    focusWorkouts.forEach((w) => {
      const matchedInWorkout = new Set();
      const wType = w.type || 'Strength';

      // Check if this workout is eligible for the selected category
      let isEligible = false;
      if (focusCategory === 'all') {
        isEligible = true;
      } else if (focusCategory === 'Strength') {
        isEligible = wType === 'Strength' || wType === 'Hybrid';
      } else if (focusCategory === 'Bodyweight') {
        isEligible = wType === 'Bodyweight' || wType === 'Hybrid';
      } else if (focusCategory === 'Yoga') {
        isEligible = wType === 'Yoga' || wType === 'Hybrid';
      } else if (focusCategory === 'Cardio') {
        isEligible = ['Cardio', 'Running', 'Cycling', 'HIIT'].includes(wType) || wType === 'Hybrid';
      } else if (focusCategory === 'Sports') {
        isEligible = wType === 'Sports' || wType === 'Hybrid';
      }

      if (!isEligible) return;

      // Process exercises
      (w.exercises || []).forEach((ex) => {
        const rawPrimary = getPrimaryMuscleGroup(ex) || (ex.muscleGroup ? ex.muscleGroup.trim() : '');
        const preset = findPresetExercise(ex.name || '');

        if (focusCategory === 'all') {
          // Map to 7 Anatomical Areas
          if (targetAreas.includes(rawPrimary)) {
            matchedInWorkout.add(rawPrimary);
          } else if (rawPrimary.includes('Legs') || wType === 'Running' || wType === 'Cycling') {
            matchedInWorkout.add('Legs');
          } else if (rawPrimary.includes('Shoulders')) {
            matchedInWorkout.add('Shoulders');
          } else if (rawPrimary.includes('Core')) {
            matchedInWorkout.add('Core');
          } else if (rawPrimary.includes('Spine') || rawPrimary.includes('Back')) {
            matchedInWorkout.add('Back');
          } else if (rawPrimary.includes('Flexibility') || rawPrimary.includes('Full Body')) {
            matchedInWorkout.add('Full Body');
          } else {
            // Regex fallback
            for (const [muscle, regexes] of Object.entries(MUSCLE_RULES)) {
              if (regexes.some((r) => r.test(ex.name || ''))) {
                matchedInWorkout.add(muscle);
                break;
              }
            }
          }
        } else if (focusCategory === 'Strength') {
          // Only strength exercises or hybrid weights
          const isStrengthEx =
            wType === 'Strength' ||
            (preset &&
              (preset.category === 'Strength' ||
                (Array.isArray(preset.category) && preset.category.includes('Strength')))) ||
            targetAreas.includes(rawPrimary);
          if (isStrengthEx) {
            if (targetAreas.includes(rawPrimary)) {
              matchedInWorkout.add(rawPrimary);
            } else {
              for (const [muscle, regexes] of Object.entries(MUSCLE_RULES)) {
                if (regexes.some((r) => r.test(ex.name || ''))) {
                  matchedInWorkout.add(muscle);
                  break;
                }
              }
            }
          }
        } else if (focusCategory === 'Bodyweight') {
          const isBwEx =
            wType === 'Bodyweight' ||
            (preset &&
              (preset.category === 'Bodyweight' ||
                (Array.isArray(preset.category) && preset.category.includes('Bodyweight')))) ||
            targetAreas.includes(rawPrimary);
          if (isBwEx) {
            if (targetAreas.includes(rawPrimary)) {
              matchedInWorkout.add(rawPrimary);
            } else {
              for (const [muscle, regexes] of Object.entries(MUSCLE_RULES)) {
                if (regexes.some((r) => r.test(ex.name || ''))) {
                  matchedInWorkout.add(muscle);
                  break;
                }
              }
            }
          }
        } else if (focusCategory === 'Yoga') {
          const isYogaEx =
            wType === 'Yoga' ||
            (preset &&
              (preset.category === 'Yoga' ||
                (Array.isArray(preset.category) && preset.category.includes('Yoga'))));
          if (isYogaEx) {
            if (targetAreas.includes(rawPrimary)) {
              matchedInWorkout.add(rawPrimary);
            } else {
              const lower = (ex.name || '').toLowerCase();
              if (lower.includes('surya') || lower.includes('cobra')) matchedInWorkout.add('Spine & Mobility');
              else if (lower.includes('downward') || lower.includes('dog') || lower.includes('stretch')) matchedInWorkout.add('Flexibility');
              else if (lower.includes('warrior') || lower.includes('balance')) matchedInWorkout.add('Balance & Stability');
              else if (lower.includes('child') || lower.includes('rest')) matchedInWorkout.add('Restoration & Recovery');
              else matchedInWorkout.add('Spine & Mobility');
            }
          }
        } else if (focusCategory === 'Cardio') {
          const isCardioEx =
            ['Cardio', 'Running', 'Cycling', 'HIIT'].includes(wType) ||
            (preset &&
              (preset.category === 'Cardio' ||
                (Array.isArray(preset.category) && preset.category.includes('Cardio'))));
          if (isCardioEx) {
            if (targetAreas.includes(rawPrimary)) {
              matchedInWorkout.add(rawPrimary);
            } else {
              const lower = (ex.name || '').toLowerCase();
              if (lower.includes('burpee') || lower.includes('circuit') || lower.includes('hiit')) matchedInWorkout.add('Full Body Conditioning');
              else if (lower.includes('climber') || lower.includes('sprint')) matchedInWorkout.add('Core & Stamina');
              else matchedInWorkout.add('Legs & Endurance');
            }
          }
        } else if (focusCategory === 'Sports') {
          const isSportsEx =
            wType === 'Sports' ||
            (preset &&
              (preset.category === 'Sports' ||
                (Array.isArray(preset.category) && preset.category.includes('Sports'))));
          if (isSportsEx) {
            if (targetAreas.includes(rawPrimary)) {
              matchedInWorkout.add(rawPrimary);
            } else {
              const lower = (ex.name || '').toLowerCase();
              if (lower.includes('boxing')) matchedInWorkout.add('Shoulders & Power');
              else if (lower.includes('football') || lower.includes('badminton')) matchedInWorkout.add('Legs & Speed');
              else if (lower.includes('swimming') || lower.includes('cricket')) matchedInWorkout.add('Full Body Conditioning');
              else matchedInWorkout.add('Legs & Speed');
            }
          }
        }
      });

      // Workout-level fallback if exercises didn't match anything yet
      if (matchedInWorkout.size === 0) {
        if (focusCategory === 'Cardio' && ['Running', 'Cycling', 'Cardio'].includes(wType)) {
          matchedInWorkout.add('Legs & Endurance');
        } else if (focusCategory === 'Sports' && wType === 'Sports') {
          matchedInWorkout.add('Legs & Speed');
        } else if (focusCategory === 'Yoga' && wType === 'Yoga') {
          matchedInWorkout.add('Spine & Mobility');
        } else if ((focusCategory === 'Strength' && wType === 'Strength') || focusCategory === 'all') {
          for (const [muscle, regexes] of Object.entries(MUSCLE_RULES)) {
            if (regexes.some((r) => r.test(w.name || ''))) {
              matchedInWorkout.add(muscle);
            }
          }
        }
      }

      if (matchedInWorkout.size > 0 || isEligible) {
        matchedWorkoutCount += 1;
        matchedInWorkout.forEach((area) => {
          if (areaCounts[area] !== undefined) {
            areaCounts[area] += 1;
          }
        });
      }
    });

    // Create focus items list
    const maxVal = Math.max(...Object.values(areaCounts), 1);
    const focusList = targetAreas.map((name) => {
      const count = areaCounts[name] || 0;
      return {
        name,
        sessions: count,
        barPercent: count === 0 ? 0 : Math.max(12, Math.round((count / maxVal) * 88)),
      };
    });

    // Stable sort: areas with sessions appear first (highest count first), zero-session areas keep original order
    focusList.sort((a, b) => {
      if (b.sessions !== a.sessions) {
        return b.sessions - a.sessions;
      }
      return targetAreas.indexOf(a.name) - targetAreas.indexOf(b.name);
    });

    const activeAreas = focusList.filter((m) => m.sessions > 0);
    const topTwo = activeAreas.slice(0, 2).map((m) => m.name);
    const primaryFocus = topTwo.length > 0 ? topTwo.join(' & ') : 'General Fitness';

    return {
      focusList,
      focusAreaCount: targetAreas.length,
      badgeLabel: config.badge,
      primaryFocus,
      totalSessions: matchedWorkoutCount,
    };
  }, [workouts, focusTimeframe, focusCategory]);

  // 2. History Overview Dynamic 4-Week Bar Chart & Average
  const { historyOverviewData, weeklyAvg } = useMemo(() => {
    if (!workouts || workouts.length === 0) {
      return {
        historyOverviewData: [
          { week: 'W1', sessions: 0 },
          { week: 'W2', sessions: 0 },
          { week: 'W3', sessions: 0 },
          { week: 'W4', sessions: 0 },
        ],
        weeklyAvg: '0.0',
      };
    }

    let anchor;
    if (historyTimeframe === 'recent4') {
      // Anchored strictly to today (real-time last 4 calendar weeks)
      anchor = new Date();
    } else {
      // Anchored to the latest workout date (Last Active Period)
      const latestTs = Math.max(...workouts.map((w) => new Date(w.date).getTime()));
      anchor = new Date(latestTs);
    }

    const weeks = [];
    for (let i = 3; i >= 0; i--) {
      const end = new Date(anchor);
      end.setDate(end.getDate() - i * 7);
      end.setHours(23, 59, 59, 999);

      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      const count = workouts.filter((w) => {
        const d = new Date(w.date);
        return d >= start && d <= end;
      }).length;

      const label = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      weeks.push({ week: label, sessions: count });
    }

    const totalSessions = weeks.reduce((sum, w) => sum + w.sessions, 0);
    const avg = (totalSessions / 4).toFixed(1);

    return {
      historyOverviewData: weeks,
      weeklyAvg: avg,
    };
  }, [workouts, historyTimeframe]);

  // 3. Training Streak Dynamic Real-Time Calculation (Evaluated against TODAY)
  const streakStats = useMemo(() => {
    if (!workouts || workouts.length === 0) {
      return { currentStreak: 0, bestStreak: 0, isActive: false, daysSinceLatest: 0 };
    }

    const dateSet = new Set(
      workouts.map((w) => {
        const d = new Date(w.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      })
    );
    const sortedDates = Array.from(dateSet).sort();

    if (sortedDates.length === 0) {
      return { currentStreak: 0, bestStreak: 0, isActive: false, daysSinceLatest: 0 };
    }

    // 1. All-time Best Streak across entire history (allowing 1 rest day, diff <= 2)
    let best = 1;
    let currentRun = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

      if (diff <= 2) {
        currentRun += diff;
      } else {
        currentRun = 1;
      }
      if (currentRun > best) best = currentRun;
    }

    // 2. Real-time Current Streak relative to TODAY
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const latestDate = new Date(sortedDates[sortedDates.length - 1]);
    latestDate.setHours(0, 0, 0, 0);

    const daysSinceLatest = Math.max(0, Math.round((today - latestDate) / (1000 * 60 * 60 * 24)));

    let currentStreak = 0;
    let isActive = false;

    // Active only if last workout was today (0 days ago), yesterday (1 day ago), or 2 days ago (rest day allowance)
    if (daysSinceLatest <= 2) {
      isActive = true;
      currentStreak = 1;
      for (let i = sortedDates.length - 1; i > 0; i--) {
        const curr = new Date(sortedDates[i]);
        const prev = new Date(sortedDates[i - 1]);
        const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

        if (diff <= 2) {
          currentStreak += diff;
        } else {
          break;
        }
      }
    }

    const bestStreak = Math.max(best, currentStreak);

    return {
      currentStreak,
      bestStreak,
      isActive,
      daysSinceLatest,
    };
  }, [workouts]);

  return (
    <div className="container py-4 animate-fade-in">
      {/* Title Header */}
      <div className="mb-4">
        <h1 className="fw-bold text-primary-custom mb-1 h3">Workout History</h1>
        <p className="text-muted mb-0 small">
          Browse, search, and review all your logged workout sessions
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="row g-4 mb-4">
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

      {/* 3 Overview Cards Set Horizontally: Frequently Trained (~43%) -> History Overview (~35%) -> Training Streak (~22%) */}
      <div className="overview-cards-grid">
        {/* Card 1: Frequently Trained */}
        <div
          className="card card-fittrack h-100 d-flex flex-column justify-content-between"
          style={{ padding: '1.15rem 1.25rem' }}
        >
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3.5 gap-2">
              <div className="d-flex align-items-center gap-1.5 min-w-0">
                <div
                  className="p-1 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 28, height: 28 }}
                >
                  {focusCategory === 'Yoga' ? (
                    <ActivityIcon size={15} />
                  ) : focusCategory === 'Cardio' ? (
                    <FlameIcon size={15} />
                  ) : focusCategory === 'Sports' ? (
                    <TrophyIcon size={15} />
                  ) : focusCategory === 'Bodyweight' ? (
                    <ZapIcon size={15} />
                  ) : (
                    <DumbbellIcon size={15} />
                  )}
                </div>
                <h6 className="fw-bold text-primary-custom mb-0 text-nowrap" style={{ fontSize: '0.92rem' }}>
                  Frequently Trained
                </h6>
              </div>
              <div className="d-flex align-items-center gap-1.5 flex-shrink-0">
                <select
                  value={focusCategory}
                  onChange={(e) => setFocusCategory(e.target.value)}
                  className="overview-timeframe-select"
                  aria-label="Frequently trained category filter"
                >
                  <option value="all">All Categories</option>
                  <option value="Strength">Strength</option>
                  <option value="Bodyweight">Bodyweight</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Sports">Sports</option>
                </select>
                <select
                  value={focusTimeframe}
                  onChange={(e) => setFocusTimeframe(e.target.value)}
                  className="overview-timeframe-select"
                  aria-label="Frequently trained timeframe filter"
                >
                  <option value="all">All Time</option>
                  <option value="30days">30 Days</option>
                  <option value="90days">90 Days</option>
                </select>
              </div>
            </div>

            {/* Generously Spaced Focus Rows: All bars same original green color */}
            <div className={`d-flex flex-column ${muscleFocusStats.focusList.length >= 7 ? 'gap-2' : 'gap-2.5'} pt-1`}>
              {muscleFocusStats.focusList.map((m) => (
                <div key={m.name} className="d-flex align-items-center justify-content-between gap-2.5">
                  <span
                    className="fw-semibold text-primary-custom smaller text-truncate"
                    style={{ minWidth: 88, maxWidth: 135, fontSize: '0.82rem' }}
                    title={m.name}
                  >
                    {m.name}
                  </span>
                  <div
                    className="flex-grow-1 mx-2"
                    style={{
                      height: 7,
                      backgroundColor: 'var(--border-color)',
                      borderRadius: 9999,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${m.barPercent}%`,
                        height: '100%',
                        backgroundColor: accentColor,
                        borderRadius: 9999,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <span className="text-muted smaller fw-medium text-end flex-shrink-0" style={{ minWidth: 68, fontSize: '0.82rem' }}>
                    <strong className="text-primary-custom">{m.sessions}</strong> {m.sessions === 1 ? 'session' : 'sessions'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer with white and bold Primary Focus matching History Overview style */}
          <div
            className="smaller text-muted pt-3 mt-3 border-top d-flex align-items-center"
            style={{ fontSize: '0.8rem', borderColor: 'var(--border-color)' }}
          >
            <span className="d-inline-flex align-items-center text-nowrap" style={{ gap: '0.5rem' }}>
              <CrosshairIcon size={14} className="text-muted flex-shrink-0" />
              <span>
                <span className="text-muted">Primary Focus:&nbsp;</span>
                <strong className="text-primary-custom fw-bold">{muscleFocusStats.primaryFocus}</strong>
              </span>
            </span>
          </div>
        </div>

        {/* Card 2: History Overview (Wider) */}
        <div
          className="card card-fittrack h-100 d-flex flex-column justify-content-between"
          style={{ padding: '1.15rem 1.25rem' }}
        >
          <div>
            <div className="d-flex align-items-center justify-content-between mb-2.5">
              <div className="d-flex align-items-center gap-1.5 min-w-0">
                <div
                  className="p-1 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 28, height: 28 }}
                >
                  <BarChartIcon size={14} />
                </div>
                <h6 className="fw-bold text-primary-custom mb-0 text-nowrap" style={{ fontSize: '0.92rem' }}>
                  History Overview
                </h6>
              </div>
              <select
                value={historyTimeframe}
                onChange={(e) => setHistoryTimeframe(e.target.value)}
                className="overview-timeframe-select flex-shrink-0"
                aria-label="History overview timeframe filter"
              >
                <option value="active">Last Active Period</option>
                <option value="recent4">Last 4 Weeks</option>
              </select>
            </div>

            {/* Bar Chart with numbers on top of bars */}
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historyOverviewData}
                  margin={{ top: 16, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.12)" />
                  <XAxis
                    dataKey="week"
                    stroke="#94a3b8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(148, 163, 184, 0.2)' }}
                    height={24}
                    dy={2}
                  />
                  <YAxis
                    width={26}
                    domain={[0, 8]}
                    ticks={[0, 2, 4, 6, 8]}
                    stroke="#94a3b8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(148, 163, 184, 0.2)' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(16, 185, 129, 0.06)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-2 rounded-2 shadow-sm bg-dark text-white smaller border">
                            <span className="fw-bold">{payload[0].payload.week}</span>: {payload[0].value}{' '}
                            {payload[0].value === 1 ? 'workout' : 'workouts'}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="sessions"
                    fill={accentColor}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={34}
                  >
                    <LabelList
                      dataKey="sessions"
                      position="top"
                      fill="var(--text-primary)"
                      fontSize={11}
                      fontWeight={700}
                      offset={5}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer clean: Weekly Avg only */}
          <div
            className="smaller text-muted pt-3 mt-3 border-top d-flex align-items-center"
            style={{ fontSize: '0.8rem', borderColor: 'var(--border-color)' }}
          >
            <span className="d-inline-flex align-items-center text-nowrap" style={{ gap: '0.5rem' }}>
              <TrendingUpIcon size={13} className="text-muted flex-shrink-0" />
              <span>
                <span className="text-muted">Weekly Avg:&nbsp;</span>
                <strong className="text-primary-custom fw-bold">{weeklyAvg} workouts</strong>
              </span>
            </span>
          </div>
        </div>

        {/* Card 3: Training Streak (Compact) */}
        <div
          className="card card-fittrack h-100 d-flex flex-column justify-content-between"
          style={{ padding: '1.15rem 1.15rem' }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center min-w-0" style={{ gap: '0.5rem' }}>
              <div
                className="p-1 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: 28, height: 28 }}
              >
                <FlameIcon size={15} />
              </div>
              <span className="fw-bold text-primary-custom mb-0 text-nowrap" style={{ fontSize: '0.88rem' }}>
                Training Streak
              </span>
            </div>
          </div>

          {/* Clean Center Content: Bold Green/Muted Streak and White days + circular flame emblem */}
          <div className="my-auto py-2">
            <div className="d-flex align-items-center justify-content-center" style={{ gap: '2.25rem' }}>
              <div className="d-flex align-items-baseline" style={{ gap: '0.45rem' }}>
                <span
                  className="fw-bolder"
                  style={{
                    fontSize: '2.8rem',
                    lineHeight: 1,
                    color: streakStats.isActive ? accentColor : '#71717a',
                    letterSpacing: '-1.5px',
                  }}
                >
                  {streakStats.currentStreak}
                </span>
                <span className="text-primary-custom fw-semibold" style={{ fontSize: '1.15rem' }}>
                  {streakStats.currentStreak === 1 ? 'day' : 'days'}
                </span>
              </div>

              <div
                className="streak-circle-badge flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  opacity: streakStats.isActive ? 1 : 0.4,
                  filter: streakStats.isActive ? 'none' : 'grayscale(1)',
                }}
              >
                <FlameIcon size={20} />
              </div>
            </div>
          </div>

          {/* Footer without Top 5% and without pipe */}
          <div
            className="smaller text-muted pt-3 mt-3 border-top d-flex align-items-center"
            style={{ fontSize: '0.8rem', borderColor: 'var(--border-color)' }}
          >
            <span className="d-inline-flex align-items-center text-nowrap" style={{ gap: '0.5rem' }}>
              <TrophyIcon size={13} className="text-muted flex-shrink-0" />
              <span>
                <span className="text-muted">Best:&nbsp;</span>
                <strong className="text-primary-custom fw-bold">{streakStats.bestStreak} {streakStats.bestStreak === 1 ? 'day' : 'days'}</strong>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="card card-fittrack p-3 mb-4">
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center" style={{ gap: '0.75rem' }}>
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
              {WORKOUT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
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
            <Link to="/workouts/new" className="btn btn-primary-green btn-sm px-3 text-nowrap d-flex align-items-center" style={{ gap: '0.5rem' }}>
              <PlusIcon size={16} />
              <span>Log Workout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Workout Sessions Table (Full Width - Clean & Spacious) */}
      <div className="card card-fittrack p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="p-1.5 rounded-2 bg-emerald-subtle text-emerald d-flex align-items-center justify-content-center">
              <CalendarIcon size={18} />
            </div>
            <h5 className="fw-bold text-primary-custom mb-0" style={{ fontSize: '1rem' }}>
              Workout Sessions ({workouts.length})
            </h5>
          </div>
        </div>

        {loading ? (
          <div className="py-5 text-center">
            <div className="spinner-border" style={{ color: accentColor }} role="status">
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
              className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-3"
              style={{ width: 56, height: 56, alignItems: 'center', justifyItems: 'center' }}
            >
              <DumbbellIcon size={28} />
            </div>
            <h6 className="fw-bold text-primary-custom mb-1">No workouts found</h6>
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
            {/* Desktop View: Full-Width Clean Table */}
            <div className="d-none d-md-block">
              <div className="workout-table-wrap table-responsive">
                <table className="table workout-sessions-table">
                  <thead>
                    <tr>
                      <th style={{ width: 45 }}>#</th>
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
                              {workout.type === 'Other' ? 'Hybrid' : (workout.type || 'Strength')}
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
            <div className="d-md-none d-flex flex-column" style={{ gap: '0.75rem' }}>
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
