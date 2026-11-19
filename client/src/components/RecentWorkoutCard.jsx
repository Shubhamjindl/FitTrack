import React from 'react';
import {
  DumbbellIcon,
  RunningIcon,
  ZapIcon,
  ActivityIcon,
  ClockIcon,
  CalendarIcon,
  LayersIcon,
  TrophyIcon,
} from './Icons';

const getWorkoutTypeTheme = (type = 'Strength') => {
  switch (type) {
    case 'Strength':
      return {
        accent: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        color: '#059669',
        icon: <DumbbellIcon size={16} />,
      };
    case 'Bodyweight':
      return {
        accent: '#0ea5e9',
        bg: 'rgba(14, 165, 233, 0.12)',
        color: '#0284c7',
        icon: <ActivityIcon size={16} />,
      };
    case 'Running':
    case 'Cardio':
      return {
        accent: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.12)',
        color: '#b45309',
        icon: <RunningIcon size={16} />,
      };
    case 'HIIT':
      return {
        accent: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.12)',
        color: '#b91c1c',
        icon: <ZapIcon size={16} />,
      };
    case 'Yoga':
      return {
        accent: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.12)',
        color: '#7c3aed',
        icon: <ActivityIcon size={16} />,
      };
    case 'Cycling':
      return {
        accent: '#0284c7',
        bg: 'rgba(2, 132, 199, 0.12)',
        color: '#0369a1',
        icon: <ActivityIcon size={16} />,
      };
    case 'Sports':
      return {
        accent: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.12)',
        color: '#4f46e5',
        icon: <TrophyIcon size={16} />,
      };
    case 'Hybrid':
    case 'Other':
      return {
        accent: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.12)',
        color: '#0891b2',
        icon: <ActivityIcon size={16} />,
      };
    default:
      return {
        accent: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        color: '#059669',
        icon: <DumbbellIcon size={16} />,
      };
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const RecentWorkoutCard = ({ workout, onClick }) => {
  const theme = getWorkoutTypeTheme(workout.type);
  const exerciseCount = workout.exercises ? workout.exercises.length : 0;

  return (
    <div
      className="recent-workout-card-v2 h-100 d-flex flex-column justify-content-between"
      style={{ borderLeftColor: theme.accent }}
      onClick={() => onClick && onClick(workout)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick(workout);
        }
      }}
    >
      {/* Top Row: Icon + Name, and Date */}
      <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
        <div className="d-flex align-items-center gap-2.5 min-w-0">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: 34,
              height: 34,
              backgroundColor: theme.bg,
              color: theme.color,
            }}
          >
            {theme.icon}
          </div>
          <div className="fw-bold text-primary-custom text-truncate" style={{ fontSize: '0.92rem' }}>
            {workout.name}
          </div>
        </div>
        <div className="d-flex align-items-center gap-1 text-muted text-nowrap" style={{ fontSize: '0.78rem' }}>
          <CalendarIcon size={13} />
          <span>{formatDate(workout.date)}</span>
        </div>
      </div>

      {/* Bottom Row: Pills for Type, Duration, Exercises */}
      <div className="d-flex flex-wrap align-items-center gap-1.5 pt-1">
        <span
          className="pill-stat-badge fw-semibold"
          style={{
            backgroundColor: theme.bg,
            color: theme.color,
          }}
        >
          {workout.type === 'Other' ? 'Hybrid' : (workout.type || 'Workout')}
        </span>

        <span className="pill-stat-badge">
          <ClockIcon size={12} />
          <span>{workout.duration} min</span>
        </span>

        <span className="pill-stat-badge">
          <LayersIcon size={12} />
          <span>
            {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default RecentWorkoutCard;
