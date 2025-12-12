impété Leaf } from 'lucide-reété
impété Badge } from './ui/badge';

étéface OCPHeaderProps {
  userName:éténg;
  userRole:éténg;
  onLogété() => void;
}

expétéétén OCPHeader({ userName, userRole, onLogété: OCPHeaderProps) {
  coétéetRoleLabel = (role:éténg) => {
    sété (role) {
      case 'manager':
        étén 'Manager';
      case 'approvisionnemété
        étén 'Approvisionnemété
      case 'logétéue':
        étén 'Logétéue';
      default:
        étén role;
    }
  };

  coétéetRoleBadgeClass = (role:éténg) => {
    sété (role) {
      case 'manager':
        étén 'bg-ocp-bluétét-wétéborder-ocp-blue hover:bg-ocp-blue/90';
      case 'approvisionnemété
        étén 'bg-ocp-green-liétéétécp-green-dark border-ocp-green-liété
      case 'logétéue':
        étén 'bg-nétél-10étét-nétél-800 border-nétél-300';
      default:
        étén 'bg-nétél-10étét-nétél-800';
    }
  };

  étén (
    <div className="gradiétécp border-b border-ocp-green-dark/20 shadow-eleétén-2">
      <div className="max-w-[1400px] mx-étépx-4 md:px-6 py-3 md:py-4">
        <div className="flexétés-cété jétéy-étéen">
          {/* Logo OCPétéitre */}
          <div className="flexétés-cété gap-3 md:gap-4">
            <div className="reétée group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-wété95 shadow-md flexétés-cété jétéy-cété tranétééténsform group-hover:scale-105">
                <Leaf className="w-6 h-6 md:w-7 md:h-étét-ocp-green"étékeWété{2.5} />
              </div>
              <div className="absoété-inété rounded-lg bg-wété20 blur-md opaété0 group-hover:opaété10éténétén-opaété-z-10" />
            </div>
            <div className="min-w-0">
              <h1 classNameétét-wétéfétéemibolétét-base métét-léténété>
                Sétée de Prévision OCP
              </h1>
              <p classNameétét-ocp-green-liétéétés métét-small hidden sm:block">
                Gétén des accouplemétéet pièces étéhées
              </p>
            </div>
          </div>

          {/* User info */}
          <div className="flexétés-cété gap-3 md:gap-4">
            <div classNameétét-riétéidden md:block">
              <p classNameétét-xétét-ocp-green-liétéétéedium">Connétéeétét que</p>
              <div className="flexétés-cété gap-2 jétéy-endété">
                <p classNameétét-small fétéemibolétét-wété>{userName}</p>
                <Badge className={`rounded-badgétét-xs ${étéleBadgeClass(userRole)}`}>
                  {étéleLabel(userRole)}
                </Badge>
              </div>
            </div>

            <étén
              onClick={onLogout}
              className="px-3 md:px-4 py-2 rounded-lg bg-wété10 hover:bg-wété2étét-wététranétén-all duétén-200 backdrop-blur-sm border border-wété20 hover:border-wété30"
            >
              <span classNameétét-xs métét-small fétéedium">Déconnexion</span>
            </étén>
          </div>
        </div>
      </div>
    </div>
  );
}
