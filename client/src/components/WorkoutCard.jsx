import React from 'react';
import { Link } from 'react-router-dom';
import {
  ClockIcon,
  CalendarIcon,
  DumbbellIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
} from './Icons';

const WorkoutCard = ({ workout, onView, onDelete }) => {
  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const exercises = workout.exercises || [];
  const exerciseCount = exercises.length;

  return (
    <div className="card card-fittrack card-fittrack-hover h-100 p-4 d-flex flex-column justify-content-between">
      <div>
        {/* Header: Date & Type Badge */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className={`badge-type badge-type-${workout.type || 'Other'}`}>
            {workout.type || 'Workout'}
          </span>
          <div className="d-flex align-items-center gap-1 text-muted small fw-medium">
            <CalendarIcon size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="fw-bold mb-3 text-primary-custom fs-5" style={{ lineHeight: '1.3' }}>
          {workout.name}
        </h4>

        {/* Duration & Stats Pills */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="stat-pill">
            <ClockIcon size={13} className="text-emerald" />
            <span>{workout.duration} min</span>
          </span>

          <span className="stat-pill">
            <DumbbellIcon size={13} className="text-sky" />
            <span>{exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}</span>
          </span>
        </div>

        {/* Exercise preview tags */}
        {exerciseCount > 0 ? (
          <div className="mb-3">
            <div className="small fw-semibold text-muted mb-2 text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
              Exercises:
            </div>
            <div className="d-flex flex-wrap gap-1.5">
              {exercises.slice(0, 3).map((ex, idx) => (
                <span key={idx} className="exercise-chip text-truncate">
                  {ex.name} {ex.weight > 0 ? `(${ex.weight}kg)` : ''}
                </span>
              ))}
              {exerciseCount > 3 && (
                <span className="exercise-chip exercise-chip-more">
                  +{exerciseCount - 3} more
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="small text-muted mb-3 fst-italic">
            Cardio / continuous session
          </div>
        )}

        {/* Notes preview if present */}
        {workout.notes && (
          <p className="small text-muted mb-3 text-truncate fst-italic" title={workout.notes} style={{ opacity: 0.9 }}>
            "{workout.notes}"
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-2">
        <button
          onClick={() => onView(workout)}
          className="btn btn-primary-green-sm"
          title="View Complete Breakdown"
        >
          <EyeIcon size={15} />
          <span>View</span>
        </button>

        <div className="d-flex align-items-center gap-2">
          <Link
            to={`/workouts/edit/${workout._id}`}
            className="btn btn-action-icon"
            title="Edit Workout"
          >
            <EditIcon size={15} />
          </Link>

          <button
            onClick={() => onDelete(workout)}
            className="btn btn-action-icon btn-action-icon-danger"
            title="Delete Workout"
          >
            <TrashIcon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
