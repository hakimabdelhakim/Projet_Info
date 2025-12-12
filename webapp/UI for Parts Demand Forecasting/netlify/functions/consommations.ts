function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } as Record<string, string>;
}

let items = [
  { code: 'ACC-001', prevision: 18, consommationReelle: null },
  { code: 'ACC-012', prevision: 12, consommationReelle: null },
  { code: 'ACC-023', prevision: 8, consommationReelle: null },
];

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const payload = JSON.parse(event.body || '{}');
      if (!Array.isArray(payload?.updates)) {
        throw new Error('Invalid payload');
      }
      // Stateless demo: merge incoming into in-memory array
      for (const u of payload.updates) {
        const idx = items.findIndex((i) => i.code === u.code);
        if (idx >= 0) items[idx] = { ...items[idx], ...u };
      }
      return {
        statusCode: 200,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true }),
      };
    } catch (e: any) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, message: e?.message || 'Bad Request' }),
      };
    }
  }

  return { statusCode: 405, headers: corsHeaders(), body: 'Method Not Allowed' };
}

