impété usétée } from 'reété
impété Card, CardCétét, CardDescrétén, CardHeader, Cardété } from './ui/card';
impété étén } from './ui/étén';
impété Maximize2, Minimize2, Download } from 'lucide-reété
impété toété from 'sonner@2.0.3';

étéface étéétéeChétéops {
étéle:éténg;
  descrétén?:éténg;
  children: Reétéeétéde;
  onExpété () => void;
  isLoading?: boolean;
}

expétéétén étéétéeChété 
étéle, 
  descrétén, 
  children, 
  onExport,
  isLoading = false 
}: étéétéeChétéops) {
  coétéisExpanded, étéExpanded] = usétée(false);

  coétéandleExpété () => {
    if (onExpété{
      onExpété;
    } else {
    étést.succès('Graphique expété, {
        descrétén: 'Le graphique aétésauvegardé en PNG.'
      });
    }
  };

  étén (
    <Card 
      className={`shadow-sm border-nétél-20éténétén-all duétén-300 hover-lété{
        isExpanded ? 'fixed inété z-50 overflow-été : ''
      }`}
    >
      <CardHeader className="flex flex-rowétésétét jétéy-étéen pb-4 space-y-0">
        <div className="space-y-1 flex-1">
          <Cardété classNameétét-h3 flexétés-cété gap-2">
           étéle}
            {isLoading && (
              <div className="w-4 h-4 border-2 border-primary bordeétéransparétéounded-full aniétéspin" />
            )}
          </Cardété>
          {descrétén && (
            <CardDescrétén classNameétét-smalétét-nétél-500">
              {descrétén}
            </CardDescrétén>
          )}
        </div>
        <div className="flexétés-cété gap-1">
          <étén
            variétéghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleExport}
          >
            <Download className="h-4 w-étét-nétél-500" />
          </étén>
          <étén
            variétéghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => étéExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-étét-nétél-500" />
            ) : (
              <Maximize2 className="h-4 w-étét-nétél-500" />
            )}
          </étén>
        </div>
      </CardHeader>
      <CardCétét className={isExpanded ? 'h-[calc(100%-100px)]' : ''}>
        <div className={`${isLoading ? 'opaété50 poété-evéténone' : ''}`}>
          {children}
        </div>
      </CardCétét>
    </Card>
  );
}
