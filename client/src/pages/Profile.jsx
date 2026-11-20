import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ProfileSummitGraphic from '../components/ProfileSummitGraphic';
import {
  UserIcon,
  MailIcon,
  CalendarIcon,
  LockIcon,
  CheckIcon,
  PaletteIcon,
  SunIcon,
  MoonIcon,
} from '../components/Icons';

const Profile = () => {
  const { user, updateProfile, changePassword, isDemo: authDemo } = useAuth();
  const { theme, setTheme, accent, setAccent } = useTheme();
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
    : 'October 2026';

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="container py-4 animate-fade-in max-w-4xl">
      {/* Page Title */}
      <div className="mb-4 pb-1">
        <h1 className="fw-semibold text-primary-custom mb-1 h3">Athlete Profile</h1>
        <p className="text-muted mb-0 small">
          Manage your account details and security settings
        </p>
      </div>

      {/* User Header Profile Card with Mountain Summit Graphic */}
      <div className="profile-hero-card p-4 mb-4">
        <div className="profile-hero-content d-flex flex-column flex-sm-row align-items-center" style={{ gap: '1.5rem' }}>
          <div className="profile-avatar-circle shadow-sm flex-shrink-0 me-sm-2 mb-3 mb-sm-0">
            {userInitial}
          </div>

          <div className="text-center text-sm-start flex-grow-1">
            <h2 className="fw-semibold text-primary-custom mb-1 h4" style={{ fontWeight: 600 }}>{user?.name || 'Alex Morgan'}</h2>
            <div className="d-flex flex-wrap justify-content-center justify-content-sm-start align-items-center text-muted small" style={{ gap: '0.85rem' }}>
              <span className="d-inline-flex align-items-center" style={{ gap: '0.45rem' }}>
                <MailIcon size={14} className="text-muted flex-shrink-0" />
                <span>{user?.email || 'alex.fit@example.com'}</span>
              </span>
              <span className="text-muted opacity-50">•</span>
              <span className="d-inline-flex align-items-center" style={{ gap: '0.45rem' }}>
                <CalendarIcon size={14} className="text-muted flex-shrink-0" />
                <span>Member since {memberSince}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Mountain Ridge Summit Background Artwork */}
        <div className="profile-hero-bg">
          <ProfileSummitGraphic />
        </div>
      </div>

      {/* Demo Banner */}
      {isDemo && (
        <div className="demo-banner mb-4 d-flex align-items-center gap-3">
          <div className="demo-banner-icon">
            <LockIcon size={20} />
          </div>
          <div>
            <div className="fw-semibold text-primary-custom mb-0.5">Demo Account (View Only)</div>
            <div className="small text-muted">
              You are exploring as Alex Morgan. Profile details and credentials are fixed in read-only mode to preserve preview access for all visitors.
            </div>
          </div>
        </div>
      )}

      {/* Profile Sections: Update Information & Security */}
      <div className="row g-4">
        {/* Update Information */}
        <div className="col-12 col-md-6">
          <div className="card card-fittrack p-4 h-100">
            <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
              <div className="section-icon-badge flex-shrink-0">
                <UserIcon size={18} />
              </div>
              <div>
                <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>
                  Update Information
                </h5>
                <p className="text-muted smaller mb-0">
                  Modify your public display name and email address
                </p>
              </div>
            </div>

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
                <label className="form-label small fw-semibold" htmlFor="editNameInput">
                  Display Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <UserIcon size={15} />
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
                  <span className="form-text smaller text-muted">
                    Name cannot be changed in demo mode.
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold" htmlFor="emailReadonly">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <MailIcon size={15} />
                  </span>
                  <input
                    id="emailReadonly"
                    type="email"
                    className="form-control bg-light"
                    value={user?.email || ''}
                    disabled
                  />
                </div>
                <span className="form-text smaller text-muted">
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

        {/* Security & Password */}
        <div className="col-12 col-md-6">
          <div className="card card-fittrack p-4 h-100">
            <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
              <div className="section-icon-badge flex-shrink-0">
                <LockIcon size={18} />
              </div>
              <div>
                <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>
                  Security & Password
                </h5>
                <p className="text-muted smaller mb-0">
                  Ensure your account uses a secure password
                </p>
              </div>
            </div>

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
              <div className="d-flex flex-column align-items-center justify-content-center text-center py-4 my-auto">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 58,
                    height: 58,
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                  }}
                >
                  <LockIcon size={26} />
                </div>
                <h6 className="fw-bold text-primary-custom mb-1">Credentials Locked</h6>
                <p className="smaller text-muted mb-3" style={{ maxWidth: 280 }}>
                  Password modifications are disabled for the public demo account to ensure continuous access.
                </p>
                <span className="btn btn-outline-green btn-sm px-3 py-1 smaller rounded-pill">
                  Read-Only Mode
                </span>
              </div>
            ) : (
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <LockIcon size={15} />
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
                  <label className="form-label small fw-semibold" htmlFor="newPassword">
                    New Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <LockIcon size={15} />
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
                  <label className="form-label small fw-semibold" htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <LockIcon size={15} />
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
                  className="btn btn-primary-green w-100"
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

      {/* Theme & Accent Personalization Card */}
      <div className="card card-fittrack p-4 mt-4">
        <div className="d-flex align-items-center mb-3" style={{ gap: '0.65rem' }}>
          <div className="section-icon-badge flex-shrink-0">
            <PaletteIcon size={18} />
          </div>
          <div>
            <h5 className="fw-semibold text-primary-custom mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>
              Theme & Accent Personalization
            </h5>
            <p className="text-muted smaller mb-0">
              Customize your interface display mode and signature accent color
            </p>
          </div>
        </div>

        <div className="row g-3">
          {/* Accent Color Selection */}
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold d-block mb-2">Signature Accent Color</label>
            <div className="d-flex gap-2.5">
              {/* Emerald Green */}
              <button
                type="button"
                onClick={() => setAccent('green')}
                className="flex-grow-1 p-3 rounded-3 text-start border d-flex align-items-center justify-content-between"
                style={{
                  backgroundColor: 'var(--bg-section)',
                  borderColor: accent === 'green' ? 'var(--primary-green)' : 'var(--border-color)',
                  borderWidth: accent === 'green' ? 2 : 1,
                  boxShadow: accent === 'green' ? '0 0 12px rgba(16, 185, 129, 0.2)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="d-flex align-items-center gap-2.5">
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div className="fw-semibold text-primary-custom small">Emerald Green</div>
                    <div className="text-muted smaller">Standard & Crisp</div>
                  </div>
                </div>
                {accent === 'green' && <CheckIcon size={18} style={{ color: '#10b981' }} />}
              </button>

              {/* Crimson Red */}
              <button
                type="button"
                onClick={() => setAccent('red')}
                className="flex-grow-1 p-3 rounded-3 text-start border d-flex align-items-center justify-content-between"
                style={{
                  backgroundColor: 'var(--bg-section)',
                  borderColor: accent === 'red' ? '#ef4444' : 'var(--border-color)',
                  borderWidth: accent === 'red' ? 2 : 1,
                  boxShadow: accent === 'red' ? '0 0 12px rgba(239, 68, 68, 0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="d-flex align-items-center gap-2.5">
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                      boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div className="fw-semibold text-primary-custom small">Crimson Red</div>
                    <div className="text-muted smaller">High Intensity</div>
                  </div>
                </div>
                {accent === 'red' && <CheckIcon size={18} style={{ color: '#ef4444' }} />}
              </button>
            </div>
          </div>

          {/* Display Mode Selection (Light / Dark) */}
          <div className="col-12 col-md-6">
            <label className="form-label small fw-semibold d-block mb-2">Display Mode</label>
            <div className="d-flex gap-2.5">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className="flex-grow-1 p-3 rounded-3 text-start border d-flex align-items-center justify-content-between"
                style={{
                  backgroundColor: 'var(--bg-section)',
                  borderColor: theme === 'light' ? 'var(--primary-green)' : 'var(--border-color)',
                  borderWidth: theme === 'light' ? 2 : 1,
                  boxShadow: theme === 'light' ? '0 0 10px rgba(var(--accent-rgb), 0.15)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="d-flex align-items-center gap-2.5">
                  <SunIcon size={20} className="text-muted" />
                  <div>
                    <div className="fw-semibold text-primary-custom small">Light Mode</div>
                    <div className="text-muted smaller">Crisp daytime style</div>
                  </div>
                </div>
                {theme === 'light' && <CheckIcon size={18} className="text-emerald" />}
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className="flex-grow-1 p-3 rounded-3 text-start border d-flex align-items-center justify-content-between"
                style={{
                  backgroundColor: 'var(--bg-section)',
                  borderColor: theme === 'dark' ? 'var(--primary-green)' : 'var(--border-color)',
                  borderWidth: theme === 'dark' ? 2 : 1,
                  boxShadow: theme === 'dark' ? '0 0 10px rgba(var(--accent-rgb), 0.15)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="d-flex align-items-center gap-2.5">
                  <MoonIcon size={20} className="text-muted" />
                  <div>
                    <div className="fw-semibold text-primary-custom small">Dark Mode</div>
                    <div className="text-muted smaller">Sleek obsidian style</div>
                  </div>
                </div>
                {theme === 'dark' && <CheckIcon size={18} className="text-emerald" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
