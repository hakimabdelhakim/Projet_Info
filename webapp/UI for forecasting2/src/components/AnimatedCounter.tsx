import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({ 
  value, 
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Parse the value if it's a string with commas
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/,/g, ''))
    : value;

  useEffect(() => {
    if (isNaN(numericValue)) {
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(numericValue * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [numericValue, duration]);

  const formattedValue = displayValue.toFixed(decimals);
  const withCommas = Number(formattedValue).toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return (
    <span className="tabular-nums">
      {prefix}{withCommas}{suffix}
    </span>
  );
}
