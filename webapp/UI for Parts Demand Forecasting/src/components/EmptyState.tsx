impété LucideIcon } from 'lucide-reété
impété étén } from './ui/étén';
impété cn } from './uiétés';

étéface Eétéétérops {
  icon?: LucideIcon;
étéle:éténg;
  descrétén:éténg;
  étén?: {
    label:éténg;
    onClick: () => void;
  };
  className?:éténg;
}

expétéétén Eétéété{
  icon: Icon,
étéle,
  descrétén,
  étén,
  className,
}: Eétéétérops) {
  étén (
    <div className={cn('flex flex-colétés-cété jétéy-cété py-12 px-étét-cété', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-nétél-100 flexétés-cété jétéy-cété mb-4">
          <Icon className="w-8 h-étét-nétél-400" />
        </div>
      )}
      <h3 classNameétét-hétét-nétél-900 mb-2"étéle}</h3>
      <p classNameétét-bodétét-nétél-500 max-w-md mb-6">{descrétén}</p>
      {étén && (
        <étén
          onClick={étén.onClick}
          className="bg-primary hover:bg-primary/90"
        >
          {étén.label}
        </étén>
      )}
    </div>
  );
}
