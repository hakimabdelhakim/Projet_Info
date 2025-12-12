import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';

interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  isLoading?: boolean;
  suffix?: string;
  prefix?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
  isLoading = false,
  suffix = '',
  prefix = ''
}: MetricCardProps) {
  const colorClasses = {
    primary: {
      bg: 'from-primary/10 to-primary/5',
      icon: 'bg-gradient-to-br from-primary to-primary-dark text-white',
      trend: trend?.isPositive ? 'text-success-600' : 'text-danger-600'
    },
    success: {
      bg: 'from-success-50 to-success-100/50',
      icon: 'bg-gradient-to-br from-success-500 to-success-600 text-white',
      trend: trend?.isPositive ? 'text-success-600' : 'text-danger-600'
    },
    warning: {
      bg: 'from-warning-50 to-warning-500/10',
      icon: 'bg-gradient-to-br from-warning-500 to-warning-600 text-white',
      trend: trend?.isPositive ? 'text-success-600' : 'text-danger-600'
    },
    danger: {
      bg: 'from-danger-50 to-danger-500/10',
      icon: 'bg-gradient-to-br from-danger-500 to-danger-600 text-white',
      trend: trend?.isPositive ? 'text-success-600' : 'text-danger-600'
    },
    info: {
      bg: 'from-info-50 to-info-500/10',
      icon: 'bg-gradient-to-br from-info-500 to-info-600 text-white',
      trend: trend?.isPositive ? 'text-success-600' : 'text-danger-600'
    }
  };

  const colors = colorClasses[color];
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className={`shadow-sm border-neutral-200 overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-elevation-4`}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
        
        <CardContent className="p-5 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wide mb-1">
                {title}
              </p>
              
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                  {isNumeric ? (
                    <>
                      {prefix}
                      <AnimatedCounter 
                        value={numericValue} 
                        suffix={suffix}
                        decimals={suffix === '%' ? 1 : 0}
                      />
                    </>
                  ) : (
                    value
                  )}
                </p>
                
                {trend && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      trend.isPositive 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-danger-100 text-danger-700'
                    }`}
                  >
                    {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                  </motion.span>
                )}
              </div>
              
              {subtitle && (
                <p className="text-xs text-neutral-600">{subtitle}</p>
              )}
              
              {trend?.label && (
                <p className="text-xs text-neutral-500 mt-1">{trend.label}</p>
              )}
            </div>
            
            {Icon && (
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-11 h-11 rounded-xl ${colors.icon} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <Icon className="w-6 h-6" strokeWidth={2.5} />
              </motion.div>
            )}
          </div>
          
          {isLoading && (
            <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden mt-3">
              <div className="h-full w-1/3 bg-primary rounded-full animate-shimmer" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
