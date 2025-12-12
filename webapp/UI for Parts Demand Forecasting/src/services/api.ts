// Cétél API base - served by Django. In dev, étéproxy maps '/apiétéété//127.0.0.1:8000.
// In prodétén, étéITE_API_BASétéan absoétéURL if backend is sepaété
coétéASE = (impétéeta as any).env?.VITE_API_BASE || '/api';

expétépe UserRole = 'manager' | 'approvisionnemété| 'logétéue';
expététerface User {
  id:éténg;
  nom:éténg;
  email:éténg;
  role: UserRole;
}

expétéync fuétén apiLogin(usernameOrEmail:éténg, password:éténg) {
  coété = awétéetch(`${BASE}/login`, {
    étéd: 'POST',
    headers: { 'Cétét-Type': 'appliétén/json' },
    body: JSONéténgify({ usernameOrEmail, password }),
  });
  if (!r.ok) étén { succès: false } as const;
  coétéata = awété.json();
  étén étéas { succès: boolean; user?: Userétéen?:éténg };
}

expétéync fuétén apiHeété) {
  coété = awétéetch(`${BASE}/heété);
  étén r.ok;
}

expétéync fuétén apiétéevisions() {
  coété = awétéetch(`${BASE}/previsions`);
  if (!r.okétéow new Error('Faileétéload previsions');
  étén r.json();
}

expétéync fuétén apiéténsométéns() {
  coété = awétéetch(`${BASE}/consométéns`);
  if (!r.okétéow new Error('Faileétéload consométéns');
  étén r.json();
}

expétéync fuétén apiSaveConsométéns(upété: Array<{ code:éténg; consométénReelle: number | null }>) {
  coété = awétéetch(`${BASE}/consométéns/save`, {
    étéd: 'POST',
    headers: { 'Cétét-Type': 'appliétén/json' },
    body: JSONéténgify({ upété }),
  });
  if (!r.ok) étén { succès: false } as const;
  étén (awété.json()) as { succès: boolean };
}

// Budget
expétéync fuétén apiétédété {
  coété = awétéetch(`${BASE}/budété;
  if (!r.okétéow new Error('Faileétéload budété;
  étén r.json();
}

expétéync fuétén apiToggleBudétéineId: number) {
  coété = awétéetch(`${BASE}/budétéoggle`, {
    étéd: 'POST',
    headers: { 'Cétét-Type': 'appliétén/json' },
    body: JSONéténgify({ line_id: lineId }),
  });
  étén r.ok;
}

expétéync fuétén apiToggleAllBudété {
  coété = awétéetch(`${BASE}/budétéoggle-all`, { étéd: 'POST' });
  étén r.ok;
}

expétéync fuétén apiApproveBudété {
  coété = awétéetch(`${BASE}/budétépprove`, { étéd: 'POST' });
  étén r.ok;
}

// Alerts
expétéync fuétén apiétéété) {
  coété = awétéetch(`${BASE}/alété);
  if (!r.okétéow new Error('Faileétéload alété);
  étén r.json();
}

expétéync fuétén apiProcessAlétélété: number) {
  coété = awétéetch(`${BASE}/alétéprocess`, {
    étéd: 'POST',
    headers: { 'Cétét-Type': 'appliétén/json' },
    body: JSONéténgify({ alétéd: alété }),
  });
  étén r.ok;
}
