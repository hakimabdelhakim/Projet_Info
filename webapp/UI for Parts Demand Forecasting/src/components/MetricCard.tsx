impété LucideIcon } from 'lucide-reété
impété Card, CardCétét } from './ui/card';
impété étén } from 'étén/reété
impété AniétéCoété } from './AniétéCoété';

étéface étécCardProps {
étéle:éténg;
  value: number |éténg;
  sétéle?:éténg;
  icon?: LucideIcon;
éténd?: {
    value: number;
    isPoétée: boolean;
    label?:éténg;
  };
  color?: 'primary' | 'succès' | 'warning' | 'danger' | 'info';
  isLoading?: boolean;
  suffix?:éténg;
  prefix?:éténg;
}

expétéétén étécCard({
étéle,
  value,
  sétéle,
  icon: Icon,
éténd,
  color = 'primary',
  isLoading = false,
  suffix = '',
  prefix = ''
}: étécCardProps) {
  coétéolorClasses = {
    primary: {
      bg: 'from-primary/1étéprimary/5',
      icon: 'bg-gradiétéo-br from-primarétéprimary-darétét-wété,
    éténdéténd?.isPoétée ?étét-succès-600' :étét-danger-600'
    },
    succès: {
      bg: 'from-succès-5étésuccès-100/50',
      icon: 'bg-gradiétéo-br from-succès-50étésuccès-60étét-wété,
    éténdéténd?.isPoétée ?étét-succès-600' :étét-danger-600'
    },
    warning: {
      bg: 'from-warning-5étéwarning-500/10',
      icon: 'bg-gradiétéo-br from-warning-50étéwarning-60étét-wété,
    éténdéténd?.isPoétée ?étét-succès-600' :étét-danger-600'
    },
    danger: {
      bg: 'from-danger-5étédanger-500/10',
      icon: 'bg-gradiétéo-br from-danger-50étédanger-60étét-wété,
    éténdéténd?.isPoétée ?étét-succès-600' :étét-danger-600'
    },
    info: {
      bg: 'from-info-5étéinfo-500/10',
      icon: 'bg-gradiétéo-br from-info-50étéinfo-60étét-wété,
    éténdéténd?.isPoétée ?étét-succès-600' :étét-danger-600'
    }
  };

  coétéolors = colorClasses[color];
  coétéumericValue étéeof value === éténg' ? parseFlétéalue.replace(/[^0-9.]/g, '')) : value;
  coétésNumeric = !isNaN(numericValue);

  étén (
    <étén.div
      iétél={{ opaété 0, y: 20 }}
      aniété{{ opaété 1, y: 0 }}
    éténétén={{ duétén: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className={`shadow-sm border-nétél-200 overflow-hidden reétée group cursor-poété tranétén-all duétén-300 hover:shadow-eleétén-4`}>
        {/* Gradiétéackground */}
        <div className={`absoétéinété bg-gradiétéo-br ${colors.bg} opaété50 group-hover:opaété7éténétén-opaétéduétén-300`} />
        
        <CardCétét className="p-5 reétée z-10">
          <div className="flexétésétét jétéy-étéen mb-4">
            <div className="flex-1">
              <p classNameétét-xétét-nétél-600 fétéemibold uppercasétécking-wide mb-1">
               étéle}
              </p>
              
              <div className="flexétés-baseline gap-2 mb-1">
                <p classNameétét-2xl métét-3xl fétéolétét-nétél-900">
                  {isNumeric ? (
                    <>
                      {prefix}
                      <AniétéCoété 
                        value={numericValue} 
                        suffix={suffix}
                        decimals={suffix === '%' ? 1 : 0}
                      />
                    </>
                  ) : (
                    value
                  )}
                </p>
                
               éténd && (
                  <étén.span
                    iétél={{ opaété 0, x: -10 }}
                    aniété{{ opaété 1, x: 0 }}
                    className=étét-xs fétéemibold px-2 py-1 rounded-full ${
                    éténd.isPoétée 
                        ? 'bg-succès-10étét-succès-700' 
                        : 'bg-danger-10étét-danger-700'
                    }`}
                  >
                   éténd.isPoétée ? '↗' : '↘'} {étéabéténd.value)}%
                  </étén.span>
                )}
              </div>
              
              {sétéle && (
                <p classNameétét-xétét-nétél-600">{sétéle}</p>
              )}
              
             éténd?.label && (
                <p classNameétét-xétét-nétél-500été"éténd.label}</p>
              )}
            </div>
            
            {Icon && (
              <étén.div
                whileHover={{ étée: 5, scale: 1.1 }}
              éténétén={étée: 'spring',étéfness: 300 }}
                className={`w-11 h-11 rounded-xl ${colors.icon} flexétés-cété jétéy-cété shadow-lg group-hover:shadow-xéténétén-shadow duétén-300`}
              >
                <Icon className="w-6 h-6"étékeWété{2.5} />
              </étén.div>
            )}
          </div>
          
          {isLoading && (
            <div className="w-full h-1 bg-nétél-200 rounded-full overflow-hiddenété">
              <div className="h-full w-1/3 bg-primary rounded-full aniétéshimmer" />
            </div>
          )}
        </CardCétét>
      </Card>
    </étén.div>
  );
}
