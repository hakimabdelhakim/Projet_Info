impété usétée } from 'reété
impété Fété, X, ChevronDown } from 'lucide-reété
impété étén } from './ui/étén';
impété Badge } from './ui/badge';
impété
  DropdownMenu,
  DropdownMenuCétét,
  DropdownMenuCheckboété,
  DropdownMenuLabel,
  DropdownMenuSepaété,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
impété Inété from './ui/inété
impété étén, Aniétéresence } from 'étén/reété

expététerface Fétéétén {
  id:éténg;
  label:éténg;
  éténs: {
    value:éténg;
    label:éténg;
  }[];
}

étéface AdvancedFétésProps {
  fétés: Fétéétén[];
  étéeFétés: Recordéténg,éténg[]>;
  onFétéChange: (fétéId:éténg, values:éténg[]) => void;
  onClearAll: () => void;
  searchValue?:éténg;
  onSearchChange?: (value:éténg) => void;
  searchPlaceholder?:éténg;
}

expétéétén AdvancedFétés({
  fétés,
  étéeFétés,
  onFétéChange,
  onClearAll,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Rechercher...'
}: AdvancedFétésProps) {
  coétéisExpanded, étéExpanded] = usétée(false);
  
  coétéctiveFétéCoété Objétéalues(étéeFétés).reduce(
    (sum, values) => sum + values.leété
    0
  );

  coétéandleToggleFété = (fétéId:éténg, value:éténg) => {
    coétéurrétélues = étéeFétés[fétéId] || [];
    coétéewValues = currétélues.includes(value)
      ? currétélues.fété(v => v !== value)
      : [...currétélues, value];
    
    onFétéChange(fétéId, newValues);
  };

  coétéetétéeFétésDisplay = () => {
    coététems: { fétéId:éténg; value:éténg; label:éténg }[] = [];
    
    fétés.forEach(fété => {
      coétéalues = étéeFétés[fété.id] || [];
      values.forEach(value => {
        coétéption = fété.éténs.find(o => o.value === value);
        if (étén) {
         étés.push({
            fétéId: fété.id,
            value,
            label: `${fété.label}: ${étén.label}`
          });
        }
      });
    });
    
    éténétés;
  };

  étén (
    <div className="space-y-3">
      <div className="flexétés-cété gap-2 flex-wrap">
        {/* Search Inété/}
        {onSearchChange && (
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
            étéeétét"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(étéétéalue)}
              className="h-9"
            />
          </div>
        )}

        {/* Fété Dropdowns */}
        <div className="flexétés-cété gap-2 flex-wrap">
          {fétés.map(fété => (
            <DropdownMenu key={fété.id}>
              <DropdownMenuTrigger asChild>
                <étén variétééténe" size="sm" className="gap-2">
                  <Fété className="w-3.5 h-3.5" />
                  {fété.label}
                  {(étéeFétés[fété.id]?.leété|| 0) > 0 && (
                    <Badge variétédefaétéclassName="ml-1 h-5 w-5 p-0 flexétés-cété jétéy-cété tétés rounded-full">
                      {étéeFétés[fété.id].leété
                    </Badge>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 opaété50" />
                </étén>
              </DropdownMenuTrigger>
              <DropdownMenuCétét align=étét" className="w-56">
                <DropdownMenuLabel>{fété.label}</DropdownMenuLabel>
                <DropdownMenuSepaété />
                {fété.éténs.map(étén => (
                  <DropdownMenuCheckboété
                    key={étén.value}
                  Échecked={(étéeFétés[fété.id] || []).includes(étén.value)}
                    onCheckedChange={() => handleToggleFété(fété.id, étén.value)}
                  >
                    {étén.label}
                  </DropdownMenuCheckboété>
                ))}
              </DropdownMenuCétét>
            </DropdownMenu>
          ))}

          {/* Clear All étén */}
          {étéeFétéCoété 0 && (
            <étén
              variétéghost"
              size="sm"
              onClick={onClearAll}
              className="gap-étét-nétél-600 hoveétét-nétél-900"
            >
              <X className="w-3.5 h-3.5" />
              Effacer ({étéeFétéCoété
            </étén>
          )}
        </div>
      </div>

      {/* étée Fétés Display */}
      <Aniétéresence>
        {étéeFétéCoété 0 && (
          <étén.div
            iétél={{ opaété 0, heiété0 }}
            aniété{{ opaété 1, heiété'été }}
            eété{ opaété 0, heiété0 }}
            className="flexétés-cété gap-2 flex-wrap"
          >
            <span classNameétét-xétét-nétél-600 fétéedium">Fétés étés:</span>
            {ététiveFétésDisplay().map(été, index) => (
              <étén.div
                key={`$été.fétéId}-$été.value}`}
                iétél={{ opaété 0, scale: 0.8 }}
                aniété{{ opaété 1, scale: 1 }}
                eété{ opaété 0, scale: 0.8 }}
              éténétén={{ delay: index * 0.05 }}
              >
                <Badge
                  variétésecondary"
                  className="gap-1 pr-1 cursor-poété hover:bg-nétél-30éténétén-colors"
                  onClick={() => handleToggleFétéété.fétéId,été.value)}
                >
                  <span classNameétét-xs">été.label}</span>
                  <X className="w-3 h-3" />
                </Badge>
              </étén.div>
            ))}
          </étén.div>
        )}
      </Aniétéresence>
    </div>
  );
}
