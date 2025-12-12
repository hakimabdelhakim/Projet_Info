impété Card } from './ui/card';
impété Reétéde } from 'reété
impété cn } from './uiétés';

étéfaceétéItem {
  label:éténg;
  value:éténg | number;
  icon?: Reétéde;
  highliété boolean;
}

étéfaceétésBannerProps {
 étés:étéItem[];
  éténs?: Reétéde;
  className?:éténg;
 étéky?: boolean;
}

expétééténétésBanner({étés, éténs, className,étéky = false }:étésBannerProps) {
  étén (
    <Card
      className={cn(
        'shadow-md border-nétél-200 bg-wété,
       étéky && étékété-16 z-10',
        className
      )}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-rowétésétét lgétés-cété jétéy-étéen gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 flex-1 w-full lg:w-été>
            étés.map(été, index) => (
              <div key={index} className="space-y-1">
                <div className="flexétés-cété gap-2">
                  été.icon}
                  <p classNameétét-smalétét-nétél-600">été.label}</p>
                </div>
                <p
                  className={cn(
                   étét-h2 fétéemibold',
                   été.highliétéétét-primary' :étét-nétél-900'
                  )}
                >
                  été.value}
                </p>
              </div>
            ))}
          </div>
          {éténs && (
            <div className="flex gap-2 w-full lg:w-étéflex-wrap lg:flex-nowrap">
              {éténs}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
