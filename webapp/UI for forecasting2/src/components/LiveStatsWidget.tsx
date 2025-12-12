import { useEffect, useState } from 'react';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { loadPrevisions, loadPurchases } from '../services/mlData';

type LiveStat = {
  label: string;
  value: string;
  subtitle?: string;
  delta?: number;
};

type ModelMetrics = {
  best_model: string;
  test?: {
    acc_within_1?: number;
    mae?: number;
    rmse?: number;
  };
};

export function LiveStatsWidget() {
  const [stats, setStats] = useState<LiveStat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [prev, purch, metricsRaw] = await Promise.all([
          loadPrevisions(),
          loadPurchases(),
          import('../assets/model_metrics.json').catch(() => null),
        ]);

        const nbPiecesSuivies = prev.length;
        const nbPiecesACommander = purch.filter((p) => p.quantite > 0).length;
        const totalACommander = purch.reduce((s, p) => s + p.quantite, 0);

        const metrics: ModelMetrics | null =
          (metricsRaw && 'default' in metricsRaw ? (metricsRaw as any).default : metricsRaw) ?? null;
        const precision =
          metrics?.test?.acc_within_1 && metrics.test.acc_within_1 > 0
            ? metrics.test.acc_within_1 * 100
            : 0;

        setStats([
          { label: 'Pièces suivies', value: nbPiecesSuivies.toLocaleString(), subtitle: 'Prévisions chargées', delta: 0 },
          {
            label: 'Pièces à commander',
            value: nbPiecesACommander.toLocaleString(),
            subtitle: `Quantités totales n_ac: ${totalACommander.toFixed(0)}`,
            delta: 0,
          },
          { label: 'Taux de précision', value: `${precision.toFixed(0)}%`, subtitle: 'ACC(+/-1) modèle test', delta: 0 },
        ]);
      } catch {
        setError('Impossible de charger les stats');
      }
    };
    load();
  }, []);

  if (error) {
    return (
      <Card className="border-neutral-200 shadow-sm">
        <CardContent className="p-4 text-red-600 text-sm">{error}</CardContent>
      </Card>
    );
  }

  const renderDelta = (delta?: number) => {
    if (delta === undefined || delta === null) return null;
    if (delta === 0) {
      return <span className="text-xs text-neutral-400">=</span>;
    }
    const isUp = delta > 0;
    const Icon = isUp ? ChevronUp : ChevronDown;
    return (
      <span className={`flex items-center gap-0.5 text-xs ${isUp ? 'text-green-600' : 'text-red-600'}`}>
        <Icon className="w-3 h-3" />
        {Math.abs(delta)}
      </span>
    );
  };

  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-success-500" />
          <div className="flex items-center gap-1 text-small text-neutral-600">
            <Activity className="w-3.5 h-3.5" />
            <span className="font-medium">En direct</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-neutral-500 mb-1">{stat.label}</p>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <p className="text-h3 font-bold text-neutral-900">{stat.value}</p>
                  {renderDelta(stat.delta)}
                </div>
                {stat.subtitle && <p className="text-xs text-neutral-500">{stat.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
