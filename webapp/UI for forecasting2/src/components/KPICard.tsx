import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { cn } from './ui/utils';
import { AnimatedCounter } from './AnimatedCounter';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  progress?: {
    value: number;
    max: number;
    color?: string;
  };
  variant?: 'default' | 'locked';
  isLoading?: boolean;
  className?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  progress,
  variant = 'default',
  isLoading = false,
  className,
}: KPICardProps) {
  if (isLoading) {
    return (
      <Card className={cn('shadow-sm hover:shadow-md transition-shadow duration-200', className)}>
        <CardContent className="p-6">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-40" />
        </CardContent>
      </Card>
    );
  }

  if (variant === 'locked') {
    return (
      <Card className={cn('border-neutral-300 bg-neutral-50/50', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <p className="text-small text-neutral-600">{title}</p>
            {Icon && <Icon className="w-4 h-4 text-neutral-400" />}
          </div>
          <div className="text-2xl font-semibold text-neutral-400">••••••</div>
          <p className="text-small text-neutral-400 mt-2">{subtitle || 'Accès restreint aux managers'}</p>
        </CardContent>
      </Card>
    );
  }

  const numericValue = typeof value === 'string' ? value.replace(/[^0-9.]/g, '') : value;
  const isNumeric = !isNaN(Number(numericValue));
  const suffix = typeof value === 'string' ? value.replace(/[0-9.,]/g, '') : '';

  return (
    <Card className={cn('shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300 border-neutral-200 rounded-card overflow-hidden group card-interactive', className)}>
      <CardContent className="p-6 relative">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocp-green/0 to-ocp-green/0 group-hover:from-ocp-green/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
        
        <div className="flex items-start justify-between mb-4 relative z-10">
          <p className="text-small text-neutral-600 font-semibold uppercase tracking-wide">{title}</p>
          {Icon && (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ocp-green to-ocp-green-dark flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-3 mb-2 relative z-10">
          <p className="text-h1 text-neutral-900 font-bold">
            {isNumeric && suffix ? (
              <AnimatedCounter value={Number(numericValue)} suffix={suffix.trim()} />
            ) : isNumeric ? (
              <AnimatedCounter value={Number(numericValue)} />
            ) : (
              value
            )}
          </p>
          {trend && (
            <span
              className={cn(
                'text-small font-semibold px-2.5 py-1 rounded-badge shadow-sm',
                trend.isPositive
                  ? 'text-success-700 bg-success-100 border border-success-200'
                  : 'text-danger-700 bg-danger-100 border border-danger-200'
              )}
            >
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        
        {subtitle && (
          <p className="text-small text-neutral-600 mb-3 font-medium">{subtitle}</p>
        )}
        
        {trend?.label && (
          <p className="text-small text-neutral-500">{trend.label}</p>
        )}
        
        {progress && (
          <div className="mt-4 space-y-2">
            <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className={cn(
                  'h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm',
                  progress.color || 'bg-gradient-to-r from-ocp-green to-ocp-green-dark'
                )}
                style={{ width: `${Math.min((progress.value / progress.max) * 100, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-small text-neutral-600 font-medium">
                {progress.value.toLocaleString()} / {progress.max.toLocaleString()}
              </p>
              <p className="text-small text-ocp-green font-semibold">
                {Math.round((progress.value / progress.max) * 100)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KPICardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardContent className="p-6">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  );
}
