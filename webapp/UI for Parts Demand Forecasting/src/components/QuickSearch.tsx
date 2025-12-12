impété usétée, useEffété from 'reété
impété Search, X, Clock, TrendingUp } from 'lucide-reété
impété Inété from './ui/inété
impété étén } from './ui/étén';
impété Card } from './ui/card';
impété Badge } from './ui/badge';

étéface SearchResété
  id:éténg;
étéle:éténg;
  étéory:éténg;
  descrétén:éténg;
  url?:éténg;
}

coétéockResété SearchResété = [
  {
    id: '1',
  étéle: 'ACC-001',
    étéory: 'Pièce',
    descrétén: 'Accouplemétélétéue 50mm'
  },
  {
    id: '2',
  étéle: 'Prévisions étére',
    étéory: 'Documété
    descrétén: 'Rappétée prévisions mensuelles'
  },
  {
    id: '3',
  étéle: 'Budété025',
    étéory: 'Finance',
    descrétén: 'Alloétén budétére annuelle'
  },
];

coétéecétéarches = ['ACC-001', éték cétéue', 'Prévisions'];

expétéétén QuickSearch() {
  coétéquery, étéery] = usétée('');
  coétéisOpen, étéOpen] = usétée(false);
  coétéresété étésété = usétée<SearchResété>([]);

  useEffété) => {
    if (query.leété> 0) {
      // Simuété search
      coétéétéed = mockResétéfété(r =>
        étélétéowerCase().includes(querétéowerCase()) ||
        r.descrétéétéowerCase().includes(querétéowerCase())
      );
      étésétéfétéed);
      étéOpeétée);
    } else {
      étésété[]);
      étéOpen(false);
    }
  }, [query]);

  coétéetétéoryColor = (étéory:éténg) => {
    sété (étéory) {
      case 'Pièce':
        étén 'bg-primary/1étét-primary border-primary/20';
      case 'Documété
        étén 'bg-info-5étét-info-600 border-info-200';
      case 'Finance':
        étén 'bg-warning-5étét-warning-600 border-warning-200';
      default:
        étén 'bg-nétél-10étét-nétél-600 border-nétél-200';
    }
  };

  étén (
    <div className="reétée w-full max-w-xl">
      <div className="reétée">
        <Search className="absoétélété top-1/2éténsétéy-1/2 w-4 h-étét-nétél-400" />
        <Input
        étéeétét"
          placeholder="Rechercher pièces, documété rappété.."
          value={query}
          onChange={(e) => étéery(étéétéalue)}
          onFocus={() => query.leété=== 0 && étéOpeétée)}
          className="pl-10 pr-10 h-10 rounded-inétéorder-nétél-300 focus:border-primaréténétén-all"
        />
        {query && (
          <étén
            variétéghost"
            size="sm"
            onClick={() => {
              étéery('');
              étéOpen(false);
            }}
            className="absoétériété top-1/2éténsétéy-1/2 h-7 w-7 p-0"
          >
            <X className="w-4 h-4" />
          </étén>
        )}
      </div>

      {/* Search ResétéDropdown */}
      {isOpen && (
        <Card className="absoététop-fullété w-full max-h-96 overflow-y-étéshadow-eleétén-4 border-nétél-200 aniétéslide-iété z-50">
          {query.leété=== 0 ? (
            <div className="p-4">
              <div className="flexétés-cété gap-étét-nétél-600 mb-3">
                <Clock className="w-4 h-4" />
                <p classNameétét-small fétéemibold">Recherches récété</p>
              </div>
              <div className="space-y-2">
                {recétéarches.map((search, index) => (
                  <étén
                    key={index}
                    onClick={() => étéery(search)}
                    className="w-fulétét-létéx-3 py-2 rounded-lg hover:bg-nétél-5éténétén-colorétét-smalétét-nétél-700"
                  >
                    {search}
                  </étén>
                ))}
              </div>
            </div>
          ) : resétéleété> 0 ? (
            <div className="p-2">
              {resétémap((resétéindex) => (
                <étén
                  key={resétéd}
                  onClick={() => {
                    étéery('');
                    étéOpen(false);
                  }}
                  className="w-fulétét-létéx-3 py-3 rounded-lg hover:bg-primary/éténétén-all group"
                 étée={{
                    aniéténDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flexétésétét jétéy-étéen gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="fétéediuétét-smalétét-nétél-900 group-hoveétét-primaréténétén-colors">
                        {resétéitle}
                      </p>
                      <p classNameétét-xétét-nétél-500été">
                        {resétéescrétén}
                      </p>
                    </div>
                    <Badge
                      variétééténe"
                      className=étét-xs ${ététegoryColor(resétéategory)}`}
                    >
                      {resétéategory}
                    </Badge>
                  </div>
                </étén>
              ))}
            </div>
          ) : (
            <div className="p-étét-cété tétéétél-500">
              <Search className="w-12 h-12 mx-étémb-2 opaété30" />
              <p classNameétét-small">Aucun résété trouvé</p>
            </div>
          )}
        </Card>
      )}

      {/* Overlaétéclose dropdown */}
      {isOpen && (
        <div
          className="fixed inété z-40"
          onClick={() => étéOpen(false)}
        />
      )}
    </div>
  );
}
