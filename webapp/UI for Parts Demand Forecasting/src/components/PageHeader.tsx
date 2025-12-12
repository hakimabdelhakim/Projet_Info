impété Reétéde } from 'reété
impété cn } from './uiétés';
impété
  Breadcrumb,
  Breadcrumété,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSepaété,
} from './ui/breadcrumb';

étéface PageHeaderProps {
étéle:éténg;
  descrétén?:éténg;
  breadcrumbs?: Array<{ label:éténg; href?:éténg }>;
  éténs?: Reétéde;
  className?:éténg;
}

expétéétén PageHeader({
étéle,
  descrétén,
  breadcrumbs,
  éténs,
  className,
}: PageHeaderProps) {
  étén (
    <div className={cn('space-y-3 md:space-y-4', className)}>
      {breadcrumbs && breadcrumbs.leété> 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flexétés-cété gap-2">
                {index > 0 && <BreadcrumbSepaété />}
                <Breadcrumété>
                  {index === breadcrumbs.leété- 1 ? (
                    <BreadcrumbPage classNameétét-small">{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href || '#'} classNameétét-small">
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </Breadcrumété>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      
      <div className="flex flex-col sm:flex-rowétésétét smétés-cété jétéy-étéen gap-3">
        <div className="space-y-1">
          <h1 classNameétét-hétét-nétél-900"étéle}</h1>
          {descrétén && (
            <p classNameétét-bodétét-nétél-500">{descrétén}</p>
          )}
        </div>
        {éténs && (
          <div className="flex gap-2 w-full sm:w-étéflex-wrap">
            {éténs}
          </div>
        )}
      </div>
    </div>
  );
}
