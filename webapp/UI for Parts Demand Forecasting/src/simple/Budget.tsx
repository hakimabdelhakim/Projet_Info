import { useEffect, useState } from 'react';

type Line = {
  id: number;
  code: string;
  designation: string;
  quantity: number;
  unit_price: number;
  total: number;
  selected: boolean;
};

export default function Budget() {
  const [lines, setLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    fetch('/api/budget')
      .then(async (r) => {
        if (!r.ok) throw new Error('Erreur chargement budget');
        const data = await r.json();
        setLines(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((e) => setError(e?.message || 'Erreur'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toggleOne = async (id: number) => {
    setBusy(true);
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, selected: !l.selected } : l)));
    try {
      const r = await fetch('/api/budget/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line_id: id }),
      });
      if (!r.ok) throw new Error();
    } catch {
      // reload to recover
      load();
    } finally {
      setBusy(false);
    }
  };

  const toggleAll = async () => {
    setBusy(true);
    const allSelected = lines.every((l) => l.selected);
    setLines((prev) => prev.map((l) => ({ ...l, selected: !allSelected })));
    try {
      const r = await fetch('/api/budget/toggle-all', { method: 'POST' });
      if (!r.ok) throw new Error();
    } catch {
      load();
    } finally {
      setBusy(false);
    }
  };

  const approve = async () => {
    setBusy(true);
    try {
      const r = await fetch('/api/budget/approve', { method: 'POST' });
      if (!r.ok) throw new Error();
      alert('Achats approuvés');
      load();
    } catch {
      alert("Échec de l'approbation");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h2>Gestion du budget</h2>
      {loading && <div>Chargement…</div>}
      {error && <div style={{ color: '#b00020' }}>{error}</div>}
      {!loading && !error && (
        <>
          <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
            <button onClick={toggleAll} disabled={busy} style={{ padding: '6px 10px' }}>Basculer tout</button>
            <button onClick={approve} disabled={busy} style={{ padding: '6px 10px' }}>Approuver</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {['Code','Désignation','Quantité','PU','Total','Sélection'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.id}>
                    <td style={{ padding: 6 }}>{l.code}</td>
                    <td style={{ padding: 6 }}>{l.designation}</td>
                    <td style={{ padding: 6 }}>{l.quantity}</td>
                    <td style={{ padding: 6 }}>{l.unit_price}</td>
                    <td style={{ padding: 6 }}>{l.total}</td>
                    <td style={{ padding: 6 }}>
                      <label>
                        <input type="checkbox" checked={!!l.selected} onChange={() => toggleOne(l.id)} /> Sélectionné
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

