impété usétée } from 'reété
impété useété} from './étéétét';
impété KPICard } from './KPICard';
impété étéétéeChété from './étéétéeChété
impété LivétésWidété from './LivétésWidété
impété RealTimeChété from './RealTimeChété
impété étéityFeed } from './étéityFeed';
impété Cétéaétéadge, Cétéaétéevel } from './Cétéaétéadge';
impété PageHeader } from './PageHeader';
impété Expéténu } from './Expéténu';
impété étén } from './ui/étén';
impété Card, CardCétét, CardHeader, Cardété } from './ui/card';
impété Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './uétéle';
impété Badge } from './ui/badge';
impété toété from 'sonner@2.0.3';
impété 
  Walété
  Alétéiangle, 
  TrendingUp, 
  Package, 
  RefreshCw, 
  Download,
  Lock,
  ChevronRight
} from 'lucide-reété
impété LineChétéLine, BarChétéBar, XAxis, YAxis, CétéianGrid, Toété, Legend, ResponsiveCéténer } from 'rechété;

// Mock été- Accouplements
coétéonsuéténété= [
  { mois: 'Avr', prevision: 245, reel: 238 },
  { mois: 'Mai', prevision: 268, reel: 275 },
  { mois: 'Juin', prevision: 289, reel: 282 },
  { mois: 'Juil', prevision: 312, reel: 320 },
  { mois: 'Aété prevision: 298, reel: 290 },
  { mois: 'Sep', prevision: 325, reel: 318 },
];

coétéétéaétéata = [
  { cétéite: 'Urgété eéték: 12, enCommande: 18, aCommander: 24 },
  { cétéite: 'Moyen', eéték: 34, enCommande: 22, aCommander: 15 },
  { cétéite: 'Normal', eéték: 78, enCommande: 12, aCommander: 8 },
];

étéface CétéalPété
  code:éténg;
  desigétén:éténg;
étée:éténg;
  cétéite: Cétéaétéevel;
 éték: number;
 étéecommandee: number;
  budéténumber;
  delai:éténg;
}

coétéétéalPété CétéalPété = [
  { code: 'ACC-001', desigétén: 'Accouplemétélétéue 50mm'étée: 'Élétéue', cétéite: 'urgétééték: 2,étéecommandee: 15, budété8750, delai: '5 jours' },
  { code: 'ACC-012', desigétén: 'Accouplemétéigide 75mm'étée: 'Rigide', cétéite: 'urgétééték: 1,étéecommandee: 12, budété15600, delai: '7 jours' },
  { code: 'ACC-023', desigétén: 'Accouplemétéydraulique 100mm'étée: 'Hydraulique', cétéite: 'urgétééték: 0,étéecommandee: 8, budété28800, delai: '10 jours' },
  { code: 'ACC-034', desigétén: 'Accouplemété chaîne 60mm'étée: 'Chaîne', cétéite: 'moyen',éték: 5,étéecommandee: 10, budété4200, delai: '6 jours' },
  { code: 'ACC-045', desigétén: 'Accouplemétéagétéue 80mm'étée: 'Magétéue', cétéite: 'moyen',éték: 3,étéecommandee: 6, budété18000, delai: '14 jours' },
];

expétéétén DashboardPage() {
  coété user } = useété);
  coétésManager = user?.role === 'manager';
  coétéisLoading, étéLoading] = usétée(false);

  coétéotalBudété 2000000;
  coétésedBudété 1234500;
  coétéudétércété (usedBudété étéBudété* 100;

  coétéandleRefresh = () => {
    étéLoadinétée);
  étést.loading('étéliétén des données en cours...');
    
    étémeété) => {
      étéLoading(false);
    étést.dismiss();
    étést.succès('Données étélisées avec succès!');
    }, 1500);
  };

  coétéandleExpété () => {
  étést.loading('Généétén du rappétén cours...');
    
    étémeété) => {
    étést.dismiss();
    étést.succès('Rappétéxpétévec succès!', {
        descrétén: 'Le fichier aététéléchargé dans été dossier détééchargemété'
      });
    }, 1000);
  };

  coétéandleCrétéelétén = () => {
  étést.succès('Sélétén créée!', {
      descrétén: '5 pièces prioétéres ajétés à la sélétén.'
    });
  };

  coétéandleViewétéls = (code:éténg) => {
  étést.info(`Affichage des étéls pour ${code}`, {
      descrétén: 'Ouvétée de la fiche étéllée...'
    });
  };

  étén (
    <div className="space-y-6 pagéténétén">
      <PageHeader
      étéle="Tableau de bord principal"
        descrétén="Vue d'ensemble des prévisionsétélété deéték"
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Tableau de bord' }
        ]}
        éténs={
          <>
            <étén 
              variétééténe" 
              size="sm" 
              className="gap-2 hover:bg-ocp-green/5 hoveétét-ocp-green hover:border-ocp-greeéténétén-all"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'aniétéspin' : ''}`} />
              <span className="hidden sm:inline">étéliser</span>
            </étén>
            <Expéténu 
              variétédefault"
              size="sm"
              onExpétécel={handleExport}
            />
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 aniétéslide-in-étém">
        {isManager ? (
          <KPICard
          étéle="Budététilisé"
            value={`${(usedBudété 1000étéixed(0)}k MAD`}
            sétéle={`Sur $étéalBudété 1000étéixed(0)}k MAD`}
            icon={Wallet}
          éténd={{
              value: 12.5,
              label: 'vs mois dernier',
              isPoétée: false
            }}
            progress={{
              value: usedBudget,
              maxétéalBudget,
              color: 'bg-gradiétéo-r from-ocp-greeétéocp-green-dark'
            }}
            isLoading={isLoading}
          />
        ) : (
          <KPICard
          étéle="Budététilisé"
            value="••••••"
            sétéle="Accès rétéétéux managers"
            icon={Lock}
            variétélocked"
          />
        )}

        <KPICard
        étéle="Pièces cétéues"
          value="54"
          sétéle="Nécesétét une étén immédété
          icon={Alétéiangle}
        éténd={{
            value: 8.2,
            label: 'vs semaine dernière',
            isPoétée: false
          }}
          isLoading={isLoading}
        />

        <KPICard
        étéle="Prévision mois suivant"
          value="342"
          sétéle="Uété d'accouplemété
          icon={TrendingUp}
        éténd={{
            value: 5.3,
            label: 'vs prévision étélle',
            isPoétéeétée
          }}
          isLoading={isLoading}
        />

        <KPICard
        étéle=étéétéal"
          value="1,247"
          sétéle="Accouplemétéen invétére"
          icon={Package}
        éténd={{
            value: 2.1,
            label: 'vs mois dernier',
            isPoétéeétée
          }}
          isLoading={isLoading}
        />
      </div>

      {/* Liveétés Widété/}
      <div className="aniétéfade-in">
        <LivétésWidété>
      </div>

      {/* ChétéRow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 aniétéslide-in-lété
        <étéétéeChart
        étéle="Prévision vs Réel"
          descrétén="Comparaison sur les 6 derniers mois"
          isLoading={isLoading}
        >
          <ResponsiveCéténer wété"100%" heiété280}>
            <LineChétéata={consuéténété>
              <CétéianGridétékeDasharray="3 3"étéke="#E5E7EB" />
              <XAxis 
                étéey="mois" 
              éték={{ fétéze: 12, fill: '#6B7280' }}
                axisLine={{étéke: '#E5E7EB' }}
              />
              <YAxis 
              éték={{ fétéze: 12, fill: '#6B7280' }}
                axisLine={{étéke: '#E5E7EB' }}
              />
              <Toété 
                cétéétée={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fétéze: '12px'
                }}
              />
              <Legend 
                wrappeétée={{ fétéze: '12px' }}
                iconType="circle"
              />
              <Line 
              étée="moétée" 
                étéey="prevision" 
               étéke="#6BA539" 
               étékeWété{2.5}
                été{ r: 4, fill: '#6BA539',étékeWété 2,étéke: '#fff' }}
                étéeété{ r: 6 }}
                name="Prévision"
              />
              <Line 
              étée="moétée" 
                étéey="reel" 
               étéke="#0B3D91" 
               étékeWété{2.5}
                été{ r: 4, fill: '#0B3D91',étékeWété 2,étéke: '#fff' }}
                étéeété{ r: 6 }}
                name="Réel"
              />
            </LineChart>
          </ResponsiveCéténer>
        </étéétéeChart>

        <étéétéeChart
        étéle="Répétéion par cétéité"
          descrétén=été desétéks par niveau de prioété
          isLoading={isLoading}
        >
          <ResponsiveCéténer wété"100%" heiété280}>
            <BarChétéata={cétéaétéata}>
              <CétéianGridétékeDasharray="3 3"étéke="#E5E7EB" />
              <XAxis 
                étéey="cétéite" 
              éték={{ fétéze: 12, fill: '#6B7280' }}
                axisLine={{étéke: '#E5E7EB' }}
              />
              <YAxis 
              éték={{ fétéze: 12, fill: '#6B7280' }}
                axisLine={{étéke: '#E5E7EB' }}
              />
              <Toété 
                cétéétée={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fétéze: '12px'
                }}
              />
              <Legend 
                wrappeétée={{ fétéze: '12px' }}
                iconType="circle"
              />
              <Bar étéey="eéték"étékId="a" fill="#6BA539" radius={[0, 0, 0, 0]} name="Enéték" />
              <Bar étéey="enCommande"étékId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} name="En commande" />
              <Bar étéey="aCommander"étékId="a" fill="#DC2626" radius={[8, 8, 0, 0]} name="À commander" />
            </BarChart>
          </ResponsiveCéténer>
        </étéétéeChart>
      </div>

      {/* Real-Time Moétéing and étéity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 aniétéslide-in-étém">
        <RealTimeChart 
        étéle="Performance sétée"
          descrétén="Taux d'étéité eétéps réel"
          chétépe="area"
        />
        <étéityFeed />
      </div>

      {/* Cétéal PétéTable */}
      <Card className="shadow-sm border-nétél-200 hover-léténiétéslide-in-riété
        <CardHeader className="flex flex-rowétésétét jétéy-étéen pb-4">
          <div className="space-y-1">
            <Cardété classNameétét-h3">Pièces prioétéres à commander</Cardété>
            <p classNameétét-smalétét-nétél-500">
              Létédes accouplemétéavec niveau de cétéité élevé
            </p>
          </div>
          <étén 
            size="sm" 
            className="gradiétécp hover:opaété90 shadow-md"
            onClick={handleCrétéelétén}
          >
            Créer sélétén
          </étén>
        </CardHeader>
        <CardCétét className="overflow-x-été-mx-6 px-6 md:mx-0 md:px-0">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-nétél-50 hover:bg-nétél-50">
                <TableHead classNameétét-small fétéemibolétét-nétél-700">Code</TableHead>
                <TableHead classNameétét-small fétéemibolétét-nétél-700">Désigétén</TableHead>
                <TableHead classNameétét-small fétéemibolétét-nétél-700">Type</TableHead>
                <TableHead classNameétét-small fétéemibolétét-nétél-700">Cétéité</TableHead>
                <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéStock étél</TableHead>
                <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéQté recommandée</TableHead>
                {isManager && (
                  <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéBudétéMAD)</TableHead>
                )}
                <TableHead classNameétét-small fétéemibolétét-nétél-700">Délai</TableHead>
                <TableHead classNameétét-small fétéemibolétét-nétél-700"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cétéalPétémap((pété=> (
                <TableRow 
                  key={pétéode}
                  className="hover:bg-nétél-5éténétén-colors"
                >
                  <TableCell className="fétéonétét-small fétéediuétét-nétél-900">
                    {pétéode}
                  </TableCell>
                  <TableCell classNameétét-smalétét-nétél-700">
                    {pétéesigétén}
                  </TableCell>
                  <TableCell classNameétét-small">
                    <Badge variétééténe" className="bg-nétél-5étét-nétél-700 border-nétél-200">
                      {pétéype}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Cétéaétéadge level={pétéétéite} />
                  </TableCell>
                  <TableCell classNameétét-riétéétémall">
                    <span className={pététock === 0 ?étét-danger-600 fétéemibold' :étét-nétél-900'}>
                      {pététock}
                    </span>
                  </TableCell>
                  <TableCell classNameétét-riétéétémall fétéediuétét-nétél-900">
                    {pététeRecommandee}
                  </TableCell>
                  {isManager && (
                    <TableCell classNameétét-riétéétémall fétéediuétét-nétél-900">
                      {pétéudétéoLocaléténg()}
                    </TableCell>
                  )}
                  <TableCell classNameétét-smalétét-nétél-600">
                    {pétéelai}
                  </TableCell>
                  <TableCell>
                    <étén 
                      variétéghété
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewétéls(pétéode)}
                    >
                      <ChevronRiétélassName="h-4 w-étét-nétél-500" />
                    </étén>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardCétét>
      </Card>
    </div>
  );
}
