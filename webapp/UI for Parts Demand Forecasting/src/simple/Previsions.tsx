import { useEffect, useState } from 'react';

type Item = {
  code: string;
  designation: string;
  type: string;
  criticite: string;
  stockActuel: number;
  moyenneM3: number;
  previsionM1: number;
  ecartPourcent: number;
  prixUnitaire: number;
  fournisseur: string;
  delai: number;
};

export default function Previsions() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/previsions')
      .then(async (r) => {
        if (!r.ok) throw new Error('Erreur chargement prévisions');
        const data = await r.json();
        setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((e) => setError(e?.message || 'Erreur'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Prévisions</h2>
      {loading && <div>Chargement…</div>}
      {error && <div style={{ color: '#b00020' }}>{error}</div>}
      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['Code','Désignation','Type','Criticité','Stock','Moy M3','Prévision M+1','Écart %','PU','Fournisseur','Délai (j)'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.code}>
                  <td style={{ padding: 6 }}>{it.code}</td>
                  <td style={{ padding: 6 }}>{it.designation}</td>
                  <td style={{ padding: 6 }}>{it.type}</td>
                  <td style={{ padding: 6 }}>{it.criticite}</td>
                  <td style={{ padding: 6 }}>{it.stockActuel}</td>
                  <td style={{ padding: 6 }}>{it.moyenneM3}</td>
                  <td style={{ padding: 6 }}>{it.previsionM1}</td>
                  <td style={{ padding: 6 }}>{it.ecartPourcent}</td>
                  <td style={{ padding: 6 }}>{it.prixUnitaire}</td>
                  <td style={{ padding: 6 }}>{it.fournisseur}</td>
                  <td style={{ padding: 6 }}>{it.delai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

