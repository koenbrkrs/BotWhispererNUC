import { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
  subMessage?: string;
  color?: 'red' | 'green' | 'blue';
  showRobotIcon?: boolean;
  duration?: number; // milliseconds
}

export const LoadingScreen = ({
  onComplete,
  message = 'Starting',
  subMessage = 'Game starting...',
  color = 'red',
  showRobotIcon = false,
  duration = 2500,
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  // Store callback in ref so the timer effect doesn't restart on every render
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onCompleteRef.current(), 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  const colorMap = {
    red: '#EA4237',
    green: '#00FF41',
    blue: '#186BE0',
  };

  const currentColor = colorMap[color];

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center font-retro"
      style={{
        backgroundColor: '#0d0d0d',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)',
      }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      <div className="relative z-10 max-w-lg w-full px-8 flex flex-col items-center space-y-8">
        {/* Optional robot icon */}
        {showRobotIcon && (
          <div style={{ color: currentColor }}>
            {/* Pixel-style robot face SVG */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 324 274"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_416_41)">
                <path
                  d="M159.398 5.80078C180.401 5.80078 197.694 21.6716 199.946 42.0742H245.533C260.555 42.0742 272.733 54.2523 272.733 69.2744V105.537C295.262 105.542 313.523 123.807 313.523 146.337C313.523 168.867 295.262 187.131 272.733 187.136V232.474C272.733 247.496 260.555 259.674 245.533 259.674H73.2676C58.2455 259.674 46.0675 247.496 46.0674 232.474V186.884C25.6676 184.629 9.80078 167.337 9.80078 146.336C9.80092 125.335 25.6677 108.043 46.0674 105.788V69.2744C46.0674 54.2523 58.2455 42.0742 73.2676 42.0742H118.851C121.103 21.6716 138.395 5.80079 159.398 5.80078ZM73.2676 232.474H245.533V69.2744H73.2676V232.474ZM209.263 200.729H109.529V173.529H209.263V200.729ZM118.59 105.537C128.604 105.537 136.722 113.655 136.723 123.67C136.723 133.685 128.605 141.804 118.59 141.804C108.575 141.804 100.456 133.685 100.456 123.67C100.456 113.655 108.575 105.537 118.59 105.537ZM200.212 105.537C210.226 105.537 218.344 113.655 218.345 123.67C218.345 133.685 210.227 141.804 200.212 141.804C190.197 141.804 182.078 133.685 182.078 123.67C182.078 113.655 190.197 105.537 200.212 105.537Z"
                  fill={currentColor}
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_416_41"
                  x="0.000781059"
                  y="0.000781059"
                  width="323.323"
                  height="273.473"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="4.9" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.890196 0 0 0 0 0.298039 0 0 0 0 0.364706 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_416_41"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_416_41"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        )}

        {/* Title — only shown when no robot icon */}
        {!showRobotIcon && (
          <h1 className="text-4xl md:text-5xl text-center" style={{ color: currentColor }}>
            {message}
          </h1>
        )}

        {/* Progress Bar */}
        <div
          className="w-full h-12 border-2 relative"
          style={{ borderColor: currentColor }}
        >
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              backgroundColor: currentColor,
            }}
          />
        </div>

        {/* Sub message */}
        <p className="text-white/70 text-sm md:text-base">{subMessage}</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-[#787878] text-xs">
        Made by: Malmö University Students
      </div>
      {showRobotIcon && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-30">
          <img src="/surfshark.png" alt="Surfshark" className="h-4 w-4 rounded-full object-cover" />
          <img src="/arduino.png" alt="Arduino" className="h-4 w-4 rounded-full object-cover" />
          <img src="/malmo-university.png" alt="Malmö University" className="h-4 w-4 rounded-full object-cover" />
          <span className="text-[#787878] text-xs">Surfshark × Arduino × Malmö University</span>
        </div>
      )}
    </div>
  );
};
