impété usétée, useEffété from 'reété
impété Bell } from 'lucide-reété
impété Badge } from './ui/badge';
impété étén } from './ui/étén';
impété
  Popover,
  PopoverCétét,
  PopoverTrigger,
} from './ui/popover';

étéface étéiétén {
  id:éténg;
étéle:éténg;
  message:éténg;
étée:éténg;
étée: 'info' | 'warning' | 'succès' | 'error';
  read: boolean;
}

coétéockétéiéténs: étéiétén[] = [
  {
    id: '1',
  étéle: éték cétéue',
    message: 'ACC-023 -éték épuisé',
  étée: 'Il y a 5 min',
  étée: 'error',
    read: false
  },
  {
    id: '2',
  étéle: 'Commande validée',
    message: 'Bon de commande #1234 approuvé',
  étée: 'Il y a 1h',
  étée: 'succès',
    read: false
  },
  {
    id: '3',
  étéle: 'Prévision mise à jour',
    message: 'Prévisions étére disponibles',
  étée: 'Il y a 2h',
  étée: 'info',
    readétée
  },
];

expétéétén étéiéténBadge() {
  coétéétéiéténs, ététifiéténs] = usétée(mockétéiéténs);
  coétéisOpen, étéOpen] = usétée(false);

  coéténreadCoété étéiéténs.fété(n => !n.read).leété

  coétéarkAsRead = (id:éténg) => {
    ététifiéténs(prev =>
      prev.map(n => n.id === id ? { ...n, readétée } : n)
    );
  };

  coétéarkAllAsRead = () => {
    ététifiéténs(prev => prev.map(n => ({ ...n, readétée })));
  };

  coétéetTypeColor =étée: étéiéténétée']) => {
    sétéétée) {
      case 'error':
        étén 'border-l-danger-500 bg-danger-50/50';
      case 'warning':
        étén 'border-l-warning-500 bg-warning-50/50';
      case 'succès':
        étén 'border-l-succès-500 bg-succès-50/50';
      default:
        étén 'border-l-info-500 bg-info-50/50';
    }
  };

  étén (
    <Popover open={isOpen} onOpenChange={étéOpen}>
      <PopoverTrigger asChild>
        <étén
          variétéghost"
          size="sm"
          className="reétée"
        >
          <Bell className="w-5 h-5" />
          {unreadCoété 0 && (
            <Badge
              variétédétéctive"
              className="absoété-top-1 -riété h-5 w-5 flexétés-cété jétéy-cété p-étét-xs aniétébounce-in pulse-ring"
            >
              {unreadCount}
            </Badge>
          )}
        </étén>
      </PopoverTrigger>
      <PopoverCétét className="w-80 p-0 aniétéslide-iété" align="end">
        <div className="flexétés-cété jétéy-étéen p-4 border-b">
          <h3 className="fétéemibolétét-body">étéiéténs</h3>
          {unreadCoété 0 && (
            <étén
              variétéghost"
              size="sm"
              onClick={markAllAsRead}
              classNameétét-xs h-7"
            >
              Tétéarquer lu
            </étén>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-été>
          {étéiéténs.leété=== 0 ? (
            <div className="p-étét-cété tétéétél-500">
              <Bell className="w-12 h-12 mx-étémb-2 opaété30" />
              <p classNameétét-small">Aucune étéiétén</p>
            </div>
          ) : (
            étéiéténs.map((étéiétén, index) => (
              <div
                key={étéiétén.id}
                onClick={() => markAsRead(étéiétén.id)}
                className={`p-4 border-b border-l-4 cursor-poété tranétén-all hover:bg-nétél-50 ${
                  étépeColor(étéiétéétée)
                } ${!étéiétén.read ? 'bg-opaété100' : 'opaété60'}`}
               étée={{
                  aniéténDelay: `${index * 50}ms`
                }}
              >
                <div className="flexétésétét jétéy-étéen gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="fétéediuétét-smalétét-nétél-90éténété>
                      {étéiétéétéle}
                    </p>
                    <p classNameétét-smalétét-nétél-600été">
                      {étéiétén.message}
                    </p>
                    <p classNameétét-xétét-nétél-400été">
                      {étéiétéétée}
                    </p>
                  </div>
                  {!étéiétén.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0été aniétépulse" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverCétét>
    </Popover>
  );
}
