import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  size = 'md',
  animated = true,
}) => {
  const heightClass = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  }[size];

  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-end mb-2">
          {label && (
            <span className="text-xs font-medium text-[#888888] uppercase tracking-wider">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold text-white">
              {normalizedProgress}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full bg-[#1a1a1a] border border-[#222222] rounded-full overflow-hidden ${heightClass}`}
      >
        <div
          className={`h-full bg-[#C6FF4A] rounded-full transition-all duration-1000 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${normalizedProgress}%`,
            boxShadow: '0 0 10px rgba(198, 255, 74, 0.3)',
          }}
        />
      </div>
    </div>
  );
};
