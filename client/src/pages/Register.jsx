import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DumbbellIcon, UserIcon, MailIcon, LockIcon } from '../components/Icons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center text-white rounded-4 p-3 mb-3 shadow-sm"
              style={{ backgroundColor: 'var(--primary-green)' }}
            >
              <DumbbellIcon size={32} />
            </div>
            <h2 className="fw-bold text-dark mb-1">Join FitTrack</h2>
            <p className="text-muted small">Create an account to start logging and analyzing workouts</p>
          </div>

          <div className="card card-fittrack p-4 p-sm-5">
            {error && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="nameInput">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <UserIcon size={18} />
                  </span>
                  <input
                    id="nameInput"
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="e.g. Sarah Connor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="emailInput">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <MailIcon size={18} />
                  </span>
                  <input
                    id="emailInput"
                    type="email"
                    className="form-control border-start-0 ps-0"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="passwordInput">
                  Password (min. 6 characters)
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <LockIcon size={18} />
                  </span>
                  <input
                    id="passwordInput"
                    type="password"
                    className="form-control border-start-0 ps-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="confirmPasswordInput">
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <LockIcon size={18} />
                  </span>
                  <input
                    id="confirmPasswordInput"
                    type="password"
                    className="form-control border-start-0 ps-0"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary-green w-100 py-2 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                ) : null}
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              </button>

              <div className="text-center text-muted small">
                Already have an account?{' '}
                <Link to="/login" className="fw-semibold text-success text-decoration-none">
                  Log in here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
