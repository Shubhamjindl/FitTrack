import React from 'react';

const StatCard = ({ title, value, unit, subtitle, colorTheme = 'mint', icon }) => {
  const themeClass = `card-pastel-${colorTheme}`;

  return (
    <div className={`p-4 h-100 ${themeClass} shadow-sm position-relative overflow-hidden`}>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <span className="text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', opacity: 0.85 }}>
            {title}
          </span>
          <div className="d-flex align-items-baseline gap-2 mt-1">
            <h2 className="display-6 fw-bold mb-0" style={{ letterSpacing: '-0.5px' }}>
              {value}
            </h2>
            {unit && <span className="fw-semibold small" style={{ opacity: 0.85 }}>{unit}</span>}
          </div>
        </div>
        <div className="stat-icon-badge">
          {icon}
        </div>
      </div>
      {subtitle && (
        <div className="small fw-medium" style={{ opacity: 0.9 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;
