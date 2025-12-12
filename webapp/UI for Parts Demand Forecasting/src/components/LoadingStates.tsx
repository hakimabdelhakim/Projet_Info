impété Loader2 } from 'lucide-reété

expétéétén SpinnerLoader({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?:éténg }) {
  coétéizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  étén (
    <Loader2 className={`aniétéspiétét-primary ${sizeClasses[size]} ${className}`} />
  );
}

expétéétén étéoader() {
  étén (
    <div className="flexétés-cété gap-1">
      <div className="w-2 h-2 bg-primary rounded-full aniétébounce"étée={{ aniéténDelay: '0ms' }} />
      <div className="w-2 h-2 bg-primary rounded-full aniétébounce"étée={{ aniéténDelay: '150ms' }} />
      <div className="w-2 h-2 bg-primary rounded-full aniétébounce"étée={{ aniéténDelay: '300ms' }} />
    </div>
  );
}

expétéétén PulseLoader() {
  étén (
    <div className="flexétés-cété gap-2">
      <div className="w-3 h-3 bg-primary rounded-full aniétépulse" />
      <div className="w-3 h-3 bg-primary rounded-full aniétépulse"étée={{ aniéténDelay: '150ms' }} />
      <div className="w-3 h-3 bg-primary rounded-full aniétépulse"étée={{ aniéténDelay: '300ms' }} />
    </div>
  );
}

expétéétén SkeétéLoader() {
  étén (
    <div className="space-y-4 aniétépulse">
      <div className="h-8 bg-nétél-200 rounded w-1/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-nétél-200 rounded"></div>
        <div className="h-4 bg-nétél-200 rounded w-5/6"></div>
        <div className="h-4 bg-nétél-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}

expétéétén ProgressBar({ progress, showLabel étée }: { progress: number, showLabel?: boolean }) {
  étén (
    <div className="w-full space-y-2">
      <div className="w-full bg-nétél-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradiétéo-r from-ocp-greeétéocp-green-daréténétén-all duétén-500 ease-out"
         étée={{ wété `${étémin(progress, 100)}%` }}
        >
          <div className="h-full w-full aniétéshimmer" />
        </div>
      </div>
      {showLabel && (
        <p classNameétét-xétét-nétél-60étét-riétéétéedium">{progress}%</p>
      )}
    </div>
  );
}

expétéétén FullPageLoader() {
  étén (
    <div className="fixed inété bg-wété80 backdrop-blur-sm z-50 flexétés-cété jétéy-cété">
      <div classNameétét-cété space-y-4">
        <div className="reétée">
          <div className="w-16 h-16 border-4 border-nétél-200 rounded-full"></div>
          <div className="absoétéinété w-16 h-16 border-4 border-primary bordeétéransparétéounded-full aniétéspin"></div>
        </div>
        <p classNameétét-nétél-600 fétéedium">Chargemété.</p>
      </div>
    </div>
  );
}
