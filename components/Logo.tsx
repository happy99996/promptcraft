
import React from 'react';

interface LogoProps {
  className?: string;
  mousePos?: { x: number; y: number };
}

const Logo: React.FC<LogoProps> = ({ className, mousePos = { x: 0, y: 0 } }) => {
  // Limit the movement range
  const moveX = mousePos.x * 3;
  const moveY = mousePos.y * 3;

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
          @keyframes blink-eyes {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          .logo-blink {
            animation: blink-eyes 4s infinite;
            transform-box: fill-box;
            transform-origin: center 60%; /* Anchor blink to bottom of eyes */
          }
        `}
      </style>

      {/* Movement Group */}
      <g style={{ transform: `translate(${moveX}px, ${moveY}px)`, transition: 'transform 0.1s ease-out' }}>
        
        {/* Blinking Eyes Group */}
        <g className="logo-blink">
          {/* Left Eye (^ shape) */}
          <path 
            d="M8.5 15 L11 11.5 L13.5 15" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Right Eye (^ shape) */}
          <path 
            d="M18.5 15 L21 11.5 L23.5 15" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </g>

        {/* Mouth (Smile) */}
        <path
          d="M10 22 Q16 26 22 22" 
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
