import React from 'react';
import { Link } from 'react-router-dom';
import { DumbbellIcon } from '../components/Icons';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <div
        className="d-inline-flex p-3 rounded-circle bg-light text-muted mx-auto mb-3"
        style={{ width: 72, height: 72, alignItems: 'center', justifyContent: 'center' }}
      >
        <DumbbellIcon size={36} />
      </div>
      <h1 className="fw-bold text-dark display-5">404</h1>
      <h4 className="fw-semibold text-secondary mb-3">Page Not Found</h4>
      <p className="text-muted mb-4">
        The fitness tracking page or workout you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary-green px-4">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
