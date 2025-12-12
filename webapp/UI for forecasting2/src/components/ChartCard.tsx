import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { cn } from './ui/utils';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  isLoading?: boolean;
  action?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  description,
  children,
  isLoading = false,
  action,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card className={cn('shadow-sm border-neutral-200', className)}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-h3">{title}</CardTitle>
          {description && (
            <CardDescription className="text-small text-neutral-500">
              {description}
            </CardDescription>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </CardHeader>
      <CardContent className={cn(contentClassName)}>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[250px] w-full" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
