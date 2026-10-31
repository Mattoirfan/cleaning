interface HandlerEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

type Handler = (event: HandlerEvent) => Promise<HandlerResponse>;

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, error: 'Method Not Allowed' }) };
  }

  try {
    const { passcode } = JSON.parse(event.body || '{}');
    const expectedPasscode = process.env.ADMIN_PASSCODE || 'purenest2026';

    if (passcode === expectedPasscode) {
      const token = 'netlify_staff_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, token }),
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, error: 'Incorrect administrator passcode.' }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Invalid request body' }),
    };
  }
};
