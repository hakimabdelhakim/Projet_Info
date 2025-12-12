import { Leaf } from 'lucide-react';
import { Badge } from './ui/badge';

interface OCPHeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

export function OCPHeader({ userName, userRole, onLogout }: OCPHeaderProps) {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'manager':
        return 'Manager';
      case 'approvisionnement':
        return 'Approvisionnement';
      case 'logistique':
        return 'Logistique';
      default:
        return role;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-ocp-blue text-white border-ocp-blue hover:bg-ocp-blue/90';
      case 'approvisionnement':
        return 'bg-ocp-green-light text-ocp-green-dark border-ocp-green-light';
      case 'logistique':
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="gradient-ocp border-b border-ocp-green-dark/20 shadow-elevation-2">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo OCP et titre */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/95 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                <Leaf className="w-6 h-6 md:w-7 md:h-7 text-ocp-green" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-1 rounded-lg bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="min-w-0">
              <h1 className="text-white font-semibold text-base md:text-lg truncate">
                Système de Prévision OCP
              </h1>
              <p className="text-ocp-green-light text-xs md:text-small hidden sm:block">
                Gestion des accouplements et pièces détachées
              </p>
            </div>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-ocp-green-light font-medium">Connecté en tant que</p>
              <div className="flex items-center gap-2 justify-end mt-1">
                <p className="text-small font-semibold text-white">{userName}</p>
                <Badge className={`rounded-badge text-xs ${getRoleBadgeClass(userRole)}`}>
                  {getRoleLabel(userRole)}
                </Badge>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-3 md:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              <span className="text-xs md:text-small font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
