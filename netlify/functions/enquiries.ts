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

// Sample pre-seeded enquiries for demo
const inMemoryEnquiries: any[] = [
  {
    id: 'PN-10482',
    fullName: 'Charlotte Sterling',
    email: 'c.sterling@luxemail.com',
    phone: '(503) 555-0192',
    serviceId: 'deep-cleaning',
    propertyType: 'single-family',
    bedrooms: '3',
    bathrooms: '2',
    preferredDate: '2026-11-04',
    preferredTime: 'morning',
    address: '2840 NW Cumberland Rd',
    zipCode: '97210',
    message: 'Preparing home for hosting Thanksgiving guests. Need heavy attention to oven and hardwood baseboards.',
    status: 'New',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'PN-10481',
    fullName: 'Alexander Wright',
    email: 'alex@wrightarchitects.io',
    phone: '(503) 555-8831',
    serviceId: 'commercial-office',
    propertyType: 'commercial',
    bedrooms: '1',
    bathrooms: '2',
    preferredDate: '2026-11-02',
    preferredTime: 'after-hours',
    address: '1120 NW Couch St, 5th Floor',
    zipCode: '97209',
    message: 'Looking for twice-weekly evening janitorial service for our 45-person architectural studio.',
    status: 'Contacted',
    createdAt: new Date().toISOString(),
  },
];

export const handler: Handler = async (event: HandlerEvent) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Handle POST: Create customer enquiry
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');

      if (!data.fullName || !data.email || !data.phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Full name, email, and phone number are required.',
          }),
        };
      }

      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const id = `PN-${randomNum}`;

      const newEnquiry = {
        id,
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim().toLowerCase(),
        phone: String(data.phone).trim(),
        serviceId: data.serviceId || 'residential-regular',
        propertyType: data.propertyType || 'apartment',
        bedrooms: String(data.bedrooms || '2'),
        bathrooms: String(data.bathrooms || '2'),
        preferredDate: data.preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: data.preferredTime || 'morning',
        address: String(data.address || '').trim(),
        zipCode: String(data.zipCode || '').trim(),
        message: String(data.message || '').trim(),
        status: 'New',
        createdAt: new Date().toISOString(),
      };

      inMemoryEnquiries.unshift(newEnquiry);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          enquiry: {
            id: newEnquiry.id,
            fullName: newEnquiry.fullName,
            email: newEnquiry.email,
            serviceId: newEnquiry.serviceId,
            preferredDate: newEnquiry.preferredDate,
          },
        }),
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'Invalid JSON payload' }),
      };
    }
  }

  // Handle GET: Retrieve enquiries (Admin only)
  if (event.httpMethod === 'GET') {
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, error: 'Unauthorized: Admin authentication required.' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        enquiries: inMemoryEnquiries,
      }),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
  };
};
