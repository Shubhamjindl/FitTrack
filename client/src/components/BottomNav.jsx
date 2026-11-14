import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  DumbbellIcon,
  BarChartIcon,
  UserIcon,
} from './Icons';

const BottomNav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon, end: true },
    { name: 'Workouts', path: '/workouts', icon: DumbbellIcon, end: false },
    { name: 'Analytics', path: '/analytics', icon: BarChartIcon, end: false },
    { name: 'Profile', path: '/profile', icon: UserIcon, end: false },
  ];

  return (
    <nav className="mobile-bottom-nav d-lg-none fixed-bottom d-flex align-items-center justify-content-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `mobile-nav-link d-flex flex-column align-items-center justify-content-center ${
                isActive ? 'active' : ''
              }`
            }
          >
            <span className="mobile-nav-icon">
              <Icon size={20} />
            </span>
            <span className="mobile-nav-label">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
