import React from 'react';
import { DumbbellIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="fittrack-footer">
      <div className="container text-center">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <div
            className="d-flex align-items-center justify-content-center text-white rounded p-1"
            style={{ backgroundColor: 'var(--primary-green)', width: 26, height: 26 }}
          >
            <DumbbellIcon size={16} />
          </div>
          <span className="fw-bold text-dark">
            Fit<span style={{ color: 'var(--primary-green)' }}>Track</span>
          </span>
          <span className="text-muted">| Modern MERN Fitness & Workout Tracker</span>
        </div>
        <p className="small text-muted mb-0">
          Track workouts, monitor volume progression, and achieve your personal fitness milestones.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
