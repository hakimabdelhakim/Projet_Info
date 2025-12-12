import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './components/ui/sheet';
import { Alert, AlertDescription } from './components/ui/alert';
import { DashboardPage } from './components/DashboardPage';
import { PrevisionsPage } from './components/PrevisionsPage';
import { SaisieConsommationsPage } from './components/SaisieConsommationsPage';
import { GestionBudgetPage } from './components/GestionBudgetPage';
import { AdminPage } from './components/AdminPage';
import { LoginPage } from './components/LoginPage';
import { NotificationBadge } from './components/NotificationBadge';
import { QuickSearch } from './components/QuickSearch';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LayoutDashboard, TrendingUp, FileInput, Wallet, Shield, Menu, LogOut, AlertCircle } from 'lucide-react';
import ocpLogo from './assets/ea0333669458322a030507607d5724be95c62222.png';

// Fonction utilitaire pour obtenir la variante du badge selon le rôle
function getRoleBadgeVariant(role: string): "default" | "secondary" | "destructive" | "outline" {
  switch (role) {
    case 'manager':
      return 'default';
    case 'approvisionnement':
      return 'secondary';
    case 'logistique':
      return 'outline';
    default:
      return 'outline';
  }
}

// Fonction utilitaire pour obtenir le label du rôle
function getRoleLabel(role: string): string {
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
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  // Si l'utilisateur n'est pas connecté, afficher la page de connexion
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // Vérifier les permissions selon le rôle
  const canAccessBudget = user.role === 'manager';
  const canAccessAdmin = user.role === 'manager';
  const canAccessSaisie = user.role === 'logistique' || user.role === 'manager';
  const canAccessPrevisions = user.role === 'approvisionnement' || user.role === 'manager';

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Tableau de bord';
      case 'previsions':
        return 'Prévisions';
      case 'saisie':
        return 'Saisie consommations';
      case 'budget':
        return 'Gestion budget';
      case 'admin':
        return 'Administration';
      default:
        return tab;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-elevation-2 backdrop-blur-sm bg-white/95">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src={ocpLogo} 
                alt="OCP Group" 
                className="h-8 md:h-10 w-auto object-contain flex-shrink-0"
              />
              <div className="h-8 md:h-10 w-px bg-neutral-300 hidden sm:block" />
              <div className="min-w-0">
                <h1 className="text-neutral-900 text-sm md:text-base truncate font-semibold">Système de Prévision</h1>
                <p className="text-xs text-neutral-500 hidden sm:block">Accouplements & Pièces détachées</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <NotificationBadge />
              <div className="text-right hidden md:block">
                <p className="text-small text-neutral-600">Connecté en tant que</p>
                <div className="flex items-center gap-2 justify-end">
                  <p className="text-small font-medium text-neutral-900">{user.nom}</p>
                  <Badge variant={getRoleBadgeVariant(user.role)} className="rounded-badge">
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
              </div>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Navigation et paramètres utilisateur</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="pb-4 border-b">
                      <p className="text-sm text-gray-600">Utilisateur</p>
                      <p className="text-gray-900">{user.nom}</p>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="mt-2">
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hidden md:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Quick Search Bar */}
        <div className="mb-6 hidden md:block animate-slide-in-top">
          <QuickSearch />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          {/* Desktop Navigation - OCP Styled */}
          <TabsList className="hidden md:flex bg-white border border-neutral-200 p-1.5 shadow-elevation-2 rounded-lg h-auto gap-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-[#6BA539] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-small">Tableau de bord</span>
            </TabsTrigger>
            {canAccessPrevisions && (
              <TabsTrigger 
                value="previsions" 
                className="flex items-center gap-2 data-[state=active]:bg-[#6BA539] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-small">Prévisions</span>
              </TabsTrigger>
            )}
            {canAccessSaisie && (
              <TabsTrigger 
                value="saisie" 
                className="flex items-center gap-2 data-[state=active]:bg-[#6BA539] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5"
              >
                <FileInput className="w-4 h-4" />
                <span className="text-small">Saisie consommations</span>
              </TabsTrigger>
            )}
            {canAccessBudget && (
              <TabsTrigger 
                value="budget" 
                className="flex items-center gap-2 data-[state=active]:bg-[#6BA539] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-small">Gestion budget</span>
              </TabsTrigger>
            )}
            {canAccessAdmin && (
              <TabsTrigger 
                value="admin" 
                className="flex items-center gap-2 data-[state=active]:bg-[#6BA539] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all px-4 py-2.5"
              >
                <Shield className="w-4 h-4" />
                <span className="text-small">Administration</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 md:space-y-6">
            <DashboardPage />
          </TabsContent>

          {canAccessPrevisions && (
            <TabsContent value="previsions" className="space-y-4 md:space-y-6">
              <PrevisionsPage />
            </TabsContent>
          )}

          {canAccessSaisie && (
            <TabsContent value="saisie" className="space-y-4 md:space-y-6">
              <SaisieConsommationsPage />
            </TabsContent>
          )}

          {canAccessBudget ? (
            <TabsContent value="budget" className="space-y-4 md:space-y-6">
              <GestionBudgetPage />
            </TabsContent>
          ) : (
            <TabsContent value="budget" className="space-y-4 md:space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Accès refusé. Seuls les managers ont accès aux données budgétaires.
                </AlertDescription>
              </Alert>
            </TabsContent>
          )}

          {canAccessAdmin ? (
            <TabsContent value="admin" className="space-y-4 md:space-y-6">
              <AdminPage />
            </TabsContent>
          ) : (
            <TabsContent value="admin" className="space-y-4 md:space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Accès refusé. Seuls les managers ont accès à l'administration.
                </AlertDescription>
              </Alert>
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Mobile Bottom Navigation - OCP Styled */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-20 shadow-elevation-4">
        <div className="grid grid-cols-5 gap-1 px-2 py-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${
              activeTab === 'dashboard' 
                ? 'text-[#6BA539] bg-[#6BA539]/10 shadow-sm' 
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs mt-1">Accueil</span>
          </button>
          {canAccessPrevisions && (
            <button
              onClick={() => setActiveTab('previsions')}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${
                activeTab === 'previsions' 
                  ? 'text-[#6BA539] bg-[#6BA539]/10 shadow-sm' 
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs mt-1">Prév.</span>
            </button>
          )}
          {canAccessSaisie && (
            <button
              onClick={() => setActiveTab('saisie')}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${
                activeTab === 'saisie' 
                  ? 'text-[#6BA539] bg-[#6BA539]/10 shadow-sm' 
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <FileInput className="w-5 h-5" />
              <span className="text-xs mt-1">Saisie</span>
            </button>
          )}
          {canAccessBudget && (
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${
                activeTab === 'budget' 
                  ? 'text-[#6BA539] bg-[#6BA539]/10 shadow-sm' 
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="text-xs mt-1">Budget</span>
            </button>
          )}
          {canAccessAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${
                activeTab === 'admin' 
                  ? 'text-[#6BA539] bg-[#6BA539]/10 shadow-sm' 
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs mt-1">Admin</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
