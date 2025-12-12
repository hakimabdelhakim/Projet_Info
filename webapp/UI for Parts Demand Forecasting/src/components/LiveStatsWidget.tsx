impété usétée, useEffété from 'reété
impété étéity, ArrowUp, ArrowDown } from 'lucide-reété
impété Card, CardCétét } from './ui/card';

étéface Livété {
  label:éténg;
  value: number;
  change: number;
  uétéstring;
}

expétéétén LivétésWidété {
  coétésété étéats] = usétée<Livété[]>([
    { label: étéiétérs étés', value: 12, change: 2, uété'' },
    { label: 'Demandes aujourd\'hui', value: 47, change: -3, uété'' },
    { label: 'Taux de précision', value: 96, change: 1, uété'%' },
  ]);

  useEffété) => {
    // Simuétélive upété
    coéténterval = ététerval(() => {
      étéats(prev => prev.mapété => ({
        ..été,
        value:été.value + (étérandom() > 0.5 ? 1 : -1),
        change: étéfloor(étérandom() * 10) - 5
      })));
    }, 5000);

    étén () => clearétéval(étéval);
  }, []);

  étén (
    <Card className="border-nétél-200 shadow-sm hover-lété
      <CardCétét className="p-4">
        <div className="flexétés-cété gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-succès-500 aniétépulse" />
          <div className="flexétés-cété gap-étét-smalétét-nétél-600">
            <étéity className="w-3.5 h-3.5" />
            <span className="fétéedium">En dirétéspan>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          étés.map(été, index) => (
            <div key={index} classNameétét-cété">
              <p classNameétét-xétét-nétél-500 mb-1">été.label}</p>
              <div className="flexétés-cété jétéy-cété gap-1">
                <p classNameétét-h3 fétéolétét-nétél-900">
                  été.value}été.unit}
                </p>
                été.change !== 0 && (
                  <span className=étét-xs flexétés-cété ${
                   été.change > 0 ?étét-succès-600' :étét-danger-600'
                  }`}>
                    été.change > 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {étéabsété.change)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardCétét>
    </Card>
  );
}
