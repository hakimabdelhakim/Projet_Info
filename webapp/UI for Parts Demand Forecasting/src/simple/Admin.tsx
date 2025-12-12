import { useEffect, useState } from 'react';

type AlertItem = {
  id: number;
  type: string;
  severity: 'haute'|'moyenne'|'basse';
  message: string;
  details: string;
  date: string;
  processed: boolean;
};

export default function Admin() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/alerts')
      .then(async (r) => {
        if (!r.ok) throw new Error('Erreur chargement alertes');
        const data = await r.json();
        setAlerts(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((e) => setError(e?.message || 'Erreur'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const traiter = async (id: number) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, processed: true } : a)));
    try {
      const r = await fetch('/api/alerts/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alert_id: id }),
      });
      if (!r.ok) throw new Error();
    } catch {
      load();
    }
  };

  return (
    <div>
      <h2>Administration</h2>
      {loading && <div>Chargement…</div>}
      {error && <div style={{ color: '#b00020' }}>{error}</div>}
      {!loading && !error && (
        <ul style={{ paddingLeft: 16 }}>
          {alerts.map((a) => (
            <li key={a.id} style={{ marginBottom: 8 }}>
              <strong>[{a.severity}]</strong> {a.message} — {a.date}
              {!a.processed && (
                <button style={{ marginLeft: 8 }} onClick={() => traiter(a.id)}>Traiter</button>
              )}
              {a.processed && <span style={{ marginLeft: 8, color: '#2e7d32' }}>Traité</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

