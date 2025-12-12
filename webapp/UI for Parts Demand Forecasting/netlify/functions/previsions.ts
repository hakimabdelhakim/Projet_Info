function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } as Record<string, string>;
}

const previsions = [
  {
    code: 'ACC-001',
    designation: 'Accouplement élastique 50mm',
    type: 'Élastique',
    criticite: 'urgent',
    stockActuel: 2,
    moyenneM3: 15,
    previsionM1: 18,
    ecartPourcent: 20,
    prixUnitaire: 550,
    fournisseur: 'TechCoupling SA',
    delai: 5,
    historique: [
      { mois: 'Avr', qte: 14 },
      { mois: 'Mai', qte: 16 },
      { mois: 'Juin', qte: 15 },
      { mois: 'Juil', qte: 17 },
      { mois: 'Août', qte: 14 },
      { mois: 'Sep', qte: 15 },
    ],
  },
  {
    code: 'ACC-012',
    designation: 'Accouplement rigide 75mm',
    type: 'Rigide',
    criticite: 'urgent',
    stockActuel: 1,
    moyenneM3: 10,
    previsionM1: 12,
    ecartPourcent: 20,
    prixUnitaire: 1300,
    fournisseur: 'Indusmeca',
    delai: 7,
    historique: [
      { mois: 'Avr', qte: 9 },
      { mois: 'Mai', qte: 11 },
      { mois: 'Juin', qte: 10 },
      { mois: 'Juil', qte: 12 },
      { mois: 'Août', qte: 9 },
      { mois: 'Sep', qte: 11 },
    ],
  },
  {
    code: 'ACC-023',
    designation: 'Accouplement hydraulique 100mm',
    type: 'Hydraulique',
    criticite: 'urgent',
    stockActuel: 0,
    moyenneM3: 6,
    previsionM1: 8,
    ecartPourcent: 33,
    prixUnitaire: 3600,
    fournisseur: 'HydroTech Pro',
    delai: 10,
    historique: [
      { mois: 'Avr', qte: 5 },
      { mois: 'Mai', qte: 7 },
      { mois: 'Juin', qte: 6 },
      { mois: 'Juil', qte: 8 },
      { mois: 'Août', qte: 6 },
      { mois: 'Sep', qte: 7 },
    ],
  },
];

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders(), body: 'Method Not Allowed' };
  }

  return {
    statusCode: 200,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ items: previsions }),
  };
}

