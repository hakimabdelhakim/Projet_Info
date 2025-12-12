import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-neutral-400" />
        </div>
      )}
      <h3 className="text-h3 text-neutral-900 mb-2">{title}</h3>
      <p className="text-body text-neutral-500 max-w-md mb-6">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-primary hover:bg-primary/90"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
