import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  DumbbellIcon,
  HomeIcon,
  BarChartIcon,
  UserIcon,
  LogOutIcon,
} from './Icons';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon, end: true },
    { name: 'Workouts', path: '/workouts', icon: DumbbellIcon, end: false },
    { name: 'Analytics', path: '/analytics', icon: BarChartIcon, end: false },
    { name: 'Profile', path: '/profile', icon: UserIcon, end: false },
  ];

  return (
    <aside className="app-sidebar d-none d-lg-flex flex-column justify-content-between">
      {/* Top Section: Logo & Navigation */}
      <div>
        {/* Brand Header */}
        <Link to="/" className="sidebar-brand d-flex align-items-center text-white" style={{ gap: '0.75rem' }}>
          <div className="sidebar-logo-icon">
            <DumbbellIcon size={20} />
          </div>
          <span className="sidebar-brand-name">
            UpTo<span className="text-emerald-bright">Fit</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="sidebar-nav mt-4">
          <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `sidebar-nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <span className="sidebar-nav-icon">
                      <Icon size={19} />
                    </span>
                    <span className="sidebar-nav-label">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Lower Section: Mountain Silhouette Watermark & Logout */}
      <div className="sidebar-footer position-relative">
        {/* Mountain Silhouette Art (SVG Watermark) */}
        <div className="sidebar-watermark" aria-hidden="true">
          <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 h-auto">
            {/* Mountain Layer 1 (Background) */}
            <path
              d="M0 140 L30 85 L70 115 L120 70 L170 105 L220 65 L240 80 L240 140 Z"
              fill="rgba(var(--accent-rgb, 16, 185, 129), 0.08)"
            />
            {/* Mountain Layer 2 (Midground) */}
            <path
              d="M0 140 L45 95 L95 125 L150 80 L200 115 L240 90 L240 140 Z"
              fill="rgba(var(--accent-rgb, 16, 185, 129), 0.14)"
            />
            {/* Mountain Ridge (Foreground) */}
            <path
              d="M0 140 L60 105 L110 130 L160 95 L210 120 L240 105 L240 140 Z"
              fill="rgba(var(--accent-rgb, 16, 185, 129), 0.25)"
            />
            {/* Running Athlete Silhouette on the Peak */}
            <g transform="translate(142, 60) scale(0.65)" fill="rgba(255, 255, 255, 0.35)">
              <circle cx="12" cy="4" r="3" />
              <path d="M14 9 L17 14 L15 15 L12 11 L9 13 L6 10 L8 8 L12 8 L14 9 Z" />
              <path d="M12 11 L10 17 L7 20 L8 21 L12 18 L14 15 Z" />
              <path d="M11 13 L14 17 L18 19 L19 18 L15 15 L14 13 Z" />
            </g>
          </svg>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-logout-btn w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <LogOutIcon size={17} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
