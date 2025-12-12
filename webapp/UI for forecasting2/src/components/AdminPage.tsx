import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from './PageHeader';
import { KPICard } from './KPICard';
import { ChartCard } from './ChartCard';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Settings,
  Download,
  Bell,
  Users,
  Sliders,
  BellRing,
  FileSpreadsheet,
  Activity,
  TrendingUp,
  Target,
} from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { loadPrevisions, loadPurchases, fetchActivities } from '../services/mlData';


type PrevisionContainer = Awaited<ReturnType<typeof loadPrevisions>>;
type Prevision = PrevisionContainer['data'][number];
// Accès à la propriété 'data' puis à l'élément (ils recupernt juste le type)
type PurchaseContainer = Awaited<ReturnType<typeof loadPurchases>>;
type Purchase = PurchaseContainer['data'][number]; 
type ActivityItem = {
  utilisateur: string;
  role: string;
  action: string;
  module: string;
  details?: string;
  date: string;
};

export function AdminPage() {
  const [previsions, setPrevisions] = useState<Prevision[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [prevIsLocal, setPrevIsLocal] = useState<boolean>(false);
  const [purchIsLocal, setPurchIsLocal] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<{ precision: number }>({ precision: 0 });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedAlertFilter, setSelectedAlertFilter] = useState<string>('tous');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [prevResult, purchResult, metricsRaw, acts] = await Promise.all([
          loadPrevisions(),
          loadPurchases(),
          import('../assets/model_metrics.json').catch(() => null),
          fetchActivities().catch(() => []),
        ]);

        // Récupération des données
        setPrevisions(prevResult.data);
        setPurchases(purchResult.data);
        setActivities(acts || []);
        // Extraction des flags
        const isPrevFallback = prevResult.isLocalFallback;
        const isPurchFallback = purchResult.isLocalFallback;
        // Mise à jour du state
        setPrevIsLocal(isPrevFallback);
        setPurchIsLocal(isPurchFallback);

        // Ajout de la logique d'avertissement
        if (isPrevFallback || isPurchFallback) {
            toast.warning("⚠️ Avertissement : les données ne sont pas mises à jour !");
        } else {
            toast.success("✅ Les données sont fraîches (source distante)");
        }
        const acc =
          metricsRaw && 'default' in metricsRaw ? (metricsRaw as any).default?.test?.acc_within_1 : (metricsRaw as any)?.test?.acc_within_1;
        setMetrics({ precision: acc ? acc * 100 : 0 });
      } catch {
        setError('Erreur de chargement des données admin');
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const now = useMemo(() => new Date(), []);

  const coverage = useMemo(() => {
    const totalStock = previsions.reduce((s, p) => s + p.stockActuel, 0);
    const totalNeed = purchases.reduce((s, p) => s + p.quantite, 0);
    const ratio = totalStock + totalNeed === 0 ? 0 : (totalStock / (totalStock + totalNeed)) * 100;
    return Math.max(0, Math.min(100, ratio));
  }, [previsions, purchases]);

  const satisfaction = useMemo(() => {
    const covered = previsions.filter((p) => p.stockActuel >= p.previsionM1).length;
    return previsions.length ? (covered / previsions.length) * 100 : 0;
  }, [previsions]);

  const userActivities = useMemo(() => activities, [activities]);

  useEffect(() => {
    const today = now.toISOString().slice(0, 10);
    const generated: any[] = [];
    previsions
      .filter((p) =>
        typeof p.previsionM1 === "number" &&
        typeof p.stockActuel === "number" &&
        p.previsionM1 > p.stockActuel
      )
      .slice(0, 8)
      .forEach((p, idx) => {
        generated.push({
          id: `RUP_${idx}`,
          type: 'critique',
          gravite: 'haute',
          message: 'Rupture probable',
          details: `${p.code} : stock ${p.stockActuel ?? 0} < prévision ${Number(p.previsionM1 ?? 0).toFixed(2)}`,
          date: today,
          traite: false,
        });
      });

    purchases
      .filter((p) => p.quantite > 0 && p.delai > 60)
      .slice(0, 5)
      .forEach((p, idx) => {
        generated.push({
          id: `DLV_${idx}`,
          type: 'warning',
          gravite: 'moyenne',
          message: 'Délai long',
          details: `${p.code} : délai ${p.delai} j, qty ${p.quantite}`,
          date: today,
          traite: false,
        });
      });
    setAlerts(generated);
  }, [previsions, purchases, now]);

  const filteredAlerts = useMemo(
    () => (selectedAlertFilter === 'tous' ? alerts : alerts.filter((a) => a.gravite === selectedAlertFilter)),
    [alerts, selectedAlertFilter]
  );

  const criticalityData = useMemo(() => {
    const agg: Record<string, { criticite: string; enStock: number; aCommander: number }> = {};
    previsions.forEach((p) => {
      const key = p.criticite || 'normal';
      agg[key] = agg[key] || { criticite: key, enStock: 0, aCommander: 0 };
      agg[key].enStock += p.stockActuel;
    });
    purchases.forEach((p) => {
      const key = p.criticite || 'normal';
      agg[key] = agg[key] || { criticite: key, enStock: 0, aCommander: 0 };
      agg[key].aCommander += p.quantite;
    });
    return Object.values(agg);
  }, [previsions, purchases]);

  const performanceData = useMemo(() => {
    const precision = metrics.precision || 0;
    const dispo = coverage || 0;
    const satisf = satisfaction || 0;
    return [
      { mois: 'M-5', precision, satisfaction: satisf, disponibilite: dispo },
      { mois: 'M-4', precision: Math.max(0, precision - 1.5), satisfaction: Math.max(0, satisf - 1), disponibilite: Math.max(0, dispo - 2) },
      { mois: 'M-3', precision: precision, satisfaction: Math.max(0, satisf - 0.5), disponibilite: Math.max(0, dispo - 1) },
      { mois: 'M-2', precision: precision + 0.5, satisfaction: satisf, disponibilite: dispo },
      { mois: 'M-1', precision: precision + 0.8, satisfaction: Math.min(100, satisf + 0.5), disponibilite: Math.min(100, dispo + 1) },
      { mois: 'M', precision, satisfaction: satisf, disponibilite: dispo },
    ];
  }, [metrics, coverage, satisfaction]);

  const handleSettings = () => {
    setSettingsOpen((v) => !v);
    toast.info('Paramètres', { description: settingsOpen ? 'Panneau masqué' : 'Panneau affiché' });
  };

  const handleExportReport = () => {
    const apiBase = (import.meta as any).env?.VITE_API_BASE || '';
    if (apiBase) {
      window.open(`${apiBase}/api/export/previsions.csv`, '_blank');
      toast.success('Export admin (prévisions) lancé');
    } else {
      toast.info('Backend non configuré');
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    toast.success('Alerte marquée comme traitée');
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, traite: true } : a)));
  };

  if (loading) return <div className="p-6 text-neutral-700">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administration"
        description="Gestion système et supervision des opérations"
        breadcrumbs={[
          { label: 'Accueil', href: '#' },
          { label: 'Administration' },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleSettings}>
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </Button>
            <Button size="sm" className="gap-2 gradient-ocp hover:opacity-90 shadow-md" onClick={handleExportReport}>
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Rapport</span>
            </Button>
          </>
        }
      />

      {settingsOpen && (
        <Card className="shadow-sm border-primary/40">
          <CardHeader>
            <CardTitle className="text-h4">Paramètres (placeholder)</CardTitle>
            <CardDescription>Brancher ici vos réglages métiers.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-neutral-700 space-y-1">
            <p>- Seuil alerte rupture : stock &lt; prévision M+1</p>
            <p>- Seuil délai long : délai &gt; 60 jours</p>
            <p>- Modèle actif : HistGradientBoosting (ACC±1 {metrics.precision.toFixed(0)}%)</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          title="Précision des prévisions"
          value={`${metrics.precision.toFixed(0)}%`}
          subtitle="ACC(±1) modèle test"
          icon={Target}
          trend={{ value: 0, label: '', isPositive: true }}
        />

        <KPICard
          title="Taux de disponibilité"
          value={`${coverage.toFixed(1)}%`}
          subtitle="Stock / (Stock + besoins)"
          icon={Activity}
          trend={{ value: 0, label: '', isPositive: true }}
        />

        <KPICard
          title="Couverture prévision"
          value={`${satisfaction.toFixed(1)}%`}
          subtitle="Pièces où stock ≥ prévision"
          icon={TrendingUp}
          trend={{ value: 0, label: '', isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2 shadow-sm border-neutral-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-neutral-600" />
                <CardTitle className="text-h3">Alertes et notifications</CardTitle>
              </div>
              <div className="flex gap-1">
                {['tous', 'haute', 'moyenne', 'basse'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedAlertFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAlertFilter(filter)}
                    className={`h-7 px-2 text-xs ${selectedAlertFilter === filter ? 'bg-primary' : ''}`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <CardDescription className="text-small">Événements détectés automatiquement sur les données ML</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-3 border ${
                  alert.type === 'critique'
                    ? 'border-danger-200 bg-danger-50/30'
                    : alert.type === 'warning'
                    ? 'border-warning-200 bg-warning-50/30'
                    : 'border-info-200 bg-info-50/30'
                } ${alert.traite ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          alert.gravite === 'haute'
                            ? 'bg-danger-100 text-danger-700 border-danger-300'
                            : alert.gravite === 'moyenne'
                            ? 'bg-warning-100 text-warning-700 border-warning-300'
                            : 'bg-info-100 text-info-700 border-info-300'
                        }`}
                      >
                        {alert.gravite.toUpperCase()}
                      </Badge>
                      {alert.traite && (
                        <Badge variant="outline" className="text-xs bg-neutral-100 text-neutral-600">
                          Traité
                        </Badge>
                      )}
                    </div>
                    <p className="text-small font-semibold text-neutral-900">{alert.message}</p>
                    <p className="text-small text-neutral-600">{alert.details}</p>
                    <p className="text-xs text-neutral-500">{alert.date}</p>
                  </div>
                  {!alert.traite && (
                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleMarkAsRead(alert.id)}>
                      Traiter
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            {filteredAlerts.length === 0 && <p className="text-small text-neutral-500">Aucune alerte.</p>}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-neutral-200">
          <CardHeader>
            <CardTitle className="text-h3">Actions rapides</CardTitle>
            <CardDescription className="text-small">Raccourcis de gestion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left flex-1">
                <p className="text-small font-medium text-neutral-900">Gérer utilisateurs</p>
                <p className="text-xs text-neutral-500">Droits et permissions</p>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
              <div className="w-10 h-10 rounded-lg bg-warning-500/10 flex items-center justify-center flex-shrink-0">
                <Sliders className="w-5 h-5 text-warning-600" />
              </div>
              <div className="text-left flex-1">
                <p className="text-small font-medium text-neutral-900">Ajuster seuils</p>
                <p className="text-xs text-neutral-500">Criticité et alertes</p>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
              <div className="w-10 h-10 rounded-lg bg-info-500/10 flex items-center justify-center flex-shrink-0">
                <BellRing className="w-5 h-5 text-info-600" />
              </div>
              <div className="text-left flex-1">
                <p className="text-small font-medium text-neutral-900">Configurer alertes</p>
                <p className="text-xs text-neutral-500">Notifications système</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => {
                const apiBase = (import.meta as any).env?.VITE_API_BASE || '';
                if (apiBase) {
                  window.open(`${apiBase}/api/export/previsions.csv`, '_blank');
                  toast.success('Export prévisions (backend)');
                } else {
                  toast.info('Backend non configuré pour export');
                }
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-success-500/10 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-success-600" />
              </div>
              <div className="text-left flex-1">
                <p className="text-small font-medium text-neutral-900">Exporter données</p>
                <p className="text-xs text-neutral-500">Rapports et historiques</p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      <ChartCard title="Performance du système" description="Indicateurs de performance (série synthétique)">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
            <Line type="monotone" dataKey="precision" stroke="#6BA539" strokeWidth={2.5} dot={{ r: 4 }} name="Précision (%)" />
            <Line type="monotone" dataKey="disponibilite" stroke="#0B3D91" strokeWidth={2.5} dot={{ r: 4 }} name="Disponibilité (%)" />
            <Line type="monotone" dataKey="satisfaction" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} name="Satisfaction (%)" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <Tabs defaultValue="criticite" className="space-y-4">
        <TabsList className="bg-white border border-neutral-200 p-1">
          <TabsTrigger value="criticite" className="data-[state=active]:gradient-ocp data-[state=active]:text-white rounded-lg">
            Par criticité
          </TabsTrigger>
          <TabsTrigger value="utilisateurs" className="data-[state=active]:gradient-ocp data-[state=active]:text-white rounded-lg">
            Activité utilisateurs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="criticite">
          <ChartCard title="Répartition des pièces par criticité" description="Stocks et besoins à commander par niveau">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={criticalityData}>
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
                  <Bar dataKey="enStock" fill="#16A34A" name="En stock" />
                  <Bar dataKey="aCommander" fill="#DC2626" name="À commander" />
                </BarChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                <h4 className="text-body font-semibold text-neutral-900">Résumé par niveau</h4>
                {criticalityData.map((item) => (
                  <Card key={item.criticite} className="p-4 border-neutral-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-body font-semibold text-neutral-900">{item.criticite}</span>
                        <Badge variant="outline" className="bg-neutral-50">
                          {item.enStock + item.aCommander} total
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-600">En stock</p>
                          <p className="text-body font-semibold text-ocp-green">{item.enStock.toFixed(0)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-600">À commander</p>
                          <p className="text-body font-semibold text-danger-600">{item.aCommander.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ChartCard>
        </TabsContent>

        <TabsContent value="utilisateurs">
          <Card className="shadow-sm border-neutral-200">
            <CardHeader>
              <CardTitle className="text-h3">Activité des utilisateurs</CardTitle>
              <CardDescription className="text-small">
                Actions enregistrées (auto/logs). Les entrées auto marquent l’activité système.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
              <Table className="min-w-[700px]">
                <TableHeader className="bg-neutral-50">
                  <TableRow className="hover:bg-neutral-50">
                    <TableHead className="text-small font-semibold text-neutral-700">Utilisateur</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Rôle</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Action</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Module</TableHead>
                    <TableHead className="text-small font-semibold text-neutral-700">Date & Heure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userActivities.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-small text-neutral-500">
                        Aucune activité enregistrée.
                      </TableCell>
                    </TableRow>
                  )}
                  {userActivities.map((activity, index) => (
                    <TableRow key={index} className="hover:bg-neutral-50">
                      <TableCell className="text-small font-medium text-neutral-900">
                        {activity.utilisateur || 'Auto'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-neutral-50 text-neutral-700 border-neutral-200">
                          {activity.role || 'Auto'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-small text-neutral-700">
                        {activity.action}
                      </TableCell>
                      <TableCell className="text-small text-neutral-600">
                        {activity.module}
                      </TableCell>
                      <TableCell className="text-small text-neutral-500">
                        {activity.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
