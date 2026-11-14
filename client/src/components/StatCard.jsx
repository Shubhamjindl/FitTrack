import React from 'react';

const StatCard = ({ title, value, unit, subtitle, colorTheme = 'mint', icon }) => {
  const themeClass = `card-pastel-${colorTheme}`;

  return (
    <div className={`p-3 p-md-3.5 h-100 ${themeClass} shadow-sm position-relative overflow-hidden`}>
      <div className="d-flex justify-content-between align-items-start mb-2.5">
        <div>
          <span className="text-uppercase fw-bold" style={{ fontSize: '0.72rem', letterSpacing: '0.05em', opacity: 0.85 }}>
            {title}
          </span>
          <div className="d-flex align-items-baseline gap-1.5 mt-0.5">
            <span className="stat-number fw-bold mb-0" style={{ letterSpacing: '-0.5px' }}>
              {value}
            </span>
            {unit && <span className="fw-semibold small" style={{ opacity: 0.85, fontSize: '0.85rem' }}>{unit}</span>}
          </div>
        </div>
        <div className="stat-icon-badge">
          {icon}
        </div>
      </div>
      {subtitle && (
        <div className="small fw-medium" style={{ opacity: 0.85, fontSize: '0.8rem' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;
