const mockUsers = [
  {
    id: '1',
    nom: 'Fatima Ziani',
    email: 'fatima.ziani@ocp.ma',
    username: 'manager',
    password: 'demo',
    role: 'manager',
  },
  {
    id: '2',
    nom: 'Ahmed El Amrani',
    email: 'ahmed.amrani@ocp.ma',
    username: 'appro',
    password: 'demo',
    role: 'approvisionnement',
  },
  {
    id: '3',
    nom: 'Sarah Benali',
    email: 'sarah.benali@ocp.ma',
    username: 'logistique',
    password: 'demo',
    role: 'logistique',
  },
];

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } as Record<string, string>;
}

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders(), body: 'Method Not Allowed' };
  }

  try {
    const { usernameOrEmail, password } = JSON.parse(event.body || '{}');
    const user = mockUsers.find(
      (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (!user) {
      return {
        statusCode: 401,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, message: 'Invalid credentials' }),
      };
    }

    const { password: _pw, ...userSafe } = user as any;
    const token = Buffer.from(`${userSafe.id}:${Date.now()}`).toString('base64');

    return {
      statusCode: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, user: userSafe, token }),
    };
  } catch (e: any) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, message: 'Bad Request', error: e?.message }),
    };
  }
}

