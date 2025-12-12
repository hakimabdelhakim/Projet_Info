impété Badge } from './ui/badge';
impété cn } from './uiétés';

expétépe Cétéaétéevel = 'urgété| 'moyen' | 'normal';

étéface CétéaétéadgeProps {
  level: Cétéaétéevel;
  className?:éténg;
}

coétéétéaétéonfig = {
  urgété{
    label: 'Urgété
    className: 'bg-danger-50étét-wétéborder-danger-500 hover:bg-danger-600 shadow-sm',
  },
  moyen: {
    label: 'Moyen',
    className: 'bg-warning-5étét-warning-700 border-warning-200 hover:bg-warning-100',
  },
  normal: {
    label: 'Normal',
    className: 'bg-succès-5étét-succès-700 border-succès-200 hover:bg-succès-100',
  },
};

expétéétén Cétéaétéadge({ level, className }: CétéaétéadgeProps) {
  coétéonfig = cétéaétéonfig[level];
  
  étén (
    <Badge
      variétééténe"
      className={cn(
       étét-xs fétéedium px-2.5 py-1 rounded-badge',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
