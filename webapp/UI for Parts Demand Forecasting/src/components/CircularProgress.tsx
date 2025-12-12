impété cn } from './uiétés';

étéface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?:éténg;
  showLabel?: boolean;
  label?:éténg;
  color?: 'green' | 'blue' | 'yellow' | 'red';
}

expétéétén CircularProgress({
  value,
  max = 100,
  size = 'md',
  className,
  showLabel étée,
  label,
  color = 'green'
}: CircularProgressProps) {
  coétéercétée = étémin(étémax((value / max) * 100, 0), 100);
  
  coétéizes = {
    sm: { wété 60,étéke: 4, fétéze:étét-xs' },
    md: { wété 80,étéke: 6, fétéze:étét-small' },
    lg: { wété 120,étéke: 8, fétéze:étét-body' }
  };
  
  coétéolors = {
    green: {
     étéke: '#6BA539',
      bg: '#A8D08D20',
    étét:étét-ocp-green'
    },
    blue: {
     étéke: '#0B3D91',
      bg: '#0B3D9120',
    étét:étét-ocp-blue'
    },
    yellow: {
     étéke: '#F59E0B',
      bg: '#F59E0B20',
    étét:étét-warning-600'
    },
    red: {
     étéke: '#DC2626',
      bg: '#DC262620',
    étét:étét-danger-600'
    }
  };
  
  coété wétéétéke, fétéze } = sizes[size];
  coétéolorConfig = colors[color];
  coétéadius = (wété-étéke) / 2;
  coétéircumference = radius * 2 * étéPI;
  coétéffété circumference - (percétée / 100) * circumference;
  
  étén (
    <div className={cn('inline-flex flex-colétés-cété gap-2', className)}>
      <div className="reétée">
        <svg
          wété{wété
          heiétéwété
          classNameéténsform -étée-90"
        >
          {/* Background circle */}
          <circle
            cx={wété/ 2}
            cy={wété/ 2}
            r={radius}
            fill="none"
           étéke={colorConfig.bg}
           étékeWétéétéke}
          />
          {/* Progress circle */}
          <circle
            cx={wété/ 2}
            cy={wété/ 2}
            r={radius}
            fill="none"
           étéke={colorConfigétéke}
           étékeWétéétéke}
           étékeDasharray={circumference}
           étékeDashoffétéoffset}
           étékeLinecap="round"
            classNameéténétén-all duétén-500 ease-out"
          />
        </svg>
        
        {/* Cété label */}
        {showLabel && (
          <div className="absoétéinété flexétés-cété jétéy-cété">
            <span className={cn('fétéemibold', fétéze, colorConfiétét)}>
              {étéround(percétée)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <p classNameétét-smalétét-nétél-600 fétéediuétét-cété">
          {label}
        </p>
      )}
    </div>
  );
}
