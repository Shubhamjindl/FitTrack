import React from 'react';

const ProfileSummitGraphic = () => {
  return (
    <svg
      viewBox="0 0 650 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid meet"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="profRidge1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="profRidge2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="profPeakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="fadeMask" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
        <mask id="profMask">
          <rect x="0" y="0" width="650" height="200" fill="url(#fadeMask)" />
        </mask>
      </defs>

      <g mask="url(#profMask)">
        {/* Soft Background Mountains */}
        <path
          d="M0 200 L90 145 L180 165 L270 120 L370 150 L470 100 L560 135 L650 85 L650 200 Z"
          fill="url(#profRidge1)"
        />

        {/* Midground Rising Ridge */}
        <path
          d="M120 200 L210 155 L310 170 L410 125 L500 145 L580 90 L650 115 L650 200 Z"
          fill="url(#profRidge2)"
        />

        {/* Foreground Crag / Summit */}
        <path
          d="M300 200 L430 160 L510 115 L565 60 L610 95 L650 75 L650 200 Z"
          fill="url(#profPeakGrad)"
        />

        {/* Standing Summit Athlete Silhouette (Arms on hips, triumphant pose) */}
        <g transform="translate(554, 18) scale(0.72)" fill="#022c22">
          {/* Head */}
          <circle cx="15" cy="8" r="4.5" />
          {/* Neck */}
          <rect x="13.5" y="12" width="3" height="3" />
          {/* Broad Shoulders and Torso */}
          <path d="M7 15 L23 15 L20 32 L10 32 Z" />
          {/* Arms akimbo (hands on hips) */}
          <path
            d="M8 16 L2 24 L10 27 M22 16 L28 24 L20 27"
            stroke="#022c22"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Athletic Legs planted firmly on summit */}
          <path
            d="M11 32 L8 46 L7 57 M19 32 L22 46 L23 57"
            stroke="#022c22"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
};

export default ProfileSummitGraphic;
