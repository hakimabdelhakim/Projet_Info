import { Loader2 } from 'lucide-react';

export function SpinnerLoader({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 className={`animate-spin text-primary ${sizeClasses[size]} ${className}`} />
  );
}

export function DotsLoader() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export function PulseLoader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 rounded"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export function ProgressBar({ progress, showLabel = true }: { progress: number, showLabel?: boolean }) {
  return (
    <div className="w-full space-y-2">
      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-ocp-green to-ocp-green-dark transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="h-full w-full animate-shimmer" />
        </div>
      </div>
      {showLabel && (
        <p className="text-xs text-neutral-600 text-right font-medium">{progress}%</p>
      )}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neutral-200 rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-neutral-600 font-medium">Chargement...</p>
      </div>
    </div>
  );
}
