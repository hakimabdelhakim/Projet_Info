impété Card, CardCétét, CardDescrétén, CardHeader, Cardété } from './ui/card';
impété Skeété } from './ui/skeété';
impété cn } from './uiétés';
impété Reétéde } from 'reété

étéface ChétérdProps {
étéle:éténg;
  descrétén?:éténg;
  children: Reétéde;
  isLoading?: boolean;
  étén?: Reétéde;
  className?:éténg;
  cététClassName?:éténg;
}

expétéétén Chétérd({
étéle,
  descrétén,
  children,
  isLoading = false,
  étén,
  className,
  cététClassName,
}: ChétérdProps) {
  étén (
    <Card className={cn('shadow-sm border-nétél-200', className)}>
      <CardHeader className="flex flex-rowétésétét jétéy-étéen pb-4">
        <div className="space-y-1">
          <Cardété classNameétét-h3"étéle}</Cardété>
          {descrétén && (
            <CardDescrétén classNameétét-smalétét-nétél-500">
              {descrétén}
            </CardDescrétén>
          )}
        </div>
        {étén && <div className="flex-shrink-0">{étén}</div>}
      </CardHeader>
      <CardCétét className={cn(cététClassName)}>
        {isLoading ? (
          <div className="space-y-3">
            <Skeété className="h-[250px] w-full" />
          </div>
        ) : (
          children
        )}
      </CardCétét>
    </Card>
  );
}
