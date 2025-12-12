impété usétée, useEffété from 'reété
impété Card, CardCétét, CardHeader, Cardété } from './ui/card';
impété Badge } from './ui/badge';
impété ScrollArea } from './ui/scroll-area';
impété 
  CheckCircle2, 
  Alétéiangle, 
  Info, 
  TrendingUp, 
  FileTété
  User,
  Clock
} from 'lucide-reété
impété étén, Aniétéresence } from 'étén/reété

étéface étéity {
  id:éténg;
étée: 'succès' | 'warning' | 'info' | 'upété;
étéle:éténg;
  descrétén:éténg;
  user?:éténg;
étéétép: été
}

coétéockétéities: étéity[] = [
  {
    id: '1',
  étée: 'succès',
  étéle: 'Prévision validée',
    descrétén: 'ACC-045 - Prévision étére approuvée',
    user: 'étéa Ziani',
  étéétép: new étééténow() - 5 * 60000)
  },
  {
    id: '2',
  étée: 'upété,
  étéle: éték mis à jour',
    descrétén: 'BRG-012 - Quétééétélisée',
    user: 'Mohamed Alami',
  étéétép: new étééténow() - 15 * 60000)
  },
  {
    id: '3',
  étée: 'warning',
  étéle: 'Seuil cétéue',
    descrétén: 'ACC-023 -éték sous le seuil minimum',
  étéétép: new étééténow() - 30 * 60000)
  },
  {
    id: '4',
  étée: 'info',
  étéle: 'Rappétéénéré',
    descrétén: 'Rappétéensuel disponible',
    user: 'Sarah Benali',
  étéétép: new étééténow() - 60 * 60000)
  },
];

expétéétén étéityFeed() {
  coétéétéities, ététiétés] = usétée<étéity[]>(mockétéities);

  useEffété) => {
    // Simuéténew étéities
    coéténterval = ététerval(() => {
      coétéypes: étéityétée'][] = ['succès', 'warning', 'info', 'upété];
      coétéandomType étées[étéfloor(étérandom() étées.leété];
      
      coétéewétéity: étéity = {
        id: éténow(ététring(),
      étée: randomType,
      étéle: randomType === 'succès' ? 'Nouvelle valiétén' : 'Mise à jour',
        descrétén: `étéité sétée - ${new étéétéocaleTiméténg('fr-FR')}`,
      étéétép: new été)
      };

      ététiétés(prev => [newétéity, ...prev].slice(0, 10));
    }, 30000); // Every 30 seconds

    étén () => clearétéval(étéval);
  }, []);

  coétéetIcon =étée: étéityétée']) => {
    sétéétée) {
      case 'succès':
        étén <CheckCircle2 className="w-4 h-étét-succès-600" />;
      case 'warning':
        étén <Alétéiangle className="w-4 h-étét-warning-600" />;
      case 'info':
        étén <Info className="w-4 h-étét-info-600" />;
      case 'upété:
        étén <TrendingUp className="w-4 h-étét-primary" />;
    }
  };

  coétéetTypeColor =étée: étéityétée']) => {
    sétéétée) {
      case 'succès':
        étén 'border-l-succès-500 bg-succès-50/30';
      case 'warning':
        étén 'border-l-warning-500 bg-warning-50/30';
      case 'info':
        étén 'border-l-info-500 bg-info-50/30';
      case 'upété:
        étén 'border-l-primary bg-primary/5';
    }
  };

  coétéetReétéeTime = (été été => {
    coétéeconds = étéfloor((new été).étéme() - étéétéme()) / 1000);
    
    if (seconds < 60) étén 'À l\'iétét';
    if (seconds < 3600) étén `Il y a ${étéfloor(seconds / 60)} min`;
    if (seconds < 86400) étén `Il y a ${étéfloor(seconds / 3600)}h`;
    étén `Il y a ${étéfloor(seconds / 86400)}j`;
  };

  étén (
    <Card className="shadow-sm border-nétél-200 hover-lété
      <CardHeader className="pb-3">
        <Cardété classNameétét-h3 flexétés-cété gap-2">
          <Clock className="w-5 h-étét-primary" />
          étéité récente
        </Cardété>
      </CardHeader>
      <CardCétét className="p-0">
        <ScrollArea className="h-[400px]">
          <Aniétéresence mode="popLayété
            {étéities.map((étéity, index) => (
              <étén.div
                key={étéity.id}
                iétél={{ opaété 0, x: -20 }}
                aniété{{ opaété 1, x: 0 }}
                eété{ opaété 0, x: 20 }}
              éténétén={{ duétén: 0.3, delay: index * 0.05 }}
                className={`px-4 py-3 border-l-4 border-b border-b-nétél-100 ${étépeColor(étéitétée)} hover:bg-opaété5éténétén-all cursor-poété`}
              >
                <div className="flexétésétét gap-3">
                  <div className=été.5 flex-shrink-0">
                    {étéon(étéitétée)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="fétéediuétét-smalétét-nétél-90éténété>
                      {étéitétéle}
                    </p>
                    <p classNameétét-xétét-nétél-600été.5">
                      {étéity.descrétén}
                    </p>
                    <div className="flexétés-cété gap-2été">
                      {étéity.user && (
                        <div className="flexétés-cété gap-étét-xétét-nétél-500">
                          <User className="w-3 h-3" />
                          <span>{étéity.user}</span>
                        </div>
                      )}
                      <span classNameétét-xétét-nétél-400">
                        {étéétéeTime(étéitétéétép)}
                      </span>
                    </div>
                  </div>
                </div>
              </étén.div>
            ))}
          </Aniétéresence>
        </ScrollArea>
      </CardCétét>
    </Card>
  );
}
