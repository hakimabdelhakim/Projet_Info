import { useEffect, useState } from 'react';

type Row = { code: string; prevision: number; consommationReelle: number | null };

export default function Saisie() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/consommations')
      .then(async (r) => {
        if (!r.ok) throw new Error('Erreur chargement consommations');
        const data = await r.json();
        setRows(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((e) => setError(e?.message || 'Erreur'))
      .finally(() => setLoading(false));
  }, []);

  const update = (code: string, value: string) => {
    const n = value.trim() === '' ? null : Number(value);
    setRows((prev) => prev.map((r) => (r.code === code ? { ...r, consommationReelle: Number.isNaN(n as any) ? r.consommationReelle : n } : r)));
  };

  const save = async () => {
    setSaving(true);
    try {
      const updates = rows.map((r) => ({ code: r.code, consommationReelle: r.consommationReelle }));
      const r = await fetch('/api/consommations/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      if (!r.ok) throw new Error('Échec de sauvegarde');
      alert('Consommations enregistrées');
    } catch (e: any) {
      alert(e?.message || "Échec d'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Saisie des consommations</h2>
      {loading && <div>Chargement…</div>}
      {error && <div style={{ color: '#b00020' }}>{error}</div>}
      {!loading && !error && (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {['Code','Prévision','Consommation réelle'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.code}>
                    <td style={{ padding: 6 }}>{r.code}</td>
                    <td style={{ padding: 6 }}>{r.prevision}</td>
                    <td style={{ padding: 6 }}>
                      <input
                        type="number"
                        value={r.consommationReelle ?? ''}
                        onChange={(e) => update(r.code, e.target.value)}
                        style={{ padding: 6, width: 140 }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={save} disabled={saving} style={{ padding: '8px 12px' }}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
          </div>
        </>
      )}
    </div>
  );
}

