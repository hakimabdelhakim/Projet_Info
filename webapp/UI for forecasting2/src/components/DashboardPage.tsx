import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { KPICard } from './KPICard';
import { InteractiveChart } from './InteractiveChart';
import { LiveStatsWidget } from './LiveStatsWidget';
import { ActivityFeed } from './ActivityFeed';
import { CriticalityBadge } from './CriticalityBadge';
import { PageHeader } from './PageHeader';
import { ExportMenu } from './ExportMenu';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { Wallet, AlertTriangle, TrendingUp, Package, RefreshCw, Lock, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { loadPrevisions, loadPurchases } from '../services/mlData';

type PrevisionContainer = Awaited<ReturnType<typeof loadPrevisions>>;
type Prevision = PrevisionContainer['data'][number];
// Accès à la propriété 'data' puis à l'élément (ils recupernt juste le type)
type PurchaseContainer = Awaited<ReturnType<typeof loadPurchases>>;
type Purchase = PurchaseContainer['data'][number]; 

export function DashboardPage() {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  const [previsions, setPrevisions] = useState<Prevision[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [prevIsLocal, setprevIsLocal] = useState<boolean>(false);
  const [purchIsLocal, setpurchIsLocal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadAll = async () => {

      try {
        const [prevResult, purchResult] = await Promise.all([loadPrevisions(), loadPurchases()]);
        
         // Extraction propre
        setPrevisions(prevResult.data);
        setPurchases(purchResult.data);
        // Flags fallback
        const isPrevFallback = prevResult.isLocalFallback;
        const isPurchFallback = purchResult.isLocalFallback;
        // Flags fallback
        setprevIsLocal(prevResult.isLocalFallback);
        setpurchIsLocal(purchResult.isLocalFallback);
        // Ajout de la logique d'avertissement
        if (isPrevFallback || isPurchFallback) {
            toast.warning("⚠️ Avertissement : les données ne sont pas mises à jour (source locale)");
        } else {
            toast.success("✅ Les données sont fraîches (source distante)");
        }
      } catch (e) {
        setError("Erreur de chargement des données du tableau de bord");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const stats = useMemo(() => {
    const totalPrevision = previsions.reduce((s, p) => s + p.previsionM1, 0);
    const totalStock = previsions.reduce((s, p) => s + p.stockActuel, 0);
    const criticalCount = previsions.filter((p) => p.criticite === 'urgent').length;
    const budgetTotal = purchases.reduce((s, p) => s + p.total, 0);
    return { totalPrevision, totalStock, criticalCount, budgetTotal };
  }, [previsions, purchases]);

  const chartPrevisionStock = previsions.slice(0, 8).map((p) => ({
    code: p.code,
    prevision: p.previsionM1,
    stock: p.stockActuel,
  }));

  const criticityAgg = previsions.reduce(
    (acc, p) => {
      const key = p.criticite || 'normal';
      acc[key] = acc[key] || { criticite: key, stock: 0, aCommander: 0 };
      acc[key].stock += p.stockActuel;
      return acc;
    },
    {} as Record<string, { criticite: string; stock: number; aCommander: number }>
  );
  purchases.forEach((p) => {
    const key = p.criticite || 'normal';
    criticityAgg[key] = criticityAgg[key] || { criticite: key, stock: 0, aCommander: 0 };
    criticityAgg[key].aCommander += p.quantite;
  });
  const chartCriticite = Object.values(criticityAgg);

  const criticalParts = purchases
    .filter((p) => p.quantite > 0)
    .sort((a, b) => (a.criticite === b.criticite ? b.quantite - a.quantite : a.criticite === 'urgent' ? -1 : 1))
    .slice(0, 8);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.loading('Actualisation des données en cours...');
    try {
      const [prev, purch] = await Promise.all([loadPrevisions(), loadPurchases()]);
      setPrevisions(prev.data);
      setPurchases(purch.data);
      toast.success('Données actualisées');
    } catch {
      toast.error('Erreur lors de l’actualisation');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    toast.success('Rapport exporté', { description: 'Exporter via un script si besoin' });
  };

  const handleViewDetails = (code: string) => {
    toast.info(`Détails pour ${code}`, { description: 'Ouvrir une fiche détaillée si nécessaire.' });
  };

  if (loading) return <div className="p-6 text-neutral-700">Chargement du tableau de bord...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6 page-transition">
      <PageHeader
        title="Tableau de bord principal"
        description="Vue d'ensemble des prévisions et besoins calculés"
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Tableau de bord' },
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-ocp-green/5 hover:text-ocp-green hover:border-ocp-green transition-all"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
            <ExportMenu variant="default" size="sm" onExportExcel={handleExport} />
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-in-bottom">
        {isManager ? (
          <KPICard
            title="Budget prévisionnel"
            value={`${(stats.budgetTotal / 1000).toFixed(1)}k MAD`}
            subtitle="Σ (n_ac_2025 × PU)"
            icon={Wallet}
            isLoading={isRefreshing}
          />
        ) : (
          <KPICard
            title="Budget prévisionnel"
            value="•••••"
            subtitle="Accès restreint aux managers"
            icon={Lock}
            variant="locked"
          />
        )}

        <KPICard
          title="Pièces critiques"
          value={stats.criticalCount.toString()}
          subtitle="Criticité urgente"
          icon={AlertTriangle}
          isLoading={isRefreshing}
        />

        <KPICard
          title="Prévision mois suivant"
          value={stats.totalPrevision.toFixed(1)}
          subtitle="Consommation mensuelle totale"
          icon={TrendingUp}
          isLoading={isRefreshing}
        />

        <KPICard
          title="Stock total"
          value={stats.totalStock.toFixed(0)}
          subtitle="Accouplements en inventaire"
          icon={Package}
          isLoading={isRefreshing}
        />
      </div>

      <div className="animate-fade-in">
        <LiveStatsWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 animate-slide-in-left">
        <InteractiveChart title="Prévision vs Stock" description="Top pièces (prévision ML vs stock actuel)" isLoading={isRefreshing}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartPrevisionStock}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="code" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
              <Line type="monotone" dataKey="prevision" stroke="#6BA539" strokeWidth={2.5} dot={{ r: 3 }} name="Prévision" />
              <Line type="monotone" dataKey="stock" stroke="#0B3D91" strokeWidth={2.5} dot={{ r: 3 }} name="Stock" />
            </LineChart>
          </ResponsiveContainer>
        </InteractiveChart>

        <InteractiveChart title="Répartition par criticité" description="Stocks et besoins à commander" isLoading={isRefreshing}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartCriticite}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="criticite" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
              <Bar dataKey="stock" stackId="a" fill="#6BA539" name="En stock" />
              <Bar dataKey="aCommander" stackId="a" fill="#DC2626" name="À commander (ML)" />
            </BarChart>
          </ResponsiveContainer>
        </InteractiveChart>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 animate-slide-in-bottom">
        <LiveStatsWidget />
        <ActivityFeed />
      </div>

      <Card className="shadow-sm border-neutral-200 hover-lift animate-slide-in-right">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-h3">Pièces prioritaires à commander</CardTitle>
            <p className="text-small text-neutral-500">Issues des prévisions ML et de n_ac_2025</p>
          </div>
          <Button size="sm" className="gradient-ocp hover:opacity-90 shadow-md" onClick={() => toast.success('Sélection créée')}>
            Créer sélection
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                <TableHead className="text-small font-semibold text-neutral-700">Code</TableHead>
                <TableHead className="text-small font-semibold text-neutral-700">Désignation</TableHead>
                <TableHead className="text-small font-semibold text-neutral-700">Criticité</TableHead>
                <TableHead className="text-small font-semibold text-neutral-700 text-right">Qté à commander</TableHead>
                {isManager && (
                  <TableHead className="text-small font-semibold text-neutral-700 text-right">Budget (MAD)</TableHead>
                )}
                <TableHead className="text-small font-semibold text-neutral-700 text-right">Délai (j)</TableHead>
                <TableHead className="text-small font-semibold text-neutral-700"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalParts.map((part) => (
                <TableRow key={part.id} className="hover:bg-neutral-50 transition-colors">
                  <TableCell className="font-mono text-small font-medium text-neutral-900">{part.code}</TableCell>
                  <TableCell className="text-small text-neutral-700">{part.designation}</TableCell>
                  <TableCell>
                    <CriticalityBadge level={part.criticite as any} />
                  </TableCell>
                  <TableCell className="text-right text-small font-medium text-neutral-900">
                    {part.quantite.toFixed(2)}
                  </TableCell>
                  {isManager && (
                    <TableCell className="text-right text-small font-medium text-neutral-900">
                      {part.total.toLocaleString()}
                    </TableCell>
                  )}
                  <TableCell className="text-right text-small text-neutral-600">
                    {part.quantite > 0 ? '—' : ''}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewDetails(part.code)}
                    >
                      <ChevronRight className="h-4 w-4 text-neutral-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

