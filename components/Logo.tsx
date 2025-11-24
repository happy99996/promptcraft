
import React from 'react';

interface LogoProps {
  className?: string;
  mousePos?: { x: number; y: number };
}

const Logo: React.FC<LogoProps> = ({ className, mousePos = { x: 0, y: 0 } }) => {
  // Calculate eye movement (clamped)
  const eyeX = mousePos.x * 2.0; // Reduced movement slightly for the robot frame
  const eyeY = mousePos.y * 2.0;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <style>
        {`
          @keyframes blink {
            0%, 96%, 100% { transform: scaleY(1); }
            98% { transform: scaleY(0.1); }
          }
          .logo-eyes {
            animation: blink 4s infinite;
            transform-origin: 16px 14px;
          }
        `}
      </style>

      {/* Antenna */}
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="2" r="1.5" fill="currentColor" />

      {/* Ears / Bolts */}
      <rect x="1" y="14" width="3" height="6" rx="1" fill="currentColor" />
      <rect x="28" y="14" width="3" height="6" rx="1" fill="currentColor" />

      {/* Head */}
      <rect 
        x="4" 
        y="6" 
        width="24" 
        height="22" 
        rx="6" 
        stroke="currentColor" 
        strokeWidth="2.5"
        fill="none" 
      />

      {/* Features */}
      <g>
         {/* Eyes Container (Moves with mouse) */}
         <g style={{ transform: `translate(${eyeX}px, ${eyeY}px)`, transition: 'transform 0.1s ease-out' }}>
            {/* Blinking Group */}
            <g className="logo-eyes">
              {/* Left Eye */}
              <circle cx="11.5" cy="14" r="2.5" fill="currentColor" />
              {/* Right Eye */}
              <circle cx="20.5" cy="14" r="2.5" fill="currentColor" />
            </g>
         </g>

         {/* Mouth (Static smile) */}
         <path
           d="M11 21 C11 21 13.5 24 16 24 C18.5 24 21 21 21 21"
           stroke="currentColor"
           strokeWidth="2.5"
           strokeLinecap="round"
           strokeLinejoin="round"
         />
      </g>
    </svg>
  );
};

export default Logo;
