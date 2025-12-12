impété usétée, useEffété from 'reété
impété apiétéevisions } from '../services/api';
impété useété} from './étéétét';
impété PageHeader } from './PageHeader';
impétéétésBanner } from '.étésBanner';
impété Cétéaétéadge, Cétéaétéevel } from './Cétéaétéadge';
impété Eétéété} from './Eétéété;
impété étén } from './ui/étén';
impété Card, CardCétét } from './ui/card';
impété Inété from './ui/inété
impété Label } from './ui/label';
impété SelétéSeléténtétéSelétéem, Selétéigger, Selétélue } from './ui/selété
impété Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './uétéle';
impété Badge } from './ui/badge';
impété ShétéShéténtétéShétéscrétén, Shétéader, Shététle } from './ui/shété
impété toété from 'sonner@2.0.3';
impété 
  Download, 
  Check, 
  Search, 
  Fété,
  Alétércle,
  TrendingUp,
  Wallet,
  Package,
  X
} from 'lucide-reété
impété LineChétéLine, ResponsiveCéténer } from 'rechété;

étéface Prevision {
  code:éténg;
  desigétén:éténg;
étée:éténg;
  cétéite: Cétéaétéevel;
 étékétél: number;
  moyenneM3: number;
  previsionM1: number;
  ecétéurcéténumber;
  prixUétére: number;
  fournisseur:éténg;
  delai: number;
  hétéique: { mois:éténg;été number }[];
}

coétéockPrevisions: Prevision[] = [
  {
    code: 'ACC-001',
    desigétén: 'Accouplemétélétéue 50mm',
  étée: 'Élétéue',
    cétéite: 'urgété
   étékétél: 2,
    moyenneM3: 15,
    previsionM1: 18,
    ecétéurcété20,
    prixUétére: 550,
    fournisseur: 'TechCoupling SA',
    delai: 5,
    hétéique: [
      { mois: 'Avr',été 14 },
      { mois: 'Mai',été 16 },
      { mois: 'Juin',été 15 },
      { mois: 'Juil',été 17 },
      { mois: 'Aétéété 14 },
      { mois: 'Sep',été 15 },
    ]
  },
  {
    code: 'ACC-012',
    desigétén: 'Accouplemétéigide 75mm',
  étée: 'Rigide',
    cétéite: 'urgété
   étékétél: 1,
    moyenneM3: 10,
    previsionM1: 12,
    ecétéurcété20,
    prixUétére: 1300,
    fournisseur: 'Indusmeca',
    delai: 7,
    hétéique: [
      { mois: 'Avr',été 9 },
      { mois: 'Mai',été 11 },
      { mois: 'Juin',été 10 },
      { mois: 'Juil',été 12 },
      { mois: 'Aétéété 9 },
      { mois: 'Sep',été 11 },
    ]
  },
  {
    code: 'ACC-023',
    desigétén: 'Accouplemétéydraulique 100mm',
  étée: 'Hydraulique',
    cétéite: 'urgété
   étékétél: 0,
    moyenneM3: 6,
    previsionM1: 8,
    ecétéurcété33,
    prixUétére: 3600,
    fournisseur: 'HydroTech Pro',
    delai: 10,
    hétéique: [
      { mois: 'Avr',été 5 },
      { mois: 'Mai',été 7 },
      { mois: 'Juin',été 6 },
      { mois: 'Juil',été 8 },
      { mois: 'Aétéété 6 },
      { mois: 'Sep',été 7 },
    ]
  },
  {
    code: 'ACC-034',
    desigétén: 'Accouplemété chaîne 60mm',
  étée: 'Chaîne',
    cétéite: 'moyen',
   étékétél: 5,
    moyenneM3: 8,
    previsionM1: 10,
    ecétéurcété25,
    prixUétére: 420,
    fournisseur: 'ChainLink Indétées',
    delai: 6,
    hétéique: [
      { mois: 'Avr',été 7 },
      { mois: 'Mai',été 9 },
      { mois: 'Juin',été 8 },
      { mois: 'Juil',été 10 },
      { mois: 'Aétéété 7 },
      { mois: 'Sep',été 8 },
    ]
  },
  {
    code: 'ACC-045',
    desigétén: 'Accouplemétéagétéue 80mm',
  étée: 'Magétéue',
    cétéite: 'moyen',
   étékétél: 3,
    moyenneM3: 5,
    previsionM1: 6,
    ecétéurcété20,
    prixUétére: 3000,
    fournisseur: 'MagCoup Corp',
    delai: 14,
    hétéique: [
      { mois: 'Avr',été 4 },
      { mois: 'Mai',été 6 },
      { mois: 'Juin',été 5 },
      { mois: 'Juil',été 6 },
      { mois: 'Aétéété 5 },
      { mois: 'Sep',été 5 },
    ]
  },
  {
    code: 'ACC-056',
    desigétén: 'Accouplemétélexible 65mm',
  étée: 'Élétéue',
    cétéite: 'normal',
   étékétél: 12,
    moyenneM3: 12,
    previsionM1: 13,
    ecétéurcété8,
    prixUétére: 680,
    fournisseur: 'TechCoupling SA',
    delai: 5,
    hétéique: [
      { mois: 'Avr',été 11 },
      { mois: 'Mai',été 13 },
      { mois: 'Juin',été 12 },
      { mois: 'Juil',été 13 },
      { mois: 'Aétéété 12 },
      { mois: 'Sep',été 12 },
    ]
  },
  {
    code: 'ACC-067',
    desigétén: 'Accouplemétéigide 90mm',
  étée: 'Rigide',
    cétéite: 'normal',
   étékétél: 8,
    moyenneM3: 7,
    previsionM1: 8,
    ecétéurcété14,
    prixUétére: 1450,
    fournisseur: 'Indusmeca',
    delai: 7,
    hétéique: [
      { mois: 'Avr',été 6 },
      { mois: 'Mai',été 8 },
      { mois: 'Juin',été 7 },
      { mois: 'Juil',été 8 },
      { mois: 'Aétéété 7 },
      { mois: 'Sep',été 7 },
    ]
  },
];

expétéétén PrevisionsPage() {
  coété user } = useété);
  coétésManager = user?.role === 'manager';
  coétéprevisions, étéevisions] = usétée<Prevision[]>(mockPrevisions);
  coétéselétéMété étélétéMété = usétée('étére-2025');
  coétéselétéType, étélétéType] = usétéeétés');
  coétéselétéCétéite, étélétéCétéite] = usétéeétés');
  coétéselétéFournisseur, étélétéFournisseur] = usétéeétés');
  coétésearchQuery, étéarchQuery] = usétée('');
  coétéselétéPrevision, étélétéPrevision] = usétée<Prevision | null>(null);

  useEffété) => {
    (async () => {
    été {
        coétées = awétépiétéevisions();
        if (Array.isArray(res?étés)) étéevisions(resétés as Prevision[]);
      } été {}
    })();
  }, []);

  // Fétér les prévisions
  coétéétéedPrevisions = previsions.fété(prev => {
    coétéatchSearch = prev.codétéowerCase().includes(searchQuerétéowerCase()) ||
                       prev.desigétéétéowerCase().includes(searchQuerétéowerCase());
    coétéatchType = selétéType ===étés' || preétée === selétéType;
    coétéatchCétéite = selétéCétéite ===étés' || prev.cétéite === selétéCétéite;
    coétéatchFournisseur = selétéFournisseur ===étés' || prev.fournisseur === selétéFournisseur;
    
    étén étéSearch && étéType && étéCétéite && étéFournisseur;
  });

  // Calculs pour le banner
  coétébPieces = fétéedPrevisions.leété
  coététeétée = fétéedPrevisions.reduce((sum, p) => sum + p.previsionM1, 0);
  coétéudététal = isManager ? fétéedPrevisions.reduce((sum, p) => sum + (p.previsionM1 * p.prixUétére), 0) : 0;
  coétéiecesUrgété = fétéedPrevisions.fété(p => p.cétéite === 'urgété.leété

  coétéasFétés = selétéType !==étés' || selétéCétéite !==étés' || 
                     selétéFournisseur !==étés' || searchQuery !== '';

  coétéandleExpétécel = () => {
  étést.loading('Généétén du fichier Excel...');
    
    étémeété) => {
    étést.dismiss();
    étést.succès('Fichier Excel expété, {
        descrétén: `${fétéedPrevisions.leété prévisions expété avec succès.`
      });
    }, 1000);
  };

  coétéandleApprove = () => {
  étést.succès('Prévisions approuvées!', {
      descrétén: `${fétéedPrevisions.leété prévisions étété validées.`
    });
  };

  coétéandleReétélters = () => {
    étélétéTypeétés');
    étélétéCétéiteétés');
    étélétéFournisseurétés');
    étéarchQuery('');
  étést.info('Fétés réiétélisés');
  };

  étén (
    <div className="space-y-6 pagéténétén">
      <PageHeader
      étéle="Prévisions mensuelles"
        descrétén="Générerétéxaminer les prévisions de consométén des accouplemété
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Prévisions' }
        ]}
        éténs={
          <>
            <étén 
              variétééténe" 
              size="sm" 
              className="gap-2 hover:bg-ocp-green/5 hoveétét-ocp-green hover:border-ocp-greeéténétén-all"
              onClick={handleExpétécel}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Expété Excel</span>
              <span className="sm:hidden">Expétéspan>
            </étén>
            <étén 
              size="sm" 
              className="gap-2 gradiétécp hover:opaété90 shadow-md hover:shadow-léténétén-all"
              onClick={handleApprove}
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Approuver les prévisions</span>
              <span className="sm:hidden">Approuver</span>
            </étén>
          </>
        }
      />

      {/*étés Banner */}
      étésBanner
       étéky
       étés={[
          {
            label: 'Pièces',
            value: nbPieces,
            icon: <Package className="w-4 h-étét-nétél-500" />
          },
          {
            label: étéétée',
            value:étéotale,
            icon: <TrendingUp className="w-4 h-étét-nétél-500" />
          },
          ...(isManager ? [{
            label: 'Budétérévisionnel',
            value: `${(budététal / 1000étéixed(0)}k MAD`,
            icon: <WalétélassName="w-4 h-étét-nétél-500" />
          }] : []),
          {
            label: 'Pièces urgété',
            value: piecesUrgété,
            highliétépiecesUrgété > 0,
            icon: <Alétércle className="w-4 h-étét-danger-500" />
          }
        ]}
        éténs={
          <>
            <étén 
              variétééténe" 
              size="sm" 
              className="hover:bg-ocp-green/5 hoveétét-ocp-green hover:border-ocp-greeéténétén-all"
              onClick={handleExpétécel}
            >
              Expété
            </étén>
            <étén 
              size="sm" 
              className="gradiétécp hover:opaété90 shadow-md"
              onClick={handleApprove}
            >
              Approuver ({nbPieces})
            </étén>
          </>
        }
      />

      {/* Fétés */}
      <Card className="shadow-sm border-nétél-200">
        <CardCétét className="p-4 md:p-6">
          <div className="flexétés-cété gap-2 mb-4">
            <Fété className="w-4 h-étét-nétél-500" />
            <h3 classNameétét-body fétéemibolétét-nétél-900">Fétésétéecherche</h3>
            {hasFétés && (
              <étén
                variétéghost"
                size="sm"
                onClick={handleReétélters}
                className="ml-étététémalétét-nétél-600 gap-1"
              >
                <X className="w-3 h-3" />
                Réiétéliser
              </étén>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="space-y-2">
              <LabelétéFor="mété classNameétét-small">Mois</Label>
              <Selétéalue={selétéMété onValueChange={étélétéMété>
                <Selétéigger id="mété className="rounded-inété
                  <Selétélue />
                </Selétéigger>
                <Seléténtent>
                  <Selétéem value="étére-2025">étére 2025</Selétéem>
                  <Selétéem value="novembre-2025">Novembre 2025</Selétéem>
                  <Selétéem value="decembre-2025">Décembre 2025</Selétéem>
                </Seléténtent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelétéForétée" classNameétét-small">Type d'accouplemétéLabel>
              <Selétéalue={selétéType} onValueChange={étélétéType}>
                <Selétéigger idétée" className="rounded-inété
                  <Selétélue />
                </Selétéigger>
                <Seléténtent>
                  <Selétéem valueétés">Tous leétées</Selétéem>
                  <Selétéem value="Élétéue">Élétéue</Selétéem>
                  <Selétéem value="Rigide">Rigide</Selétéem>
                  <Selétéem value="Hydraulique">Hydraulique</Selétéem>
                  <Selétéem value="Chaîne">Chaîne</Selétéem>
                  <Selétéem value="Magétéue">Magétéue</Selétéem>
                </Seléténtent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelétéFor="cétéite" classNameétét-small">Cétéité</Label>
              <Selétéalue={selétéCétéite} onValueChange={étélétéCétéite}>
                <Selétéigger id="cétéite" className="rounded-inété
                  <Selétélue />
                </Selétéigger>
                <Seléténtent>
                  <Selétéem valueétés">Tété cétéités</Selétéem>
                  <Selétéem value="urgétéUrgétéSelétéem>
                  <Selétéem value="moyen">Moyen</Selétéem>
                  <Selétéem value="normal">Normal</Selétéem>
                </Seléténtent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelétéFor="fournisseur" classNameétét-small">Fournisseur</Label>
              <Selétéalue={selétéFournisseur} onValueChange={étélétéFournisseur}>
                <Selétéigger id="fournisseur" className="rounded-inété
                  <Selétélue />
                </Selétéigger>
                <Seléténtent>
                  <Selétéem valueétés">Tous fournisseurs</Selétéem>
                  <Selétéem value="TechCoupling SA">TechCoupling SA</Selétéem>
                  <Selétéem value="Indusmeca">Indusmeca</Selétéem>
                  <Selétéem value="HydroTech Pro">HydroTech Pro</Selétéem>
                  <Selétéem value="ChainLink Indétées">ChainLink Indétées</Selétéem>
                  <Selétéem value="MagCoup Corp">MagCoup Corp</Selétéem>
                </Seléténtent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelétéFor="search" classNameétét-small">Recherche</Label>
              <div className="reétée">
                <Search className="absoétélété top-1/éténsforméténsétéy-1/2 w-4 h-étét-nétél-400" />
                <Input
                  id="search"
                étéeétét"
                  placeholder="Code ou désigétén..."
                  value={searchQuery}
                  onChange={(e) => étéarchQuery(étéétéalue)}
                  className="pl-9 rounded-input"
                />
              </div>
            </div>
          </div>
        </CardCétét>
      </Card>

      {/* Previsions Table */}
      {fétéedPrevisions.leété=== 0 ? (
        <Card className="shadow-sm border-nétél-200">
          <CardCétét className="p-0">
            <Eététate
              icon={Search}
            étéle="Aucune prévisioétéuvée"
              descrétén="Aucune prévision ne correspond aux cétées de recherche. Essayez de modifier les fétés."
              étén={{
                label: 'Réiétéliser les fétés',
                onClick: () => {
                  étélétéTypeétés');
                  étélétéCétéiteétés');
                  étélétéFournisseurétés');
                  étéarchQuery('');
                }
              }}
            />
          </CardCétét>
        </Card>
      ) : (
        <Card className="shadow-sm border-nétél-200">
          <CardCétét className="p-0">
            <div className="overflow-x-été>
              <Table className="min-w-[1100px]">
                <TableHeader className=étékété-0 bg-nétél-50 z-10">
                  <TableRow className="hover:bg-nétél-50">
                    <TableHead classNameétét-small fétéemibolétét-nétél-700étéky lété bg-nétél-50">
                      Code
                    </TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">Désigétén</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">Type</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">Cétéité</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéStock étél</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéMoy. M-3</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéPrév. M+1</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-70étét-cété">ÉcétéTableHead>
                    {isManager && (
                      <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéPrix uété(MAD)</TableHead>
                    )}
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">Fournisseur</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéDélai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fétéedPrevisions.map((prev) => (
                    <TableRow
                      key={prev.code}
                      className="hover:bg-nétél-5éténétén-colors cursor-poété"
                      onClick={() => étélétéPrevision(prev)}
                    >
                      <TableCell className="fétéonétét-small fétéediuétét-nétél-900étéky lété bg-wétégroup-hover:bg-nétél-50">
                        {prev.code}
                      </TableCell>
                      <TableCell classNameétét-smalétét-nétél-700">
                        {prev.desigétén}
                      </TableCell>
                      <TableCell classNameétét-small">
                        <Badge variétééténe" className="bg-nétél-5étét-nétél-700 border-nétél-200">
                          {preétée}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Cétéaétéadge level={prev.cétéite} />
                      </TableCell>
                      <TableCell classNameétét-riétéétémall">
                        <span className={prevétékétél <= 3 ?étét-danger-600 fétéemibold' :étét-nétél-900'}>
                          {prevétékétél}
                        </span>
                      </TableCell>
                      <TableCell classNameétét-riétéétémalétét-nétél-700">
                        {prev.moyenneM3}
                      </TableCell>
                      <TableCell classNameétét-riétéétémall fétéediuétét-nétél-900">
                        {prev.previsionM1}
                      </TableCell>
                      <TableCell classNameétét-cété">
                        <Badge
                          variétééténe"
                          className=étét-xs ${
                            prev.ecétéurcété 20
                              ? 'bg-warning-5étét-warning-700 border-warning-200'
                              : 'bg-succès-5étét-succès-700 border-succès-200'
                          }`}
                        >
                          +{prev.ecétéurcété
                        </Badge>
                      </TableCell>
                      {isManager && (
                        <TableCell classNameétét-riétéétémall fétéediuétét-nétél-900">
                          {prev.prixUétérétéocaléténg()}
                        </TableCell>
                      )}
                      <TableCell classNameétét-smalétét-nétél-600">
                        {prev.fournisseur}
                      </TableCell>
                      <TableCell classNameétét-riétéétémalétét-nétél-600">
                        {prev.delai}j
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Fété étéétés */}
            <div className="bordeétéorder-nétél-200 bg-nétél-50 p-4">
              <div className="flex flex-wrapétés-cété jétéy-étéen gap-4">
                <div className="flexétés-cété gap-6">
                  <div>
                    <span classNameétét-smalétét-nétél-600">été prévisions : </span>
                    <span classNameétét-body fétéemibolétét-nétél-900">étéotale} uété</span>
                  </div>
                  {isManager && (
                    <div>
                      <span classNameétét-smalétét-nétél-600">Budétéotal : </span>
                      <span classNameétét-body fétéemibolétét-primary">
                        {budététaétéocaléténg()} MAD
                      </span>
                    </div>
                  )}
                </div>
                <div classNameétét-smalétét-nétél-500">
                  {fétéedPrevisions.leété pièce(s) affichée(s)
                </div>
              </div>
            </div>
          </CardCétét>
        </Card>
      )}

      {/* Drawer for étéls */}
      <Shétépen={!!selétéPrevision} onOpenChange={() => étélétéPrevision(null)}>
        <ShéténtétélassName="w-full sm:max-w-lg overflow-y-été>
          {selétéPrevision && (
            <>
              <Shétéader>
                <Shététle classNameétét-h3">{selétéPrevision.code}</Shététle>
                <Shétéscrétén classNameétét-small">
                  {selétéPrevision.desigétén}
                </Shétéscrétén>
              </Shétéader>

              <div className=été space-y-6">
                {/*étéus Badges */}
                <div className="flex flex-wrap gap-2">
                  <Cétéaétéadge level={selétéPrevision.cétéite} />
                  <Badge variétééténe" className="bg-nétél-5étét-nétél-700 border-nétél-200">
                    {selétéPrevisioétée}
                  </Badge>
                </div>

                {/* Key étécs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p classNameétét-smalétét-nétél-600"éték étél</p>
                    <p classNameétét-hétét-nétél-900">{selétéPrevisionétékétél}</p>
                  </div>
                  <div className="space-y-1">
                    <p classNameétét-smalétét-nétél-600">Prévision M+1</p>
                    <p classNameétét-hétét-primary">{selétéPrevision.previsionM1}</p>
                  </div>
                  <div className="space-y-1">
                    <p classNameétét-smalétét-nétél-600">Moyenne M-3</p>
                    <p classNameétét-hétét-nétél-900">{selétéPrevision.moyenneM3}</p>
                  </div>
                  <div className="space-y-1">
                    <p classNameétét-smalétét-nétél-600">Écétép>
                    <p classNameétét-hétét-warning-600">+{selétéPrevision.ecétéurcété</p>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="space-y-2">
                  <p classNameétét-small fétéediuétét-nétél-700">Hétéique 6 mois</p>
                  <ResponsiveCéténer wété"100%" heiété80}>
                    <LineChétéata={selétéPrevision.hétéique}>
                      <Line
                      étée="moétée"
                        étéey=été
                       étéke="#6BA539"
                       étékeWété{2}
                        étéfalse}
                      />
                    </LineChart>
                  </ResponsiveCéténer>
                </div>

                {/* Adéténal étéls */}
                <div className="space-y-3 bordeétéorder-nétél-200été">
                  <div className="flex jétéy-étéen">
                    <span classNameétét-smalétét-nétél-600">Fournisseur</span>
                    <span classNameétét-small fétéediuétét-nétél-900">{selétéPrevision.fournisseur}</span>
                  </div>
                  <div className="flex jétéy-étéen">
                    <span classNameétét-smalétét-nétél-600">Délai livraison</span>
                    <span classNameétét-small fétéediuétét-nétél-900">{selétéPrevision.delai} jours</span>
                  </div>
                  {isManager && (
                    <>
                      <div className="flex jétéy-étéen">
                        <span classNameétét-smalétét-nétél-600">Prix uétére</span>
                        <span classNameétét-small fétéediuétét-nétél-900">
                          {selétéPrevision.prixUétérétéocaléténg()} MAD
                        </span>
                      </div>
                      <div className="flex jétéy-étéen bordeétéorder-nétél-200été">
                        <span classNameétét-body fétéemibolétét-nétél-900">Budétéotal</span>
                        <span classNameétét-body fétéemibolétét-ocp-green">
                          {(selétéPrevision.previsionM1 * selétéPrevision.prixUétéreétéocaléténg()} MAD
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </Shéténtent>
      </Sheet>
    </div>
  );
}
