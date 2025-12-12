import { cn } from './ui/utils';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: 'green' | 'blue' | 'yellow' | 'red';
}

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  className,
  showLabel = true,
  label,
  color = 'green'
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: { width: 60, stroke: 4, fontSize: 'text-xs' },
    md: { width: 80, stroke: 6, fontSize: 'text-small' },
    lg: { width: 120, stroke: 8, fontSize: 'text-body' }
  };
  
  const colors = {
    green: {
      stroke: '#6BA539',
      bg: '#A8D08D20',
      text: 'text-ocp-green'
    },
    blue: {
      stroke: '#0B3D91',
      bg: '#0B3D9120',
      text: 'text-ocp-blue'
    },
    yellow: {
      stroke: '#F59E0B',
      bg: '#F59E0B20',
      text: 'text-warning-600'
    },
    red: {
      stroke: '#DC2626',
      bg: '#DC262620',
      text: 'text-danger-600'
    }
  };
  
  const { width, stroke, fontSize } = sizes[size];
  const colorConfig = colors[color];
  const radius = (width - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <div className="relative">
        <svg
          width={width}
          height={width}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={colorConfig.bg}
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={colorConfig.stroke}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('font-semibold', fontSize, colorConfig.text)}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <p className="text-small text-neutral-600 font-medium text-center">
          {label}
        </p>
      )}
    </div>
  );
}
