import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { PageHeader } from './PageHeader';
import { StatsBanner } from './StatsBanner';
import { CriticalityBadge, CriticalityLevel } from './CriticalityBadge';
import { EmptyState } from './EmptyState';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { toast } from 'sonner';
import { Download, Check, Search, Filter, AlertCircle, TrendingUp, Wallet, Package, X } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { loadPrevisions } from '../services/mlData';

type Prevision = {
  code: string;
  designation: string;
  type: string;
  criticite: CriticalityLevel;
  stockActuel: number;
  stockSecurite: number;
  moyenneM3: number;
  previsionM1: number;
  ecartPourcent: number;
  prixUnitaire: number;
  fournisseur: string;
  delai: number;
  historique: { mois: string; qte: number }[];
};

export function PrevisionsPage() {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';

  const [previsions, setPrevisions] = useState<Prevision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMonth, setSelectedMonth] = useState('octobre-2025');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedCriticite, setSelectedCriticite] = useState('tous');
  const [selectedFournisseur, setSelectedFournisseur] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrevision, setSelectedPrevision] = useState<Prevision | null>(null);
  const [approvedCodes, setApprovedCodes] = useState<Set<string>>(new Set());

// Chargement initial des prévisions depuis mlData.ts
useEffect(() => {
  loadPrevisions()
    // L'objet retourné doit maintenant être déstructuré en { data, isLocalFallback }
    .then(({ data, isLocalFallback }) => {
      
      // Stocke les prévisions (le tableau de dictionnaires) dans l'état local
      setPrevisions(data as any); 
      
      // Extraction des codes déjà approuvés
      const approved = new Set(data.filter((p: any) => p.approved).map((p: any) => p.code));
      setApprovedCodes(approved);

      // --- NOUVELLE LOGIQUE POUR LE FALLBACK LOCAL ---
      if (isLocalFallback) {
        // Déclenche l'affichage d'un message d'avertissement si les données sont locales
        toast.warning("⚠️ Avertissement : les données ne sont pas mises à jour !");
      }else {
        setError(null); // Réinitialise l'erreur si tout s'est bien passé
      }
    })
    // Ce bloc catch gère les erreurs réseau plus profondes qui empêchent même le chargement local.
    .catch(() => setError("Erreur critique de chargement des prévisions."))
    // Fin du chargement dans tous les cas (succès ou erreur)
    .finally(() => setLoading(false));
}, []);

  const fournisseurs = useMemo(() => {
    const set = new Set<string>();
    previsions.forEach((p) => set.add(p.fournisseur));
    return Array.from(set);
  }, [previsions]);

  const filteredPrevisions = previsions.filter((prev) => {
    const matchSearch =
      prev.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prev.designation || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'tous' || prev.type === selectedType;
    const matchCriticite = selectedCriticite === 'tous' || prev.criticite === selectedCriticite;
    const matchFournisseur = selectedFournisseur === 'tous' || prev.fournisseur === selectedFournisseur;
    return matchSearch && matchType && matchCriticite && matchFournisseur;
  });

  const nbPieces = filteredPrevisions.length;
  const qteTotale = filteredPrevisions.reduce((sum, p) => sum + p.previsionM1, 0);
  const budgetTotal = isManager
    ? filteredPrevisions.reduce((sum, p) => sum + p.previsionM1 * p.prixUnitaire, 0)
    : 0;
  const piecesUrgentes = filteredPrevisions.filter((p) => p.criticite === 'urgent').length;
  const hasFilters =
    selectedType !== 'tous' || selectedCriticite !== 'tous' || selectedFournisseur !== 'tous' || searchQuery !== '';

  const handleExportExcel = () => {
    const apiBase = (import.meta as any).env?.VITE_API_BASE || '';
    if (apiBase) {
      window.open(`${apiBase}/api/export/previsions.csv`, '_blank');
      toast.success('Export lancé depuis le backend');
      return;
    }
    // fallback local CSV
    toast.info('Backend API non configuré, fallback CSV local.');
    const headers = [
      'code',
      'designation',
      'type',
      'criticite',
      'stockActuel',
      'stockSecurite',
      'moyenneM3',
      'previsionM1',
      'ecartPourcent',
      'prixUnitaire',
      'fournisseur',
      'delai',
    ];
    const rows = filteredPrevisions.map((p) => [
      p.code,
      p.designation,
      p.type,
      p.criticite,
      p.stockActuel,
      p.stockSecurite,
      p.moyenneM3,
      p.previsionM1,
      p.ecartPourcent,
      p.prixUnitaire,
      p.fournisseur,
      p.delai,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `previsions_${selectedMonth}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Fichier exporté', { description: `${filteredPrevisions.length} lignes exportées.` });
  };

  const handleApprove = () => {
    const codes = filteredPrevisions.map((p) => p.code);
    const next = new Set(approvedCodes);
    filteredPrevisions.forEach((p) => next.add(p.code));
    setApprovedCodes(next);
      const apiBase = (import.meta as any).env?.VITE_API_BASE || '';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (user) {
        headers['X-USER'] = user.nom;
        headers['X-ROLE'] = user.role;
      }
      fetch(`${apiBase}/api/approvals/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ codes }),
      }).catch(() => {});
    toast.success('Prévisions approuvées', { description: `${filteredPrevisions.length} prévisions validées.` });
  };

  const handleResetFilters = () => {
    setSelectedType('tous');
    setSelectedCriticite('tous');
    setSelectedFournisseur('tous');
    setSearchQuery('');
    toast.info('Filtres réinitialisés');
  };

  if (loading) {
    return <div className="p-6 text-neutral-700">Chargement des prévisions...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 page-transition">
      <PageHeader
        title="Prévisions mensuelles"
        description="Générer et examiner les prévisions de consommation des accouplements"
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Prévisions' },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2 hover:bg-ocp-green/5" onClick={handleExportExcel}>
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Excel</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button size="sm" className="gap-2 gradient-ocp" onClick={handleApprove}>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Approuver les prévisions</span>
              <span className="sm:hidden">Approuver</span>
            </Button>
          </>
        }
      />

      <StatsBanner
        sticky
        stats={[
          { label: 'Pièces', value: nbPieces, icon: <Package className="w-4 h-4 text-neutral-500" /> },
          { label: 'Qté totale', value: qteTotale, icon: <TrendingUp className="w-4 h-4 text-neutral-500" /> },
          ...(isManager
            ? [
                {
                  label: 'Budget prévisionnel',
                  value: `${(budgetTotal / 1000).toFixed(1)}k MAD`,
                  icon: <Wallet className="w-4 h-4 text-neutral-500" />,
                },
              ]
            : []),
          {
            label: 'Pièces urgentes',
            value: piecesUrgentes,
            highlight: piecesUrgentes > 0,
            icon: <AlertCircle className="w-4 h-4 text-danger-500" />,
          },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="hover:bg-ocp-green/5" onClick={handleExportExcel}>
              Export
            </Button>
            <Button size="sm" className="gradient-ocp hover:opacity-90 shadow-md" onClick={handleApprove}>
              Approuver ({nbPieces})
            </Button>
          </>
        }
      />

      <Card className="shadow-sm border-neutral-200">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-neutral-500" />
            <h3 className="text-small font-semibold text-neutral-900">Filtres & recherche</h3>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={handleResetFilters} className="ml-auto text-neutral-600 gap-1">
                <X className="w-3 h-3" />
                Réinitialiser
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="mois" className="text-small">
                Mois
              </Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="mois" className="rounded-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="octobre-2025">Octobre 2025</SelectItem>
                  <SelectItem value="novembre-2025">Novembre 2025</SelectItem>
                  <SelectItem value="decembre-2025">Décembre 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-small">
                Type d'accouplement
              </Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type" className="rounded-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les types</SelectItem>
                  <SelectItem value="Accouplement">Accouplement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="criticite" className="text-small">
                Criticité
              </Label>
              <Select value={selectedCriticite} onValueChange={setSelectedCriticite}>
                <SelectTrigger id="criticite" className="rounded-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Toutes</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fournisseur" className="text-small">
                Fournisseur
              </Label>
              <Select value={selectedFournisseur} onValueChange={setSelectedFournisseur}>
                <SelectTrigger id="fournisseur" className="rounded-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous fournisseurs</SelectItem>
                  {fournisseurs.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search" className="text-small">
                Recherche
              </Label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Code ou désignation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-input"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredPrevisions.length === 0 ? (
        <Card className="shadow-sm border-neutral-200">
          <CardContent className="p-0">
            <EmptyState
              icon={Search}
              title="Aucune prévision trouvée"
              description="Aucune prévision ne correspond aux critères de recherche. Modifiez les filtres."
              action={{
                label: 'Réinitialiser les filtres',
                onClick: handleResetFilters,
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm border-neutral-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[1100px]">
                <TableHeader className="sticky top-0 bg-neutral-50 z-10">
                  <TableRow className="hover:bg-neutral-50">
                    <TableHead className="text-small font-semibold text-neutral-700 sticky left-0 bg-neutral-50">
                      Code
                    </TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Désignation</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Type</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Criticité</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700 text-right">Stock act.</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700 text-right">Stock sécu.</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700 text-right">Moy. M-3</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700 text-right">Prév. M+1</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700 text-center">% écart</TableHead>
                    {isManager && (
                      <TableHead className="text-small font-semibold text-neutral-700 text-right">
                        Prix unit. (MAD)
                      </TableHead>
                    )}
                    <TableHead className="text-small font-semibold text-neutral-700">Fournisseur</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700 text-right">Délai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrevisions.map((prev) => (
                    <TableRow
                      key={prev.code}
                      className="hover:bg-neutral-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedPrevision(prev)}
                    >
                      <TableCell className="font-medium text-neutral-900 sticky left-0 bg-white group-hover:bg-neutral-50">
                        <div className="flex items-center gap-2">
                          <span>{prev.code}</span>
                          {approvedCodes.has(prev.code) && (
                            <Badge variant="secondary" className="bg-success-50 text-success-700 border-success-200">
                              Approuvé
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-small text-neutral-700">{prev.designation}</TableCell>
                      <TableCell className="text-small">
                        <Badge variant="secondary" className="bg-neutral-50 text-neutral-700 border-neutral-200">
                          {prev.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <CriticalityBadge level={prev.criticite} />
                      </TableCell>
                      <TableCell className="text-right text-small">
                        <span className={prev.stockActuel <= 3 ? 'text-danger-600 font-semibold' : 'text-neutral-900'}>
                          {prev.stockActuel}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-small text-neutral-700">
                        {prev.stockSecurite.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-small text-neutral-700">{prev.moyenneM3.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-small font-medium text-neutral-900">
                        {prev.previsionM1.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            prev.ecartPourcent > 20
                              ? 'bg-warning-50 text-warning-700 border-warning-200'
                              : 'bg-success-50 text-success-700 border-success-200'
                          }`}
                        >
                          +{prev.ecartPourcent}%
                        </Badge>
                      </TableCell>
                      {isManager && (
                        <TableCell className="text-right text-small font-medium text-neutral-900">
                          {prev.prixUnitaire.toLocaleString()} MAD
                        </TableCell>
                      )}
                      <TableCell className="text-small text-neutral-600">{prev.fournisseur}</TableCell>
                      <TableCell className="text-right text-small text-neutral-600">
                        {prev.delai.toFixed(0)} j
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="border-t border-neutral-200 bg-neutral-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-small text-neutral-600">Qté prévisions : </span>
                    <span className="text-body font-semibold text-neutral-900">{qteTotale.toFixed(2)} u.</span>
                  </div>
                  {isManager && (
                    <div>
                      <span className="text-small text-neutral-600">Budget total : </span>
                      <span className="text-body font-semibold text-primary">
                        {budgetTotal.toLocaleString()} MAD
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-small text-neutral-500">
                  {filteredPrevisions.length} pièce(s) affichée(s)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Sheet open={!!selectedPrevision} onOpenChange={() => setSelectedPrevision(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedPrevision && (
            <>
              <SheetHeader>
                <SheetTitle className="text-h3">{selectedPrevision.code}</SheetTitle>
                <SheetDescription className="text-small">
                  {selectedPrevision.designation}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <CriticalityBadge level={selectedPrevision.criticite} />
                  <Badge variant="secondary" className="bg-neutral-50 text-neutral-700 border-neutral-200">
                    {selectedPrevision.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-small text-neutral-600">Stock actuel</p>
                    <p className="text-h4 text-neutral-900">{selectedPrevision.stockActuel}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-small text-neutral-600">Prévision M+1</p>
                    <p className="text-h4 text-primary">{selectedPrevision.previsionM1.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-small text-neutral-600">Moyenne M-3</p>
                    <p className="text-h4 text-neutral-900">{selectedPrevision.moyenneM3.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-small text-neutral-600">% écart</p>
                    <p className="text-h4 text-warning-600">+{selectedPrevision.ecartPourcent}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-small font-medium text-neutral-700">Historique (placeholder)</p>
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={selectedPrevision.historique}>
                      <Line type="monotone" dataKey="qte" stroke="#6BA539" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 border-t border-neutral-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-small text-neutral-600">Fournisseur</span>
                    <span className="text-small font-medium text-neutral-900">{selectedPrevision.fournisseur}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-small text-neutral-600">Délai livraison</span>
                    <span className="text-small font-medium text-neutral-900">
                      {selectedPrevision.delai.toFixed(0)} jours
                    </span>
                  </div>
                  {isManager && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-small text-neutral-600">Prix unitaire</span>
                        <span className="text-small font-medium text-neutral-900">
                          {selectedPrevision.prixUnitaire.toLocaleString()} MAD
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-neutral-200 pt-2">
                        <span className="text-body font-semibold text-neutral-900">Budget total</span>
                        <span className="text-body font-semibold text-primary">
                          {(selectedPrevision.previsionM1 * selectedPrevision.prixUnitaire).toLocaleString()} MAD
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
