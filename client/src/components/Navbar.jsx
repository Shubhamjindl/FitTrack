import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  DumbbellIcon,
  ActivityIcon,
  PlusIcon,
  BarChartIcon,
  UserIcon,
  LogOutIcon,
  CalendarIcon,
  SunIcon,
  MoonIcon,
} from './Icons';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => setIsOpen(false);

  const getInitial = (name) => {
    return name ? name.trim().charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="navbar navbar-expand-lg fittrack-navbar py-2 px-3">
      <div className="container-fluid max-w-7xl">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary-custom fs-4" onClick={closeMenu}>
          <div
            className="d-flex align-items-center justify-content-center text-white rounded-3 p-2"
            style={{ backgroundColor: 'var(--primary-green)', width: 38, height: 38 }}
          >
            <DumbbellIcon size={22} />
          </div>
          <span style={{ letterSpacing: '-0.5px' }}>
            Fit<span style={{ color: 'var(--primary-green)' }}>Track</span>
          </span>
        </Link>

        <div className="d-flex align-items-center gap-2 d-lg-none">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className="btn btn-theme-toggle p-2 rounded-circle"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>

          {/* Mobile Navigation Toggle Button */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="fittrackNavbar">
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1 ms-lg-3">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <ActivityIcon size={18} />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/workouts"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <CalendarIcon size={18} />
                    <span>Workouts</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/workouts/new"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <PlusIcon size={18} />
                    <span>Add Workout</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <BarChartIcon size={18} />
                    <span>Analytics</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <UserIcon size={18} />
                    <span>Profile</span>
                  </NavLink>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                {/* Desktop Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="btn btn-theme-toggle p-2 rounded-circle d-none d-lg-flex align-items-center justify-content-center"
                  title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                </button>

                <Link
                  to="/profile"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={closeMenu}
                  title="View Profile"
                >
                  <div className="user-avatar-pill">
                    {getInitial(user?.name)}
                  </div>
                  <span className="fw-semibold text-primary-custom d-none d-sm-inline" style={{ fontSize: '0.925rem' }}>
                    {user?.name}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 rounded-pill px-3 py-1"
                  style={{ fontSize: '0.85rem' }}
                >
                  <LogOutIcon size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-nav ms-auto gap-2 align-items-center">
              <button
                onClick={toggleTheme}
                className="btn btn-theme-toggle p-2 rounded-circle me-2"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
              </button>
              <Link to="/login" className="btn btn-outline-green" onClick={closeMenu}>
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary-green" onClick={closeMenu}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

