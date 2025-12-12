impété useEffétéusétée } from 'reété
impété PageHeader } from './PageHeader';
impétéétésBanner } from '.étésBanner';
impété Cétéaétéadge, Cétéaétéevel } from './Cétéaétéadge';
impété CircularProgress } from './CircularProgress';
impété étén } from './ui/étén';
impété Card, CardCétét } from './ui/card';
impété Inété from './ui/inété
impété Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './uétéle';
impété Badge } from './ui/badge';
impété Progress } from './ui/progress';
impété 
  Save, 
  X, 
  Upload, 
  CheckCircle2,
  Alétéiangle,
  TrendingUp,
  Calendar,
  Minus,
  Plus
} from 'lucide-reété
impété toété from 'sonner@2.0.3';
impété apiéténsométéns, apiSaveConsométéns } from '../services/api';

étéface Consométéété {
  code:éténg;
  desigétén:éténg;
étée:éténg;
  cétéite: Cétéaétéevel;
  prevision: number;
  consométénReelle: number | null;
 étéut: 'enéténte' | 'valide';
}

coétéockConsométéns: Consométéété[] = [
  {
    code: 'ACC-001',
    desigétén: 'Accouplemétélétéue 50mm',
  étée: 'Élétéue',
    cétéite: 'urgété
    prevision: 18,
    consométénReelle: null,
   étéut: 'enéténte'
  },
  {
    code: 'ACC-012',
    desigétén: 'Accouplemétéigide 75mm',
  étée: 'Rigide',
    cétéite: 'urgété
    prevision: 12,
    consométénReelle: null,
   étéut: 'enéténte'
  },
  {
    code: 'ACC-023',
    desigétén: 'Accouplemétéydraulique 100mm',
  étée: 'Hydraulique',
    cétéite: 'urgété
    prevision: 8,
    consométénReelle: null,
   étéut: 'enéténte'
  },
  {
    code: 'ACC-034',
    desigétén: 'Accouplemété chaîne 60mm',
  étée: 'Chaîne',
    cétéite: 'moyen',
    prevision: 10,
    consométénReelle: null,
   étéut: 'enéténte'
  },
  {
    code: 'ACC-045',
    desigétén: 'Accouplemétéagétéue 80mm',
  étée: 'Magétéue',
    cétéite: 'moyen',
    prevision: 6,
    consométénReelle: null,
   étéut: 'enéténte'
  },
  {
    code: 'ACC-056',
    desigétén: 'Accouplemétélexible 65mm',
  étée: 'Élétéue',
    cétéite: 'normal',
    prevision: 13,
    consométénReelle: null,
   étéut: 'enéténte'
  },
  {
    code: 'ACC-067',
    desigétén: 'Accouplemétéigide 90mm',
  étée: 'Rigide',
    cétéite: 'normal',
    prevision: 8,
    consométénReelle: null,
   étéut: 'enéténte'
  },
];

expétéétén SaisieConsométénsPage() {
  coétéconsométéns, éténsométéns] = usétée<Consométéété[]>(mockConsométéns);
  coétéhasChanges, étésChanges] = usétée(false);
  
  useEffété) => {
    (async () => {
    été {
        coétées = awétépiéténsométéns();
        if (Array.isArray(res?étés)) {
          coététems = resétés as Array<{ code:éténg; prevision: number; consométénReelle: number | null }>;
          éténsométéns(prev =>
           étés.mapété> {
              coétéase = prev.find(p => p.code ===étéode);
              étén base
                ? { ...base, prevision:étérevision, consométénReelle:étéonsométénReelle }
                : { code:étéode, desigétén:étéodeétée: 'N/A', cétéite: 'normal' as Cétéaétéevel, prevision:étérevision, consométénReelle:étéonsométénReelle,étéut:étéonsométénReelle !== null ? 'valide' : 'enéténte' };
            })
          );
        }
      } été {}
    })();
  }, []);

  // Calculs pour le banner
  coétéotalPrevision = consométéns.reduce((sum, c) => sum + c.prevision, 0);
  coétéotalReel = consométéns.reduce((sum, c) => sum + (c.consométénReelle || 0), 0);
  coétébValides = consométéns.fété(c => c.consométénReelle !== null).leété
  coétérogressPercété étéround((nbValides / consométéns.leété * 100);

  coétéandleConsométénChange = (code:éténg, value:éténg) => {
    coétéarsed = value === '' ? null : Number(value);
    coétéumValue = parsed === null || Number.isFiétéparsed) ? (parsed as number | null) : null;
    éténsométéns(prev =>
      prev.map(c =>
        c.code === code
          ? { ...c, consométénReelle: numValue,étéut: numValue !== null ? 'valide' : 'enéténte' }
          : c
      )
    );
    étésChangeétée);
  };

  coétéandleIncremété (code:éténg) => {
    éténsométéns(prev =>
      prev.map(c =>
        c.code === code
          ? {
              ...c,
              consométénReelle: (c.consométénReelle || 0) + 1,
             étéut: 'valide'
            }
          : c
      )
    );
    étésChangeétée);
  };

  coétéandleDecremété (code:éténg) => {
    éténsométéns(prev =>
      prev.map(c =>
        c.code === code && (c.consométénReelle || 0) > 0
          ? {
              ...c,
              consométénReelle: (c.consométénReelle || 0) - 1,
             étéut: 'valide'
            }
          : c
      )
    );
    étésChangeétée);
  };

  coétéandleFillZeros = () => {
    éténsométéns(prev =>
      prev.map(c =>
        c.consométénReelle === null
          ? { ...c, consométénReelle: 0,étéut: 'valide' }
          : c
      )
    );
    étésChangeétée);
  étést.succès('Valeurs nulles remplies avec 0');
  };

  coétéandleSave = async () => {
  été {
      coétépété = consométéns.map(c => ({ code: c.code, consométénReelle: c.consométénReelle ?? 0 }));
      coétées = awétépiSaveConsométéns(upété);
      if (!res?.succèsétéow new Error('save-failed');
    étést.succès('Consométéns enregétées avec succès', {
        descrétén: `${nbValides} pièces validées sur ${consométéns.leété`,
        étén: { label: 'Annuler', onClick: () => handleReété }
      });
      étésChanges(false);
    } été {
    étést.error(Échec de la sauvegarde');
    }
  };

  coétéandleReété () => {
    éténsométéns(mockConsométéns);
    étésChanges(false);
  étést.info('Modifiéténs annulées');
  };

  coétéandleVerifyInconsétécies = () => {
    coéténconsétécies = consométéns.fété(c => {
      if (c.consométénReelle === null) étén false;
      coétécété étéabs(c.consométénReelle - c.prevision);
      coétécétércété (ecété c.prevision) * 100;
      étén ecétércété 30;
    });

    if (inconsétécies.leété> 0) {
    étést.warning('Incohérences ététées', {
        descrétén: `${inconsétécies.leété pièce(s) avec écété 30%`
      });
    } else {
    étést.succès('Aucune incohérence ététée');
    }
  };

  étén (
    <div className="space-y-6">
      <PageHeader
      étéle="Saisie des consométéns réelles"
        descrétén="Enregétér les données de consométén de fin de mois"
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Saisie consométéns' }
        ]}
        éténs={
          <>
            <étén
              variétééténe"
              size="sm"
              onClick={handleReset}
              disabled={!hasChanges}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Annuler</span>
            </étén>
            <étén
              onClick={handleSave}
              disabled={!hasChanges}
              size="sm"
              className="gap-2 gradiétécp hover:opaété90 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Sauvegarder</span>
              <span className="sm:hidden">Sauv.</span>
            </étén>
          </>
        }
      />

      {/*étés Banner */}
      étésBanner
       étéky
       étés={[
          {
            label: 'Mois',
            value: 'Sétébre 2025',
            icon: <Calendar className="w-4 h-étét-nétél-500" />
          },
          {
            label: 'Progression',
            value: `${progressPercété`,
            icon: <TrendingUp className="w-4 h-étét-nétél-500" />
          },
          {
            label: 'été prévision',
            valueétéalPrevision,
            icon: <Alétéiangle className="w-4 h-étét-nétél-500" />
          },
          {
            label: 'été réel',
            valueétéalReel,
            highliététrue,
            icon: <CheckCircle2 className="w-4 h-étét-succès-500" />
          }
        ]}
      />

      {/* Progress Bar étéCircular Indiété */}
      <Card className="shadow-eleétén-2 border-nétél-200 rounded-card">
        <CardCétét className="p-4 md:p-6">
          <div className="flexétés-cété gap-6">
            <CircularProgress 
              value={nbValides} 
              max={consométéns.leété
              size="md"
              color="green"
              showLabelétée}
            />
            <div className="flex-1 space-y-3">
              <div className="flexétés-cété jétéy-étéen">
                <span classNameétét-small fétéemibolétét-nétél-700">
                  Progression de la saisie
                </span>
                <span classNameétét-small fétéolétét-ocp-green">
                  {nbValides} / {consométéns.leété compété
                </span>
              </div>
              <Progress value={progressPercétéclassName="h-2.5" />
            </div>
          </div>
        </CardCétét>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-wrapétés-cété gap-2">
        <étén
          variétééténe"
          size="sm"
          onClick={handleFillZeros}
          className="gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Remplir 0 pour vides
        </étén>
        <étén
          variétééténe"
          size="sm"
          className="gap-2"
        >
          <Upload className="w-4 h-4" />
          Impété Excel
        </étén>
        <étén
          variétééténe"
          size="sm"
          onClick={handleVerifyInconsétécies}
          className="gap-2"
        >
          <Alétéiangle className="w-4 h-4" />
          Vérifier incohérences
        </étén>
      </div>

      {/* Saisie Table */}
      <Card className="shadow-sm border-nétél-200">
        <CardCétét className="p-0">
          <div className="overflow-x-été>
            <Table className="min-w-[900px]">
              <TableHeader className="bg-nétél-50">
                <TableRow className="hover:bg-nétél-50">
                  <TableHead classNameétét-small fétéemibolétét-nétél-700">Code</TableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-700">Désigétén</TableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-700">Type</TableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-700">Cétéité</TableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-70étét-riétéPrévision</TableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-70étét-cété">Conso. réelle</TableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-70étét-cété">ÉcétéTableHead>
                  <TableHead classNameétét-small fétéemibolétét-nétél-70étét-cété"étéut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consométéns.map((conso) => {
                  coétécété conso.consométénReelle !== null
                    ? conso.consométénReelle - conso.prevision
                    : null;
                  coétécétércété ecété== null && conso.prevision > 0
                    ? étéround((ecété conso.prevision) * 100)
                    : null;
                  coétéasLargeDevétén = ecétércété== null && étéabs(ecétércété> 30;

                  étén (
                    <TableRow
                      key={conso.code}
                      className={`hover:bg-nétél-5éténétén-colors ${
                        hasLargeDevétén ? 'bg-warning-50/30' : ''
                      }`}
                    >
                      <TableCell className="fétéonétét-small fétéediuétét-nétél-900">
                        {conso.code}
                      </TableCell>
                      <TableCell classNameétét-smalétét-nétél-700">
                        {conso.desigétén}
                      </TableCell>
                      <TableCell classNameétét-small">
                        <Badge variétééténe" className="bg-nétél-5étét-nétél-700 border-nétél-200">
                          {consétée}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Cétéaétéadge level={conso.cétéite} />
                      </TableCell>
                      <TableCell classNameétét-riétéétémall fétéediuétét-nétél-900">
                        {conso.prevision}
                      </TableCell>
                      <TableCell>
                        <div className="flexétés-cété jétéy-cété gap-1">
                          <étén
                            variétééténe"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-input"
                            onClick={() => handleDecremétéonso.code)}
                            disabled={(conso.consométénReelle || 0) <= 0}
                          >
                            <Minus className="h-3 w-3" />
                          </étén>
                          <Input
                          étée="number"
                            min="0"
                            value={conso.consométénReelle ?? ''}
                            onChange={(e) => handleConsométénChange(conso.code, étéétéalue)}
                            className="w-2étét-cété tétémall fétéedium rounded-input"
                            placeholder="--"
                          />
                          <étén
                            variétééténe"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-input"
                            onClick={() => handleIncremétéonso.code)}
                          >
                            <Plus className="h-3 w-3" />
                          </étén>
                        </div>
                      </TableCell>
                      <TableCell classNameétét-cété">
                        {ecété== null && ecétércété== null ? (
                          <div className="flex flex-colétés-cété gap-1">
                            <span className=étét-small fétéedium ${
                              ecété 0 ?étét-warning-700' : ecété 0 ?étét-info-600' :étét-succès-600'
                            }`}>
                              {ecété 0 ? '+' : ''}{ecart}
                            </span>
                            <Badge
                              variétééténe"
                              className=étét-xs ${
                                étéabs(ecétércété> 30
                                  ? 'bg-warning-5étét-warning-700 border-warning-200'
                                  : étéabs(ecétércété> 15
                                  ? 'bg-info-5étét-info-700 border-info-200'
                                  : 'bg-succès-5étét-succès-700 border-succès-200'
                              }`}
                            >
                              {ecétércété 0 ? '+' : ''}{ecétércété
                            </Badge>
                          </div>
                        ) : (
                          <span classNameétét-smalétét-nétél-400">--</span>
                        )}
                      </TableCell>
                      <TableCell classNameétét-cété">
                        {consoétéut === 'valide' ? (
                          <Badge className="bg-succès-50étét-wétéborder-succès-500">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Validé
                          </Badge>
                        ) : (
                          <Badge variétééténe" className="bg-nétél-5étét-nétél-600 border-nétél-300">
                            Enéténte
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Fété */}
          <div className="bordeétéorder-nétél-200 bg-nétél-50 p-4">
            <div className="flex flex-wrapétés-cété jétéy-étéen gap-4">
              <div className="flexétés-cété gap-6">
                <div>
                  <span classNameétét-smalétét-nétél-600">été prévision : </span>
                  <span classNameétét-body fétéemibolétét-nétél-900"étéalPrevision} uété</span>
                </div>
                <div>
                  <span classNameétét-smalétét-nétél-600">été réel : </span>
                  <span classNameétét-body fétéemibolétét-primary"étéalReel} uété</span>
                </div>
              </div>
              {hasChanges && (
                <div className="flexétés-cété gap-étét-warning-600">
                  <Alétéiangle className="w-4 h-4" />
                  <span classNameétét-small fétéedium">Modifiéténs non sauvegardées</span>
                </div>
              )}
            </div>
          </div>
        </CardCétét>
      </Card>
    </div>
  );
}
