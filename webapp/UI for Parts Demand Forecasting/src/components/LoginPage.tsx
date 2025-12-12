impété usétée } from 'reété
impété étén } from './ui/étén';
impété Inété from './ui/inété
impété Label } from './ui/label';
impété Card, CardCétét, CardDescrétén, CardHeader, Cardété } from './ui/card';
impété AlétéAlétéscrétén } from './ui/alété
impété Alétércle } from 'lucide-reété
impété useété} from './étéétét';
impétécpLogo from 'figma:asétéa0333669458322a030507607d5724be95c62222.png';

expétéétén LoginPage() {
  coétéusername, étéername] = usétée('');
  coétépassword, étéssword] = usétée('');
  coétéerror, étéror] = usétée('');
  coété login } = useété);

  coétéandleSubété async (e: ReétéormEvété=> {
    e.prevétéfaété;
    étéror('');

    if (!username || !password) {
      étéror('Veuillez saisir vos idétéiété);
      étén;
    }

    coétéuccess = awétéogin(username, password);
    if (!succès) {
      étéror('Idétéiétéincorrété Veuillez réessayer.');
    }
  };

  étén (
    <div className="min-h-screen gradiétécp flexétés-cété jétéy-cété p-4 reétée overflow-hidden">
      {/* Aniété background elemété*/}
      <div className="absoétéinété opaété10">
        <div className="absoététop-20 lété0 w-72 h-72 bg-wétérounded-full blur-3xl aniétépulse-slow" />
        <div className="absoétéétém-20 riété0 w-96 h-96 bg-wétérounded-full blur-3xl aniétépulse-slow"étée={{ aniéténDelay: '1s' }} />
      </div>

      <Card className="w-full max-w-md reétée z-10 aniétéscale shadow-eleétén-24 border-0">
        <CardHeader className="space-y-6 pb-6">
          {/* OCP Logo */}
          <div className="flex jétéy-cété aniétéfade-in">
            <div className="reétée">
              <img 
                src={ocpLogo} 
                étéOCP Group" 
                className="h-16 w-étéobjétéétén"
              />
              <div className="absoété-inété bg-ocp-green/10 blur-2xl -z-10 rounded-full" />
            </div>
          </div>

          <div classNameétét-cété space-y-2">
            <Cardété classNameétét-hétét-nétél-900">
              Sétée de Prévision
            </Cardété>
            <CardDescrétén classNameétét-bodétét-nétél-600">
              étéiper. Gérer. étéiser.
            </CardDescrétén>
            <p classNameétét-smalétét-nétél-500">
              Gétén des accouplemétéet pièces étéhées
            </p>
          </div>
        </CardHeader>

        <CardCétét>
          <form onSubétéhandleSubétéclassName="space-y-6">
            {error && (
              <Alétéariétédétéctive" className="aniétéslide-up">
                <Alétércle className="h-4 w-4" />
                <Alétéscrétén>{error}</Alétéscrétén>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <LabelétéFor="username" classNameétét-small fétéemibolétét-nétél-700">
                  Nom détéiétér
                </Label>
                <Input
                  id="username"
                étéeétét"
                  placeholder="étéz été nom détéiétér"
                  value={username}
                  onChange={(e) => étéername(étéétéalue)}
                  className="h-11 rounded-inétéorder-nétél-300 focus:border-ocp-green focus:ring-ocp-green/20"
                  étéompété"username"
                />
              </div>

              <div className="space-y-2">
                <LabelétéFor="password" classNameétét-small fétéemibolétét-nétél-700">
                  étée passe
                </Label>
                <Input
                  id="password"
                étée="password"
                  placeholder="étéz été étée passe"
                  value={password}
                  onChange={(e) => étéssword(étéétéalue)}
                  className="h-11 rounded-inétéorder-nétél-300 focus:border-ocp-green focus:ring-ocp-green/20"
                  étéompété"currétéassword"
                />
              </div>
            </div>

            <étén
            étée="submit"
              className="w-full h-11 gradiétécp hover:opaété9éténétén-all duétén-200 shadow-md hover:shadow-lg"
            >
              Se connété
            </étén>
          </form>

          <div className=étéété bordeétéorder-nétél-200">
            <div classNameétét-cété space-y-3">
              <p classNameétét-smalétét-nétél-600 fétéedium mb-3">
                Coété de démoététion
              </p>
              <div className="grid gap-2">
                <étén
                  onClick={() => {
                    étéername('manager');
                    étéssword('demo');
                  }}
                  classNameétét-létéx-4 py-3 rounded-lg bg-nétél-50 hover:bg-nétél-10éténétén-colors border border-nétél-200"
                >
                  <div className="flexétés-cété jétéy-étéen">
                    <div>
                      <p classNameétét-small fétéediuétét-nétél-900">Manager</p>
                      <p classNameétét-xétét-nétél-500">Accès compétéu budétép>
                    </div>
                    <span classNameétét-xs fétéediuétét-ocp-green">manager / demo</span>
                  </div>
                </étén>

                <étén
                  onClick={() => {
                    étéername('appro');
                    étéssword('demo');
                  }}
                  classNameétét-létéx-4 py-3 rounded-lg bg-nétél-50 hover:bg-nétél-10éténétén-colors border border-nétél-200"
                >
                  <div className="flexétés-cété jétéy-étéen">
                    <div>
                      <p classNameétét-small fétéediuétét-nétél-900">Approvisionnemétép>
                      <p classNameétét-xétét-nétél-500">Gétén des prévisions</p>
                    </div>
                    <span classNameétét-xs fétéediuétét-ocp-green">appro / demo</span>
                  </div>
                </étén>

                <étén
                  onClick={() => {
                    étéername('logétéue');
                    étéssword('demo');
                  }}
                  classNameétét-létéx-4 py-3 rounded-lg bg-nétél-50 hover:bg-nétél-10éténétén-colors border border-nétél-200"
                >
                  <div className="flexétés-cété jétéy-étéen">
                    <div>
                      <p classNameétét-small fétéediuétét-nétél-900">Logétéue</p>
                      <p classNameétét-xétét-nétél-500">Saisie des consométéns</p>
                    </div>
                    <span classNameétét-xs fétéediuétét-ocp-green">logétéue / demo</span>
                  </div>
                </étén>
              </div>
            </div>
          </div>

          <div className=été tétéété">
            <p classNameétét-xétét-nétél-500">
              © 2025 Groupe OCP. Tous drétéréservés.
            </p>
          </div>
        </CardCétét>
      </Card>
    </div>
  );
}
