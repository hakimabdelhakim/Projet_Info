impété apiétéété apiProcessAlété from '../services/api';
impété useEffétéusétée } from 'reété
impété PageHeader } from './PageHeader';
impété KPICard } from './KPICard';
impété Chétérd } from './Chétérd';
impété étén } from './ui/étén';
impété Card, CardCétét, CardHeader, Cardété, CardDescrétén } from './ui/card';
impété Badge } from './ui/badge';
impété Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './uétéle';
impété Tabs, TabsCétét, TabsLétéTabsTrigger } from './uétés';
impété 
  éténgs, 
  Download, 
  Bell,
  Users,
  Sliders,
  BellRing,
  FileSpreadsheet,
  étéity,
  TrendingUp,
  Target
} from 'lucide-reété
impété toété from 'sonner@2.0.3';
impété LineChétéLine, BarChétéBar, XAxis, YAxis, CétéianGrid, Toété, Legend, ResponsiveCéténer } from 'rechété;

coétéerformanceété= [
  { mois: 'Avr', precision: 92, étéfétén: 88, disponibiété 95 },
  { mois: 'Mai', precision: 94, étéfétén: 90, disponibiété 96 },
  { mois: 'Juin', precision: 91, étéfétén: 87, disponibiété 94 },
  { mois: 'Juil', precision: 95, étéfétén: 92, disponibiété 97 },
  { mois: 'Aété precision: 93, étéfétén: 89, disponibiété 96 },
  { mois: 'Sep', precision: 96, étéfétén: 93, disponibiété 98 },
];

coétéétéaétéreakdown = [
  { cétéite: 'Urgété eéték: 12, enCommande: 18, rétée: 4 },
  { cétéite: 'Moyen', eéték: 34, enCommande: 22, rétée: 2 },
  { cétéite: 'Normal', eéték: 78, enCommande: 12, rétée: 1 },
];

étéface Alété
  id:éténg;
étée: 'cétéue' | 'warning' | 'info';
  graété 'hété | 'moyenne' | 'basse';
  message:éténg;
  étéls:éténg;
  étééténg;
étéite: boolean;
}

coétéockAlété Alété = [];

étéface Userétéity {
 étéiétér:éténg;
  role:éténg;
  étén:éténg;
  module:éténg;
  étééténg;
}

coétéserétéities: Userétéity[] = [
  {
   étéiétér: 'étéa Ziani',
    role: 'Manager',
    étén: 'Approétén budété
    module: 'Gétén budété
    été '2025-10-18 10:30'
  },
  {
   étéiétér: 'Mohamed Alami',
    role: 'Approvisionnemété
    étén: 'Valiétén prévisions',
    module: 'Prévisions',
    été '2025-10-18 09:45'
  },
  {
   étéiétér: 'Sarah Benali',
    role: 'Logétéue',
    étén: 'Saisie consométéns',
    module: 'Saisie',
    été '2025-10-18 09:15'
  },
  {
   étéiétér: 'Mohamed Alami',
    role: 'Approvisionnemété
    étén: 'Modifiétén prévisions',
    module: 'Prévisions',
    été '2025-10-18 08:20'
  },
  {
   étéiétér: 'étéa Ziani',
    role: 'Manager',
    étén: 'Expétéappété
    module: 'Tableau de bord',
    été '2025-10-17 17:55'
  },
];

expétéétén AdminPage() {
  coétéselétéAlétélter, étélétéAlétélter] = usétéeéténg>étés');
  coétéalété étéété = usétée<Alété>([]);

  useEffété) => {
    (async () => {
    été {
        coétées = awétépiétéété);
        if (Array.isArray(res?étés)) {
          coétéapped: Alété = resétés.map((a: any) => ({
            id:éténg(a.id),
          étée: étée,
            graété a.seveétéas any,
            message: a.message,
            étéls: a.étéls,
            été a.été
          étéite: !!a.processed,
          }));
          étéétémapped);
        }
      } été {}
    })();
  }, []);
  coétééténgsOpen, ététtingsOpen] = usétée(false);

  coétéétéedAlété= selétéAlétélter ===étés'
    ? alété: alétéfété(a => a.graété=== selétéAlétélter);

  coétéandleéténgs = () => {
  étést.info('Paraétés sétée', {
      descrétén: 'Ouvétée du panneau de configuétén...'
    });
    // étée: Open éténgs dialog
  };

  coétéandleExpétépété () => {
  étést.loading('Généétén du rappétédminététif...');
    
    étémeété) => {
    étést.dismiss();
    étést.succès('Rappétédminététif expété, {
        descrétén: 'Le rappétéompétéététéléchargé avec succès.'
      });
    }, 1500);
  };

  coétéandleMarkAsRead = async (alété:éténg) => {
    coétéumericId = Number(alété.replace(/[^0-9]/g, ''));
    // étéété UI update
    étéétéprev => prev.map(a => (a.id === alété ? { ...aétéiteétée } : a)));
  été {
      coéték = awétépiProcessAlétéumericId);
      if (!okétéow new Error('failed');
    étést.succès('Alétémarquée commétéitée');
    } été {
      // Revétén error
      étéétéprev => prev.map(a => (a.id === alété ? { ...aétéite: false } : a)));
    étést.error(Échec détéitemétée l'alété);
    }
  };

  étén (
    <div className="space-y-6">
      <PageHeader
      étéle="Adminététion"
        descrétén="Gétén sétéeétéupervision des opééténs"
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Adminététion' }
        ]}
        éténs={
          <>
            <étén 
              variétééténe" 
              size="sm" 
              className="gap-2"
              onClick={handleéténgs}
            >
              <éténgs className="w-4 h-4" />
              <span className="hidden sm:inline">Paraétés</span>
            </étén>
            <étén 
              size="sm" 
              className="gap-2 gradiétécp hover:opaété90 shadow-md"
              onClick={handleExpétéport}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Rappétéspan>
            </étén>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
        étéle="Précision des prévisions"
          value="96%"
          sétéle="Moyenne sur 6 mois"
          icon={Target}
        éténd={{
            value: 3.2,
            label: 'vs période précédété,
            isPoétéeétée
          }}
        />

        <KPICard
        étéle="Taux de disponibiété
          value="98%"
          sétéle=éték disponible vs demande"
          icon={étéity}
        éténd={{
            value: 1.5,
            label: 'vs période précédété,
            isPoétéeétée
          }}
        />

        <KPICard
        étéle="étéféténétéiétérs"
          value="93%"
          sétéle="étérs poétés"
          icon={TrendingUp}
        éténd={{
            value: 4.1,
            label: 'vs période précédété,
            isPoétéeétée
          }}
        />
      </div>

      {/* Alétéand Quick éténs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2 shadow-sm border-nétél-200">
          <CardHeader>
            <div className="flexétés-cété jétéy-étéen">
              <div className="flexétés-cété gap-2">
                <Bell className="w-5 h-étét-nétél-600" />
                <Cardété classNameétét-h3">Alétéétéotifiéténs</Cardété>
              </div>
              <div className="flex gap-1">
                {étés', 'hété, 'moyenne', 'basse'].map((fété) => (
                  <étén
                    key={fété}
                    variétéselétéAlétélter === fété ? 'defaété: 'éténe'}
                    size="sm"
                    onClick={() => étélétéAlétélter(fété)}
                    className={`h-7 px-étét-xs ${
                      selétéAlétélter === fété ? 'bg-primary' : ''
                    }`}
                  >
                    {fété.chaétéétépperCase() + fété.slice(1)}
                  </étén>
                ))}
              </div>
            </div>
            <CardDescrétén classNameétét-small">
              Événemétécétéues nécesétét uneéténtion
            </CardDescrétén>
          </CardHeader>
          <CardCétét className="space-y-2 max-h-[400px] overflow-y-été>
            {fétéedAlétémap((alété=> (
              <Card
                key={alétéd}
                className={`p-3 border ${
                  alétéype === 'cétéue'
                    ? 'border-danger-200 bg-danger-50/30'
                    : alétéype === 'warning'
                    ? 'border-warning-200 bg-warning-50/30'
                    : 'border-info-200 bg-info-50/30'
                } ${alétérété? 'opaété60' : ''}`}
              >
                <div className="flexétésétét jétéy-étéen gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flexétés-cété gap-2">
                      <Badge
                        variétééténe"
                        className=étét-xs ${
                          alétéraété=== 'hété
                            ? 'bg-danger-10étét-danger-700 border-danger-300'
                            : alétéraété=== 'moyenne'
                            ? 'bg-warning-10étét-warning-700 border-warning-300'
                            : 'bg-info-10étét-info-700 border-info-300'
                        }`}
                      >
                        {alétéraététoUpperCase()}
                      </Badge>
                      {alétérété&& (
                        <Badge variétééténe" classNameétét-xs bg-nétél-10étét-nétél-600">
                          Traité
                        </Badge>
                      )}
                    </div>
                    <p classNameétét-small fétéemibolétét-nétél-900">{alétéessage}</p>
                    <p classNameétét-smalétét-nétél-600">{alétéetails}</p>
                    <p classNameétét-xétét-nétél-500">{alétéate}</p>
                  </div>
                  {!alétérété&& (
                    <étén variétééténe" size="sm" className="h-étét-xs" onClick={() => handleMarkAsRead(alétéd)}>
                      Trété
                    </étén>
                  )}
                </div>
              </Card>
            ))}
          </CardCétét>
        </Card>

        <Card className="shadow-sm border-nétél-200">
          <CardHeader>
            <Cardété classNameétét-h3">éténs rapides</Cardété>
            <CardDescrétén classNameétét-small">Raccourcis de gétén</CardDescrétén>
          </CardHeader>
          <CardCétét className="space-y-2">
            <étén variétééténe" className="w-full jétéyétét gap-3 h-étépy-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flexétés-cété jétéy-cété flex-shrink-0">
                <Users className="w-5 h-étét-primary" />
              </div>
              <div classNameétét-létélex-1">
                <p classNameétét-small fétéediuétét-nétél-900">Gérerétéiétérs</p>
                <p classNameétét-xétét-nétél-500">Drétéet permissions</p>
              </div>
            </étén>

            <étén variétééténe" className="w-full jétéyétét gap-3 h-étépy-3">
              <div className="w-10 h-10 rounded-lg bg-warning-500/10 flexétés-cété jétéy-cété flex-shrink-0">
                <Sliders className="w-5 h-étét-warning-600" />
              </div>
              <div classNameétét-létélex-1">
                <p classNameétét-small fétéediuétét-nétél-900">Ajété seuils</p>
                <p classNameétét-xétét-nétél-500">Cétéitéétélété</p>
              </div>
            </étén>

            <étén variétééténe" className="w-full jétéyétét gap-3 h-étépy-3">
              <div className="w-10 h-10 rounded-lg bg-info-500/10 flexétés-cété jétéy-cété flex-shrink-0">
                <BellRing className="w-5 h-étét-info-600" />
              </div>
              <div classNameétét-létélex-1">
                <p classNameétét-small fétéediuétét-nétél-900">Configurer alété</p>
                <p classNameétét-xétét-nétél-500">étéiéténs sétée</p>
              </div>
            </étén>

            <étén variétééténe" className="w-full jétéyétét gap-3 h-étépy-3">
              <div className="w-10 h-10 rounded-lg bg-succès-500/10 flexétés-cété jétéy-cété flex-shrink-0">
                <FileSpreadshétélassName="w-5 h-étét-succès-600" />
              </div>
              <div classNameétét-létélex-1">
                <p classNameétét-small fétéediuétét-nétél-900">Expété données</p>
                <p classNameétét-xétét-nétél-500">Rappétéet hétéiques</p>
              </div>
            </étén>
          </CardCétét>
        </Card>
      </div>

      {/* Performance Chété/}
      <Chétérd
      étéle="Performance du sétée"
        descrétén="Indiétérs de performance sur les 6 derniers mois"
      >
        <ResponsiveCéténer wété"100%" heiété280}>
          <LineChétéata={performanceété>
            <CétéianGridétékeDasharray="3 3"étéke="#E5E7EB" />
            <XAxis
              étéey="mois"
            éték={{ fétéze: 12, fill: '#6B7280' }}
              axisLine={{étéke: '#E5E7EB' }}
            />
            <YAxis
            éték={{ fétéze: 12, fill: '#6B7280' }}
              axisLine={{étéke: '#E5E7EB' }}
              domain={[80, 100]}
            />
            <Toété
              cétéétée={{
                backgroundColor: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fétéze: '12px'
              }}
            />
            <Legend wrappeétée={{ fétéze: '12px' }} iconType="circle" />
            <Line
            étée="moétée"
              étéey="precision"
             étéke="#6BA539"
             étékeWété{2.5}
              été{ r: 4, fill: '#6BA539',étékeWété 2,étéke: '#fff' }}
              name="Précision (%)"
            />
            <Line
            étée="moétée"
              étéey="disponibiété
             étéke="#0B3D91"
             étékeWété{2.5}
              été{ r: 4, fill: '#0B3D91',étékeWété 2,étéke: '#fff' }}
              name="Disponibiété(%)"
            />
            <Line
            étée="moétée"
              étéey="étéfétén"
             étéke="#F59E0B"
             étékeWété{2.5}
              été{ r: 4, fill: '#F59E0B',étékeWété 2,étéke: '#fff' }}
              name="étéfétén (%)"
            />
          </LineChart>
        </ResponsiveCéténer>
      </Chétérd>

      {/* Tabs for étéled views */}
      <Tabs defaétélue="cétéite" className="space-y-4">
        <TabsLétélassName="bg-wétéborder border-nétél-200 p-1">
          <TabsTrigger value="cétéite" className="étéétée=étée]:gradiétécp étéétée=étéeétét-wétérounded-lg">
            Par cétéité
          </TabsTrigger>
          <TabsTrigger value=étéiétérs" className="étéétée=étée]:gradiétécp étéétée=étéeétét-wétérounded-lg">
            étéitéétéiétérs
          </TabsTrigger>
        </TabsList>

        <TabsCétét value="cétéite">
          <Chétérd
          étéle="Répétéion des pièces par cétéité"
            descrétén="Vue d'ensemble de lété desétéks par niveau de cétéité"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <ResponsiveCéténer wété"100%" heiété280}>
                <BarChétéata={cétéaétéreakdown}>
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
                  <Legend wrappeétée={{ fétéze: '12px' }} iconType="circle" />
                  <Bar étéey="eéték" fill="#16A34A" name="Enéték" />
                  <Bar étéey="enCommande" fill="#F59E0B" name="En commande" />
                  <Bar étéey="rétée" fill="#DC2626" name="Rétée" />
                </BarChart>
              </ResponsiveCéténer>

              <div className="space-y-4">
                <h4 classNameétét-body fétéemibolétét-nétél-900">Résumé par niveau</h4>
                {cétéaétéreakdown.map(été) => (
                  <Card key=été.cétéite} className="p-4 border-nétél-200">
                    <div className="space-y-3">
                      <div className="flexétés-cété jétéy-étéen">
                        <span classNameétét-body fétéemibolétét-nétél-900">
                          été.cétéite}
                        </span>
                        <Badge variétééténe" className="bg-nétél-50">
                          été.eéték +été.enCommande +été.rétéeétéal
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-étét-cété">
                        <div className="space-y-1">
                          <p classNameétét-xétét-nétél-600">Enéték</p>
                          <p classNameétét-body fétéemibolétét-ocp-green">été.eéték}</p>
                        </div>
                        <div className="space-y-1">
                          <p classNameétét-xétét-nétél-600">En commande</p>
                          <p classNameétét-body fétéemibolétét-warning-600">été.enCommande}</p>
                        </div>
                        <div className="space-y-1">
                          <p classNameétét-xétét-nétél-600">Rétée</p>
                          <p classNameétét-body fétéemibolétét-danger-600">été.rétée}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Chétérd>
        </TabsCétét>

        <TabsCétét value=étéiétérs">
          <Card className="shadow-sm border-nétél-200">
            <CardHeader>
              <Cardété classNameétét-h3">étéité desétéiétérs</Cardété>
              <CardDescrétén classNameétét-small">
                Suivi des éténs récété desétéiétérs du sétée
              </CardDescrétén>
            </CardHeader>
            <CardCétét className="overflow-x-été-mx-6 px-6 md:mx-0 md:px-0">
              <Table className="min-w-[700px]">
                <TableHeader className="bg-nétél-50">
                  <TableRow className="hover:bg-nétél-50">
                    <TableHead classNameétét-small fétéemibolétét-nétél-700"étéiétér</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">Rôle</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">étén</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">Module</TableHead>
                    <TableHead classNameétét-small fétéemibolétét-nétél-700">été& Heure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userétéities.map((étéity, index) => (
                    <TableRow key={index} className="hover:bg-nétél-50">
                      <TableCell classNameétét-small fétéediuétét-nétél-900">
                        {étéityétéiétér}
                      </TableCell>
                      <TableCell>
                        <Badge variétééténe" className="bg-nétél-5étét-nétél-700 border-nétél-200">
                          {étéity.role}
                        </Badge>
                      </TableCell>
                      <TableCell classNameétét-smalétét-nétél-700">
                        {étéity.étén}
                      </TableCell>
                      <TableCell classNameétét-smalétét-nétél-600">
                        {étéity.module}
                      </TableCell>
                      <TableCell classNameétét-smalétét-nétél-500">
                        {étéity.été
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardCétét>
          </Card>
        </TabsCétét>
      </Tabs>
    </div>
  );
}








