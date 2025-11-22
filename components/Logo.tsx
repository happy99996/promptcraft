
import React from 'react';

interface LogoProps {
  className?: string;
  mousePos?: { x: number; y: number };
}

const Logo: React.FC<LogoProps> = ({ className, mousePos = { x: 0, y: 0 } }) => {
  // Calculate eye movement (clamped)
  const eyeX = mousePos.x * 2.5;
  const eyeY = mousePos.y * 2.5;

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
            transform-origin: 16px 13px;
          }
        `}
      </style>

      {/* Face Contour (Squircle) */}
      <rect 
        x="2" 
        y="2" 
        width="28" 
        height="28" 
        rx="9" 
        stroke="currentColor" 
        strokeWidth="2.5" 
      />

      {/* Features */}
      <g>
         {/* Eyes Container (Moves with mouse) */}
         <g style={{ transform: `translate(${eyeX}px, ${eyeY}px)`, transition: 'transform 0.1s ease-out' }}>
            {/* Blinking Group */}
            <g className="logo-eyes">
              {/* Left Eye */}
              <ellipse cx="10.5" cy="13" rx="2.5" ry="3" fill="currentColor" />
              {/* Right Eye */}
              <ellipse cx="21.5" cy="13" rx="2.5" ry="3" fill="currentColor" />
            </g>
         </g>

         {/* Mouth (Static smile) */}
         <path
           d="M10 21 C10 21 13 25 16 25 C19 25 22 21 22 21"
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
