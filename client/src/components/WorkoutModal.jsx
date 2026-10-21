import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {
  CloseIcon,
  CalendarIcon,
  ClockIcon,
  DumbbellIcon,
  EditIcon,
} from './Icons';

const WorkoutModal = ({ workout, onClose }) => {
  useEffect(() => {
    if (!workout) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [workout, onClose]);

  if (!workout) return null;

  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const exercises = workout.exercises || [];

  const totalVolume = exercises.reduce((acc, ex) => {
    return acc + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
  }, 0);

  const modalContent = (
    <div
      className="fittrack-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        margin: 0,
      }}
    >
      <div
        className="card-fittrack border-0 shadow-lg position-relative w-100"
        style={{
          maxWidth: '800px',
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: '18px',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header border-bottom px-4 py-3 bg-light-section position-relative d-flex align-items-center pe-5">
          <div className="d-flex align-items-center gap-2.5 pe-4 me-auto">
            <span className={`badge-type badge-type-${workout.type || 'Other'}`}>
              {workout.type}
            </span>
            <h5 className="modal-title fw-bold text-primary-custom mb-0 text-truncate">{workout.name}</h5>
          </div>

          {/* Top Right Close (X) Button */}
          <button
            type="button"
            className="btn-close-custom"
            onClick={onClose}
            aria-label="Close"
            title="Close Modal"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body p-4">
          {/* Quick Metrics */}
          <div className="row g-3 mb-4">
            <div className="col-sm-4">
              <div className="p-3 bg-light-section rounded-3 d-flex align-items-center gap-3">
                <div className="p-2 rounded bg-card-custom text-muted shadow-sm d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <div className="small text-muted fw-semibold">Date</div>
                  <div className="fw-bold text-primary-custom">{formattedDate}</div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="p-3 bg-light-section rounded-3 d-flex align-items-center gap-3">
                <div className="p-2 rounded bg-card-custom text-emerald shadow-sm d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                  <ClockIcon size={20} />
                </div>
                <div>
                  <div className="small text-muted fw-semibold">Duration</div>
                  <div className="fw-bold text-primary-custom">{workout.duration} minutes</div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="p-3 bg-light-section rounded-3 d-flex align-items-center gap-3">
                <div className="p-2 rounded bg-card-custom text-sky shadow-sm d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                  <DumbbellIcon size={20} />
                </div>
                <div>
                  <div className="small text-muted fw-semibold">Total Volume</div>
                  <div className="fw-bold text-primary-custom">{totalVolume.toLocaleString()} kg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Exercises Table */}
          <div className="mb-4">
            <h6 className="fw-bold text-primary-custom mb-3 d-flex align-items-center gap-2">
              <span>Exercises & Sets</span>
              <span className="badge bg-light-section text-secondary border fw-normal">
                {exercises.length} total
              </span>
            </h6>

            {exercises.length > 0 ? (
              <div className="table-responsive border rounded-3 overflow-hidden">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light-section">
                    <tr className="small text-uppercase text-muted">
                      <th className="ps-3 py-3">Exercise</th>
                      <th className="text-center py-3">Sets</th>
                      <th className="text-center py-3">Reps</th>
                      <th className="text-center py-3">Weight</th>
                      <th className="text-end pe-3 py-3">Subtotal Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises.map((ex, idx) => {
                      const setVolume = (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
                      return (
                        <tr key={idx}>
                          <td className="ps-3 fw-semibold text-primary-custom">
                            <span className="badge bg-light-section text-muted me-2 font-monospace">
                              #{idx + 1}
                            </span>
                            {ex.name}
                          </td>
                          <td className="text-center font-monospace">{ex.sets}</td>
                          <td className="text-center font-monospace">{ex.reps}</td>
                          <td className="text-center font-monospace">
                            {ex.weight > 0 ? `${ex.weight} kg` : 'Bodyweight'}
                          </td>
                          <td className="text-end pe-3 font-monospace fw-semibold text-secondary">
                            {setVolume > 0 ? `${setVolume.toLocaleString()} kg` : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 bg-light-section text-center rounded-3 text-muted">
                No individual sets recorded for this workout.
              </div>
            )}
          </div>

          {/* Notes */}
          {workout.notes && (
            <div>
              <h6 className="fw-bold text-primary-custom mb-2">Workout Notes</h6>
              <div className="p-3 bg-light-section rounded-3 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                {workout.notes}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer border-top px-4 py-3 bg-light-section d-flex justify-content-between">
          <Link
            to={`/workouts/edit/${workout._id}`}
            className="btn btn-outline-green btn-sm"
            onClick={onClose}
          >
            <EditIcon size={16} />
            <span>Edit Workout</span>
          </Link>

          <button type="button" className="btn btn-secondary btn-sm rounded-3 px-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default WorkoutModal;
