import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { motion } from 'motion/react';

interface DataPoint {
  time: string;
  value: number;
}

interface RealTimeChartProps {
  title: string;
  description?: string;
  maxDataPoints?: number;
  updateInterval?: number;
  chartType?: 'line' | 'area';
}

export function RealTimeChart({
  title,
  description,
  maxDataPoints = 20,
  updateInterval = 3000,
  chartType = 'area'
}: RealTimeChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Initialize with some data
    const initialData: DataPoint[] = [];
    const now = new Date();
    for (let i = maxDataPoints - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * updateInterval);
      initialData.push({
        time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        value: Math.floor(Math.random() * 50) + 50
      });
    }
    setData(initialData);

    // Update data periodically
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          value: Math.floor(Math.random() * 50) + 50
        });
        // Keep only the last maxDataPoints
        if (newData.length > maxDataPoints) {
          newData.shift();
        }
        return newData;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [maxDataPoints, updateInterval]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-neutral-200 rounded-lg p-3 shadow-elevation-4"
        >
          <p className="text-small text-neutral-600">{payload[0].payload.time}</p>
          <p className="text-h3 font-bold text-primary">{payload[0].value}</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm border-neutral-200 hover-lift">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-h3 flex items-center gap-2">
              {title}
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                <span className="text-xs text-success-600 font-medium">En direct</span>
              </span>
            </CardTitle>
            {description && (
              <CardDescription className="text-small mt-1">{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6BA539" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6BA539" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAED" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6BA539"
                strokeWidth={2}
                fill="url(#colorValue)"
                animationDuration={300}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAED" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6BA539"
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
