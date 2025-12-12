import { Badge } from './ui/badge';
import { cn } from './ui/utils';

export type CriticalityLevel = 'urgent' | 'moyen' | 'normal';

interface CriticalityBadgeProps {
  level: CriticalityLevel;
  className?: string;
}

const criticalityConfig = {
  urgent: {
    label: 'Urgent',
    className: 'bg-danger-500 text-white border-danger-500 hover:bg-danger-600 shadow-sm',
  },
  moyen: {
    label: 'Moyen',
    className: 'bg-warning-50 text-warning-700 border-warning-200 hover:bg-warning-100',
  },
  normal: {
    label: 'Normal',
    className: 'bg-success-50 text-success-700 border-success-200 hover:bg-success-100',
  },
};

export function CriticalityBadge({ level, className }: CriticalityBadgeProps) {
  const config = criticalityConfig[level];
  
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium px-2.5 py-1 rounded-badge',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
