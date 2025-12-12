import { useEffect, useState } from 'react';
import Previsions from './simple/Previsions';
import Saisie from './simple/Saisie';
import Budget from './simple/Budget';
import Admin from './simple/Admin';

type UserRole = 'manager' | 'approvisionnement' | 'logistique';
type User = { id: string; nom: string; email: string; role: UserRole };

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState('manager');
  const [password, setPassword] = useState('demo');
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    // quick health check
    fetch('/api/health')
      .then((r) => setApiOk(r.ok))
      .catch(() => setApiOk(false));
  }, []);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      if (!r.ok) throw new Error('Identifiants invalides');
      const data = (await r.json()) as { success: boolean; user?: User };
      if (!data.success || !data.user) throw new Error('Réponse invalide');
      setUser(data.user);
    } catch (e: any) {
      setError(e?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  if (!user) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <h1>Système de Prévision</h1>
        <p style={{ color: '#666' }}>Connexion (demo: manager/appro/logistique + demo)</p>
        <div style={{ marginTop: 12, display: 'grid', gap: 8, maxWidth: 360 }}>
          <input
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            placeholder="Nom d’utilisateur ou email"
            style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }}
          />
          <button onClick={login} disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#6BA539', color: 'white' }}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
          {error && <div style={{ color: '#b00020' }}>{error}</div>}
          <div style={{ fontSize: 12, color: apiOk ? '#2e7d32' : '#b00020' }}>API /api/health: {apiOk === null ? '…' : apiOk ? 'OK' : 'KO'}</div>
        </div>
      </div>
    );
  }

  const canAccessBudget = user.role === 'manager';
  const canAccessAdmin = user.role === 'manager';
  const canAccessSaisie = user.role === 'logistique' || user.role === 'manager';
  const canAccessPrevisions = user.role === 'approvisionnement' || user.role === 'manager';

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Système de Prévision</h1>
        <div>
          <span style={{ marginRight: 12 }}>Connecté: {user.nom} ({user.role})</span>
          <button onClick={logout} style={{ padding: '6px 10px' }}>Déconnexion</button>
        </div>
      </div>
      <hr style={{ margin: '16px 0' }} />

      <div style={{ display: 'grid', gap: 24 }}>
        {canAccessPrevisions && (
          <section>
            <Previsions />
          </section>
        )}
        {canAccessSaisie && (
          <section>
            <Saisie />
          </section>
        )}
        {canAccessBudget && (
          <section>
            <Budget />
          </section>
        )}
        {canAccessAdmin && (
          <section>
            <Admin />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
