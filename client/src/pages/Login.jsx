import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DumbbellIcon, MailIcon, LockIcon } from '../components/Icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('alex.fit@example.com');
    setPassword('password123');
    setError('');
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
            <h2 className="fw-bold text-dark mb-1">Welcome back</h2>
            <p className="text-muted small">Log in to track your workouts and monitor progress</p>
          </div>

          <div className="card card-fittrack p-4 p-sm-5">
            {error && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label" htmlFor="passwordInput">
                    Password
                  </label>
                </div>
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

              <button
                type="submit"
                className="btn btn-primary-green w-100 py-2 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                ) : null}
                <span>{loading ? 'Logging in...' : 'Sign In'}</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2 small mb-4 rounded-3"
                onClick={handleFillDemo}
              >
                ⚡ Quick Fill Demo Account (Alex Morgan)
              </button>

              <div className="text-center text-muted small">
                Don't have an account yet?{' '}
                <Link to="/register" className="fw-semibold text-success text-decoration-none">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
