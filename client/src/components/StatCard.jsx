import React from 'react';

const StatCard = ({
  title,
  value,
  unit,
  subtitle,
  colorTheme = 'mint',
  icon,
}) => {
  // Theme color maps for clean icon circular badge
  const themeMap = {
    mint: {
      bg: 'var(--stat-mint-bg, rgba(16, 185, 129, 0.12))',
      color: '#10b981',
      border: 'rgba(16, 185, 129, 0.2)',
    },
    blue: {
      bg: 'var(--stat-blue-bg, rgba(2, 132, 199, 0.12))',
      color: '#0284c7',
      border: 'rgba(2, 132, 199, 0.2)',
    },
    purple: {
      bg: 'var(--stat-purple-bg, rgba(147, 51, 234, 0.12))',
      color: '#9333ea',
      border: 'rgba(147, 51, 234, 0.2)',
    },
    amber: {
      bg: 'var(--stat-amber-bg, rgba(245, 158, 11, 0.12))',
      color: '#d97706',
      border: 'rgba(245, 158, 11, 0.2)',
    },
  };

  const theme = themeMap[colorTheme] || themeMap.mint;

  return (
    <div className="stat-card-v2 p-3 p-xl-3.5 h-100 rounded-3 shadow-sm d-flex align-items-center gap-3">
      <div
        className="stat-card-icon-circle flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: 48,
          height: 48,
          backgroundColor: theme.bg,
          color: theme.color,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-grow-1">
        <div className="d-flex align-items-baseline gap-1">
          <span className="stat-card-value text-white" style={{ fontSize: '1.42rem', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.4px' }}>
            {value}
          </span>
          {unit && (
            <span className="text-muted fw-medium" style={{ fontSize: '0.85rem' }}>
              {unit}
            </span>
          )}
        </div>
        <div className="text-secondary-custom text-truncate mt-0.5" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-muted text-truncate" style={{ fontSize: '0.74rem' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
