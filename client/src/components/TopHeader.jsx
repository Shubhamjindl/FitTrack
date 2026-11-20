import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  BellIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  UserIcon,
  LogOutIcon,
  DumbbellIcon,
  PaletteIcon,
} from './Icons';

const TopHeader = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, accent, toggleAccent, accentColor } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setDropdownOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'A';
  const firstName = user?.name ? user.name.trim() : 'Alex Morgan';

  return (
    <header className="app-top-header d-flex align-items-center justify-content-between px-3 px-md-4 py-2.5">
      {/* Left: Mobile Brand OR Desktop Page Indicator */}
      <div className="d-flex align-items-center gap-2">
        {/* Mobile only logo */}
        <Link to="/" className="d-lg-none d-flex align-items-center gap-2 text-primary-custom text-decoration-none fw-bold">
          <div className="sidebar-logo-icon" style={{ width: 34, height: 34 }}>
            <DumbbellIcon size={18} />
          </div>
          <span className="fs-5" style={{ letterSpacing: '-0.5px' }}>
            UpTo<span className="text-emerald">Fit</span>
          </span>
        </Link>
      </div>

      {/* Right Actions: Notifications, Theme Toggle, User Profile Menu */}
      <div className="d-flex align-items-center gap-2.5 ms-auto">
        {/* Notification Bell with Dropdown */}
        <div className="position-relative" ref={notifRef}>
          <button
            type="button"
            className="btn-header-action position-relative"
            onClick={() => setNotifOpen(!notifOpen)}
            title="Notifications"
            aria-label="Notifications"
          >
            <BellIcon size={19} />
            <span className="notification-dot" />
          </button>

          {notifOpen && (
            <div className="header-dropdown-menu header-dropdown-notif shadow-lg animate-fade-in">
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-primary-custom small">Notifications</span>
                <span className="badge bg-light-section text-muted fw-normal small">1 new</span>
              </div>
              <div className="p-3">
                <div className="d-flex gap-2.5 align-items-start">
                  <span className="p-1.5 rounded-circle bg-emerald-subtle text-emerald">
                    <DumbbellIcon size={14} />
                  </span>
                  <div>
                    <div className="small fw-semibold text-primary-custom">Streak Maintained! 🔥</div>
                    <div className="text-muted smaller">Great job logging your workouts this week.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accent Color Switcher Button */}
        <button
          type="button"
          onClick={toggleAccent}
          className="btn-header-action position-relative"
          title={`Theme Accent: ${accent === 'green' ? 'Emerald Green' : 'Crimson Red'} (Click to toggle)`}
          aria-label={`Toggle accent between Emerald Green and Crimson Red`}
        >
          <PaletteIcon size={18} style={{ color: accentColor }} />
          <span
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: accentColor,
              boxShadow: `0 0 6px ${accentColor}`,
              border: '1.5px solid var(--bg-card)',
            }}
          />
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="btn-header-action"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
        </button>

        {/* User Profile Pill Menu */}
        <div className="position-relative" ref={dropdownRef}>
          <button
            type="button"
            className="header-user-pill d-flex align-items-center gap-2 border-0 bg-transparent p-1"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="header-user-avatar">
              {initial}
            </div>
            <span className="d-none d-sm-inline fw-semibold text-primary-custom small">
              {firstName}
            </span>
            <ChevronDownIcon size={14} className="text-muted d-none d-sm-inline" />
          </button>

          {dropdownOpen && (
            <div className="header-dropdown-menu shadow-lg animate-fade-in">
              <div className="px-3 py-2 border-bottom">
                <div className="fw-bold text-primary-custom text-truncate">{user?.name}</div>
                <div className="text-muted smaller text-truncate">{user?.email}</div>
              </div>
              <ul className="list-unstyled p-1 m-0">
                <li>
                  <Link
                    to="/profile"
                    className="dropdown-item-custom d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none"
                  >
                    <UserIcon size={16} />
                    <span>Athlete Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="dropdown-item-custom dropdown-item-danger d-flex align-items-center gap-2 px-3 py-2 rounded-2 w-100 border-0 bg-transparent text-start"
                  >
                    <LogOutIcon size={16} />
                    <span>Log out</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
