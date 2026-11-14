import React from 'react';

const HeroBannerGraphic = () => {
  return (
    <svg
      viewBox="0 0 600 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid meet"
      style={{ width: '100%', height: '100%', maxHeight: 240 }}
    >
      <defs>
        <linearGradient id="heroSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroMtn1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="heroMtn2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="heroMtn3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Sun glow behind mountains */}
      <circle cx="430" cy="115" r="85" fill="url(#heroSunGrad)" />

      {/* Distant Mountain Range */}
      <path
        d="M120 240 L190 140 L240 170 L310 115 L380 165 L460 95 L530 155 L600 110 L600 240 Z"
        fill="url(#heroMtn1)"
      />

      {/* Midground Ridge */}
      <path
        d="M200 240 L270 160 L330 185 L400 135 L475 180 L545 130 L600 160 L600 240 Z"
        fill="url(#heroMtn2)"
      />

      {/* Foreground Mountain Crag */}
      <path
        d="M320 240 L410 175 L480 195 L560 145 L600 170 L600 240 Z"
        fill="url(#heroMtn3)"
      />

      {/* Runner Silhouette on Foreground Ridge */}
      <g transform="translate(485, 92) scale(0.9)" fill="#064e3b">
        {/* Head */}
        <circle cx="28" cy="12" r="5.5" />
        {/* Torso */}
        <path d="M25 18 L31 18 L35 34 L29 36 L23 28 Z" />
        {/* Left Arm (raised pumping forward) */}
        <path
          d="M25 20 L18 26 L12 23"
          stroke="#064e3b"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right Arm (driving back) */}
        <path
          d="M30 20 L38 27 L44 32"
          stroke="#064e3b"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Left Leg (striding forward) */}
        <path
          d="M25 34 L18 46 L24 58"
          stroke="#064e3b"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right Leg (driving back) */}
        <path
          d="M31 34 L39 44 L48 54"
          stroke="#064e3b"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default HeroBannerGraphic;
