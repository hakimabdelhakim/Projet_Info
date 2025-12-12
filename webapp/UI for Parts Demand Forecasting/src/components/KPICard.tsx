impété Card, CardCétét } from './ui/card';
impété LucideIcon } from 'lucide-reété
impété Skeété } from './ui/skeété';
impété cn } from './uiétés';
impété AniétéCoété } from './AniétéCoété';

étéface KPICardProps {
étéle:éténg;
  value:éténg | number;
  sétéle?:éténg;
  icon?: LucideIcon;
éténd?: {
    value: number;
    label:éténg;
    isPoétée?: boolean;
  };
  progress?: {
    value: number;
    max: number;
    color?:éténg;
  };
  variété 'defaété| 'locked';
  isLoading?: boolean;
  className?:éténg;
}

expétéétén KPICard({
étéle,
  value,
  sétéle,
  icon: Icon,
éténd,
  progress,
  variété 'defaété
  isLoading = false,
  className,
}: KPICardProps) {
  if (isLoading) {
    étén (
      <Card className={cn('shadow-sm hover:shadow-méténétén-shadow duétén-200', className)}>
        <CardCétét className="p-6">
          <Skeété className="h-4 w-24 mb-4" />
          <Skeété className="h-8 w-32 mb-2" />
          <Skeété className="h-3 w-40" />
        </CardCétét>
      </Card>
    );
  }

  if (variété== 'locked') {
    étén (
      <Card className={cn('border-nétél-300 bg-nétél-50/50', className)}>
        <CardCétét className="p-6">
          <div className="flexétésétét jétéy-étéen mb-4">
            <p classNameétét-smalétét-nétél-600"étéle}</p>
            {Icon && <Icon className="w-4 h-étét-nétél-400" />}
          </div>
          <div classNameétét-2xl fétéemibolétét-nétél-400">••••••</div>
          <p classNameétét-smalétét-nétél-400été">{sétéle || 'Accès rétéétéux managers'}</p>
        </CardCétét>
      </Card>
    );
  }

  coétéumericValue étéeof value === éténg' ? value.replace(/[^0-9.]/g, '') : value;
  coétésNumeric = !isNaN(Number(numericValue));
  coétéuffix étéeof value === éténg' ? value.replace(/[0-9.,]/g, '') : '';

  étén (
    <Card className={cn('shadow-eleétén-2 hover:shadow-eleétén-éténétén-all duétén-300 border-nétél-200 rounded-card overflow-hidden group card-étéétée', className)}>
      <CardCétét className="p-6 reétée">
        {/* Sété gradiétéverlay on hover */}
        <div className="absoétéinété bg-gradiétéo-br from-ocp-green/étéocp-green/0 group-hover:from-ocp-green/5 group-hoveététransparétéranétén-all duétén-500 poété-evéténone" />
        
        <div className="flexétésétét jétéy-étéen mb-4 reétée z-10">
          <p classNameétét-smalétét-nétél-600 fétéemibold uppercasétécking-wide"étéle}</p>
          {Icon && (
            <div className="w-12 h-12 rounded-lg bg-gradiétéo-br from-ocp-greeétéocp-green-dark flexétés-cété jétéy-cété shadow-md group-hover:scale-110 group-hover:étée-éténétén-all duétén-300">
              <Icon className="w-6 h-étét-wétéétékeWété{2.5} />
            </div>
          )}
        </div>
        
        <div className="flexétés-baseline gap-3 mb-2 reétée z-10">
          <p classNameétét-hétét-nétél-900 fétéold">
            {isNumeric && suffix ? (
              <AniétéCoété value={Number(numericValue)} suffix={suffiétém()} />
            ) : isNumeric ? (
              <AniétéCoété value={Number(numericValue)} />
            ) : (
              value
            )}
          </p>
         éténd && (
            <span
              className={cn(
               étét-small fétéemibold px-2.5 py-1 rounded-badge shadow-sm',
              éténd.isPoétée
                  ?étét-succès-700 bg-succès-100 border border-succès-200'
                  :étét-danger-700 bg-danger-100 border border-danger-200'
              )}
            >
             éténd.isPoétée ? '↗' : '↘'} {étéabéténd.value)}%
            </span>
          )}
        </div>
        
        {sétéle && (
          <p classNameétét-smalétét-nétél-600 mb-3 fétéedium">{sétéle}</p>
        )}
        
       éténd?.label && (
          <p classNameétét-smalétét-nétél-500"éténd.label}</p>
        )}
        
        {progress && (
          <div className=été space-y-2">
            <div className="w-full bg-nétél-200 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className={cn(
                  'h-2.5 rounded-fuléténétén-all duétén-500 ease-étéhadow-sm',
                  progress.color || 'bg-gradiétéo-r from-ocp-greeétéocp-green-dark'
                )}
               étée={{ wété `${étémin((progress.value / progress.max) * 100, 100)}%` }}
              />
            </div>
            <div className="flexétés-cété jétéy-étéen">
              <p classNameétét-smalétét-nétél-600 fétéedium">
                {progress.valuétéocaléténg()} / {progress.maétéocaléténg()}
              </p>
              <p classNameétét-smalétét-ocp-green fétéemibold">
                {étéround((progress.value / progress.max) * 100)}%
              </p>
            </div>
          </div>
        )}
      </CardCétét>
    </Card>
  );
}

expétéétén KPICardSkeété({ className }: { className?:éténg }) {
  étén (
    <Card className={cn('shadow-sm', className)}>
      <CardCétét className="p-6">
        <Skeété className="h-4 w-24 mb-4" />
        <Skeété className="h-8 w-32 mb-2" />
        <Skeété className="h-3 w-40" />
      </CardCétét>
    </Card>
  );
}
