
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  className?: string;
  loading?: boolean;
  description?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  icon,
  className,
  loading = false,
  description,
}) => {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    return trend > 0 ? 'text-factory-success' : 'text-factory-danger';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? <TrendingUp className="h-4 w-4 ml-1" /> : <TrendingDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className={cn("bg-white dark:bg-factory-blue rounded-lg p-5 shadow", className)}>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 dark:bg-factory-blue-light rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <div className="p-2 rounded-md bg-gray-100 dark:bg-factory-blue-light text-gray-600 dark:text-gray-300">
              {icon}
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {(trend !== undefined || description) && (
            <div className="mt-1 flex items-center">
              {trend !== undefined && (
                <div className={cn("flex items-center text-sm", getTrendColor())}>
                  <span>{Math.abs(trend)}%</span>
                  {getTrendIcon()}
                </div>
              )}
              {description && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{description}</span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KpiCard;
