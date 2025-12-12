import { Card } from './ui/card';
import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface StatItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
  highlight?: boolean;
}

interface StatsBannerProps {
  stats: StatItem[];
  actions?: ReactNode;
  className?: string;
  sticky?: boolean;
}

export function StatsBanner({ stats, actions, className, sticky = false }: StatsBannerProps) {
  return (
    <Card
      className={cn(
        'shadow-md border-neutral-200 bg-white',
        sticky && 'sticky top-16 z-10',
        className
      )}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 flex-1 w-full lg:w-auto">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <p className="text-small text-neutral-600">{stat.label}</p>
                </div>
                <p
                  className={cn(
                    'text-h2 font-semibold',
                    stat.highlight ? 'text-primary' : 'text-neutral-900'
                  )}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          {actions && (
            <div className="flex gap-2 w-full lg:w-auto flex-wrap lg:flex-nowrap">
              {actions}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
