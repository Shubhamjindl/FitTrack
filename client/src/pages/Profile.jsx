
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  UserIcon,
  MailIcon,
  CalendarIcon,
  LockIcon,
  CheckIcon,
} from '../components/Icons';

const Profile = () => {
  const { user, updateProfile, changePassword, isDemo: authDemo } = useAuth();
  const isDemo = authDemo || user?.email?.toLowerCase() === 'alex.fit@example.com' || Boolean(user?.isDemo);

  // Name Update form
  const [name, setName] = useState(user?.name || '');
  const [savingName, setSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState('');
  const [nameError, setNameError] = useState('');

  // Password Change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // Handle Name Update
  const handleUpdateName = async (e) => {
    e.preventDefault();
    setNameSuccess('');
    setNameError('');

    if (isDemo) {
      setNameError('Demo account name cannot be changed.');
      return;
    }

    if (!name.trim()) {
      setNameError('Name cannot be empty.');
      return;
    }

    try {
      setSavingName(true);
      await updateProfile(name.trim());
      setNameSuccess('Profile name updated successfully!');
    } catch (err) {
      setNameError(err.message || 'Failed to update name');
    } finally {
      setSavingName(false);
    }
  };

  // Handle Password Update
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (isDemo) {
      setPasswordError('Demo account password cannot be changed.');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    try {
      setSavingPassword(true);
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="container py-4 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="mb-4 pb-2 border-bottom">
        <h1 className="fw-bold text-dark mb-1 h2">Athlete Profile</h1>
        <p className="text-muted mb-0 small">
          Manage your account profile details and security settings
        </p>
      </div>

      {/* User Header Profile Card */}
      <div className="card card-fittrack p-4 p-md-5 mb-4">
        <div className="d-flex flex-column flex-sm-row align-items-center gap-4">
          <div
            className="user-avatar-pill shadow"
            style={{ width: 84, height: 84, fontSize: '2.2rem' }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="text-center text-sm-start flex-grow-1">
            <h3 className="fw-bold text-dark mb-1">{user?.name}</h3>
            <div className="d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center gap-3 text-muted small">
              <span className="d-flex align-items-center gap-1">
                <MailIcon size={15} />
                <span>{user?.email}</span>
              </span>
              <span>•</span>
              <span className="d-flex align-items-center gap-1">
                <CalendarIcon size={15} />
                <span>Member since {memberSince}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {isDemo && (
        <div className="demo-banner mb-4 d-flex align-items-center gap-3">
          <div className="demo-banner-icon">
            <LockIcon size={20} />
          </div>
          <div>
            <div className="fw-semibold text-primary-custom mb-0.5">Demo Account (View Only)</div>
            <div className="small text-muted">You are logged in as Alex Morgan. Profile details and credentials are fixed in read-only mode to preserve preview access for all visitors.</div>
          </div>
        </div>
      )}

      <div className="row g-4">
        {/* Update Profile Name Form */}
        <div className="col-12 col-md-6">
          <div className="card card-fittrack p-4 h-100">
            <h5 className="fw-bold text-dark mb-2">Update Information</h5>
            <p className="text-muted small mb-3">Modify your public display name</p>

            {nameSuccess && (
              <div className="alert alert-success py-2 px-3 small rounded-3 mb-3">
                {nameSuccess}
              </div>
            )}
            {nameError && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                {nameError}
              </div>
            )}

            <form onSubmit={handleUpdateName}>
              <div className="mb-3">
                <label className="form-label" htmlFor="editNameInput">
                  Display Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <UserIcon size={16} />
                  </span>
                  <input
                    id="editNameInput"
                    type="text"
                    className={`form-control ${isDemo ? 'bg-light' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isDemo}
                    required
                  />
                </div>
                {isDemo && (
                  <span className="form-text small text-muted">
                    Name cannot be changed in demo mode.
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="emailReadonly">
                  Email Address
                </label>
                <input
                  id="emailReadonly"
                  type="email"
                  className="form-control bg-light"
                  value={user?.email || ''}
                  disabled
                />
                <span className="form-text small text-muted">
                  Email cannot be changed directly for security.
                </span>
              </div>

              {!isDemo && (
                <button
                  type="submit"
                  className="btn btn-primary-green w-100"
                  disabled={savingName}
                >
                  {savingName ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : (
                    <CheckIcon size={16} />
                  )}
                  <span>Save Changes</span>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="col-12 col-md-6">
          <div className="card card-fittrack p-4 h-100">
            <h5 className="fw-bold text-dark mb-2">Security & Password</h5>
            <p className="text-muted small mb-3">Ensure your account uses a secure password</p>

            {passwordSuccess && (
              <div className="alert alert-success py-2 px-3 small rounded-3 mb-3">
                {passwordSuccess}
              </div>
            )}
            {passwordError && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                {passwordError}
              </div>
            )}

            {isDemo ? (
              <div className="d-flex flex-column align-items-center justify-content-center text-center py-4 my-auto text-muted">
                <div className="mb-3 p-3 rounded-circle bg-light-section text-muted shadow-xs">
                  <LockIcon size={28} />
                </div>
                <h6 className="fw-semibold text-dark mb-1">Credentials Locked</h6>
                <p className="small text-muted mb-3" style={{ maxWidth: 280 }}>
                  Password modifications are disabled for the public demo account to ensure continuous access.
                </p>
                <span className="badge bg-light-section text-secondary border px-3 py-1.5 fw-normal">
                  Read-Only Mode
                </span>
              </div>
            ) : (
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <LockIcon size={16} />
                    </span>
                    <input
                      id="currentPassword"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="newPassword">
                    New Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <LockIcon size={16} />
                    </span>
                    <input
                      id="newPassword"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <LockIcon size={16} />
                    </span>
                    <input
                      id="confirmNewPassword"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-secondary w-100 rounded-3"
                  disabled={savingPassword}
                >
                  {savingPassword ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : (
                    <LockIcon size={16} />
                  )}
                  <span>Update Password</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
